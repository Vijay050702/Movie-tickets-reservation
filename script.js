document.addEventListener('DOMContentLoaded', function() {
    // Movie data
    const movies = [
        {
            id: 1,
            title: "RRR",
            genre: "Action, Adventure",
            duration: "2h 15m",
            rating: 4.5,
            description: "A fearless warrior on a perilous mission comes face to face with a steely cop serving British forces in this epic saga set in pre-independent India.",
            poster: "https://i.pinimg.com/originals/88/4a/65/884a65106771b9f34e050a9f45e0c149.jpg",
            price: 12.99
        },
        {
            id: 2,
            title: "Tourist Family",
            genre: "drama,comedy",
            duration: "1h 48m",
            rating: 4.2,
            description: "A quirky Sri Lankan family seeking a fresh start in India transforms a disconnected neighborhood into a vibrant community with their infectious love and kindness..",
            poster: "https://static.moviecrow.com/movies/5234-tourist-family/244121-244118-tourist-px214.jpeg",
            price: 10.99
        },
        {
            id: 3,
            title: "Ae Dil hai mushkil",
            genre: "Friendship,love,drama",
            duration: "2h 32m",
            rating: 4.8,
            description: "A passionate singer falls deeply in love with Alizeh, who only sees him as a friend. When she marries another man, he finds solace with Saba, but his heart remains torn between both women.",
            poster: "http://www.india.com/wp-content/uploads/2016/08/ae-3.jpg",
            price: 14.99
        },
        {
            id: 4,
            title: "The Last Exorcism",
            genre: "Horror,Thriller",
            duration: "1h 35m",
            rating: 3.9,
            description: "A troubled evangelical minister agrees to let his last exorcism be filmed by a documentary crew.",
            poster: "http://1.bp.blogspot.com/_SVwYjHcuz1M/TGUpdQvkxmI/AAAAAAAAACs/4Roslijy_ho/s1600/Last+Exorcism.jpg",
            price: 9.99
        }
    ];

    // Theater data
    const theaters = [
        { id: 1, name: "Downtown Cinema", location: "123 Main Street" },
        { id: 2, name: "Mall Multiplex", location: "456 Shopping Ave" },
        { id: 3, name: "Riverside Theater", location: "789 River Road" }
    ];

    // Showtimes data
    const showtimes = {
        1: ["10:00 AM", "1:30 PM", "4:45 PM", "8:00 PM", "11:15 PM"],
        2: ["9:30 AM", "12:45 PM", "4:00 PM", "7:15 PM", "10:30 PM"],
        3: ["11:00 AM", "2:15 PM", "5:30 PM", "8:45 PM"],
        4: ["10:15 AM", "1:00 PM", "3:45 PM", "6:30 PM", "9:15 PM"]
    };

    // Seats data (simulating some occupied seats)
    const occupiedSeats = {
        "1-2023-07-15-10:00 AM": ["A3", "B5", "C1", "D7"],
        "2-2023-07-15-1:30 PM": ["A1", "A2", "B3", "E5"],
        "3-2023-07-15-4:45 PM": ["C4", "D2", "E1", "E2"],
        "4-2023-07-15-8:00 PM": ["A5", "B2", "C3", "D4"]
    };

    // DOM Elements
    const movieContainer = document.getElementById('movie-container');
    const movieSelect = document.getElementById('movie-select');
    const theaterSelect = document.getElementById('theater-select');
    const dateSelect = document.getElementById('date-select');
    const timeSelect = document.getElementById('time-select');
    const checkSeatsBtn = document.getElementById('check-seats-btn');
    const seatSelectionSection = document.getElementById('seat-selection');
    const seatsContainer = document.getElementById('seats-container');
    const summaryMovie = document.getElementById('summary-movie');
    const summaryTheater = document.getElementById('summary-theater');
    const summaryDate = document.getElementById('summary-date');
    const summaryTime = document.getElementById('summary-time');
    const summarySeats = document.getElementById('summary-seats');
    const summaryPrice = document.getElementById('summary-price');
    const confirmBookingBtn = document.getElementById('confirm-booking-btn');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const bookingModal = document.getElementById('booking-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const confirmedMovie = document.getElementById('confirmed-movie');
    const confirmedTheater = document.getElementById('confirmed-theater');
    const confirmedDatetime = document.getElementById('confirmed-datetime');
    const confirmedSeats = document.getElementById('confirmed-seats');
    const confirmedTotal = document.getElementById('confirmed-total');
    const printTicketBtn = document.getElementById('print-ticket-btn');
    const closeBookingBtn = document.getElementById('close-booking-btn');
    const bookNowBtn = document.getElementById('book-now-btn');

    // Current booking state
    let currentBooking = {
        movie: null,
        theater: null,
        date: null,
        time: null,
        seats: [],
        price: 0
    };

    // Initialize the page
    function init() {
        loadMovies();
        loadTheaters();
        setupDatePicker();
        setupEventListeners();
    }

    // Load movies into the now showing section and dropdown
    function loadMovies() {
        // Clear existing content
        movieContainer.innerHTML = '';
        movieSelect.innerHTML = '<option value="">-- Choose a movie --</option>';

        // Add movies to the now showing section
        movies.forEach(movie => {
            // Create movie card
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <div class="movie-poster">
                    <img src="${movie.poster}" alt="${movie.title}">
                </div>
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-meta">
                        <span>${movie.genre}</span>
                        <span class="movie-rating">${movie.rating} <i class="fas fa-star"></i></span>
                    </div>
                    <p class="movie-duration">${movie.duration}</p>
                    <p class="movie-description">${movie.description}</p>
                    <button class="movie-book-btn" data-id="${movie.id}">Book Now</button>
                </div>
            `;
            movieContainer.appendChild(movieCard);

            // Add movie to dropdown
            const option = document.createElement('option');
            option.value = movie.id;
            option.textContent = movie.title;
            movieSelect.appendChild(option);
        });

        // Add event listeners to book now buttons
        document.querySelectorAll('.movie-book-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const movieId = parseInt(this.getAttribute('data-id'));
                const movie = movies.find(m => m.id === movieId);
                if (movie) {
                    movieSelect.value = movieId;
                    updateTheaters();
                    scrollToBookingForm();
                }
            });
        });
    }

    // Load theaters into dropdown
    function loadTheaters() {
        theaterSelect.innerHTML = '<option value="">-- Choose a theater --</option>';
        theaters.forEach(theater => {
            const option = document.createElement('option');
            option.value = theater.id;
            option.textContent = `${theater.name} - ${theater.location}`;
            theaterSelect.appendChild(option);
        });
    }

    // Setup date picker with valid dates (today + next 7 days)
    function setupDatePicker() {
        const today = new Date();
        dateSelect.min = formatDate(today);
        
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        dateSelect.max = formatDate(nextWeek);
        
        dateSelect.value = formatDate(today);
    }

    // Format date as YYYY-MM-DD for input[type="date"]
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Update available theaters based on selected movie
    function updateTheaters() {
        // In a real app, this would filter theaters showing the selected movie
        // For demo, we'll just enable the theater dropdown
        theaterSelect.disabled = !movieSelect.value;
    }

    // Update available times based on selected movie and theater
    function updateTimes() {
        timeSelect.innerHTML = '<option value="">-- Choose a time --</option>';
        
        if (movieSelect.value && theaterSelect.value) {
            const movieId = parseInt(movieSelect.value);
            const times = showtimes[movieId] || [];
            
            times.forEach(time => {
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                timeSelect.appendChild(option);
            });
            
            timeSelect.disabled = false;
        } else {
            timeSelect.disabled = true;
        }
    }

    // Scroll to booking form smoothly
    function scrollToBookingForm() {
        document.querySelector('.booking-section').scrollIntoView({
            behavior: 'smooth'
        });
    }

    // Generate seats layout
    function generateSeats() {
        seatsContainer.innerHTML = '';
        
        // Create seat legend
        const legend = document.createElement('div');
        legend.className = 'seat-legend';
        legend.innerHTML = `
            <div class="legend-item">
                <div class="legend-color available"></div>
                <span>Available</span>
            </div>
            <div class="legend-item">
                <div class="legend-color selected"></div>
                <span>Selected</span>
            </div>
            <div class="legend-item">
                <div class="legend-color occupied"></div>
                <span>Occupied</span>
            </div>
        `;
        seatsContainer.appendChild(legend);
        
        // Generate rows (A-J) with seats (1-10)
        const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        
        rows.forEach(row => {
            const seatRow = document.createElement('div');
            seatRow.className = 'seat-row';
            
            for (let i = 1; i <= 10; i++) {
                const seat = document.createElement('div');
                seat.className = 'seat';
                seat.setAttribute('data-seat', `${row}${i}`);
                
                // Check if seat is occupied
                const seatKey = `${movieSelect.value}-${dateSelect.value}-${timeSelect.value}`;
                if (occupiedSeats[seatKey] && occupiedSeats[seatKey].includes(`${row}${i}`)) {
                    seat.classList.add('occupied');
                }
                
                seat.addEventListener('click', function() {
                    if (!this.classList.contains('occupied')) {
                        this.classList.toggle('selected');
                        updateSelectedSeats();
                    }
                });
                
                seatRow.appendChild(seat);
            }
            
            seatsContainer.appendChild(seatRow);
        });
        
        // Show seat selection section
        seatSelectionSection.style.display = 'block';
        
        // Update booking summary
        updateBookingSummary();
    }

    // Update selected seats list and total price
    function updateSelectedSeats() {
        const selectedSeats = Array.from(document.querySelectorAll('.seat.selected'))
            .map(seat => seat.getAttribute('data-seat'));
        
        currentBooking.seats = selectedSeats;
        
        const movie = movies.find(m => m.id === parseInt(movieSelect.value));
        currentBooking.price = selectedSeats.length * (movie ? movie.price : 0);
        
        updateBookingSummary();
    }

    // Update booking summary section
    function updateBookingSummary() {
        const movie = movies.find(m => m.id === parseInt(movieSelect.value));
        const theater = theaters.find(t => t.id === parseInt(theaterSelect.value));
        
        summaryMovie.textContent = movie ? movie.title : '-';
        summaryTheater.textContent = theater ? `${theater.name} - ${theater.location}` : '-';
        summaryDate.textContent = dateSelect.value ? new Date(dateSelect.value).toDateString() : '-';
        summaryTime.textContent = timeSelect.value || '-';
        summarySeats.textContent = currentBooking.seats.join(', ') || '-';
        summaryPrice.textContent = `$${currentBooking.price.toFixed(2)}`;
    }

    // Confirm booking
    function confirmBooking() {
        if (currentBooking.seats.length === 0) {
            alert('Please select at least one seat.');
            return;
        }
        
        // In a real app, this would send data to the server
        // For demo, we'll just show the confirmation modal
        
        // Update confirmation modal
        confirmedMovie.textContent = summaryMovie.textContent;
        confirmedTheater.textContent = summaryTheater.textContent;
        confirmedDatetime.textContent = `${summaryDate.textContent} at ${summaryTime.textContent}`;
        confirmedSeats.textContent = summarySeats.textContent;
        confirmedTotal.textContent = summaryPrice.textContent;
        
        // Generate random booking ID
        document.getElementById('booking-id').textContent = `CB${Math.floor(100000 + Math.random() * 900000)}`;
        
        // Show modal
        bookingModal.style.display = 'block';
    }

    // Setup event listeners
    function setupEventListeners() {
        // Movie selection
        movieSelect.addEventListener('change', updateTheaters);
        
        // Theater selection
        theaterSelect.addEventListener('change', updateTimes);
        
        // Check seats button
        checkSeatsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (!movieSelect.value) {
                alert('Please select a movie.');
                return;
            }
            
            if (!theaterSelect.value) {
                alert('Please select a theater.');
                return;
            }
            
            if (!dateSelect.value) {
                alert('Please select a date.');
                return;
            }
            
            if (!timeSelect.value) {
                alert('Please select a time.');
                return;
            }
            
            // Update current booking
            currentBooking = {
                movie: parseInt(movieSelect.value),
                theater: parseInt(theaterSelect.value),
                date: dateSelect.value,
                time: timeSelect.value,
                seats: [],
                price: 0
            };
            
            generateSeats();
            seatSelectionSection.scrollIntoView({ behavior: 'smooth' });
        });
        
        // Confirm booking button
        confirmBookingBtn.addEventListener('click', confirmBooking);
        
        // Modal controls
        loginBtn.addEventListener('click', function() {
            loginModal.style.display = 'block';
        });
        
        signupBtn.addEventListener('click', function() {
            signupModal.style.display = 'block';
        });
        
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                loginModal.style.display = 'none';
                signupModal.style.display = 'none';
                bookingModal.style.display = 'none';
            });
        });
        
        switchToSignup.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'none';
            signupModal.style.display = 'block';
        });
        
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            signupModal.style.display = 'none';
            loginModal.style.display = 'block';
        });
        
        // Close modals when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
            }
            if (e.target === signupModal) {
                signupModal.style.display = 'none';
            }
            if (e.target === bookingModal) {
                bookingModal.style.display = 'none';
            }
        });
        
        // Form submissions
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login functionality would be implemented here.');
            loginModal.style.display = 'none';
        });
        
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('signup-password').value;
            const confirm = document.getElementById('signup-confirm').value;
            
            if (password !== confirm) {
                alert('Passwords do not match.');
                return;
            }
            
            alert('Sign up successful! You can now login.');
            signupModal.style.display = 'none';
        });
        
        // Print ticket button
        printTicketBtn.addEventListener('click', function() {
            window.print();
        });
        
        // Close booking button
        closeBookingBtn.addEventListener('click', function() {
            bookingModal.style.display = 'none';
        });
        
        // Book now button in hero section
        bookNowBtn.addEventListener('click', scrollToBookingForm);
    }

    // Initialize the application
    init();
    // Add these to your existing script.js

// Custom Cursor
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Follower with delay
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Click animation
    document.addEventListener('click', () => {
        cursor.style.transform = `translate(-50%, -50%) scale(0.7)`;
        setTimeout(() => {
            cursor.style.transform = `translate(-50%, -50%) scale(1)`;
        }, 100);
    });
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// Floating Particles Background
function initParticles() {
    const particleCount = 30;
    const colors = ['rgba(255,255,255,0.3)', 'rgba(229,9,20,0.3)', 'rgba(23,165,213,0.3)'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        
        document.body.appendChild(particle);
    }
}

// Add floating animation to CSS
const style = document.createElement('style');
style.innerHTML = `
@keyframes float {
    0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
    50% { transform: translateY(-100px) translateX(50px) rotate(180deg); opacity: 0.5; }
    100% { transform: translateY(0) translateX(0) rotate(360deg); opacity: 1; }
}
`;
document.head.appendChild(style);

// Update the init function to include new features
function init() {
    loadMovies();
    loadTheaters();
    setupDatePicker();
    setupEventListeners();
    initCustomCursor();
    initThemeToggle();
    initParticles();
    
    // Add glass-card class to appropriate elements
    document.querySelectorAll('.movie-card, .theater-card, .offer-card, .booking-form, .booking-summary, .modal-content')
        .forEach(el => el.classList.add('glass-card'));
    
    // Add neon-btn class to buttons
    document.querySelectorAll('.cta-button, .movie-book-btn')
        .forEach(btn => btn.classList.add('neon-btn'));
}
});