
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

    // Fill "Like tab"
    

  });
  
const callLiked = () =>{
      console.log(liked);
  }