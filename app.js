// Server-side JavaScript
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const password = "Admin@123";
const modules = require("./justConnect");
const saveUserData = modules.saveData;
const checkUserExistence = modules.checkUserExistence;
const bodyParser = require("body-parser");

const User = require("./models/user");
const { default: mongoose} = require("mongoose");

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

app.post("/api/update-likes", async (req, res) => {
  try {
    const { recipeId, isLiked, isFaved } = req.body;
    const userId = req.session.user._id; // Assuming you store user ID in the session
    console.log({ recipeId, isLiked, isFaved });
    console.log(req.session.user);
    console.log(userId);
  
    // Update user's liked or favorite list based on isLiked and isFaved values
    if (isLiked) {
      modules.updateLike(userId, recipeId);
      console.log(result);
    }

    if (isFaved) {
      modules.updateFav(userId, recipeId);
    }

    res
      .status(200)
      .json({ message: "Likes and favorites updated successfully" });
  } catch (error) {
    console.error("Error updating likes and favorites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Define a route for handling the search API with both GET and POST methods
app.route("/api/search").get(async (req, res) => {
  try {
    // Query Parameter object{ diet: 'high-protein' }
    //const { term, ingredients, category, selections } = req.query;
    const { term, diet, health, cuisineType, mealType, dishType } = req.query;
    const selected_list = {
      diet: [diet],
      health: [health],
      cuisineType: [cuisineType],
      mealType: [mealType],
      dishType: [dishType],
    };
    // Add the following debug lines - remove after
    console.log("Query Parameters:", req.query);
    console.log("Search Term:", term);
    console.log("diet:", diet);
    console.log("health:", health);
    console.log("cuisineType:", cuisineType);
    console.log("mealType:", mealType);
    console.log("dishType:", dishType);
    console.log(selected_list);

    let apiUrl = `https://api.edamam.com/api/recipes/v2?type=public`;

    function formatSelected() {
      for (ctgry in selected_list) {
        console.log(selected_list[ctgry]);
        if (selected_list[ctgry] !== undefined) {
          selected_list[ctgry].forEach((li_item) => {
            //console.log(ctgry,li_item);
            console.log(`&${ctgry}=${encodeURIComponent(li_item)}`);
            li_item !== undefined
              ? (apiUrl += `&${ctgry}=${encodeURIComponent(li_item)}`)
              : null;
          });
        }
      }
    }

    if (term) {
      apiUrl += `&q=${encodeURIComponent(term)}`;
      formatSelected();
      apiUrl += `&app_id=${edamamAppId}&app_key=${edamamAppKey}`;
    } else if (selected_list) {
      formatSelected();
      apiUrl += `&app_id=${edamamAppId}&app_key=${edamamAppKey}`;
      // apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&${encodeURIComponent(
      //   category)}=${encodeURIComponent(selections)}&app_id=${edamamAppId}&app_key=${edamamAppKey}`;
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

app.route("/login").post(async (req, res) => {
  try {
    console.log("starting login");
    const { email, password } = req.body;

    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("email:" + email)
    const userData = await checkUserExistence(email);
    console.log(userData);

    // Store user data in the session
    // req.session.user = { _id: result.insertedId, email };
    // console.log(req.session.user._id);
    // Send a JSON response with user data
    res.status(200).json({email });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

bcrypt
  .hash(password, saltRounds)
  .then((hash) => {
    userHash = hash;
    console.log("Hash ", hash);
    validateUser(hash);
  })
  .catch((err) => console.error(err.message));

function validateUser(hash) {
  bcrypt
    .compare(password, hash)
    .then((res) => {
      console.log(res); // return true
    })
    .catch((err) => console.error(err.message));
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
    req.session.user = { _id: result.insertedId, name, email };
    console.log(req.session.user._id);
    // Send a JSON response with user data
    res.status(200).json({ name, email });
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

app.get('/logout', (req, res) => {
  // Destroy the user session
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        // Handle error case
        res.status(500).json({ error: "Could not log out, please try again" });
      } else {
        // Optionally redirect to login page or send a success response
        //res.status(200).send('Logged out successfully');
        // For redirecting to login page, you can use:
        res.redirect('/login.html');
      }
    });
  } else {
    // If there's no session, just send a logged out message or redirect
    //res.status(200).send('Logged out successfully');
    // Or for redirect:
    res.redirect('/login');
  }
});

mongoose.connect(process.env.NOODLE_DB).then(() => {
  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
});
