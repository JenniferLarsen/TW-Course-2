const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const signUpButtonRelocator = document.getElementById('signUpRelocator');
const signInButtonRelocator = document.getElementById('signInRelocator');
const container = document.getElementById('container');
const databaseButton = document.getElementById('databaseCheck');

async function fetchExampleData() {
	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response.json();
		console.log(data); // Log the fetched data
	} catch (error) {
		console.error('There was a problem with the fetch operation:', error);
	}
}

databaseButton.addEventListener('click', () => {
	fetchExampleData();
});

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

signUpButtonRelocator.addEventListener('click', () => {
	// Validate the form before allowing the user to move forward
	// window.location.href = 'user-profile.html';
	if (validateSignUpForm()) {
		const formData = extractFormData(document.getElementById('signUpForm'));
		console.log('Form Data:', formData);
	}
});

// Function to validate the sign-up form
function validateSignUpForm() {
	const nameInput = document.getElementById('nameInput');
	const emailInput = document.getElementById('emailInput');
	const passwordInput = document.getElementById('passwordInput');
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