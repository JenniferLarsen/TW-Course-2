const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb+srv://Tbryson:ImPastas@impastas.rrdymwc.mongodb.net/";

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
  try {
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(); // No need to specify dbName separately, it's included in the connection string
    console.log("Database:", db.databaseName);

    const collections = await db.collections();
    console.log("Collections:");
    collections.forEach(collection => console.log(collection.collectionName));
    
    return "done.";
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

main().then(console.log).catch(console.error);
