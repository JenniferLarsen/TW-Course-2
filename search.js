const performSearchButton = document.getElementById('performSearch');
const searchInput = document.getElementById('searchInput');
const ingredientsInput = document.getElementById('ingredientsInput');
const searchResultsContainer = document.getElementById('searchResults');

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
