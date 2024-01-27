// Server-side JavaScript
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = 3000;

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
      apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(
        category)}&${encodeURIComponent(selections)}&app_id=${edamamAppId}&app_key=${edamamAppKey}}`;
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

app.use("/", express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
