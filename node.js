const User = require("./models/user");
const { default: mongoose } = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/TheNoodles").then(async() => {
  userId = "65d40cab571c99dea3c1c4b9";
  recipeId = "62f902aa94f7c6040c736bb8550a107f";

console.log(userId);
});
  
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
