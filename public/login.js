const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const signUpButtonRelocator = document.getElementById('signUpRelocator');
const signInButtonRelocator = document.getElementById('signInRelocator');
const nameInput = document.getElementById('nameInput');
const userSignInEmail = document.getElementById('userSignInEmail');
const userSignInPassword = document.getElementById('userSignInPassword');
const container = document.getElementById('container');

async function connectToMongoDB() {
    try {
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      console.log('Connected to MongoDB Atlas');
      return client;
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error; // Propagate the error to handle it appropriately
    }
  }


function performLogin() {
    const username = userSignInEmail.value;
    const password = userSignInPassword.value;
    
    console.log("(CLIENT SIDE) Username:", username);
    console.log("(CLIENT SIDE) Password:", password);

    // Construct the API URL
    let dbUrl = "http://localhost:8080/login?";
    dbUrl += `username=${encodeURIComponent(username)}&`;
    dbUrl += `password=${encodeURIComponent(password)}`;

    // Make the API request
    fetch(dbUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data); // Handle the response data as needed
        })
        .catch((error) => console.error("Error:", error));
}

async function saveData(nameInput, userSignInEmail, userSignInPassword) {
    try {
      const client = await connectToMongoDB();
  
      const db = client.db('ImPastas');
      const collection = db.collection('UserInfo');
  
      const dataToSave = [
        {
          username: nameInput,
          password: userSignInPassword,
          email: userSignInEmail,
        }
      ];
  
      const result = await collection.insertMany(dataToSave);
      console.log(`${result.insertedCount} documents inserted`);
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      // Close the MongoDB connection if it was established
      if (client) {
        await client.close();
      }
    }
  }

// Attach the performLogin function to a button click event or form submission event

signInButtonRelocator.addEventListener('click', () => {
    performLogin();
});

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

signUpButtonRelocator.addEventListener('click', () => {
    // Validate the form before allowing the user to move forward
    if (validateSignUpForm()) {
        const name = nameInput.value;
        const email = userSignInEmail.value;
        const password = userSignInPassword.value;

        saveData(name, email, password);
    }
});

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

async function saveData(nameInput, userSignInEmail, userSignInPassword) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const db = client.db('ImPastas');
        const collection = db.collection('UserInfo');

        const dataToSave = [
            {
                username: nameInput,
                password: userSignInPassword,
                email: userSignInEmail,
            }
        ];

        const result = await collection.insertMany(dataToSave);
        console.log(`${result.insertedCount} documents inserted`);
    } catch (error) {
        console.error('Error saving data:', error);
    } finally {
        await client.close();
    }
}

