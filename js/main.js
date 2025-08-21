document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle (if you implement a hamburger menu later) ---
    // Example: If you add a button with class 'menu-toggle' and a nav with class 'mobile-nav'
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul'); // Adjust if your nav structure changes

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active'); // 'active' class would show/hide the nav
        });
    }

    // --- Search Bar Functionality ---
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
            performSearch();
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // For a frontend-only demo, we'll redirect to services.html with a query parameter
            window.location.href = `services.html?search=${encodeURIComponent(query)}`;
        } else {
            alert('Please enter a search query.');
        }
    }

    // --- Back to Top Button (optional) ---
    // You'd add a button in your HTML, e.g., <button id="scrollToTopBtn" class="scroll-to-top-btn">↑</button>
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) { // Show button after scrolling down 200px
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Basic Contact Form (Client-Side Validation Only) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate submission
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset(); // Clear the form
        });
    }

    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

});