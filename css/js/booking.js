document.addEventListener('DOMContentLoaded', () => {
    // --- Booking Initiation (from profile.html) ---
    const bookNowButtons = document.querySelectorAll('.book-now-btn');

    if (bookNowButtons.length > 0) {
        bookNowButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const serviceId = e.target.dataset.serviceId; // Get the data-service-id from the button
                const providerName = document.querySelector('.profile-info h1').textContent;
                const servicePackageName = e.target.closest('.service-package-card').querySelector('h3').textContent;
                const servicePrice = e.target.closest('.service-package-card').querySelector('.price').textContent;

                // Simulate booking data storage in sessionStorage for the next page
                sessionStorage.setItem('bookingDetails', JSON.stringify({
                    providerId: serviceId.split('-')[0], // Extract provider ID from serviceId
                    providerName: providerName,
                    servicePackage: servicePackageName,
                    price: servicePrice,
                    date: 'July 20, 2025', // Dummy date
                    time: '10:00 AM - 2:00 PM', // Dummy time
                    status: 'Pending Confirmation'
                }));

                alert(`Booking for "${servicePackageName}" from ${providerName} initiated!`);
                window.location.href = 'booking-details.html'; // Redirect to booking details page
            });
        });
    }

    // --- Booking Details Display (on booking-details.html) ---
    const bookingDetailsPage = document.querySelector('.booking-details-page');

    if (bookingDetailsPage) {
        const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'));

        if (bookingDetails) {
            document.getElementById('providerName').textContent = bookingDetails.providerName;
            document.getElementById('servicePackage').textContent = bookingDetails.servicePackage;
            document.getElementById('bookingDate').textContent = bookingDetails.date;
            document.getElementById('bookingTime').textContent = bookingDetails.time;
            document.getElementById('totalPrice').textContent = bookingDetails.price;
            const bookingStatusElement = document.getElementById('bookingStatus');
            bookingStatusElement.textContent = bookingDetails.status;

            if (bookingDetails.status === 'Pending Confirmation') {
                bookingStatusElement.classList.add('status-pending');
            } else if (bookingDetails.status === 'Confirmed') {
                bookingStatusElement.classList.add('status-confirmed');
            }
            // Add more status classes as needed
        } else {
            // If no booking details found (e.g., user directly navigated to page)
            bookingDetailsPage.innerHTML = `
                <div class="container" style="text-align: center; padding: 50px;">
                    <h1>No Booking Details Found</h1>
                    <p>It looks like you haven't made a booking yet or the details have expired.</p>
                    <a href="services.html" class="btn btn-primary">Browse Services</a>
                    <a href="index.html" class="btn btn-secondary">Return to Homepage</a>
                </div>
            `;
        }
    }
});