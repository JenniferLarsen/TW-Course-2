document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('signupForm');

        // Get form inputs
        var username = document.getElementById('username').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPassword').value;

        // Log the user inputs
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);

        // Additional logic (e.g., send data to the server using AJAX)
    });
