# Deploy to Vercel in 5 Minutes

## Step 1: Download Your Files

Click the file cards below to download:
- `index.html`
- `style.css`
- `app.js`
- `README.md`
- `DEPLOY.md`
- `.env.example`
- `.gitignore`
- `vercel.json`

Create a folder called `studyparadise` and put all files in it.

## Step 2: Create a GitHub Repository

### Option A: GitHub Web (Easiest)
1. Go to https://github.com/new
2. Name: `studyparadise`
3. Description: "AI-powered study platform"
4. **Uncheck** "Add .gitignore" and "Add a license" (you already have these)
5. Click "Create repository"
6. GitHub shows you commands to run

### Option B: GitHub CLI
```bash
cd studyparadise
git init
git add .
git commit -m "Initial StudyParadise hackathon submission"
git branch -M main
git remote add origin https://github.com/yourusername/studyparadise.git
git push -u origin main
```

## Step 3: Connect to Vercel

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Paste your GitHub repo URL: `https://github.com/yourusername/studyparadise.git`
4. Click "Import"

**Vercel automatically detects:**
- It's a vanilla HTML/CSS/JS project
- No build needed
- No framework
- Ready to deploy instantly

Click "Deploy" and wait ~1 minute.

## Step 4: Add Your API Key (if judges need AI without Claude)

**Skip this if you're using the Claude.ai artifact approach** — judges will have their own Claude access.

**Do this if you want judges to test everything without needing Claude:**

1. Go to your Vercel dashboard
2. Select your `studyparadise` project
3. Click **Settings** → **Environment Variables**
4. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-...` (your real key)
   - Click "Add"
5. Click **Deployments**
6. Find the latest deployment
7. Click the three dots → **Redeploy**

Now all API calls are routed through Vercel's servers (judges can't see your key).

## Step 5: Share the Link

Vercel gives you a URL like: `https://studyparadise-abc123.vercel.app`

Give this link to judges. They can:
- Click the link
- See the full app with AI features working
- Don't need their own Claude account (if you added the API key)

## That's It!

Your app is live. Every time you push to GitHub, Vercel auto-deploys.

---

## Troubleshooting

### "Page not found" or blank page
- Make sure `index.html` is in the root folder (not in a subfolder)
- Vercel should serve `index.html` as the home page automatically

### "Claude not available" error
- You forgot to add `ANTHROPIC_API_KEY` to Vercel
- Or the key is expired
- Or judges don't have Claude and you didn't set up the API proxy
- **See DEPLOY.md for the API proxy setup**

### "CSS/JS not loading"
- Check that `index.html` imports are correct:
  ```html
  <link rel="stylesheet" href="style.css">
  <script src="app.js"></script>
  ```
- Vercel serves these files as-is (no processing needed)

### Judges can't use AI features
**Option 1:** Tell judges to allow Claude access in their browser (free, no setup)
**Option 2:** Set up the API proxy in `DEPLOY.md` and add your API key to Vercel
**Option 3:** Share a Claude.ai artifact link instead (fastest, no Vercel needed)

### Want to make changes after deploying?
1. Edit `index.html`, `style.css`, or `app.js` locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update UI"
   git push
   ```
3. Vercel automatically redeploys in ~30 seconds

---

## Quick Links

- **Your Vercel dashboard:** https://vercel.com/dashboard
- **GitHub:** https://github.com (create your account if you don't have one)
- **Test locally first:** `python3 -m http.server 8000`
- **Claude.ai (faster alternative):** https://claude.ai (paste HTML/CSS/JS into an artifact)

## Environment Variables Summary

| Where | Key | Value |
| --- | --- | --- |
| Vercel Dashboard | `ANTHROPIC_API_KEY` | `sk-ant-...` (your key) |
| Local `.env.local` | `ANTHROPIC_API_KEY` | `sk-ant-...` (only if using API proxy) |
| GitHub (`.gitignore`) | (never commit keys) | (none) |

**Important:** Never put your API key in code. Always use environment variables.

---

## Two Deployment Strategies

### Strategy 1: Claude.ai Artifact (Recommended for Hackathons)
- **Setup time:** 30 seconds
- **AI works?** Yes, judge uses their own Claude
- **Judge setup:** None (click link, allow Claude, done)
- **Code on GitHub?** Yes (for review)
- **Live demo link:** Claude.ai artifact URL

**Steps:**
1. Push to GitHub (for code review)
2. Paste HTML/CSS/JS into Claude.ai
3. Share the artifact link with judges
4. Done!

### Strategy 2: Vercel + API Proxy (If judges don't have Claude)
- **Setup time:** 15 minutes
- **AI works?** Yes, calls routed through your server
- **Judge setup:** None (click link, everything works)
- **Code on GitHub?** Yes
- **Live demo link:** Vercel URL

**Steps:**
1. Push to GitHub
2. Connect to Vercel
3. Add `ANTHROPIC_API_KEY` in Vercel dashboard
4. Set up API proxy (see DEPLOY.md)
5. Share Vercel link with judges
6. Done!

**Recommendation:** Use Strategy 1 for fastest demo. Only do Strategy 2 if judges explicitly don't have Claude access.
