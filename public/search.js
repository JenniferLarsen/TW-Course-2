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
    let apiUrl = 'http://localhost:3000/api/search?';
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
            console.log(data.hits);
            displayResults(data.hits);
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

            // Create a link for each recipe
            const link = document.createElement('a');
            link.textContent = result.recipe.label;

            // Extract the recipe ID from the URI
            const recipeId = result.recipe.uri.split('_')[1];
            
            // Construct the link using the recipe ID
            link.href = result.recipe.url;
            link.target = '_blank';  // Open link in a new tab

            li.appendChild(link);
            ul.appendChild(li);
        });
        searchResultsContainer.appendChild(ul);
    }
}


