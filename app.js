// Server-side JavaScript
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");
const bcrypt = require("bcrypt")
const saltRounds = 10
const password = "Admin@123"
const saveUserData = require("./justConnect");
const bodyParser = require("body-parser");
const FavoriteRecipe = require('./models/recipe');
const User = require('./models/user');

const app = express();
const port = 8080;


app.use(express.json());
app.use(cors());

// Import and configure dotenv to load environment variables from .env file
require("dotenv").config();

// Access environment variables
const edamamAppId = process.env.API_ID;
const edamamAppKey = process.env.API_KEY;
const sessionKey = process.env.SESSION_KEY;

// Use express-session middleware
app.use(
  session({
    secret: sessionKey, // Change this to a secure random key
    resave: false,
    saveUninitialized: true,
  })
);

app.post('/api/update-likes', async (req, res) => {
  try {
    const { recipeId, isLiked } = req.body;
    const userId = req.session.user._id; // Assuming you store user ID in the session

    // Update user's liked list based on isLiked value
    const updateField = isLiked ? 'liked' : 'fav_items';
    await User.findByIdAndUpdate(userId, { $addToSet: { [updateField]: recipeId } });

    res.status(200).json({ message: 'Likes updated successfully' });
  } catch (error) {
    console.error('Error updating likes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/api/add-to-favorites", async (req, res) => {
  try {
    const { uri, image, isFavorite } = req.body;

    // Check if the user is logged in
    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if the recipe is already in favorites
    const existingFavorite = await FavoriteRecipe.findOne({ uri });

    if (existingFavorite) {
      return res.status(400).json({ error: "Recipe already in favorites" });
    }

    // Create and save the favorite recipe
    const newFavorite = new FavoriteRecipe({
      uri,
      image,
    });

    await newFavorite.save();

    // Update the user's favorites list
    await User.findOneAndUpdate(
      { email: user.email },
      { $addToSet: { fav_items: newFavorite._id } }
    );

    res.status(200).json({ message: "Recipe added to favorites" });
  } catch (error) {
    console.error("Error adding recipe to favorites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Define a route for handling the search API with both GET and POST methods
app.route("/api/search").get(async (req, res) => {
  try {
    const { term, ingredients, selected_list } = req.query;
    // Add the following debug lines - remove after
    console.log("Query Parameters:", req.query);
    console.log("Search Term:", term);
    console.log("Ingredients:", ingredients);
    console.log(selected_list);
    // console.log("Category:", category);
    // console.log("Selections:", selections);

    let apiUrl;
    if (term) {
      apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(
        term
      )}&app_id=${edamamAppId}&app_key=${edamamAppKey}`;
    } else if (ingredients) {
      apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(
        ingredients
      )}&app_id=${edamamAppId}&app_key=${edamamAppKey}`;
    } else if (selected_list) {
      for(ctgry in selected_list){
        selected_list[`${ctgry}`].forEach( (li_item) => {
          //console.log(ctgry,li_item);
          console.log(`&${ctgry}=${encodeURIComponent(li_item)}`);
          apiUrl += `&${ctgry}=${encodeURIComponent(li_item)}`
        })
        apiUrl += `&app_id=${edamamAppId}&app_key=${edamamAppKey}`;
      // apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&${encodeURIComponent(
      //   category)}=${encodeURIComponent(selections)}&app_id=${edamamAppId}&app_key=${edamamAppKey}`;
       
//  function getSelected(){
//   for(ctgry in selected_list){
//     selected_list[`${ctgry}`].forEach( (li_item) => {
//       //console.log(ctgry,li_item);
//       console.log(`&${ctgry}=${encodeURIComponent(li_item)}`);
//       apiUrl += `&${ctgry}=${encodeURIComponent(li_item)}`
//       //apiUrl += `&category=${encodeURIComponent(ctgry)}&selections=${encodeURIComponent(li_item)}`;
//     })
//   }
}

    } else {
      throw new Error(
        "At least one of search term, ingredients, or category and selection must be provided."
      );
    }

    console.log("API URL:", apiUrl);
    const edamamResponse = await fetch(apiUrl);
    const edamamData = await edamamResponse.json();
    console.log("Edamam Data:", edamamData);

    res.status(200).json({ hits: edamamData.hits });
  } catch (error) {
    console.error("Error making Edamam API request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Define a route for handling signin
app.route("/login").get(async (req, res) => {
  const { username, password } = req.query;

  console.log("Username:", username);
  console.log("Password:", password);

});

app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

bcrypt
  .hash(password, saltRounds)
  .then(hash => {
          userHash = hash 
    console.log('Hash ', hash)
    validateUser(hash)
  })
  .catch(err => console.error(err.message))

function validateUser(hash) {
    bcrypt
      .compare(password, hash)
      .then(res => {
        console.log(res) // return true
      })
      .catch(err => console.error(err.message))        
}

// Define a route for handling sign-up requests
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user data into your MongoDB database
    const result = await saveUserData(name, email, hashedPassword);
    console.log(name);
    console.log(`New user inserted with ID: ${result.insertedId}`);

    // Store user data in the session
    req.session.user = { name, email };

    return res.redirect("/user-profile");
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/user-profile", (req, res) => {
  // Access user data from the session
  const user = req.session.user;

  // Check if the user is logged in
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Send user data to the client
  res.json({ name: user.name, email: user.email });
  
});