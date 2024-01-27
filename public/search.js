const searchInput = document.getElementById("searchInput");
const ingredientsInput = document.getElementById("ingredientsInput");
const categoryDropdown = document.getElementById("category");
const selectionsContainer = document.getElementById("selectionsContainer");
const searchResultsContainer = document.getElementById("searchResults");
const performSearchButton = document.getElementById("performSearch");

// Attach the event listener to the search button
performSearchButton.addEventListener("click", () => {
  performSearch();
});

function performSearch() {
  const searchTerm = searchInput.value;
  const ingredients = ingredientsInput.value;
  const category = categoryDropdown.value;
  let selections;

  // Check if either searchTerm, ingredients, or category with selection is provided
  if (!(searchTerm || ingredients || (category && selections))) {
    console.error(
      "At least one of search term, ingredients, or category with selection must be provided."
    );
    return;
  } else if (category === "ingredients") {
    // For ingredients category, get the input value
    selections = ingredients;
  } else if (category && selections) {
    // For other categories, get the selected option value
    selections = selectionsContainer.querySelector("select").value;
  }

  //These are for testing only - remove when testing complete
  console.log("Search Term:", searchTerm);
  console.log("Ingredients:", ingredients);
  console.log("Category:", category);
  console.log("Selections:", selections);

  // Construct the API URL based on the available inputs
  let apiUrl = "http://localhost:3000/api/search?";

  if (searchTerm) {
    apiUrl += `term=${encodeURIComponent(searchTerm)}`;
  }

  if (ingredients) {
    apiUrl += `${searchTerm ? "&" : ""}ingredients=${encodeURIComponent(
      ingredients
    )}`;
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
