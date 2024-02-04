const {MongoClient} = require("mongodb");

// Database Name
let dbName, userame, password;
dbName = userame = password = "felipe_r";
// Connection URL
const url = `mongodb://${userame}:${password}@192.168.171.67`;
const client = new MongoClient(url);

async function main() {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    console.log(" the db", db);
    const collections = await db.collections();
    console.log("the collections");
    for (collection of collections) console.log(collection);
    return "done.";
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
