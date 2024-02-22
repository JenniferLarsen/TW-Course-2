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

async function checkUserExistence(email) {
  const db = client.db('TheNoodles');
  const collection = db.collection('UserInfo');

  try {
    const user = await collection.findOne({ email: email });
    if (user) {
      console.log(`User ${email} exists in the database.`);
      return user;
    } else {
      console.log(`User ${email} does not exist in the database.`);
      return {};
    }
  } catch (error) {
    console.error('Error checking user existence:', error);
    return {};
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
async function getInfo(userData){
  const db = client.db("TheNoodles");
  const collection = db.collection("UserInfo");

  try {
    const values = await collection.findOne({name: userData.name}, {email: userData.email});
    console.log(values);
    return values;
  } catch (error) {
    console.error("Error no user data:", error);
  }
}

main().then(console.log).catch(console.error);

module.exports = {
  saveData,
  updateLike,
  updateFav,
  getInfo,
  checkUserExistence

};