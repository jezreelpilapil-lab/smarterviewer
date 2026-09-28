# SmartView Setup Guide

## Local Development Setup

### Prerequisites

You need ONE of the following to run the app locally:

- **Python 3** (most common)
- **Node.js** 
- **PHP**
- Or any static file server

### Method 1: Python (Recommended)

```bash
cd webapp
python -m http.server 8000
```

Then open: `http://localhost:8000`

### Method 2: Node.js

```bash
cd webapp
npx serve
```

Or install serve globally:
```bash
npm install -g serve
serve
```

### Method 3: PHP

```bash
cd webapp
php -S localhost:8000
```

### Method 4: VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

## GitHub Pages Deployment

### Step 1: Initialize Git (if not already done)

```bash
cd Smartview
git init
git add .
git commit -m "Initial commit: SmartView web app"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Name your repository: `Smartview`
3. Don't initialize with README (we already have one)
4. Click "Create repository"

### Step 3: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/Smartview.git
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** section
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/webapp`
5. Click **Save**

Wait 1-2 minutes, then visit:
`https://YOUR_USERNAME.github.io/Smartview/webapp/`

## Adding Content

### Option 1: Manual Content (Quick Start)

Edit `app.js` and modify the sample arrays:

```javascript
const sampleMovies = [
    {
        id: 1,
        title: "Movie Title",
        year: 2024,
        rating: "8.5/10",
        thumbnail: "https://image-url.com/poster.jpg",
        description: "Your description",
        videoUrl: "https://your-cdn.com/video.mp4"
    }
];
```

### Option 2: TMDb API Integration (Recommended)

1. **Sign up for TMDb API**:
   - Visit: https://www.themoviedb.org/signup
   - Verify your email
   - Go to: https://www.themoviedb.org/settings/api
   - Request an API key (free)

2. **Update app.js**:

```javascript
const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://api.themoviedb.org/3';

async function loadRealContent() {
    // Fetch popular movies
    const moviesRes = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const moviesData = await moviesRes.json();
    
    // Transform data
    const movies = moviesData.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        year: movie.release_date?.split('-')[0],
        rating: `${movie.vote_average}/10`,
        thumbnail: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        description: movie.overview,
        videoUrl: '' // You'll need a video source
    }));
    
    renderContent(moviesGrid, movies);
}

// Call in init()
document.addEventListener('DOMContentLoaded', () => {
    loadRealContent();
});
```

### Option 3: Self-Hosted Videos

1. Upload videos to a hosting service:
   - **Cloudinary** (free tier available)
   - **Vimeo** (privacy controls)
   - **AWS S3** + CloudFront
   - **Your own server**

2. Update the `videoUrl` field with your hosted URLs

3. Ensure CORS is properly configured

## Troubleshooting

### Video Won't Play

**Issue**: CORS error or video format
**Solution**:
- Ensure video server allows CORS
- Use MP4 format (H.264 codec)
- Check browser console for errors

### Images Not Loading

**Issue**: External images blocked
**Solution**:
- Use HTTPS URLs only
- Check image URLs are accessible
- Verify CORS headers

### GitHub Pages 404

**Issue**: Site not found after deployment
**Solution**:
- Wait 2-5 minutes after enabling Pages
- Check Settings > Pages shows the correct URL
- Verify `/webapp` folder is selected
- Ensure `.nojekyll` file exists

### Styles Not Applied

**Issue**: CSS not loading
**Solution**:
- Check file paths in `index.html`
- Verify `styles.css` is in the same directory
- Clear browser cache (Ctrl+Shift+R)

## Advanced Configuration

### Custom Domain

1. Buy a domain from any registrar
2. In your repo: Settings > Pages > Custom domain
3. Add DNS records (provided by GitHub)
4. Wait for DNS propagation (up to 24 hours)

### Enable HTTPS

GitHub Pages automatically provides HTTPS. Just:
1. Go to Settings > Pages
2. Check "Enforce HTTPS"

### Add Google Analytics

Add before closing `</head>` in `index.html`:

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Performance Tips

1. **Optimize Images**: Use WebP format, compress posters
2. **Lazy Loading**: Add `loading="lazy"` to images
3. **CDN**: Use Cloudflare or similar for static assets
4. **Minify**: Minify CSS and JS for production
5. **Cache**: Set proper cache headers

## Security Best Practices

1. Never commit API keys to Git
2. Use environment variables for sensitive data
3. Implement rate limiting if adding backend
4. Validate all user inputs
5. Keep dependencies updated

## Need Help?

- Check the [main README](../README.md)
- Open an issue on GitHub
- Search existing issues
- Read browser console errors

Happy streaming! 🎬
