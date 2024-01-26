// Server-side JavaScript
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Import and configure dotenv to load environment variables from .env file
require('dotenv').config();

// Access environment variables
const edamamAppId = process.env.API_ID;  
const edamamAppKey = process.env.API_KEY;  

// Define a route for handling the search API with both GET and POST methods
app.route('/api/search')
    .get(async (req, res) => {
        const { term, ingredients } = req.query;
        // Handle the GET request logic here
        // ...

        res.status(200).json({ "hits": [] });
    })
    .post(async (req, res) => {
        const { term, ingredients } = req.body;
        // Console log lines to be used for testing only - remove when testing is complete (Uncomment to use).
 /*     console.log('Search Term:', term); // Log search term
        console.log('Ingredients:', ingredients); // Log ingredients */
    
        // Handle the POST request logic here
        try {
            let apiUrl;
            if (term) {
                apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(term)}&app_id=${edamamAppId}&app_key=${edamamAppKey}`;
            } else if (ingredients) {
                apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(ingredients)}&app_id=${edamamAppId}&app_key=${edamamAppKey}`;
            } else {
                throw new Error('At least one of search term or ingredients must be provided.');
            }
    
            // console.log('API URL:', apiUrl);  // Log the constructed API URL
            const edamamResponse = await fetch(apiUrl);
            const edamamData = await edamamResponse.json();
    
            // Log the entire response data
            console.log('Edamam Data:', edamamData);
    
            // Return the hits to the client
            res.status(200).json({ hits: edamamData.hits });
        } catch (error) {
            console.error('Error making Edamam API request:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    

app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
