## 🚀 DEPLOYMENT GUIDE

Choose your favorite platform and deploy your portfolio in minutes!

---

## 1. **VERCEL** (Recommended - Easiest & Free!)

### Installation
```bash
npm i -g vercel
```

### Deploy
```bash
cd /workspaces/myweb_meghana
vercel
```

### Follow Prompts
- Project name: Press Enter (default: myweb_meghana)
- Framework: Select "Other"
- Output directory: Press Enter

**Your site goes live automatically!** 🎉

URL Format: `https://myweb-meghana.vercel.app`

---

## 2. **GitHub Pages** (Free & Professional)

### Prerequisites
- GitHub account
- Git installed

### Steps

**1. Initialize Git (if not already done)**
```bash
cd /workspaces/myweb_meghana
git config user.name "Your Name"
git config user.email "your@email.com"
git add .
git commit -m "Initial portfolio commit"
```

**2. Create Repository on GitHub**
- Go to github.com → New repository
- Name: `myweb_meghana`
- Public (for Pages)
- Click "Create repository"

**3. Connect & Push**
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/myweb_meghana.git
git push -u origin main
```

**4. Enable GitHub Pages**
- Go to repo → Settings → Pages
- Source: Deploy from branch
- Branch: main → /(root)
- Save

**Your site:** `https://YOUR_USERNAME.github.io/myweb_meghana`

---

## 3. **Netlify** (Easiest via UI)

### Option A: Drag & Drop (Super Easy!)

1. Go to **netlify.com** (no login needed initially)
2. Drag your `myweb_meghana` folder onto the drop zone
3. Wait for deploy
4. Done! Your URL appears 🎉

### Option B: Git Deploy

1. Sign up on netlify.com
2. Create account with GitHub
3. Click "New site from Git"
4. Select repository
5. Deploy settings: auto-fill perfect
6. Click "Deploy site"

---

## 4. **Firebase Hosting** (Google's Platform)

### Installation
```bash
npm i -g firebase-tools
firebase login  # Sign in with Google account
```

### Setup
```bash
cd /workspaces/myweb_meghana
firebase init hosting
```

### Configuration
- Use existing project? NO
- Project name: Enter a name
- Hosting directory: `.` (current)
- Single page app? NO
- Delete public? NO

### Deploy
```bash
firebase deploy
```

**Your site:** `https://your-project.web.app`

---

## 5. **AWS S3 + CloudFront** (Professional)

### Prerequisites
- AWS account
- AWS CLI installed

### Steps

```bash
# Create S3 bucket
aws s3 mb s3://myweb-meghana-portfolio

# Upload files
aws s3 sync /workspaces/myweb_meghana s3://myweb-meghana-portfolio

# Make index.html the root
aws s3 cp s3://myweb-meghana-portfolio/index.html s3://myweb-meghana-portfolio/index.html --metadata-directive REPLACE --cache-control 'max-age=0, no-cache'

# Enable static website hosting
aws s3 website s3://myweb-meghana-portfolio --index-document index.html
```

**Your site:** S3 bucket properties → Static website hosting

---

## 6. **Heroku** (Legacy but Still Works)

### Prerequisites
- Heroku account
- Heroku CLI installed

### Create Procfile
```bash
echo "web: python3 -m http.server \$PORT" > Procfile
```

### Deploy
```bash
heroku login
heroku create myweb-meghana
git push heroku main
```

**Your site:** `https://myweb-meghana.herokuapp.com`

---

## 7. **DigitalOcean App Platform**

### Steps

1. Go to **cloud.digitalocean.com**
2. Apps → Create App
3. Connect GitHub repo
4. Configure: Static site (nginx)
5. HTTP port: 80
6. Deploy!

**Your site:** auto-generated `.ondigitalocean.app` domain

---

## 8. **Cloudflare Pages** (Fast CDN!)

### Prerequisites
- Cloudflare account (free)
- GitHub connected

### Steps

1. Go to **pages.cloudflare.com**
2. Create project
3. Connect GitHub
4. Select repository
5. Framework: None (static files)
6. Build settings: Skip (local build)
7. Deploy!

**Your site:** `https://myweb-meghana.pages.dev`

---

## 9. **Local Alternatives** (For Testing)

### Python HTTP Server
```bash
python3 -m http.server 8000
# Visit: http://localhost:8000
```

### Node.js HTTP Server
```bash
npx http-server
# Visit: http://localhost:8080
```

### Live Server (VS Code)
1. Right-click `index.html`
2. Select "Open with Live Server"
3. Auto-opens in browser with auto-reload

---

## Performance Tips

### Before Deploying

1. **Optimize Images**
   ```bash
   # Compress images (if you add any)
   imagemin assets/ --out-dir=assets/
   ```

2. **Minify CSS/JS** (Optional)
   ```bash
   # Using CSS minifier
   npx csso-cli style.css -o style.min.css
   ```

3. **Test Performance**
   - Use Chrome DevTools → Lighthouse
   - Target: 90+ score

### CDN Delivery
- Three.js ✅ Already from CDN
- GSAP ✅ Already from CDN
- No build step needed!

---

## Custom Domain

### Using Your Own Domain

1. **Buy domain** on Namecheap, Google Domains, etc.
2. **Update DNS** in domain registrar:
   
   **For Vercel:**
   - Add CNAME: `cname.vercel-dns.com`

   **For Netlify:**
   - Add CNAME: Your Netlify URL
   
   **For GitHub Pages:**
   - Add CNAME: `YOUR_USERNAME.github.io`

3. **Wait 24-48 hours** for DNS propagation

4. Test: Visit your-domain.com

---

## Comparison Table

| Platform | Setup Time | Cost | Custom Domain | SSL | CDN |
|----------|-----------|------|---|---|---|
| **Vercel** | 1 min | Free | ✅ (paid) | ✅ | ✅ |
| **GitHub Pages** | 5 min | Free | ✅ | ✅ | ✅ |
| **Netlify** | 2 min | Free | ✅ (paid) | ✅ | ✅ |
| **Firebase** | 5 min | Free | ✅ (paid) | ✅ | ✅ |
| **Cloudflare** | 3 min | Free | ✅ (paid) | ✅ | ✅ |
| **AWS S3** | 10 min | Paid | ✅ | ✅ | Need CloudFront |
| **DigitalOcean** | 5 min | Paid | ✅ | ✅ | ✅ |

---

## My Recommendation 🎯

### For Beginners
→ **Netlify Drag & Drop** (2 minutes, zero config)

### For Best Performance
→ **Vercel** (1 minute, auto-CDN, auto-scaling)

### For Maximum Control
→ **GitHub Pages** (free, permanent home)

### For Enterprise
→ **AWS or DigitalOcean** (scalable, controls)

---

## Troubleshooting

### "404 - Not Found"
- CSS/JS files not loading
- Solution: Check file paths in HTML
- Ensure files are in repo root

### "Canvas not rendering"
- Three.js CDN might be down
- Solution: Try different CDN mirror

### "Navigation not scrolling"
- HTML anchors not matching
- Solution: Check `#` IDs in links

### "Styles look broken"
- CSS not being applied
- Solution: Hard refresh (Ctrl+Shift+Delete)

---

## Next Steps

1. ✅ Choose platform above
2. ✅ Follow deployment steps
3. ✅ Share URL with recruiters
4. ✅ Get hired! 🚀

---

**Made with ❤️ for Meghana B**

Choose your platform and deploy now! 🎉
