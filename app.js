// Server-side JavaScript
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");
const bcrypt = require("bcrypt")
const saltRounds = 10
const password = "Admin@123"
const saveUserData = require("./justConnect");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

// Import and configure dotenv to load environment variables from .env file
require("dotenv").config();

// Access environment variables
const edamamAppId = process.env.API_ID;
const edamamAppKey = process.env.API_KEY;

// Define a route for handling the search API with both GET and POST methods
app.route("/api/search").get(async (req, res) => {
  try {
    const { term, ingredients, category, selections } = req.query;
    // Add the following debug lines - remove after
    console.log("Query Parameters:", req.query);
    console.log("Search Term:", term);
    console.log("Ingredients:", ingredients);
    console.log("Category:", category);
    console.log("Selections:", selections);

    let apiUrl;
    if (term) {
      apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(
        term
      )}&app_id=${edamamAppId}&app_key=${edamamAppKey}`;
    } else if (ingredients) {
      apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(
        ingredients
      )}&app_id=${edamamAppId}&app_key=${edamamAppKey}`;
    } else if (category && selections) {
      apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&${encodeURIComponent(
        category)}=${encodeURIComponent(selections)}&app_id=${edamamAppId}&app_key=${edamamAppKey}`;
        
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

// Define a route for handling signup
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
      
      console.log(`New user inserted with ID: ${result.insertedId}`);
      
      return res.redirect('/user-profile'); 
      // res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
      console.error('Error signing up user:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});