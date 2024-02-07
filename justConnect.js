require('dotenv').config();

const { MongoClient } = require("mongodb");

// Connection URL
const uri = process.env.TY_DB;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const db = client.db("ImPastas"); // Connect to the "ImPastas" database
    console.log("Database:", db.databaseName);

    const collection = db.collection("UserInfo"); // Access the "UserInfo" collection
    console.log("Collection name:", collection.collectionName);

      // Query the collection to find the example user
      const exampleUser = await collection.findOne({ username: "example_user" });
      console.log("Example User:", exampleUser);
    
    return "done.";
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

async function saveData(userName, userSignInEmail, userSignInPassword) {
  const db = client.db('ImPastas');
  const collection = db.collection('UserInfo');

  const dataToSave = [
    {
      username: userName,
      password: userSignInPassword,
      email: userSignInEmail,
    }
  ];

  try {
    const result = await collection.insertMany(dataToSave);
    console.log(`${result.insertedCount} documents inserted`);
  } catch (error) {
    console.error('Error saving data:', error);
  } finally {
    await client.close();
  }
}

// Example usage
main().then(console.log).catch(console.error);
saveData('Name', 'userSignInEmail', 'userSignInPassword');
