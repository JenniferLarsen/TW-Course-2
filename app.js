// Server-side JavaScript
const express = require("express");
const bodyParser = require('body-parser');
const authRoutes = require('./authRoutes');
const session = require('express-session');
const passport = require('passport');
const { User } = require('./models/user'); 
const { mongoose, db } = require('./db');
const cors = require("cors");       //gateway for data
const fetch = require("node-fetch");
const path = require("path");

// Load environment variables from .env
require('dotenv').config();

// Example use of mongoose and db
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});


const app = express();
const port = 3000;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
// Use the authentication routes
app.use('/auth', authRoutes);

app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Define the /login route
app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: path.join(__dirname, 'public') });
});

// Configure Passport to use the local strategy
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

app.use("/", express.static(path.join(__dirname, "public")));

app.get('/login', function(req, res, next) {
  res.render('login');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
