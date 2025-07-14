document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // --- Login Form Logic ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!email || !password) {
                alert('Please enter both email and password.');
                return;
            }

            // --- Simulate Login Success ---
            // In a real app, you'd send these credentials to a backend API
            // and receive a token or user data.
            if (email === 'test@example.com' && password === 'password123') {
                // Simulate storing user as logged in (e.g., in localStorage)
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                alert('Login successful! Redirecting to profile...');
                window.location.href = 'profile.html'; // Redirect to a profile page
            } else {
                alert('Invalid email or password.');
            }
        });
    }

    // --- Signup Form Logic ---
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            const password = document.getElementById('signupPassword').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();
            const userType = document.getElementById('userType').value;

            if (!fullName || !email || !password || !confirmPassword) {
                alert('Please fill in all fields.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }

            // Basic email format check
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // --- Simulate Signup Success ---
            // In a real app, you'd send this data to a backend API for user registration.
            alert(`Account created successfully for ${fullName} as a ${userType}! Please log in.`);
            // Redirect to login page after successful signup simulation
            window.location.href = 'login.html';
        });
    }

    // Helper function for email validation (can be shared or in main.js)
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // --- Profile Page Logic (Basic check if logged in) ---
    // If you want to show/hide profile content based on login status
    const profilePage = document.querySelector('.profile-page');
    if (profilePage) {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            // If not logged in, redirect to login page
            // alert('You must be logged in to view this page.');
            // window.location.href = 'login.html';
            // For demo, just show a message, real app would redirect.
            console.log('User not logged in. Profile content might be restricted in a real app.');
        } else {
            console.log('User is logged in:', localStorage.getItem('userEmail'));
            // You could dynamically update parts of profile.html here with user data
            // const userNameElement = document.getElementById('userName');
            // if (userNameElement) userNameElement.textContent = localStorage.getItem('userEmail');
        }
    }

    // --- Logout Functionality (add a logout button in your header/profile) ---
    const logoutButton = document.getElementById('logoutButton'); // Assume you add this ID to a logout link/button
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            alert('You have been logged out.');
            window.location.href = 'index.html'; // Redirect to homepage
        });
    }
});