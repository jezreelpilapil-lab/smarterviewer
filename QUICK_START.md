# 🚀 SmartView - Quick Start Guide

## 🎯 What You Have

A complete, **ad-free** streaming web app ready to deploy to GitHub!

---

## ⚡ 3 Steps to Go Live

### Step 1️⃣: Test Locally (1 minute)

```powershell
# Double-click this file:
start-local-server.ps1

# OR run manually:
cd webapp
python -m http.server 8000
```

Open: **http://localhost:8000**

---

### Step 2️⃣: Push to GitHub (2 minutes)

```bash
# Create a new repository on GitHub named "Smartview"
# Then run these commands:

git init
git add .
git commit -m "🎬 Initial commit: SmartView web app"
git remote add origin https://github.com/YOUR_USERNAME/Smartview.git
git push -u origin main
```

---

### Step 3️⃣: Enable GitHub Pages (1 minute)

1. Go to your repo: `github.com/YOUR_USERNAME/Smartview`
2. Click **Settings** → **Pages**
3. Set:
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/webapp`
4. Click **Save**

✅ Done! Your site will be live in 2-5 minutes at:
**https://YOUR_USERNAME.github.io/Smartview/webapp/**

---

## 🎨 Customize (Optional)

### Change Colors

Edit `webapp/styles.css`:
```css
:root {
    --primary-color: #e50914;  /* Your color */
}
```

### Add Your Videos

Edit `webapp/app.js`:
```javascript
const sampleMovies = [
    {
        title: "My Movie",
        videoUrl: "https://your-video-url.mp4",
        thumbnail: "poster.jpg",
        // ... rest of fields
    }
];
```

### Use TMDb API (Free Movies Database)

1. Get free API key: https://www.themoviedb.org/settings/api
2. Update `app.js` - instructions in comments

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `webapp/index.html` | Main page |
| `webapp/styles.css` | All styling |
| `webapp/app.js` | All functionality |
| `README.md` | Full documentation |
| `PROJECT_INFO.md` | Detailed project info |

---

## 🆘 Troubleshooting

### "Page not found" after deployment
- Wait 5 minutes, GitHub Pages needs time
- Check Settings > Pages shows a green checkmark
- URL must include `/webapp/` at the end

### Videos won't play
- Add valid video URLs to `app.js`
- Ensure URLs use HTTPS
- Check browser console for errors

### Local server won't start
- Install Python: https://python.org
- Or use: `npx serve` (needs Node.js)

---

## 🎓 What's Included

✅ Responsive web design (works on all devices)  
✅ Search functionality  
✅ Video player  
✅ No ads, no tracking  
✅ GitHub Pages ready  
✅ Clean, modern UI  

## ❌ What's NOT Included

You need to provide:
- Video content URLs
- Content metadata (titles, descriptions)
- (Optional) TMDb API key for real movie data

---

## 📚 More Help

- **Full Setup**: Read `webapp/SETUP.md`
- **Project Details**: Read `PROJECT_INFO.md`
- **Issues**: Create a GitHub issue
- **Questions**: Check the main README.md

---

## 🎬 That's It!

You now have an ad-free streaming web app. Enjoy! 🍿

**Star the repo if you found this useful!** ⭐

---

**Pro Tip**: Bookmark your deployed site and share it with friends!

```
Your Live Site:
https://YOUR_USERNAME.github.io/Smartview/webapp/
```

Happy streaming! 🎉
