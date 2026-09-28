// SmartView Web App - Main JavaScript

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
function init() {
    renderContent(featuredGrid, sampleMovies.slice(0, 4));
    renderContent(moviesGrid, sampleMovies);
    renderContent(tvShowsGrid, sampleTVShows);
    setupEventListeners();
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
function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) {
        renderContent(moviesGrid, sampleMovies);
        renderContent(tvShowsGrid, sampleTVShows);
        return;
    }
    
    const allContent = [...sampleMovies, ...sampleTVShows];
    const results = allContent.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
    
    // Show results in movies section and hide TV shows
    const moviesSection = document.getElementById('movies-section');
    const tvShowsSection = document.getElementById('tvshows-section');
    
    moviesSection.querySelector('h2').textContent = `Search Results for "${query}"`;
    renderContent(moviesGrid, results);
    tvShowsSection.style.display = 'none';
    
    // Scroll to results
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

// Optional: Fetch content from an API
async function fetchContent(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching content:', error);
        return [];
    }
}

// Example: Using The Movie Database (TMDb) API
// You would need to sign up for a free API key at https://www.themoviedb.org/settings/api
async function loadTMDbContent() {
    const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your API key
    const BASE_URL = 'https://api.themoviedb.org/3';
    
    // Uncomment to use real data:
    // const movies = await fetchContent(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    // const tvShows = await fetchContent(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
    // Process and render the data...
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Export for potential future use
export { sampleMovies, sampleTVShows, performSearch, openPlayer };
