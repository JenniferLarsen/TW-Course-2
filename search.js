require('dotenv').config();
const apiKey = process.env.API_KEY;

const express = require('express');
const app = express();
const port = 3000; // choose any available port

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

const performSearchButton = document.getElementById('performSearch');
const searchInput = document.getElementById('searchInput');
const ingredientsInput = document.getElementById('ingredientsInput');
const searchResultsContainer = document.getElementById('searchResults');

fetch('https://api.edamam.com/api/recipes/v2?type=public&app_id=7e56dd2d&app_key=685541325d49119c9bfd59298f854231')
  .then((res) => res.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

performSearchButton.addEventListener('click', () => {
    performSearch();
});

function performSearch() {
    const searchTerm = searchInput.value;
    const ingredients = ingredientsInput.value;
    const searchResults = getSearchResults(searchTerm, ingredients);
    displayResults(searchResults);
}

function getSearchResults(searchTerm, ingredients) {
    // Replace this with our actual search logic (e.g., API request, database query)
    const dummyResults = [
        "Recipe 1",
        "Recipe 2",
        "Recipe 3"
    ];

    return dummyResults;
}

function displayResults(results) {
    searchResultsContainer.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        searchResultsContainer.innerHTML = 'No results found.';
    } else {
        const ul = document.createElement('ul');
        results.forEach(function (result) {
            const li = document.createElement('li');
            li.textContent = result;
            ul.appendChild(li);
        });
        searchResultsContainer.appendChild(ul);
    }
}


/*Application ID
7e56dd2d

Application Keys
cab991bd72c7cc71873919863969a51e	—
*/