// Server-side JavaScript
const express = require("express");
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { mongoose } = require('./db');
const cors = require("cors");
const path = require("path");

// Load environment variables from .env
require('dotenv').config();

// Example use of mongoose and db
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const port = 3000;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Define the User model
const User = require('./models/user');

// Configure Passport to use the local strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Define the /login route
app.get('/login', (req, res) => {
  res.render('login');
});

// Import and configure dotenv to load environment variables from .env file
require("dotenv").config();

// Access environment variables
const edamamAppId = process.env.API_ID;
const edamamAppKey = process.env.API_KEY;

// Define a route for handling the search API with both GET and POST methods
app.route("/api/search").get(async (req, res) => {
  // ... (remaining code for the search route)
});

app.use("/", express.static(path.join(__dirname, "public")));

app.get('/login', function(req, res, next) {
  res.render('login');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
