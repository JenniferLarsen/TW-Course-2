
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch user data from the server
    const response = await fetch('/user-profile');
    const userData = await response.json();

    console.log(response);
    console.log(userData);
    // Update the welcome message with the user's name
    const userGreeting = document.querySelector('.welcome h1');
    if (userData && userData.name) {
      userGreeting.textContent = `Welcome Back, ${userData.name}!`;
    } else {
      // Handle the case when there's no user data (user not logged in)
      userGreeting.textContent = 'Welcome Back!';
    }

    // Populate Liked and Favorited Sections

    // const modules = require("./justConnect");
    // const liked_faves = modules.getInfo(userData);
    const container = document.getElementById("content-box");
    const tabs = document.querySelectorAll(".tabs h3");
    var selected_tab = document.getElementsByClassName("selected-tab");
    //var liked_list = db.collections.findOne({userData},{liked});
    var liked_list = ["23ae65b3c93f2b0f4b7cf100c3ab4061","26bd15da5af05266e804de66e7df4b0a"];
    var fav_list = ["28d4406ba9b491d9f456ec18bff2cee1", "3a551652abf5a1cef1421660d1b657d9",
                    "3a5b513c747685ef037f332813342c15"];
    console.log(container);
    console.log(tabs);
    console.log(selected_tab);
    //console.log(liked_faves);
    const fullURI = "https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=" ;

    // get Data hits from edamam
    function buildUri(list) {
        for (recipeID in list){
            fullURI += `http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${recipeID},`;
        }
    }
    console.log(fullURI);

    fetch(fullURI, {
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
          //displayResults(data.hits);
        })
        .catch((error) => console.error("Error:", error));

  });

/** single uri element */
  //https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_
  //{the recipe URI ID}&app_id=IDDDDD&app_key=KEEEEEY

/** multiple uri element [seperated by ',' until the last one] */
  //https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_{RECIPE URI},
  //http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_{RECIPE URI},
  //http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_{RECIPE URI}
  //&app_id=iddddddd&app_key=kkkkkeeeeyyyyyy