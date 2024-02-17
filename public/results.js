/* FILTER BUTTON AND DROPDOWN SECTION */
const drpDwnbtn = document.getElementById("drop-text");
const arrow_icon = document.getElementById("arrow");
const drpDwn_a_list = document.getElementById("a-list");
const a_list_values = document.querySelectorAll(".dropdown-list li");
const drpDwn_b_list = document.getElementById("b-list");
// console.log(drpDwn_b_list);
const selected_group_area = document.getElementById("selected");

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
    console.log("current mouse target: " + e.target);
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

// event of inital dropdown list & refined list
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
    drpDwn_b_list.innerHTML = "";
    drpDwn_b_list.classList.add("show");
    const newOptions = categoryOptions[selected_a];
    console.log(selected_a);
    // console.log(newOption);
    newOptions.forEach(newOption => {
        const optionElement = document.createElement('li');
        optionElement.className = 'filtered-item';
        // optionElement.classList.add(newOption.toString());
        optionElement.id = selected_a;
        optionElement.innerHTML = newOption;
        optionElement.innerText = newOption;
        // console.log(optionElement);
        drpDwn_b_list.appendChild(optionElement);
    });
    refinedCategoryActions(drpDwn_b_list);
}
// adding the filter widgets
var b_list_values;
function refinedCategoryActions(list) {
    b_list_values = list.querySelectorAll("li");
    b_list_values.forEach(ctgry => {
        ctgry.onclick = (e) =>{
          console.log(ctgry);
          // ctgry.classList.add("isChosen");
          if(!selected_group_area.classList.contains(ctgry.innerText.toString())){
            addWidget(ctgry);
          }
          else{
            removeWidget(ctgry.innerText);
            // ctgry.classList.remove("isChosen");
          }
        }
    });
}
selected_group_area.onclick = (e) => {
  removeWidget(e.target.parentNode.id);
}
function addWidget(input){
      var item = input.innerText;
      console.log(item);
      console.log(selected_group_area.children);
      selected_group_area.classList.add(item);
      const new_widget = document.createElement('li');
      new_widget.innerText = item;
      new_widget.textContent = `| ${item.toLowerCase()}`;
      new_widget.innerHTML = `<i id="x_btn" class="fa-solid fa-xmark">| ${item}</i>`;
      new_widget.id = item;
      new_widget.classList.add(input.id.toString());
      console.log("new widget: ");
      console.log(new_widget);
      selected_group_area.appendChild(new_widget);
      console.log(selected_group_area.children);
      //console.log(selected_group_area);  
 }
function removeWidget(item){
  console.log("remove widget" + item);
  const widget = document.getElementById(item);
  console.log(widget);
  selected_group_area.removeChild(widget);
  selected_group_area.classList.remove(item);
  console.log(selected_group_area.children);
}

/* SEARCH BAR FUNCTIONALITY */
const searchInput = document.getElementById("search-input");
const searchResultsContainer = document.getElementById("search-results-container");
const search_btn = document.getElementById("search-icon");
const selected_list = {}; //key,value pairs to fill up at the end

search_btn.addEventListener("click", () => {
    console.log("searching...");
    emptyList();
    fillSelections();
    performSearch();
});

function emptyList(){
  for(ctgry in selected_list){
    if (selected_list.hasOwnProperty(ctgry)) {
      delete selected_list[ctgry];
    }
  }
  console.log(selected_list);
}

function fillSelections(){
  selected_group_area.childNodes.forEach( widget => {
    wcName = widget.className;
    //category key doesnt exist
    if(!(wcName in selected_list) && wcName !== undefined){
      // console.log(wcName + " not in list");
      selected_list[`${wcName}`] = [];
      selected_list[`${wcName}`].push(widget.id);
    } //if it does exist
    else if(wcName !== undefined){
      // console.log(wcName + " ALREADY in list");
      selected_list[`${wcName}`].push(widget.id);
    }
    else{
      // do nothing
    }
  })
  console.log(selected_list);
}
function performSearch() {
    const searchTerm = searchInput.value;
    //const ingredients = searchInput.value;
    //const category = categoryDropdown.value;
    // let selections = selected_list[0];
    // console.log(selections);
  // Construct the API URL based on the available inputs
  let apiUrl = '/api/search?'
/*https://api.edamam.com/api/recipes/v2?
  type=public&app_id=IDDIDIDIDDI&app_key=KEEEEYYYYY

  &diet=balanced&diet=high-fiber&diet=high-protein
  &health=immuno-supportive&health=kidney-friendly
  &cuisineType=Asian&cuisineType=British&cuisineType=Caribbean&cuisineType=Nordic
  &mealType=Dinner&mealType=Snack&dishType=Biscuits%20and%20cookies
  &dishType=Bread&dishType=Cereals&dishType=Salad
  */
  if (searchTerm) {
    console.log(searchTerm);
    apiUrl += `term=${encodeURIComponent(searchTerm)}`;
    //getSelected();
  } else if (searchTerm == "") {
    console.log(apiUrl);
    getSelected();
      // apiUrl += `category=${category}&selections=${encodeURIComponent(
      //   selections
      // )}&`;
  }
function getSelected(){
  for(ctgry in selected_list){
    selected_list[`${ctgry}`].forEach( (li_item) => {
      //console.log(ctgry,li_item);
      console.log(`&${ctgry}=${encodeURIComponent(li_item)}`);
      apiUrl += `&${ctgry}=${encodeURIComponent(li_item)}`
      //apiUrl += `&category=${encodeURIComponent(ctgry)}&selections=${encodeURIComponent(li_item)}`;
    })
  }
}
  // if (ingredients) {
  //   apiUrl += `ingredients=${encodeURIComponent(ingredients)}&`;
  // } else if (category === "ingredients" && selections) {
  //   apiUrl += `ingredients=${encodeURIComponent(selections)}&`;
  // } else if (category && selections) {
  //   apiUrl += `category=${category}&selections=${encodeURIComponent(
  //     selections
  //   )}&`;
  // }
console.log(apiUrl);
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

//console.log(searchResultsContainer);
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
        //console.log(card);

        //Create a link for each recipe
        const link = document.createElement("a");
        link.classList.add("meal-name");
        // Construct the link using the recipe ID
        link.href = result.recipe.url;
        link.target = "_blank"; // Open link in a new tab
        link.textContent = result.recipe.label
        //console.log(link);

        // Cosntruct name Label
        const recipeName = document.createElement("h4");
        recipeName.classList.add("meal-name");
        recipeName.id = "meal-name";
        recipeName.appendChild(link);
        //console.log(recipeName);
  
        // Extract the recipe ID from the URI
       const recipeId = result.recipe.uri.split("_")[1];

        // Extract the Image
        const img = document.createElement("img")
        img.classList.add("image");
        img.src = result.recipe.image;
        img.alt = recipeName.textContent;
        
        //Extract Time
        // const t_time = document.createElement('span');
        // t_time.className = "cook-time";
        // t_time.textContent = results.recipe.totalTime;

        // Create a user actions
        const heart_star = document.createElement("div");
        heart_star.classList.add("user-acitons");
        heart_star.innerHTML = `<i class="fa-regular fa-heart"></i>
                               <i class="fa-regular fa-star"></i>`;
        
        // heart_star.appendChild(t_time);
        //Consturct card for display:
        card.appendChild(img);
        card.appendChild(recipeName);
        card.appendChild(heart_star);
        //console.log(card);
  
        //add to container
        searchResultsContainer.appendChild(card);
        
      });
      likes_faves();
    //   searchResultsContainer.appendChild(ul);
    }
}

  const user_ID = "User-ID";
  const liked_items = [];
  const fav_items = [];

function likes_faves(){
  const heart_icons = document.querySelectorAll(".fa-heart");
  const star_icons = document.querySelectorAll(".fa-star");
  console.log(heart_icons);
  console.log(star_icons);
  heart_icons.forEach(liked => {
    liked.onclick = (e) =>{
      liked.classList.contains('fa-regular') ? liked.classList.replace('fa-regular', 'fa-solid') : liked.classList.replace('fa-solid','fa-regular');
    }
  });
  star_icons.forEach(faved => {
    faved.onclick = (e) =>{
      faved.classList.contains('fa-regular') ? faved.classList.replace('fa-regular', 'fa-solid') : faved.classList.replace('fa-solid','fa-regular');
      // faved.classList.contains('fa-regular') && fav_items. ?
    }
  });
}
