require('dotenv').config();

const uri = process.env.DB_URI;

const { MongoClient } = require("mongodb");

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
  const user = {
    id: profile.id,
    displayName: profile.displayName,
    email: profile.emails ? profile.emails[0].value : null,
    // Add other properties as needed
    accessToken: accessToken,
    refreshToken: refreshToken
};

// Assuming you have a user model, you would typically save this user to your database
user.save((err) => {
    if (err) {
        return done(err);
    }
    return done(null, user);
});

/* async function seedData() {
  const db = client.db('ImPastas');
  const collection = db.collection('UserInfo');

  const dataToSeed = [
    { username: 'Test_User', 
      password: 'Testing',
      email: 'testemail@aol.com' },
    // Add more data as needed
  ];

  try {
    const result = await collection.insertMany(dataToSeed);
    console.log(`${result.insertedCount} documents inserted`);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
  }
} */


main().then(console.log).catch(console.error);
// seedData()

}


