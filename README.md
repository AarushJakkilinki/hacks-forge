# StudyParadise

An AI-powered study platform that helps learners move beyond memorization to understand concepts, make connections, and apply what they learn.

## Features

- **Four AI Teachers**: Aero (friendly guide), Coach (motivator), Professor (rigorous), Study Buddy (relaxed)
- **Guided Tutor**: Socratic question-and-answer sessions
- **Quiz Lab**: Adaptive difficulty quizzes tailored to your study set
- **Flashcards**: Spaced repetition with AI generation
- **Roadmap**: AI-generated study plans for exams and projects
- **Chat**: Direct answers with examples and follow-ups
- **Play Zone**: Four interactive games (City Run, Rocket Defender, Match, Flash Blitz)
- **Writing Coach**: AI essay feedback with rubric-based scoring
- **Mini Lessons**: Narrated slides on any topic
- **Calendar**: Week/month views, exam tracking, and AI-built study schedules
- **Lecture Capture**: Live transcription and study set generation

## Setup for Local Development

### 1. Clone and Install

```bash
git clone <your-repo>
cd StudyParadise
npm install http-server -g  # Optional: for local server
```

### 2. File Structure

```
.
├── index.html          # Main HTML (no build required)
├── style.css           # Styles (23 KB)
├── app.js              # All logic (90 KB)
├── .env.example        # Environment template
└── README.md
```

### 3. Environment Setup

Copy `.env.example` to `.env.local` and add your API key:

```bash
cp .env.example .env.local
# Edit .env.local and add your key:
# ANTHROPIC_API_KEY=sk-ant-...
```

### 4. Running Locally

**Option A: Simple HTTP Server**
```bash
# Python 3
python3 -m http.server 8000

# Or Node
npx http-server
```
Open `http://localhost:8000` and allow Claude access when prompted.

**Option B: Direct File**
Open `index.html` directly in your browser (works offline for demo, AI features need internet).

## Deployment for Hackathon Judges

StudyParadise has **three deployment options** depending on whether judges have Claude access:

### Option 1: Claude.ai Artifact (Recommended — No Setup)
The fastest way for judges to test everything:

1. Paste `app.js` + `style.css` + `<body>` from `index.html` into Claude at https://claude.ai
2. Claude asks "Allow Claude access to AI features?" → Accept
3. Judges use all AI features immediately, no keys needed

**Link to demo:** Share a claude.ai artifact link with the judges.

### Option 2: GitHub Pages (Static, No AI Without Proxy)
Great for code review; AI features don't work without a backend.

```bash
git push origin main
# Enable GitHub Pages in Settings → Pages → Deploy from main
```
Judges see the full UI but can't use AI unless they bring their own Claude account and allow it in-browser.

### Option 3: Vercel/Netlify + API Proxy (Full AI Access)
Judges can use all AI features without their own Claude account.

**Setup:**
1. Create a Vercel project from your GitHub repo
2. Add environment variable in Vercel dashboard:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```
3. Create `/api/claude.js` (see below)
4. Update `app.js` to call your proxy instead of direct Claude

**Example Vercel Edge Function** (`/api/claude.js`):
```javascript
import Anthropic from '@anthropic-ai/sdk';

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  
  const { messages } = await req.json();
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
  const result = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1000,
    messages,
  });
  
  return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } });
};
```

Then in `app.js`, change the Claude call from:
```javascript
const sm = await getSample();
const result = await sm.json(prompt, options);
```

To:
```javascript
const response = await fetch('/api/claude', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages }),
});
const result = await response.json();
```

## For Hackathon Judges

**We recommend Option 1 (Claude.ai Artifact):**
- ✅ No setup required
- ✅ All AI features work
- ✅ Judges keep their own Claude access
- ✅ No API key exposure
- ✅ Takes 30 seconds to demo

**Fallback (GitHub Pages):**
- ✅ Code is visible for review
- ❌ AI features require judge to have Claude account and allow access (slower, less impressive demo)

## How It Works

### AI Calls
- **Concurrency:** Max 2 simultaneous requests, ~0.6s apart
- **Deduplication:** Identical in-flight requests merge into one
- **Rate Limiting:** 15-second cooldown if `rate_limited`, then retry
- **No Auto-Retry:** Retries are always manual (per Anthropic guidance)
- **Errors:** Friendly messages mapped to error codes

### Data Persistence
- Study sets, scores, progress, and calendar events save to browser `localStorage`
- No server/database needed for local play
- (Optional) Can add a backend to sync across devices

### No Build Process
- Vanilla JavaScript (no React, Vue, etc.)
- No npm dependencies in production
- CSS-in-file (no build tools)
- Single-file deployment (or split for GitHub)

## Testing Checklist

- [ ] Onboarding: create a study set from notes or a subject
- [ ] Chat: pick a teacher and ask a question
- [ ] Quiz Lab: take a 5-question quiz on Medium difficulty
- [ ] Flashcards: flip a card and generate 10 more
- [ ] Guided Tutor: start a tutoring session on a topic
- [ ] Play Zone: play one game (City Run is fastest to test)
- [ ] Calendar: add an exam and create a study plan
- [ ] Writing Coach: paste an essay and get feedback
- [ ] Mini Lessons: watch a narrated explainer slide

## Tech Stack

- **Frontend:** Vanilla JavaScript, CSS Grid/Flexbox
- **AI:** Anthropic Claude (via `sample` capability or API proxy)
- **Storage:** Browser localStorage (no backend)
- **Canvas:** Four custom games with requestAnimationFrame
- **Audio:** Web Audio API (beeps) + Web Speech API (TTS/STT)

## Environment Variables

See `.env.example` for all variables.

| Variable | Required | Where Used |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | Optional | Only needed if using an API proxy server |

If using Claude.ai artifact or allowing browser-level Claude access, no key is needed.

## Questions?

- **"Can I deploy without an API key?"** Yes, use Option 1 (Claude.ai) or GitHub Pages. Judges with Claude access can still use AI features.
- **"Will the AI features work for judges without Claude?"** Only if you set up an API proxy (Option 3). Otherwise, they need their own account.
- **"Do I need a database?"** No. LocalStorage handles all persistence for a single browser. Add a backend if you want cross-device sync.
- **"Can I modify the design?"** Absolutely. All code is in one `.js` file and one `.css` file for easy editing.

## Credits

Built for the AI + Education Hackathon.
