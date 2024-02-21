require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");


// Connection URL
const uri = process.env.NOODLE_DB;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//const User = require("./models/user");
// const { default: mongoose } = require("mongoose");

//   userId = "65cad587cadb126767de025b";
//   recipeId = "62f902aa94f7c6040c736bb8550a107f";

//   console.log(userId);

async function likeFav(id, recipeId) {
  userId = new ObjectId(id);
  const db = client.db("TheNoodles");
  const collection = db.collection("UserInfo");

  try {
    const user = await collection.findOne({_id: userId})
    console.log(user);
    const result = await collection.updateOne(
      { _id: userId },
      { $push: { liked: recipeId } }
    );
    console.log(result);
    //result.save();
    //const result = await collection.insertOne({username, email, password});
    //console.log(`One document inserted`);
    return result;
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

// const result = await User.updateOne(
//   { _id: userId },
//   { $push: { liked: recipeId } }
// );
// console.log(result);
// result.save();
// console.log(User.userId);

//   PersonModel.update(
//     { _id: person._id },
//     { $push: { friends: friend } },
//     done
// );

// update(
//     { _id: userId },
//     {$push: {liked: recipeId}
// );
//  let x = User.findOneAndUpdate({ _id: userId }, { $push: { liked: recipeId } });
//  console.log(x)

// .catch(error => console.log(error));

console.log(likeFav("65cad587cadb126767de025b", "62f902aa94f7c6040c736bb8550a107f"));