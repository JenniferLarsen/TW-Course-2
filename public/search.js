const searchInput = document.getElementById("searchInput");
const ingredientsInput = document.getElementById("ingredientsInput");
const searchResultsContainer = document.getElementById("searchResults");
const performSearchButton = document.getElementById("performSearch");
const categoryDropdown = document.getElementById("category");
const selectionsContainer = document.getElementById("selectionsContainer");

// Define the options for each category
const categoryOptions = {
  diet: ['balanced', 'high-fiber', 'high-protein', 'low-carb', 'low-fat', 'low-sodium'],
  health: ['alcohol-cocktail', 'alcohol-free', 'celery-free', 'gluten-free', 'vegan', 'crustacean-free', 'dairy-free', 'DASH',
      'egg-free', 'fish-free', 'fodmap-free', 'gluten-free', 'immuno-supportive', 'keto-friendly', 'kidney-friendly', 'kosher',
      'low-potassium', 'low-sugar', 'lupine-free', 'Mediterranean', 'mollusk-free', 'mustard-free', 'no-oil-added',
      'paleo', 'peanut-free', 'pescatarian', 'pork-free', 'red-meat-free', 'sesame-free', 'shellfish-free', 'soy-free', 'sugar-conscious',
      'sulfite-free', 'tree-nut-free', 'vegan', 'vegetarian', 'wheat-free'],
  cuisineType: ['American', 'Asian', 'British', 'Caribbean', 'Central Europe', 'Chinese', 'Eastern Europe', 'French', 'Indian', 'Italian', 'Japanese',
      'Kosher', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'South American', 'South East Asian'],
  mealType: ['Breakfast', 'Dinner', 'Lunch', 'Snack', 'Teatime'],
  dishType: ['Biscuits and cookies', 'Bread', 'Cereals', 'Condiments and sauces', 'Desserts', 'Drinks', 'Main course', 'Pancake', 'Preps', 'Preserve',
      'Salad', 'Sandwiches', 'Soup', 'Starter']
};

// Event listener for when the category dropdown changes
categoryDropdown.addEventListener('change', updateSelections);

// Initial population of selections based on the default category
updateSelections();

// Function to update the selections container based on the selected category
function updateSelections() {
  const selectedCategory = categoryDropdown.value;
  const options = categoryOptions[selectedCategory];

  // Clear existing content in the selections container
  selectionsContainer.innerHTML = '';

  if (!selectedCategory) {
      // If no category is selected, do nothing or handle it as needed
      return;
  }

  if (selectedCategory === 'ingredients') {
      // Create an input field for ingredients
      const ingredientsInput = document.createElement('input');
      ingredientsInput.type = 'text';
      ingredientsInput.placeholder = 'Enter ingredients (comma-separated)';
      ingredientsInput.id = 'ingredientsInput';
      ingredientsInput.name = 'ingredientsInput';
      selectionsContainer.appendChild(ingredientsInput);
  } else {
      // Create a selections dropdown for other categories
      const selectionsDropdown = document.createElement('select');
      selectionsDropdown.id = 'selections';
      selectionsContainer.appendChild(selectionsDropdown);

      // Add an empty option at the beginning
      const emptyOption = document.createElement('option');
      emptyOption.value = '';
      emptyOption.textContent = 'Select...';
      selectionsDropdown.appendChild(emptyOption);

      // Populate the selections dropdown with the new options
      options.forEach(option => {
          const optionElement = document.createElement('option');
          optionElement.value = option;
          optionElement.textContent = option;
          selectionsDropdown.appendChild(optionElement);
      });
  }
}

// Attach the event listener to the search button
performSearchButton.addEventListener("click", () => {
  performSearch();
});

function performSearch() {
  const searchTerm = searchInput.value;
  const ingredients = ingredientsInput.value;
  const category = categoryDropdown.value;
  let selections;

  if (category === "ingredients") {
    // For ingredients category, get the input value
    selections = ingredients;
  } else {
    // For other categories, get the selected option value
    const selectionsDropdown = document.getElementById("selections");
    selections = selectionsDropdown ? selectionsDropdown.value : null;
  }

  console.log("Debug - Search Term:", searchTerm);
  console.log("Debug - Ingredients:", ingredients);
  console.log("Debug - Category:", category);
  console.log("Debug - Selections:", selections);


  //These are for testing only - remove when testing complete
  console.log("Search Term:", searchTerm);
  console.log("Ingredients:", ingredients);
  console.log("Category:", category);
  console.log("Selections:", selections);

  // Construct the API URL based on the available inputs
  let apiUrl = '/api/search?'

  if (searchTerm) {
    apiUrl += `term=${encodeURIComponent(searchTerm)}&`;
  }
  
  if (ingredients) {
    apiUrl += `ingredients=${encodeURIComponent(ingredients)}&`;
  } else if (category === "ingredients" && selections) {
    apiUrl += `ingredients=${encodeURIComponent(selections)}&`;
  } else if (category && selections) {
    apiUrl += `category=${category}&selections=${encodeURIComponent(
      selections
    )}&`;
  }

  // Make the API request
  fetch(apiUrl, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.hits);
      displayResults(data.hits);
    })
    .catch((error) => console.error("Error:", error));
}

function displayResults(results) {
  // Clear previous results
  searchResultsContainer.innerHTML = "";

  if (!results || results.length === 0) {
    searchResultsContainer.innerHTML = "No results found.";
  } else {
    const ul = document.createElement("ul");
    results.forEach(function (result) {
      const li = document.createElement("li");

      // Create a link for each recipe
      const link = document.createElement("a");
      link.textContent = result.recipe.label;

      // Extract the recipe ID from the URI
      const recipeId = result.recipe.uri.split("_")[1];

      // Construct the link using the recipe ID
      link.href = result.recipe.url;
      link.target = "_blank"; // Open link in a new tab

      li.appendChild(link);
      ul.appendChild(li);
    });
    searchResultsContainer.appendChild(ul);
  }
}
