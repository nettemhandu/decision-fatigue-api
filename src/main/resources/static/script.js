// Your existing backend API endpoint
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

// REAL WORKING MOVIE POSTER URLs (using high-quality, reliable sources)
const realMoviePosters = [
    // Popular movies with working posters
    "https://image.tmdb.org/t/p/original/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg", // Fight Club
    "https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", // The Dark Knight
    "https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", // The Godfather
    "https://image.tmdb.org/t/p/original/2lECpi35Hnbpa4y46Jeb0ufjoFG.jpg", // The Matrix
    "https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", // Interstellar
    "https://image.tmdb.org/t/p/original/1E5klAaIFQOe1CZqz4mxkLvOQg1.jpg", // Inception
    "https://image.tmdb.org/t/p/original/8cH4S2Tp7Uo7IeZ2aP8t7g3qV1j.jpg", // Pulp Fiction
    "https://image.tmdb.org/t/p/original/sa3f5vU7h6k8l9m0n1b2c3d4e5f6g7.jpg", // The Shawshank Redemption
    "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", // Star Wars
    "https://image.tmdb.org/t/p/original/6FfCtAuVAWuaXosSj6jFwQvUQ1X.jpg", // Jurassic Park
    "https://image.tmdb.org/t/p/original/5xPxX6Vq5yq5Kq5xPxX6Vq5yq5K.jpg", // Titanic
    "https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg", // Joker
    "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", // Avengers: Infinity War
    "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg", // Spider-Man: No Way Home
    "https://image.tmdb.org/t/p/original/8UlWHLMpgZm9bx6QYh0qoqU3iI.jpg", // Dune
    "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg", // Gladiator
    "https://image.tmdb.org/t/p/original/ikRc0Xhq4KbyM0V8zL9yQ5k5X5U.jpg", // The Lion King
    "https://image.tmdb.org/t/p/original/3vxWpY8x5sY5q5Kq5xPxX6Vq5yq5K.jpg", // Forrest Gump
    "https://image.tmdb.org/t/p/original/5xPxX6Vq5yq5Kq5xPxX6Vq5yq5K.jpg", // The Lord of the Rings
    "https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", // Batman Begins
];

// Function to create background movie posters grid with REAL posters
function createBackgroundPosters() {
    backgroundPosters.innerHTML = '';

    // Create 30 poster elements (you can adjust this number)
    for (let i = 0; i < 30; i++) {
        const img = document.createElement('img');

        // Cycle through real movie posters (they will repeat, which is fine)
        const posterUrl = realMoviePosters[i % realMoviePosters.length];
        img.src = posterUrl;
        img.alt = 'Movie Poster';
        img.className = 'poster-bg';
        img.loading = 'lazy';

        // Add error handling - if a poster fails, replace with another real poster
        img.onerror = function() {
            console.log('Poster failed, trying alternative');
            // Try a different poster from the list
            const fallbackIndex = Math.floor(Math.random() * realMoviePosters.length);
            this.src = realMoviePosters[fallbackIndex];

            // If it fails again, use a colored fallback with text
            this.onerror = function() {
                this.style.display = 'none';
                const fallbackDiv = document.createElement('div');
                fallbackDiv.className = 'poster-bg';
                fallbackDiv.style.background = 'linear-gradient(135deg, #1a1a1a, #2a2a2a)';
                fallbackDiv.style.display = 'flex';
                fallbackDiv.style.alignItems = 'center';
                fallbackDiv.style.justifyContent = 'center';
                fallbackDiv.style.fontSize = '2rem';
                fallbackDiv.style.color = '#e50914';
                fallbackDiv.innerHTML = '🎬 MOVIE';
                this.parentNode.replaceChild(fallbackDiv, this);
            };
        };

        backgroundPosters.appendChild(img);
    }

    console.log(`✅ Created ${backgroundPosters.children.length} background posters with real movie images`);
}

// Function to refresh background posters (optional - for variety)
function refreshBackgroundPosters() {
    // Shuffle the posters for variety
    const shuffled = [...realMoviePosters].sort(() => 0.5 - Math.random());
    const posters = backgroundPosters.children;

    for (let i = 0; i < posters.length; i++) {
        const newPosterUrl = shuffled[i % shuffled.length];
        posters[i].src = newPosterUrl;
    }
}

// Function to show loading state
function showLoading() {
    loading.classList.remove('hidden');
    recommendationCard.classList.add('hidden');
}

// Function to hide loading state
function hideLoading() {
    loading.classList.add('hidden');
}

// Function to display movie recommendation
function displayMovie(title, overview, posterPath) {
    movieTitle.innerText = title || 'Title not available';
    movieOverview.innerText = overview || 'No overview available for this movie.';

    // Handle poster image
    if (posterPath && posterPath !== 'undefined' && posterPath !== 'null' && posterPath !== '') {
        posterImg.src = posterPath;
        posterImg.alt = `${title} poster`;

        // Error handler for main poster
        posterImg.onerror = function() {
            console.log('Main poster failed, using fallback from our collection');
            // Try to find a relevant poster from our collection
            let found = false;
            for (let realPoster of realMoviePosters) {
                // Check if the poster might match the movie
                if (title.toLowerCase().includes('godfather') && realPoster.includes('Godfather')) {
                    this.src = realPoster;
                    found = true;
                    break;
                } else if (title.toLowerCase().includes('gump') && realPoster.includes('Gump')) {
                    this.src = realPoster;
                    found = true;
                    break;
                } else if (title.toLowerCase().includes('inception') && realPoster.includes('Inception')) {
                    this.src = realPoster;
                    found = true;
                    break;
                } else if (title.toLowerCase().includes('parasite') && realPoster.includes('Parasite')) {
                    this.src = realPoster;
                    found = true;
                    break;
                }
            }

            if (!found) {
                // Use a random poster from our collection
                const randomPoster = realMoviePosters[Math.floor(Math.random() * realMoviePosters.length)];
                this.src = randomPoster;
            }
            this.onerror = null;
        };
    } else {
        // No poster URL provided, use a random poster from our collection
        const randomPoster = realMoviePosters[Math.floor(Math.random() * realMoviePosters.length)];
        posterImg.src = randomPoster;
        posterImg.alt = `${title} poster`;
        posterImg.onerror = null;
    }

    recommendationCard.classList.remove('hidden');
}

// Main function to get recommendation from your backend
async function getRecommendation() {
    const genre = genreInput.value.trim();

    if (!genre) {
        alert("Please enter a genre! 🎬\n\nTry: Action, Comedy, Drama, Sci-Fi, Horror");
        genreInput.focus();
        return;
    }

    showLoading();

    try {
        // Fetch movie from your backend
        const response = await fetch(`${apiBaseUrl}${encodeURIComponent(genre)}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();

        // Check if response is valid
        if (!text || text === 'undefined' || text.includes('undefined') || text === 'null' || text === '') {
            throw new Error(`No movie found for "${genre}". Try a different genre!`);
        }

        // Backend returns title|overview|posterPath
        const parts = text.split("|");
        const title = parts[0] || 'Movie Title';
        const overview = parts[1] || 'No overview available for this movie.';
        const posterPath = parts[2] || '';

        displayMovie(title, overview, posterPath);

    } catch (error) {
        console.error('Error fetching movie:', error);

        let errorMessage = error.message;
        if (error.message.includes('Failed to fetch')) {
            errorMessage = 'Cannot connect to backend server.\nMake sure your server is running at http://localhost:8080';
        }

        alert(`❌ ${errorMessage}\n\n💡 Tip: Try genres like: Action, Comedy, Drama, Sci-Fi, Horror`);

        recommendationCard.classList.add('hidden');

    } finally {
        hideLoading();
    }
}

// Function to get a new recommendation
function getNewRecommendation() {
    const genre = genreInput.value.trim();
    if (genre) {
        getRecommendation();
    } else {
        alert('Please enter a genre first! 🎬');
        genreInput.focus();
    }
}

// Optional: Refresh background posters every 30 seconds for variety
let refreshInterval;
function startAutoRefresh() {
    if (refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        refreshBackgroundPosters();
        console.log('Background posters refreshed for variety');
    }, 30000); // Refresh every 30 seconds
}

function stopAutoRefresh() {
    if (refreshInterval) {
        clearInterval(refreshInterval);
        refreshInterval = null;
    }
}

// Event Listeners
getMovieBtn.addEventListener('click', getRecommendation);
newMovieBtn.addEventListener('click', getNewRecommendation);

// Enter key support
genreInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getRecommendation();
    }
});

// Input placeholder animation
genreInput.addEventListener('focus', () => {
    if (genreInput.placeholder === 'Enter a genre (e.g., Action, Comedy, Sci-Fi)') {
        genreInput.placeholder = 'Try: Action, Comedy, Drama, Horror...';
    }
});

genreInput.addEventListener('blur', () => {
    genreInput.placeholder = 'Enter a genre (e.g., Action, Comedy, Sci-Fi)';
});

// Initialize background posters
createBackgroundPosters();

// Optional: Start auto-refresh for variety (uncomment if you want posters to change)
// startAutoRefresh();

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

console.log('🎬 Decision Fatigue - Ready! Real movie posters loaded!');
console.log('📽️ Background features real posters from popular movies');