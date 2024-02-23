document.addEventListener("DOMContentLoaded", async () => {
  // Fetch user data from the server
  const response = await fetch("/user-profile");
  const userData = await response.json();

  console.log(response);
  console.log("inside profile.js...");
  console.log(userData);
  // Update the welcome message with the user's name
  const userGreeting = document.querySelector(".welcome h1");
  if (userData && userData.username) {
    userGreeting.textContent = `Welcome Back, ${userData.username}!`;
  } else {
    // Handle the case when there's no user data (user not logged in)
    userGreeting.textContent = "Welcome Back!";
  }

  // Prep before displaying
  const container = document.getElementById("content-box");
  const tabs = document.querySelectorAll(".tabs h3");
  var selected_tab = document.getElementsByClassName("selected-tab");
  const liked_items = userData.liked;
  const fav_items = userData.faved;
  const likesHtml = document.getElementById("likes_section");
  const favesHtml = document.getElementById("faves_section");
  // console.log(container);
  // console.log(tabs);
  // console.log(selected_tab);
  // console.log(liked_items);
  // console.log(fav_items);

  /** place the following in a click event for the respective tabs (even the population of search) */

  // const faveHits = {
  //     length: 0,
  //     // obj.length is automatically incremented
  //     // every time an element is added.
  //     addElem(elem) {
  //         [].push.call(this, elem);
  //     },
  // };
  // const likeHits = {
  //     length: 0,

  //     addElem(elem) {
  //         [].push.call(this, elem);
  //     },
  // };
  // Get data hits from edamam and push to hits{}
  function performSearch(list, htmlElement) {
    htmlElement.innerHTML = "";
    let likesRow = document.createElement("div");
    htmlElement.innerHTML = "";
    let favesRow = document.createElement("div");
    for (let i = 0; i < list.length; i++) {
       if (list.length % 3 === 0) {
        likesRow = document.createElement("div");
        htmlElement.appendChild(likesRow);
        favesRow = document.createElement("div");
        htmlElement.appendChild(favesRow);
       }
      let buildURI = "/api/id-search?";
      // list.forEach(recipeID => {
      const recipeID = list[i];
      buildURI += `&id=${recipeID}`; //?type=public&app_id=idddddddd&app_key=keeeeeeeyyyyy
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
          const elem = document.createElement("div");
          

          //add an element for image
          const image = document.createElement("img");
          elem.appendChild(image);
          image.src = data.hit.recipe.image;

          // add an element for label
          const label = document.createElement("p");
          elem.appendChild(label);
          label.title = data.hit.recipe.label;
          label.textContent = data.hit.recipe.label;

          // add an element for url
          const url = document.createElement("a");
          elem.appendChild(url);
          const link = document.createTextNode("Click for Recipe");
          url.appendChild(link);
          url.title = "Recipe Link";
          url.href = data.hit.recipe.url;

          // add the items to the elem
          likesRow.appendChild(elem);

          //data.hit.recipe.label, url, images.THUMBNAIL
          //hitContain.addElem(data);
          // console.log(likeHits);
          //displayResults(data.hits);
        })
        .catch((error) => console.error("Error:", error));
    } //**end for loop
  }
  performSearch(liked_items, likesHtml);
  performSearch(fav_items, favesHtml);
  // console.log(likeHits);
  // console.log(faveHits);
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
