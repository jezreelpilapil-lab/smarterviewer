# 🎬 How to Add Real Content to SmartView

Your SmartView web app currently shows **sample/placeholder data**. Here's how to add real movies and TV shows!

---

## 🎯 Option 1: Use TMDb API (Recommended - FREE!)

The Movie Database (TMDb) provides a free API with thousands of movies and TV shows.

### Step 1: Get a FREE TMDb API Key

1. **Sign up** at https://www.themoviedb.org/signup
2. **Verify** your email
3. Go to **Settings** → **API**: https://www.themoviedb.org/settings/api
4. Click **"Request an API Key"`
5. Choose **"Developer"**
6. Fill in the form:
   - **Application Name**: SmartView
   - **Application URL**: Your GitHub Pages URL
   - **Application Summary**: Personal streaming web app
7. Accept terms and **submit**
8. Copy your **API Key (v3 auth)**

### Step 2: Add API Key to Your App

Open `webapp/app.js` and find this line near the top:

```javascript
const TMDB_API_KEY = ''; // Leave empty to use sample data, or add your key
```

Replace it with:

```javascript
const TMDB_API_KEY = 'your_api_key_here'; // Your actual key
```

### Step 3: Test Locally

```powershell
cd webapp
python -m http.server 8000
```

Visit http://localhost:8000 - You should now see **real movies**!

### Step 4: Push to GitHub

```bash
git add webapp/app.js
git commit -m "Add TMDb API key for real content"
git push origin main
```

Wait 1-2 minutes and your live site will have real content!

---

## ✨ What You Get With TMDb

- ✅ **Popular Movies** - Currently trending
- ✅ **Popular TV Shows** - Top series
- ✅ **Real Posters** - High-quality images
- ✅ **Descriptions** - Movie/show summaries
- ✅ **Ratings** - User ratings from TMDb
- ✅ **Search** - Search thousands of titles
- ✅ **FREE** - Up to 40 requests/10 seconds
- ✅ **No Credit Card** - Completely free

---

## 🎯 Option 2: Add Your Own Videos

If you have your own video files, you can host them and add them manually.

### Where to Host Videos:

1. **Cloudinary** (Free tier): https://cloudinary.com/
2. **Vimeo** (Free + Privacy controls): https://vimeo.com/
3. **AWS S3 + CloudFront**: For larger scale
4. **Your own server**: If you have hosting

### How to Add Custom Videos:

Edit `webapp/app.js` and modify the sample arrays:

```javascript
const sampleMovies = [
    {
        id: 1,
        title: "My Awesome Movie",
        year: 2024,
        rating: "8.5/10",
        thumbnail: "https://your-cdn.com/poster.jpg",
        description: "An amazing film about...",
        videoUrl: "https://your-cdn.com/movie.mp4" // ← Add this!
    },
    // Add more movies...
];
```

**Important**: 
- Videos must be **MP4** format (H.264 codec)
- Must allow **CORS** from your domain
- Must be **HTTPS** URLs

---

## 🎯 Option 3: Use Both!

You can use TMDb for metadata + your own video URLs:

```javascript
// 1. Get TMDb API key for movie info
const TMDB_API_KEY = 'your_key';

// 2. After loading TMDb data, add your video URLs
function addVideoUrls(movies) {
    // Map TMDb movie IDs to your video URLs
    const videoMap = {
        550: 'https://your-cdn.com/fight-club.mp4',
        603: 'https://your-cdn.com/matrix.mp4',
        // ... more mappings
    };
    
    return movies.map(movie => ({
        ...movie,
        videoUrl: videoMap[movie.id] || ''
    }));
}
```

---

## 📊 Current State of Your App

### ✅ What's Working:
- Sample data displays
- Search functionality
- UI and layout
- Responsive design
- Video player modal

### 🔧 What Needs Content:
- **Real movie data** → Use TMDb API
- **Video URLs** → Host your videos or embed links
- **Real posters** → TMDb provides these

---

## 🐛 Troubleshooting

### "No content showing"

1. **Check browser console** (F12):
   - Look for JavaScript errors
   - Check if `SmartView initialized successfully!` appears

2. **Check if files loaded**:
   - Open DevTools → Network tab
   - Refresh page
   - Verify `app.js`, `styles.css`, `index.html` loaded

3. **Test with sample data first**:
   - Don't add API key yet
   - Sample data should show placeholder images

### "TMDb API not working"

1. **Check API key is correct**:
   - Should be ~32 characters long
   - No spaces or quotes around it

2. **Check browser console**:
   - Look for `401 Unauthorized` = bad API key
   - Look for `429 Too Many Requests` = rate limit

3. **Check network**:
   - TMDb API requires internet connection
   - Some firewalls block API calls

### "Videos won't play"

1. **Check video URL**:
   - Must be HTTPS (not HTTP)
   - Must be a direct link to MP4 file
   - Test URL directly in browser

2. **Check CORS**:
   - Video host must allow your domain
   - Configure CORS headers on your server

3. **Check format**:
   - MP4 with H.264 codec works best
   - Other formats may not work in all browsers

---

## 📝 Quick Setup Summary

**Fastest way to get real content:**

```bash
# 1. Get TMDb API key (5 minutes)
→ Visit https://www.themoviedb.org/signup
→ Request API key
→ Copy it

# 2. Add to your app (1 minute)
→ Open webapp/app.js
→ Find: const TMDB_API_KEY = '';
→ Replace with: const TMDB_API_KEY = 'your_key';
→ Save file

# 3. Test locally (1 minute)
→ Run: python -m http.server 8000
→ Visit: http://localhost:8000
→ See real movies!

# 4. Deploy (2 minutes)
→ git add webapp/app.js
→ git commit -m "Add TMDb API"
→ git push origin main
→ Wait 2 minutes
→ Your site has real content!
```

**Total time: ~10 minutes** ⏱️

---

## 🎉 After Adding Content

Your SmartView app will have:
- ✅ Real movie posters
- ✅ Real descriptions
- ✅ Real ratings
- ✅ Search that works
- ✅ Trending content
- ✅ Professional look

---

## 💡 Pro Tips

1. **Don't commit API keys to public repos**:
   - Use environment variables in production
   - Or use a backend proxy

2. **Cache TMDb data**:
   - Reduces API calls
   - Faster loading
   - Use localStorage

3. **Add trailers**:
   - TMDb provides YouTube trailer IDs
   - Show trailers instead of "video not available"

4. **Implement pagination**:
   - TMDb returns 20 items per page
   - Add "Load More" button

5. **Add genre filtering**:
   - TMDb provides genre data
   - Let users filter by genre

---

## 📞 Need Help?

- **TMDb API Docs**: https://developers.themoviedb.org/
- **TMDb Forums**: https://www.themoviedb.org/talk
- **Check browser console**: Press F12 for errors
- **GitHub Issues**: Open an issue in your repo

---

## 🎬 You're Almost There!

Just add the TMDb API key and you'll have a fully functional streaming platform with real content!

**Get started**: https://www.themoviedb.org/signup
