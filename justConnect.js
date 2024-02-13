// Server side

require('dotenv').config();

const { MongoClient } = require("mongodb");

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
   /* }  finally {
    await client.close(); */
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

// Example usage
main().then(console.log).catch(console.error);

module.exports = saveData;