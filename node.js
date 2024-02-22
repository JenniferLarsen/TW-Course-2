require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");

// Connection URL
const uri = process.env.NOODLE_DB;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// async function likeFav(id, recipeId) {
//   userId = new ObjectId(id);
//   const db = client.db("TheNoodles");
//   const collection = db.collection("UserInfo");

//   try {
//     const user = await collection.findOne({_id: userId})
//     console.log(user);
//     const result = await collection.updateOne(
//       { _id: userId },
//       { $push: { liked: recipeId } }
//     );
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.error("Error saving data:", error);
//   }
// }
async function getInfo(){
  const userData = "cyn";
  const field = "liked";
  const db = client.db("TheNoodles");
  const collection = db.collection("UserInfo");

  try {
    const values = await collection.findOne({name: userData})
    console.log(values);
    return values;
  } catch (error) {
    console.error("Error saving data:", error);
  }
}
getInfo();