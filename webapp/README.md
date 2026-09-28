# SmartView - Ad-Free Streaming Web App 🎬

A clean, modern web application for streaming movies and TV shows without advertisements. Built from the SmartView Android app concept, reimagined for the web.

## Features ✨

- 🚫 **Ad-Free Experience** - No interruptions, just pure content
- 🎨 **Modern UI** - Clean, Netflix-inspired interface
- 🔍 **Smart Search** - Find movies and TV shows instantly
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Fast & Lightweight** - No bloated frameworks
- 🎥 **Video Player** - Built-in HTML5 video player

## Live Demo 🌐

Visit the live site: `https://YOUR_USERNAME.github.io/Smartview/webapp/`

## Getting Started 🚀

### Quick Start

1. Clone this repository:
```bash
git clone https://github.com/YOUR_USERNAME/Smartview.git
cd Smartview/webapp
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

3. Visit `http://localhost:8000` in your browser

### Hosting on GitHub Pages

1. Push the code to your GitHub repository
2. Go to repository Settings > Pages
3. Select the branch and `/webapp` folder
4. Save and wait for deployment
5. Your site will be live at `https://YOUR_USERNAME.github.io/Smartview/webapp/`

## Configuration ⚙️

### Adding Your Own Content

Edit `app.js` to add your content:

```javascript
const sampleMovies = [
    {
        id: 1,
        title: "Your Movie",
        year: 2024,
        rating: "8.5/10",
        thumbnail: "path/to/thumbnail.jpg",
        description: "Movie description",
        videoUrl: "path/to/video.mp4"
    }
];
```

### Using an API (Recommended)

For real content, integrate with a movie API like [TMDb](https://www.themoviedb.org/):

1. Sign up for a free API key at https://www.themoviedb.org/settings/api
2. Update the `loadTMDbContent()` function in `app.js`
3. Replace `YOUR_TMDB_API_KEY` with your actual key

Example API integration:
```javascript
const API_KEY = 'your_api_key_here';
const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
const data = await response.json();
```

## File Structure 📁

```
webapp/
├── index.html          # Main HTML file
├── styles.css          # Styling and layout
├── app.js              # JavaScript functionality
├── favicon.ico         # Site icon
└── README.md           # This file
```

## Customization 🎨

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #e50914;    /* Main theme color */
    --secondary-color: #141414;  /* Dark background */
    --text-color: #ffffff;       /* Text color */
}
```

### Adding Features

Some ideas for enhancement:
- User authentication
- Watchlist/favorites
- Genre filtering
- Multiple video quality options
- Subtitle support
- Continue watching feature
- Rating and review system

## Technologies Used 💻

- **HTML5** - Structure and video player
- **CSS3** - Modern styling with Grid and Flexbox
- **Vanilla JavaScript** - No dependencies
- **ES6+** - Modern JavaScript features

## Browser Support 🌐

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## Legal Notice ⚖️

This is a frontend template. You are responsible for:
- Ensuring you have rights to any content you host
- Complying with copyright laws
- Following terms of service for any APIs you use
- Obtaining proper licenses for video content

## Contributing 🤝

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## License 📄

This project is provided as-is for educational purposes. Use responsibly and legally.

## Development Roadmap 🗺️

- [ ] Backend integration
- [ ] User accounts
- [ ] Content recommendation engine
- [ ] Social features (sharing, comments)
- [ ] PWA support for offline viewing
- [ ] Multi-language support
- [ ] Advanced video player features

## Support 💬

For questions or issues:
- Open an issue on GitHub
- Check existing issues for solutions
- Contribute improvements via pull requests

---

**Note**: This web app is a clean-room implementation inspired by streaming services. It does not contain or provide access to copyrighted content. You must provide your own legal content sources.

Built with ❤️ for the open-source community
