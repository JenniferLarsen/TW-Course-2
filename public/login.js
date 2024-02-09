// Client side

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const signUpButtonRelocator = document.getElementById('signUpRelocator');
const signInButtonRelocator = document.getElementById('signInRelocator');
const container = document.getElementById('container');

// Attach the performLogin function to a button click event or form submission even

const form = document.querySelector("#fileinfo");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('userSignInEmail').value;
    const password = document.getElementById('userSignInPassword').value;
  

  const response = await fetch("/signup", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({name, email, password}),
  });
  
});

signInButtonRelocator.addEventListener('click', () => {
});

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

signUpButtonRelocator.addEventListener('click', () => {
});

// These should be at both ends - front end makes sure user entry is ok - back end makes sure info is correct and valid
// Function to validate the sign-up form
function validateSignUpForm() {
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('userSignInEmail');
    const passwordInput = document.getElementById('userSignInPassword');
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');

    try {
        // Check if the fields are not empty
        if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || passwordInput.value.trim() === '' || confirmPasswordInput.value.trim() === '') {
            alert('Please fill out all fields.');
            return false;
        }
    } catch (error) {
        console.log("Please fill out the 'name' field.")
    }

    // Check if the email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
        if (!emailRegex.test(emailInput.value)) {
            alert('Please enter a valid email address.');
            return false;
        }

    } catch (error) {
        console.log("Please fill out the 'email' field.")
    }

    try {

        // Check if the password meets certain criteria (e.g., minimum length)
        if (passwordInput.value.length < 6) {
            alert('Password must be at least 6 characters long.');
            return false;
        }
    } catch (error) {
        console.log("Please fill out the 'password' field.")
    }

    try {
        // Check if the passwords match
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert('Passwords do not match.');
            return false;
        }

        // If all checks pass, return true
        return true;

    } catch (error) {
        console.log("Please fill out the 'confirm password' field.")
    }
}