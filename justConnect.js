const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb+srv://Tbryson:ImPastas@impastas.rrdymwc.mongodb.net/";

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
  try {
    await client.connect();
    console.log("Connected successfully to server");

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

main().then(console.log).catch(console.error);
