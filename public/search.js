const config = require('../private/config');

const searchInput = document.getElementById('searchInput');
const ingredientsInput = document.getElementById('ingredientsInput');
const searchResultsContainer = document.getElementById('searchResults');
const performSearchButton = document.getElementById('performSearch');

// Attach the event listener to the search button
performSearchButton.addEventListener('click', () => {
    performSearch();
});

function performSearch() {
    const searchTerm = searchInput.value;
    const ingredients = ingredientsInput.value;

    // Check if either searchTerm or ingredients is provided
    if (!searchTerm && !ingredients) {
        console.error('At least one of search term or ingredients must be provided.');
        return;
    }

    // Construct the API URL based on the available inputs
    let apiUrl = '/api/search?'; // Updated to use relative path
    if (searchTerm) {
        apiUrl += `term=${searchTerm}`;
    }
    if (ingredients) {
        apiUrl += `${searchTerm ? '&' : ''}ingredients=${ingredients}`;
    }

    // Make the API request
    fetch(apiUrl, {
        method: 'GET',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayResults(data.results);
        })
        .catch(error => console.error('Error:', error));
}

function displayResults(results) {
    // Clear previous results
    searchResultsContainer.innerHTML = '';

    if (!results || results.length === 0) {
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
