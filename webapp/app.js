// SmartView Web App - Main JavaScript

// ==============================================
// CONFIGURATION - Add your TMDb API key here
// ==============================================
// Get a FREE API key at: https://www.themoviedb.org/settings/api
const TMDB_API_KEY = ''; // Leave empty to use sample data, or add your key
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

// Sample data - In production, this would come from a backend API
const sampleMovies = [
    {
        id: 1,
        title: "The Matrix",
        year: 1999,
        rating: "8.7/10",
        thumbnail: "https://via.placeholder.com/200x300/1a1a1a/e50914?text=The+Matrix",
        description: "A computer hacker learns about the true nature of his reality.",
        videoUrl: "" // Add your video URLs here
    },
    {
        id: 2,
        title: "Inception",
        year: 2010,
        rating: "8.8/10",
        thumbnail: "https://via.placeholder.com/200x300/1a1a1a/e50914?text=Inception",
        description: "A thief who steals corporate secrets through dream-sharing technology.",
        videoUrl: ""
    },
    {
        id: 3,
        title: "Interstellar",
        year: 2014,
        rating: "8.6/10",
        thumbnail: "https://via.placeholder.com/200x300/1a1a1a/e50914?text=Interstellar",
        description: "A team of explorers travel through a wormhole in space.",
        videoUrl: ""
    },
    {
        id: 4,
        title: "The Dark Knight",
        year: 2008,
        rating: "9.0/10",
        thumbnail: "https://via.placeholder.com/200x300/1a1a1a/e50914?text=Dark+Knight",
        description: "Batman faces the Joker, a criminal mastermind.",
        videoUrl: ""
    },
    {
        id: 5,
        title: "Pulp Fiction",
        year: 1994,
        rating: "8.9/10",
        thumbnail: "https://via.placeholder.com/200x300/1a1a1a/e50914?text=Pulp+Fiction",
        description: "The lives of two mob hitmen, a boxer, and other criminals intertwine.",
        videoUrl: ""
    },
    {
        id: 6,
        title: "Fight Club",
        year: 1999,
        rating: "8.8/10",
        thumbnail: "https://via.placeholder.com/200x300/1a1a1a/e50914?text=Fight+Club",
        description: "An insomniac office worker forms an underground fight club.",
        videoUrl: ""
    }
];

const sampleTVShows = [
    {
        id: 7,
        title: "Breaking Bad",
        year: 2008,
        rating: "9.5/10",
        thumbnail: "https://via.placeholder.com/200x300/1a1a1a/e50914?text=Breaking+Bad",
        description: "A chemistry teacher turned meth producer.",
        videoUrl: ""
    },
    {
        id: 8,
        title: "Stranger Things",
        year: 2016,
        rating: "8.7/10",
        thumbnail: "https://via.placeholder.com/200x300/1a1a1a/e50914?text=Stranger+Things",
        description: "A group of kids encounter supernatural forces.",
        videoUrl: ""
    },
    {
        id: 9,
        title: "The Crown",
        year: 2016,
        rating: "8.6/10",
        thumbnail: "https://via.placeholder.com/200x300/1a1a1a/e50914?text=The+Crown",
        description: "Chronicles the life of Queen Elizabeth II.",
        videoUrl: ""
    },
    {
        id: 10,
        title: "Game of Thrones",
        year: 2011,
        rating: "9.2/10",
        thumbnail: "https://via.placeholder.com/200x300/1a1a1a/e50914?text=Game+of+Thrones",
        description: "Noble families fight for control of the Iron Throne.",
        videoUrl: ""
    }
];

// DOM Elements
const featuredGrid = document.getElementById('featuredGrid');
const moviesGrid = document.getElementById('moviesGrid');
const tvShowsGrid = document.getElementById('tvShowsGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const playerModal = document.getElementById('playerModal');
const videoPlayer = document.getElementById('videoPlayer');
const videoTitle = document.getElementById('videoTitle');
const videoDescription = document.getElementById('videoDescription');
const closeModal = document.querySelector('.close');

// Initialize the app
async function init() {
    console.log('SmartView initializing...');
    
    // Check if TMDb API key is configured
    if (TMDB_API_KEY && TMDB_API_KEY.length > 10) {
        console.log('TMDb API key found, loading real data...');
        await loadTMDbContent();
    } else {
        console.log('No API key, using sample data...');
        renderContent(featuredGrid, sampleMovies.slice(0, 4));
        renderContent(moviesGrid, sampleMovies);
        renderContent(tvShowsGrid, sampleTVShows);
    }
    
    setupEventListeners();
    console.log('SmartView initialized successfully!');
}

// Render content cards
function renderContent(container, items) {
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = '<p class="no-results">No content found</p>';
        return;
    }
    
    items.forEach(item => {
        const card = createContentCard(item);
        container.appendChild(card);
    });
}

// Create a content card
function createContentCard(item) {
    const card = document.createElement('div');
    card.className = 'content-card';
    card.innerHTML = `
        <img src="${item.thumbnail}" alt="${item.title}">
        <div class="card-info">
            <h3>${item.title}</h3>
            <div class="rating">⭐ ${item.rating}</div>
            <div class="year">${item.year}</div>
        </div>
    `;
    
    card.addEventListener('click', () => openPlayer(item));
    return card;
}

// Open video player
function openPlayer(item) {
    videoTitle.textContent = item.title;
    videoDescription.textContent = item.description;
    
    if (item.videoUrl) {
        videoPlayer.src = item.videoUrl;
        videoPlayer.load();
    } else {
        // Placeholder for demo
        videoPlayer.src = "";
        alert(`Video playback for "${item.title}" would start here.\n\nTo enable playback, add video URLs to the content data in app.js`);
    }
    
    playerModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close video player
function closePlayer() {
    playerModal.style.display = 'none';
    videoPlayer.pause();
    videoPlayer.src = '';
    document.body.style.overflow = 'auto';
}

// Search functionality
async function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) {
        // Reset to initial state
        if (TMDB_API_KEY && TMDB_API_KEY.length > 10) {
            await loadTMDbContent();
        } else {
            renderContent(moviesGrid, sampleMovies);
            renderContent(tvShowsGrid, sampleTVShows);
        }
        return;
    }
    
    const moviesSection = document.getElementById('movies-section');
    const tvShowsSection = document.getElementById('tvshows-section');
    moviesSection.querySelector('h2').textContent = `Search Results for "${query}"`;
    tvShowsSection.style.display = 'none';
    
    // Try TMDb search first
    if (TMDB_API_KEY && TMDB_API_KEY.length > 10) {
        const results = await searchTMDb(query);
        if (results) {
            renderContent(moviesGrid, results);
            moviesSection.scrollIntoView({ behavior: 'smooth' });
            return;
        }
    }
    
    // Fallback to local search
    const allContent = [...sampleMovies, ...sampleTVShows];
    const results = allContent.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
    
    renderContent(moviesGrid, results);
    moviesSection.scrollIntoView({ behavior: 'smooth' });
}

// Reset search
function resetSearch() {
    const moviesSection = document.getElementById('movies-section');
    const tvShowsSection = document.getElementById('tvshows-section');
    
    moviesSection.querySelector('h2').textContent = 'Popular Movies';
    tvShowsSection.style.display = 'block';
    renderContent(moviesGrid, sampleMovies);
    renderContent(tvShowsGrid, sampleTVShows);
}

// Setup event listeners
function setupEventListeners() {
    // Search
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    searchInput.addEventListener('input', (e) => {
        if (e.target.value === '') {
            resetSearch();
        }
    });
    
    // Modal
    closeModal.addEventListener('click', closePlayer);
    
    window.addEventListener('click', (e) => {
        if (e.target === playerModal) {
            closePlayer();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && playerModal.style.display === 'block') {
            closePlayer();
        }
    });
    
    // Navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const target = link.getAttribute('href').substring(1);
            if (target === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (target === 'movies') {
                document.getElementById('movies-section').scrollIntoView({ behavior: 'smooth' });
            } else if (target === 'tvshows') {
                document.getElementById('tvshows-section').scrollIntoView({ behavior: 'smooth' });
            } else if (target === 'search') {
                searchInput.focus();
            }
        });
    });
    
    // CTA Button
    document.querySelector('.cta-button').addEventListener('click', () => {
        document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
    });
}

// Fetch content from TMDb API
async function fetchContent(url) {
    try {
        showLoading();
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        hideLoading();
        return data;
    } catch (error) {
        console.error('Error fetching content:', error);
        hideLoading();
        return null;
    }
}

// Show loading indicator
function showLoading() {
    [featuredGrid, moviesGrid, tvShowsGrid].forEach(grid => {
        if (grid && !grid.querySelector('.loading')) {
            grid.innerHTML = '<div class="loading">Loading content</div>';
        }
    });
}

// Hide loading indicator
function hideLoading() {
    document.querySelectorAll('.loading').forEach(el => el.remove());
}

// Transform TMDb data to our format
function transformTMDbMovie(movie) {
    return {
        id: movie.id,
        title: movie.title || movie.name,
        year: (movie.release_date || movie.first_air_date || '').split('-')[0],
        rating: `${(movie.vote_average || 0).toFixed(1)}/10`,
        thumbnail: movie.poster_path 
            ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
            : 'https://via.placeholder.com/200x300/1a1a1a/e50914?text=No+Image',
        description: movie.overview || 'No description available.',
        videoUrl: '' // TMDb doesn't provide video URLs
    };
}

// Load content from TMDb API
async function loadTMDbContent() {
    try {
        // Fetch popular movies
        const moviesData = await fetchContent(
            `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );
        
        // Fetch popular TV shows
        const tvData = await fetchContent(
            `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );
        
        if (moviesData && moviesData.results) {
            const movies = moviesData.results.slice(0, 12).map(transformTMDbMovie);
            renderContent(featuredGrid, movies.slice(0, 4));
            renderContent(moviesGrid, movies);
            console.log(`Loaded ${movies.length} movies from TMDb`);
        } else {
            // Fallback to sample data
            renderContent(featuredGrid, sampleMovies.slice(0, 4));
            renderContent(moviesGrid, sampleMovies);
        }
        
        if (tvData && tvData.results) {
            const tvShows = tvData.results.slice(0, 10).map(transformTMDbMovie);
            renderContent(tvShowsGrid, tvShows);
            console.log(`Loaded ${tvShows.length} TV shows from TMDb`);
        } else {
            // Fallback to sample data
            renderContent(tvShowsGrid, sampleTVShows);
        }
        
    } catch (error) {
        console.error('Failed to load TMDb content:', error);
        // Fallback to sample data
        renderContent(featuredGrid, sampleMovies.slice(0, 4));
        renderContent(moviesGrid, sampleMovies);
        renderContent(tvShowsGrid, sampleTVShows);
    }
}

// Search TMDb (if API key is available)
async function searchTMDb(query) {
    if (!TMDB_API_KEY || TMDB_API_KEY.length < 10) {
        return null;
    }
    
    const url = `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`;
    const data = await fetchContent(url);
    
    if (data && data.results) {
        return data.results
            .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
            .map(transformTMDbMovie);
    }
    
    return null;
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

console.log('SmartView loaded. Ready to initialize...');
