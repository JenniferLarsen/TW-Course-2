// Server side

require('dotenv').config();

const { MongoClient, ObjectId } = require("mongodb");

// Connection URL
const uri = process.env.NOODLE_DB;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const db = client.db("TheNoodles"); // Connect to the "TheNoodles" database
    console.log("Database:", db.databaseName);

    const collection = db.collection("UserInfo"); // Access the "UserInfo" collection
    console.log("Collection name:", collection.collectionName);

      // Query the collection to find the example user
      const exampleUser = await collection.findOne({ username: "example_user" });
      console.log("Example User:", exampleUser);
    
    return "done.";
  } catch (error) {
    console.error("Error:", error);
  } 
}

async function saveData(username, email, password) {
  const db = client.db('TheNoodles');
  const collection = db.collection('UserInfo');

  try {
    const result = await collection.insertOne({username, email, password});
    console.log(`One document inserted`);
    return result
  } catch (error) {
    console.error('Error saving data:', error);
}
}

async function checkUserExistence(username) {
  const db = client.db('TheNoodles');
  const collection = db.collection('UserInfo');

  try {
    const user = await collection.findOne({ username });
    if (user) {
      console.log(`User ${username} exists in the database.`);
      return true;
    } else {
      console.log(`User ${username} does not exist in the database.`);
      return false;
    }
  } catch (error) {
    console.error('Error checking user existence:', error);
    return false;
  }
}

async function updateLike(id, recipeId) {
  userId = new ObjectId(id); 
  const db = client.db("TheNoodles");
  const collection = db.collection("UserInfo");

  try {
    const user = await collection.findOne({_id: userId})
    console.log(user);
    const result = await collection.updateOne(
      { _id: userId },
      { $push: { liked: recipeId } },
    );
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

async function updateFav(id, recipeId) {
  userId = new ObjectId(id); 
  const db = client.db("TheNoodles");
  const collection = db.collection("UserInfo");

  try {
    const user = await collection.findOne({_id: userId})
    console.log(user);
    const result = await collection.updateOne(
      { _id: userId },
      { $push: { faved: recipeId } },
    );
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

main().then(console.log).catch(console.error);

module.exports = {
  saveData,
  updateLike,
  updateFav,
  checkUserExistence
};