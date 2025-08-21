document.addEventListener('DOMContentLoaded', () => {
    // --- Simulated Service Provider Data ---
    const serviceProviders = [
        {
            id: 'photographer-elite',
            name: 'Elite Photography Services',
            category: 'photographer',
            location: 'Bhopal',
            rating: 4.8,
            price: 15000,
            description: 'Capturing your special moments across Mungaoli with a keen eye for detail and emotion.',
            imageUrl: 'assets/images/photography.jpg',
            portfolio: ['assets/images/portfolio-1.jpg', 'assets/images/portfolio-2.jpg']
        },
        {
            id: 'caterer-tastebuds',
            name: 'Taste Buds Catering',
            category: 'caterer',
            location: 'Bhopal',
            rating: 4.5,
            price: 1200, // Per plate example
            description: 'Delicious and diverse culinary experiences for all events, big or small. From traditional Indian to continental dishes.',
            imageUrl: 'assets/images/caterers.jpg',
            portfolio: ['assets/images/caterers.jpg', 'assets/images/catering-2.jpg']
        },
        {
            id: 'decorator-elegance',
            name: 'Event Elegance Decorators',
            category: 'decorator',
            location: 'Bhopal',
            rating: 4.9,
            price: 20000,
            description: 'Transforming venues into magical and memorable spaces tailored to your vision and theme.',
            imageUrl: 'assets/images/decorators.jpg',
            portfolio: ['assets/images/decor-1.jpg', 'assets/images/decor-2.jpg']
        },
        {
            id: 'photographer-moments',
            name: 'Eternal Moments Photography',
            category: 'photographer',
            location: 'Bhopal',
            rating: 4.7,
            price: 12000,
            description: 'Specializing in candid and artistic photography for weddings and private events.',
            imageUrl: 'assets/images/photography.jpg',
            portfolio: ['assets/images/portfolio-5.jpg', 'assets/images/portfolio-6.jpg']
        },
        {
            id: 'caterer-flavors',
            name: 'Local Flavors Catering',
            category: 'caterer',
            location: 'Bhopal',
            rating: 4.3,
            price: 900,
            description: 'Authentic local cuisine with a modern twist, perfect for traditional gatherings.',
            imageUrl: 'assets/images/caterers.jpg',
            portfolio: ['assets/images/catering-3.jpg', 'assets/images/catering-4.jpg']
        },
        {
            id: 'decorator-dreams',
            name: 'Dreamscape Decorators',
            category: 'decorator',
            location: 'Bhopal',
            rating: 4.6,
            price: 18000,
            description: 'Creative and innovative decor solutions for birthdays, anniversaries, and corporate functions.',
            imageUrl: 'assets/images/decorators.jpg',
            portfolio: ['assets/images/decor-3.jpg', 'assets/images/decor-4.jpg']
        }
    ];

    const servicesGrid = document.getElementById('servicesGrid');
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    const locationInput = document.querySelector('.filters-sidebar input[type="text"]');
    const priceRangeInput = document.querySelector('.filters-sidebar input[type="range"]');
    const priceRangeSpan = document.querySelector('.filters-sidebar .filter-group span');
    const ratingRadios = document.querySelectorAll('input[name="rating"]');
    const applyFiltersBtn = document.querySelector('.apply-filters');

    // --- Function to Render Service Cards ---
    function renderServices(providersToRender) {
        if (!servicesGrid) return; // Exit if servicesGrid element doesn't exist (e.g., on other pages)

        servicesGrid.innerHTML = ''; // Clear existing cards

        if (providersToRender.length === 0) {
            servicesGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 20px;">No services found matching your criteria.</p>';
            return;
        }

        providersToRender.forEach(provider => {
            const serviceCard = document.createElement('div');
            serviceCard.classList.add('service-card');
            serviceCard.innerHTML = `
                <img src="${provider.imageUrl || 'assets/images/placeholder.jpg'}" alt="${provider.name}">
                <h3>${provider.name}</h3>
                <p>${provider.description.substring(0, 80)}...</p>
                <div class="service-meta">
                    <span>⭐ ${provider.rating.toFixed(1)}</span>
                    <span>Starts from ₹${provider.price.toLocaleString('en-IN')}</span>
                </div>
                <a href="profile.html?providerId=${provider.id}" class="btn btn-small">View Details</a>
            `;
            servicesGrid.appendChild(serviceCard);
        });
    }

    // --- Function to Apply Filters ---
    function applyFilters() {
        let filteredProviders = [...serviceProviders]; // Start with all providers

        // 1. Filter by Category
        const selectedCategories = Array.from(categoryCheckboxes)
                                       .filter(checkbox => checkbox.checked)
                                       .map(checkbox => checkbox.value);

        if (selectedCategories.length > 0) {
            filteredProviders = filteredProviders.filter(provider =>
                selectedCategories.includes(provider.category)
            );
        }

        // 2. Filter by Location (simple text match for now)
        const locationQuery = locationInput.value.trim().toLowerCase();
        if (locationQuery) {
            filteredProviders = filteredProviders.filter(provider =>
                provider.location.toLowerCase().includes(locationQuery)
            );
        }

        // 3. Filter by Price Range
        const maxPrice = parseInt(priceRangeInput.value);
        if (maxPrice < 100000) { // Only filter if not at max (implies "any price")
             filteredProviders = filteredProviders.filter(provider =>
                provider.price <= maxPrice
            );
        }


        // 4. Filter by Rating
        const selectedRating = Array.from(ratingRadios).find(radio => radio.checked);
        if (selectedRating) {
            const minRating = parseFloat(selectedRating.value);
            filteredProviders = filteredProviders.filter(provider =>
                provider.rating >= minRating
            );
        }

        renderServices(filteredProviders); // Render the filtered results
    }

    // --- Event Listeners for Filters ---
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);

        // Optional: Apply filters on checkbox/radio change directly
        categoryCheckboxes.forEach(checkbox => checkbox.addEventListener('change', applyFilters));
        ratingRadios.forEach(radio => radio.addEventListener('change', applyFilters));

        // Update price range display
        priceRangeInput.addEventListener('input', () => {
            const value = parseInt(priceRangeInput.value);
            priceRangeSpan.textContent = `₹0 - ₹${value.toLocaleString('en-IN')}${value === 100000 ? '+' : ''}`;
            applyFilters(); // Apply filter as range changes
        });
    }


    // --- Initial Load or Filter from URL Parameters ---
    // Check if there's a category or search query in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const urlCategory = urlParams.get('category');
    const urlSearchQuery = urlParams.get('search');

    if (urlCategory) {
        const checkbox = document.querySelector(`input[name="category"][value="${urlCategory}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
        applyFilters(); // Apply filters based on URL category
    } else if (urlSearchQuery) {
        locationInput.value = urlSearchQuery; // Pre-fill search input
        applyFilters(); // Apply filters based on URL search query
    } else {
        renderServices(serviceProviders); // Render all services on initial load if no URL filters
    }

    // --- Profile Page Dynamic Content (for profile.html) ---
    // This part should technically be in its own file or conditionally loaded
    // but for simplicity, we'll put it here.
    const profilePage = document.querySelector('.profile-page');
    if (profilePage) {
        const providerId = urlParams.get('providerId');
        const currentProvider = serviceProviders.find(p => p.id === providerId);

        if (currentProvider) {
            document.querySelector('.profile-pic').src = currentProvider.imageUrl || 'assets/images/placeholder.jpg';
            document.querySelector('.profile-info h1').textContent = currentProvider.name;
            document.querySelector('.profile-info .specialization').textContent = currentProvider.category.charAt(0).toUpperCase() + currentProvider.category.slice(1) + ' Specialist';
            document.querySelector('.profile-info .location').textContent = currentProvider.location + ', Madhya Pradesh';
            document.querySelector('.profile-info .rating span').textContent = `⭐ ${currentProvider.rating.toFixed(1)} (Simulated Reviews)`;
            document.querySelector('.about-section p').textContent = currentProvider.description + " They are committed to providing excellent service and exceeding client expectations.";

            // Populate portfolio
            const portfolioGrid = document.querySelector('.portfolio-grid');
            if (portfolioGrid) {
                portfolioGrid.innerHTML = '';
                if (currentProvider.portfolio && currentProvider.portfolio.length > 0) {
                    currentProvider.portfolio.forEach(imgSrc => {
                        const img = document.createElement('img');
                        img.src = imgSrc;
                        img.alt = 'Portfolio Image';
                        portfolioGrid.appendChild(img);
                    });
                } else {
                    portfolioGrid.innerHTML = '<p>No portfolio images available yet.</p>';
                }
            }

            // Populate services offered (dummy packages)
            const servicesOfferedSection = document.querySelector('.services-offered-section');
            if (servicesOfferedSection) {
                 servicesOfferedSection.querySelector('h2').textContent = `Services Offered by ${currentProvider.name}`;
                 servicesOfferedSection.innerHTML += `
                    <div class="service-package-card">
                        <h3>Standard Package</h3>
                        <p>Basic service covering 4 hours of event time.</p>
                        <p class="price">₹${currentProvider.price.toLocaleString('en-IN')}</p>
                        <button class="btn btn-primary book-now-btn" data-service-id="${currentProvider.id}-standard">Book Now</button>
                    </div>
                    <div class="service-package-card">
                        <h3>Premium Package</h3>
                        <p>Extended service for 8 hours with additional features.</p>
                        <p class="price">₹${(currentProvider.price * 1.8).toLocaleString('en-IN')}</p>
                        <button class="btn btn-primary book-now-btn" data-service-id="${currentProvider.id}-premium">Book Now</button>
                    </div>
                 `;
            }

            // Dummy Reviews
            const reviewsSection = document.querySelector('.reviews-section');
            if(reviewsSection) {
                reviewsSection.innerHTML = `<h2>Customer Reviews for ${currentProvider.name}</h2>`;
                const dummyReviews = [
                    { name: 'Ritesh Kumar', rating: 5, comment: 'Absolutely fantastic! Exceeded all our expectations.' },
                    { name: 'Sonam Gupta', rating: 4, comment: 'Great service, very professional and friendly.' },
                    { name: 'Vijay Sharma', rating: 5, comment: 'Highly recommended for any event. Superb quality.' }
                ];

                dummyReviews.forEach(review => {
                    reviewsSection.innerHTML += `
                        <div class="review-card">
                            <div class="review-header">
                                <h4>${review.name}</h4>
                                <span>${'⭐ '.repeat(review.rating)}</span>
                            </div>
                            <p>${review.comment}</p>
                        </div>
                    `;
                });
            }


        } else {
            console.log('Provider not found for ID:', providerId);
            // Optionally redirect or show a 'not found' message
            profilePage.innerHTML = '<p style="text-align: center; padding: 50px;">Service provider not found.</p>';
        }
    }
});