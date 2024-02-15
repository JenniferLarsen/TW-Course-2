/* FILTER BUTTON AND DROPDOWN SECTION */
const drpDwnbtn = document.getElementById("drop-text");
const arrow_icon = document.getElementById("arrow");
const drpDwn_a_list = document.getElementById("a-list");
const a_list_values = document.querySelectorAll(".dropdown-list li");
const drpDwn_b_list = document.getElementById("b-list");
// console.log(drpDwn_b_list);

// toggle a-list
drpDwnbtn.onclick = function(){
    drpDwn_a_list.classList.contains("show") ? arrow_icon.style.rotate = "0deg" : arrow_icon.style.rotate = "-180deg";
    drpDwn_a_list.classList.add("show");
    selectedCategory();
}
//close dropdown
window.onclick = function (e) {
    if ((e.target.id !== "drop-text"  && e.target.id !== "arrow"
         && e.target.className !== "dropdown-list-item" 
         && e.target.className !== "filtered-item")){

        drpDwn_a_list.classList.remove("show");
        drpDwn_b_list.classList.remove("show");
        arrow_icon.style.rotate = "0deg";
    }
    // console.log("current mouse target: " + e.target);
}
const categoryOptions = {
    clear: [],
    diet: ['balanced', 'high-fiber', 'high-protein', 'low-carb', 'low-fat', 'low-sodium'],
    health: ['alcohol-cocktail', 'alcohol-free', 'celery-free', 'gluten-free', 'vegan', 'crustacean-free', 'dairy-free', 'DASH',
        'egg-free', 'fish-free', 'fodmap-free', 'gluten-free', 'immuno-supportive', 'keto-friendly', 'kidney-friendly', 'kosher',
        'low-potassium', 'low-sugar', 'lupine-free', 'Mediterranean', 'mollusk-free', 'mustard-free', 'no-oil-added',
        'paleo', 'peanut-free', 'pescatarian', 'pork-free', 'red-meat-free', 'sesame-free', 'shellfish-free', 'soy-free', 'sugar-conscious',
        'sulfite-free', 'tree-nut-free', 'vegan', 'vegetarian', 'wheat-free'],
    cuisineType: ['American', 'Asian', 'British', 'Caribbean', 'Central Europe', 'Chinese', 'Eastern Europe', 'French', 'Indian', 'Italian', 'Japanese',
        'Kosher', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'South American', 'South East Asian'],
    mealType: ['Breakfast', 'Dinner', 'Lunch', 'Snack', 'Teatime'],
    dishType: ['Biscuits and Cookies', 'Bread', 'Cereals', 'Condiments and sauces', 'Desserts', 'Drinks', 'Main course', 'Pancake', 'Preps', 'Preserve',
        'Salad', 'Sandwiches', 'Soup', 'Starter']
};

// event of inital dropdown list, defined refined list
function selectedCategory() {
    for(ctgry of a_list_values){
        let val = ctgry.getAttributeNode("value");
        ctgry.onclick = (e) => {
            // callback()
            setRefined(val.nodeValue);
        };
    }
}

function setRefined(selected_a){
    drpDwn_b_list.classList.add("show");
    const newOptions = categoryOptions[selected_a];
    // console.log(newOption);
    newOptions.forEach(newOption => {
        const optionElement = document.createElement('li');
        optionElement.className = 'filtered-item';
        optionElement.value = newOption;
        optionElement.innerHTML = newOption;
        optionElement.innerText = newOption;
        // console.log(optionElement);
        drpDwn_b_list.appendChild(optionElement);
    });
    refinedCategory(drpDwn_b_list);
}
function refinedCategory(list) {
    const b_list_values = list.querySelectorAll("li");
    // console.log(b_list_values);
    b_list_values.forEach(ctgry => {
        ctgry.onclick = (e) =>{
            console.log(ctgry.innerText);
            //add refined to list
            if(ctgry.value <= 0){
                ctgry.value = 1;
                selected_list.push(ctgry.innerText);
                updateFilterWidgets( 1 ,selected_list);
            }else if(ctgry.value >= 1){
                //TODO: pop update selected list
                updateFilterWidgets( 0 ,ctgry);
            }
            console.log(selected_list);
            console.log(ctgry.value);

        }
        
    });
}

const filters_container = document.getElementById("filters-section");
// const x_btn = document.getElementById();
const selected_group_area = document.getElementById("selected");
const selected_list = [];

console.log(selected_group_area);
function updateFilterWidgets(num, input){
    // console.log("enter update filter widgets, " + num);
    if(num > 0){
        input.forEach( (item) => {
            console.log(item);
            const new_widget = document.createElement('li');
            new_widget.innerText = item;
            new_widget.textContent = `| ${item.toLowerCase()}`;
            new_widget.innerHTML = `<i class="fa-solid fa-xmark">| ${item}</i>`;
            console.log("new widget: ");
            console.log(new_widget);
            selected_group_area.appendChild(new_widget);
            console.log(selected_group_area);
           
        });
    }
    
 }
/** save for later !!!!
 * document.querySelectorAll(".filtered-item").forEach((item) => (
        b_list_values.append(item.innerText)
    ));
 */

/* SEARCH BAR FUNCTIONALITY */
const searchInput = document.getElementById("search-input");
const searchResultsContainer = document.getElementById("search-results-container");
const search_btn = document.getElementById("search-icon");

search_btn.addEventListener("click", () => {
    console.log("searching...");
    performSearch();
});

function performSearch() {
    const searchTerm = searchInput.value;
    //const ingredients = ingredientsInput.value;
    // const category = categoryDropdown.value;
    let selections = selected_list[0];

  // Construct the API URL based on the available inputs
  let apiUrl = '/api/search?'

  if (searchTerm) {
    console.log(searchTerm);
    apiUrl += `term=${encodeURIComponent(searchTerm)}&`;
  }
  
//   if (ingredients) {
//     apiUrl += `ingredients=${encodeURIComponent(ingredients)}&`;
//   } else if (category === "ingredients" && selections) {
//     apiUrl += `ingredients=${encodeURIComponent(selections)}&`;
//   } else if (category && selections) {
//     apiUrl += `category=${category}&selections=${encodeURIComponent(
//       selections
//     )}&`;
//   }

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
console.log(searchResultsContainer);
function displayResults(results) {
    // Clear previous results
    searchResultsContainer.innerHTML = "";
  
    if (!results || results.length === 0) {
        searchResultsContainer.innerHTML = "No results found.";
    } else {
    //   const card = document.createElement("div");
    //   card.classList.add("card");
      results.forEach(function (result) {
        const card = document.createElement("div");
        card.classList.add("card");
        console.log(card);

        //Create a link for each recipe
        const link = document.createElement("a");
        link.classList.add("meal-name");
        // Construct the link using the recipe ID
        link.href = result.recipe.url;
        link.target = "_blank"; // Open link in a new tab
        link.textContent = result.recipe.label
        console.log(link);

        // Cosntruct name Label
        const recipeName = document.createElement("h4");
        recipeName.classList.add("meal-name");
        recipeName.id = "meal-name";
        recipeName.appendChild(link);
        console.log(recipeName);
  
        // Extract the recipe ID from the URI
        // const recipeId = result.recipe.uri.split("_")[1];

        // Extract the Image
        const img = document.createElement("img")
        img.classList.add("image");
        img.src = result.recipe.image;
        img.alt = recipeName.textContent;

        // Create a user actions
        const heart_star = document.createElement("div");
        heart_star.classList.add("user-acitons");
        heart_star.innerHTML = `<i class="fa-regular fa-heart"></i>
                               <i class="fa-regular fa-star"></i>`;

        //Consturct card for display:
        card.appendChild(img);
        card.appendChild(recipeName);
        card.appendChild(heart_star);
        console.log(card);
  
        //add to container
        searchResultsContainer.appendChild(card);
        
        
        // li.appendChild(link);
        // ul.appendChild(li);
      });
    //   searchResultsContainer.appendChild(ul);
    }
  }