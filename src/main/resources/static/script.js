// My backend API endpoint
const apiBaseUrl = "http://localhost:8080/recommend?genre=";

// DOM Elements
const getMovieBtn = document.getElementById("getMovie");
const genreInput = document.getElementById("genre");
const recommendationCard = document.getElementById("recommendationCard");
const movieTitle = document.getElementById("movieTitle");
const movieOverview = document.getElementById("movieOverview");
const posterImg = document.getElementById("poster");
const loading = document.getElementById("loading");
const newMovieBtn = document.getElementById("newMovieBtn");
const backgroundPosters = document.getElementById("backgroundPosters");

// MOVIE POSTER URLs
const realMoviePosters = [
    "https://image.tmdb.org/t/p/original/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg", // Fight Club
    "https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", // The Dark Knight
    "https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", // The Godfather
    "https://image.tmdb.org/t/p/original/2lECpi35Hnbpa4y46Jeb0ufjoFG.jpg", // The Matrix
    "https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", // Interstellar
    "https://image.tmdb.org/t/p/original/1E5klAaIFQOe1CZqz4mxkLvOQg1.jpg", // Inception
    "https://image.tmdb.org/t/p/original/8cH4S2Tp7Uo7IeZ2aP8t7g3qV1j.jpg", // Pulp Fiction
    "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", // Star Wars
    "https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg", // Joker
    "https://image.tmdb.org/t/p/original/8UlWHLMpgZm9bx6QYh0qoqU3iI.jpg", // Dune
];

// Function to create background movie posters grid
function createBackgroundPosters() {
    backgroundPosters.innerHTML = '';

    for (let i = 0; i < 30; i++) {
        const img = document.createElement('img');
        const posterUrl = realMoviePosters[i % realMoviePosters.length];
        img.src = posterUrl;
        img.alt = 'Movie Poster';
        img.className = 'poster-bg';
        img.loading = 'lazy';

        img.onerror = function() {
            const fallbackIndex = Math.floor(Math.random() * realMoviePosters.length);
            this.src = realMoviePosters[fallbackIndex];
        };

        backgroundPosters.appendChild(img);
    }

    console.log(`✅ Created ${backgroundPosters.children.length} background posters`);
}

function showLoading() {
    loading.classList.remove('hidden');
    recommendationCard.classList.add('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function displayMovie(title, overview, posterPath) {
    movieTitle.innerText = title || 'Title not available';
    movieOverview.innerText = overview || 'No overview available for this movie.';

    // Handle poster image
    if (posterPath && posterPath !== 'undefined' && posterPath !== 'null' && posterPath !== '' && posterPath.startsWith('http')) {
        posterImg.src = posterPath;
        posterImg.alt = `${title} poster`;

        posterImg.onerror = function() {
            console.log('Main poster failed, using random poster');
            const randomPoster = realMoviePosters[Math.floor(Math.random() * realMoviePosters.length)];
            this.src = randomPoster;
            this.onerror = null;
        };
    } else {
        // No poster URL, use a random real poster
        const randomPoster = realMoviePosters[Math.floor(Math.random() * realMoviePosters.length)];
        posterImg.src = randomPoster;
        posterImg.alt = `${title} poster`;
    }

    recommendationCard.classList.remove('hidden');
}

// Main function to get recommendation from backend
async function getRecommendation() {
    const genre = genreInput.value.trim();

    if (!genre) {
        alert("Please enter a genre! 🎬\n\nTry: Action, Comedy, Drama, Sci-Fi, Horror");
        genreInput.focus();
        return;
    }

    showLoading();

    console.log(`🔍 Fetching recommendation for genre: ${genre}`);
    console.log(`📡 API URL: ${apiBaseUrl}${encodeURIComponent(genre)}`);

    try {
        const response = await fetch(`${apiBaseUrl}${encodeURIComponent(genre)}`);

        console.log(`📥 Response status: ${response.status}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        console.log(`📄 Raw response: "${text.substring(0, 200)}"`);

        if (!text || text === 'undefined' || text === 'null' || text === '') {
            throw new Error(`No movie found for "${genre}". Try a different genre!`);
        }

        // Check if response contains error message
        if (text.startsWith('Error|')) {
            const errorParts = text.split("|");
            throw new Error(errorParts[1] || 'Unknown error');
        }

        // Backend returns title|overview|posterPath
        const parts = text.split("|");

        let title, overview, posterPath;

        if (parts.length >= 3) {
            title = parts[0].trim();
            overview = parts[1].trim();
            posterPath = parts[2].trim();
        } else if (parts.length === 2) {
            title = parts[0].trim();
            overview = parts[1].trim();
            posterPath = '';
        } else {
            title = text.trim();
            overview = 'No overview available.';
            posterPath = '';
        }

        console.log(`🎬 Movie found: "${title}"`);

        if (!title || title === 'undefined' || title === 'null' || title === 'No movies found') {
            throw new Error(`No movies found for "${genre}". Try a different genre!`);
        }

        displayMovie(title, overview, posterPath);

    } catch (error) {
        console.error('❌ Error:', error);

        let errorMessage = error.message;
        if (error.message.includes('Failed to fetch')) {
            errorMessage = 'Cannot connect to backend server.\n\nMake sure your Spring Boot server is running on http://localhost:8080\n\nCheck: \n1. Server is running\n2. Port 8080 is correct\n3. CORS is configured';
        }

        alert(`❌ ${errorMessage}\n\n💡 Try genres like: Action, Comedy, Drama, Sci-Fi, Horror, Romance`);

        recommendationCard.classList.add('hidden');

    } finally {
        hideLoading();
    }
}

// Function to test backend connection
async function testBackendConnection() {
    console.log('🔌 Testing backend connection...');
    try {
        const response = await fetch('http://localhost:8080/hello');
        if (response.ok) {
            const data = await response.text();
            console.log('✅ Backend is reachable! Response:', data);
            console.log('✅ Movie API is ready at /recommend');
            return true;
        } else {
            console.log('❌ Backend responded with error:', response.status);
            return false;
        }
    } catch (error) {
        console.log('❌ Cannot reach backend. Make sure Spring Boot is running on http://localhost:8080');
        console.log('Error:', error.message);
        return false;
    }
}

function getNewRecommendation() {
    const genre = genreInput.value.trim();
    if (genre) {
        getRecommendation();
    } else {
        alert('Please enter a genre first! 🎬');
        genreInput.focus();
    }
}

// Event Listeners
getMovieBtn.addEventListener('click', getRecommendation);
newMovieBtn.addEventListener('click', getNewRecommendation);

genreInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getRecommendation();
    }
});

// Initialize background posters
createBackgroundPosters();

// Test backend connection on page load
setTimeout(() => {
    testBackendConnection();
}, 1000);

// Smooth scroll to card when it appears
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if (!recommendationCard.classList.contains('hidden')) {
                setTimeout(() => {
                    recommendationCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        }
    });
});

observer.observe(recommendationCard, { attributes: true });

console.log('🎬 Decision Fatigue - Ready!');
console.log('📡 Backend URL:', apiBaseUrl);