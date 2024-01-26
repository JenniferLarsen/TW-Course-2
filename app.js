// Import and configure dotenv to load environment variables from .env file
require('dotenv').config();

// Access environment variables
const apiKey = process.env.API_KEY;
const apiId = process.env.API_ID;

// Import necessary modules
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Define a route for handling the search API with both GET and POST methods
app.route('/api/search')
    .get(async (req, res) => {
        const { term, ingredients } = req.query;
        // Handle the GET request logic here
        // ...

        res.status(200).json({ message: 'GET request handled successfully' });
    })
    .post(async (req, res) => {
        const { term, ingredients } = req.body;
        // Handle the POST request logic here
        // ...

        res.status(200).json({ message: 'POST request handled successfully' });
    });

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
