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
        optionElement.innerText = newOption;
        console.log(optionElement);
        drpDwn_b_list.appendChild(optionElement);
    });
    refinedCategory(drpDwn_b_list);
}
function refinedCategory(list) {
    // console.log(list);
    const b_list_values = list.querySelectorAll("li")
    console.log(b_list_values);
    for(ctgry of b_list_values){
        ctgry.onclick = (e) => {
            console.log("clicked" + ctgry.innerText);
            // selected_list.appendChild(ctgry);
            selected_list.push(ctgry.innerHTML);
            console.log(selected_list);
        }
        // let val = ctgry.getAttributeNode("value");
        // ctgry.onclick = (e) => {
        //     // callback()
        //     setRefined(val.nodeValue);
        // };
    }
}
selectedCategory();



window.onclick = function (e) {
    if (e.target.id !== "dropdown" && e.target.classNames !== "dropdown-list-container" && e.target.id !== "b-list" && e.target.id !== "arrow"){
        drpDwn_a_list.classList.remove("show");
        arrow_icon.style.rotate = "0deg";
    }
}

/* FILTER WIDGET RESPONSIVENESS
 - create click event for selected items
 - add clicked to list (once)
 - for each in list, add create filer section li to display

*/ 
const filters_container = document.getElementById("filters-section");
// const x_btn = document.getElementById();
const selected_group_area = document.getElementsByClassName("selected-filters");
const selected_list = [];

console.log(selected_group_area);
console.log(selected_list);

/** save for later !!!!
 * document.querySelectorAll(".filtered-item").forEach((item) => (
        b_list_values.append(item.innerText)
    ));
 */



/* SEARCH BAR FUNCTIONALITY */
const searchInput = document.getElementById("search-box");
const searchResultsContainer = document.getElementById("search-results");
const search_btn = document.getElementById("search-icon");