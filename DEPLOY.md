# Deployment Guide for Hackathon Judges

## Quick Start for Judges

### Best: Claude.ai Artifact (30 seconds, no setup)
**What judges see:**
- All AI features working
- No API key needed
- Fastest demo

**Setup:**
1. Go to https://claude.ai
2. Start a new conversation
3. Paste this into Claude:
   ```
   I have a study app. Create an artifact with these files:
   - HTML: [paste index.html body]
   - CSS: [paste style.css]
   - JS: [paste app.js]
   ```
4. Claude creates an artifact
5. Share the artifact link with judges
6. Judges click the link and allow Claude access when prompted

---

## For GitHub + Vercel (Full AI Access)

If you want judges to test the full app without needing Claude access themselves:

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "StudyParadise hackathon submission"
git remote add origin https://github.com/yourusername/studyparadise.git
git push -u origin main
```

### 2. Deploy to Vercel

**Option A: CLI**
```bash
npm install -g vercel
vercel --prod
# Vercel creates a .vercel/ folder and deploys automatically
```

**Option B: Web**
1. Go to https://vercel.com/new
2. Connect your GitHub repo
3. Click "Import"

### 3. Add API Key to Vercel

In Vercel dashboard:
1. Project Settings → Environment Variables
2. Add: `ANTHROPIC_API_KEY` = `sk-ant-...`
3. Redeploy

### 4. Create API Proxy

If using a Vercel serverless function, create `/api/claude.js`:

```javascript
const Anthropic = require('@anthropic-ai/sdk').default;

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, model = 'claude-opus-4-6', max_tokens = 1024 } = req.body;

    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await client.messages.create({
      model,
      max_tokens,
      messages,
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error('Claude API error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to call Claude',
      code: error.code,
    });
  }
};
```

### 5. Update app.js to Use Proxy

In `app.js`, replace the `J()` function to call your API:

**Find:**
```javascript
async function J(p, o) {
  // ... existing code calling sm.json()
}
```

**Replace with:**
```javascript
async function J(p, o) {
  o = o || {};
  const key = p + '|' + (o.modelTier || '') + '|' + (o.cache === false ? 'f' : 'c');
  
  if (Q.inf.has(key)) return Q.inf.get(key);
  
  const pr = new Promise((res, rej) => {
    if (Q.off) return rej({ code: 'not_granted' });
    if (Date.now() < Q.cool) return rej({ code: 'rate_limited' });
    
    Q.q.push({
      p,
      o,
      res,
      rej,
      fetch: async () => {
        try {
          const response = await fetch('/api/claude', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              messages: [{ role: 'user', content: p }],
              model: 'claude-opus-4-6',
              max_tokens: o.max_tokens || 1024,
            }),
          });
          
          if (!response.ok) throw { code: 'upstream_error' };
          const data = await response.json();
          return { text: data.content[0].text };
        } catch (e) {
          throw { code: e.code || 'unavailable', message: e.message };
        }
      },
    });
    pump();
  });
  
  Q.inf.set(key, pr);
  const dn = () => Q.inf.delete(key);
  pr.then(dn, dn);
  return pr;
}
```

---

## Deployment Comparison

| Method | Setup Time | AI Works? | Cost | Code Review | Best For |
| --- | --- | --- | --- | --- | --- |
| Claude.ai Artifact | 30s | ✅ Yes | Free | ⚠️ Limited | **Judges** |
| GitHub Pages | 5m | ❌ No* | Free | ✅ Yes | Code showcase |
| Vercel + Proxy | 15m | ✅ Yes | Free tier OK | ✅ Yes | Full demo |
| Netlify + Proxy | 15m | ✅ Yes | Free tier OK | ✅ Yes | Full demo |

*GitHub Pages: AI works only if judges have Claude and allow access in-browser.

---

## For Judges Without Claude Access

If a judge doesn't have Claude, they can still:
1. View the code on GitHub
2. Run locally and test the sample set (no AI needed)
3. See the UI/UX without AI features

To make sure they get the full experience, recommend Vercel deployment with the proxy.

---

## Troubleshooting

### "Claude is not available in this view"
- Judges need to use Claude.ai artifact link, not GitHub Pages
- Or Vercel + API proxy

### "Rate limited" errors during demo
- Normal. Wait 15 seconds and try again.
- Shows that the app handles rate limits gracefully.

### API key exposed in GitHub
- Never commit `.env.local` (add to `.gitignore`)
- Only add the key in Vercel/Netlify dashboard
- Use `.env.example` to show what's needed

### "Duplicate calls aren't deduping"
- The queue dedupes in-flight calls, not cached ones
- If you run the same request twice in a row (not simultaneously), it's two requests
- Simultaneous calls to the same prompt merge into one

---

## Recommended Setup for Judges

```
📦 StudyParadise
├── README.md (this overview)
├── DEPLOY.md (detailed deployment)
├── .env.example (template)
├── index.html (entry point)
├── style.css (23 KB, no dependencies)
├── app.js (90 KB, no dependencies)
└── vercel.json (optional, if using Vercel)
```

**Share with judges:**
1. GitHub link (for code review)
2. Claude.ai artifact link (for full AI demo) **← Easiest**
3. Vercel link (if you set up proxy)

Judges can pick whichever they prefer. The artifact is fastest and most impressive for a 5-10 minute demo.
