
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch user data from the server
    const response = await fetch('/user-profile');
    const userData = await response.json();

    console.log(response);
    console.log("inside profile.js...")
    console.log(userData);
    // Update the welcome message with the user's name
    const userGreeting = document.querySelector('.welcome h1');
    if (userData && userData.username) {
      userGreeting.textContent = `Welcome Back, ${userData.username}!`;
    } else {
      // Handle the case when there's no user data (user not logged in)
      userGreeting.textContent = 'Welcome Back!';
    }

    //prep for displaying
    const container = document.getElementById("content-box");
    const tabs = document.querySelectorAll(".tabs h3");
    var selected_tab = document.getElementsByClassName("selected-tab");
    const liked_items = userData.liked;
    const fav_items = userData.faved;
    var myHits = {};
    console.log(container);
    console.log(tabs);
    console.log(selected_tab);
    console.log(liked_items);
    console.log(fav_items);
    // let fullURI = "https://api.edamam.com/api/recipes/v2/?type=public&uri=" ;
    let buildURI = '/api/id-search?' ;
    
/** place the following in a click event for the respective tabs (even the population of search) */

    // get Data hits from edamam and push to hits{}
    const recipeID = liked_items[0];;
    //for (recipeID in list){;
        buildURI +=  `&id=${recipeID}`; //&app_id=idddddddd&app_key=keeeeeeeyyyyy
        // buildURI += fullURI;
        console.log(recipeID);
        console.log(buildURI);
        fetch(buildURI, {
            method: "GET",
        })
            .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
            })
            .then((data) => {
            console.log(data);
            //myHits.push(data);
            //displayResults(data.hits);
            })
            .catch((error) => console.error("Error:", error));

    //} **end for loop
  });



  /** search by ID */
//   "https://api.edamam.com/api/recipes/v2/{ b3b1e3e63bff8c8ac0192cdc04a992ee }?type=public&app_id=idddddddd&app_key=keeeeeeeyyyyy",

/** single uri element */
  //https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_
  //{the recipe URI ID}&app_id=IDDDDD&app_key=KEEEEEY

/** multiple uri element [seperated by ',' until the last one] */
  //https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_{RECIPE URI},
  //http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_{RECIPE URI},
  //http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_{RECIPE URI}
  //&app_id=iddddddd&app_key=kkkkkeeeeyyyyyy