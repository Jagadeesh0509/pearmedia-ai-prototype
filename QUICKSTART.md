# 🎯 Pear Media - Quick Start Guide

Get up and running in 5 minutes!

---

## For the Impatient (TL;DR)

```bash
# 1. Get API Keys (5 minutes)
# - OpenAI: platform.openai.com (get sk-... key)
# - Gemini: makersuite.google.com (get AIzaSy-... key)

# 2. Setup (.env file)
# Create .env in project root and add:
REACT_APP_OPENAI_KEY=sk-your-key
REACT_APP_GEMINI_KEY=AIzaSy-your-key
REACT_APP_OPENAI_ENDPOINT=https://api.openai.com/v1
REACT_APP_GEMINI_ENDPOINT=https://generativelanguage.googleapis.com/v1beta/models

# 3. Install & Run
npm install
npm start

# 4. Deploy (optional, for live URL)
# Go to vercel.com → import repo → add env vars → deploy

# 5. Done! 🎉
```

---

## 5-Minute Workflow

### Minute 1: Collect API Keys

**OpenAI:**
- Go to: platform.openai.com/api-keys
- New key → Copy → Save
- Add $5 credit for testing

**Gemini:**
- Go to: makersuite.google.com/app/apikey
- Get key → Copy → Save

### Minute 2-3: Configure Project

```bash
# Create .env file
# Add your keys

# OR just copy .env.example:
cp .env.example .env
# Then edit .env with your actual keys
```

### Minute 4: Install & Run

```bash
npm install
npm start
```

Opens browser to `http://localhost:3000`

### Minute 5: Test It!

**Creative Studio:**
- Enter: "A sunset beach scene"
- Click "Enhance with AI"
- Click "Generate Image"
- Watch magic happen ✨

**Style Lab:**
- Upload any image
- Click "Analyze"
- Click "Generate Variations"
- Done!

---

## Project Structure

```
pear/
├── 📄 README.md ← Start here!
├── 📄 SETUP.md ← Detailed setup
├── 📄 DEPLOYMENT.md ← How to deploy
├── 📄 SUBMISSION.md ← For assignment
├── 📄 src/
│   ├── App.js ← Main component
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── WorkflowText.js ← Text workflow
│   │   ├── WorkflowImage.js ← Image workflow
│   │   └── ImageCard.js
│   └── utils/
│       ├── apiHelpers.js ← API calls
│       └── constants.js ← Configuration
└── 📄 .env ← Your secret keys (create this!)
```

---

## File Guide

| File | Purpose | Read If |
|------|---------|---------|
| **README.md** | Full documentation | Want complete overview |
| **SETUP.md** | Step-by-step setup | Following instructions |
| **DEPLOYMENT.md** | How to deploy live | Want to go online |
| **SUBMISSION.md** | Assignment checklist | Submitting project |
| **.env.example** | Template for keys | Need to configure |

---

## Common Tasks

### "Help! I get API errors"

```
1. Check F12 console for exact error
2. Verify keys in .env file (no spaces!)
3. Restart npm start after updating .env
4. Check API account has credits
```

### "How do I test locally?"

```bash
npm start  # Runs at localhost:3000
npm test   # Run tests
npm run build  # Create production build
```

### "How do I deploy?"

See DEPLOYMENT.md - Choose one:
- **Vercel** (easiest) ⭐
- Netlify (alternative)
- GitHub Pages (limited)

### "How do I show this as assignment?"

See SUBMISSION.md - Need:
- ✅ Live URL
- ✅ GitHub repo
- ✅ Execution video (5 min)

---

## Directory Structure

```
src/
├── App.js
│   └── Main component with tab switching
│       └── Manages activeTab state
│
├── components/
│   ├── Navbar.js
│   │   └── Header with Creative Studio / Style Lab tabs
│   │
│   ├── WorkflowText.js
│   │   └── Step 1: Input
│   │       Step 2: Enhance (GPT-4o-mini)
│   │       Step 3: Approve/Edit
│   │       Step 4: Generate (DALL-E 3)
│   │
│   ├── WorkflowImage.js
│   │   └── Step 1: Upload
│   │       Step 2: Analyze (Gemini Vision)
│   │       Step 3: Generate Variations (DALL-E 3)
│   │
│   └── ImageCard.js
│       └── Reusable image display component
│
└── utils/
    ├── apiHelpers.js
    │   ├── getEnhancedPrompt() → OpenAI
    │   ├── generateImage() → DALL-E 3
    │   ├── analyzeImage() → Gemini
    │   ├── generateImageVariation() → DALL-E 3
    │   └── fileToBase64() → Helper
    │
    └── constants.js
        └── Configuration & constants
```

---

## One-Command Setup

```bash
# Copy and paste this entire block:

# 1. Navigate to project
cd c:\Users\jagad\OneDrive\Desktop\pear

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# Then open http://localhost:3000 in your browser
```

---

## API Keys Cheat Sheet

### Get OpenAI Key

1. Go to: https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy (looks like: `sk-proj-...`)
4. Add to .env: `REACT_APP_OPENAI_KEY=sk-proj-...`

### Get Gemini Key

1. Go to: https://makersuite.google.com/app/apikey
2. Click "Create API key"
3. Copy (looks like: `AIzaSy...`)
4. Add to .env: `REACT_APP_GEMINI_KEY=AIzaSy...`

---

## Environment Variables

Your `.env` file needs exactly these 4 variables:

```env
REACT_APP_OPENAI_KEY=sk-your-actual-openai-key-here
REACT_APP_GEMINI_KEY=AIzaSy-your-actual-gemini-key-here
REACT_APP_OPENAI_ENDPOINT=https://api.openai.com/v1
REACT_APP_GEMINI_ENDPOINT=https://generativelanguage.googleapis.com/v1beta/models
```

**⚠️ IMPORTANT:**
- All must start with `REACT_APP_`
- No spaces around `=` sign
- Must restart `npm start` after changes
- **Never commit .env to git** ✅ (Already in .gitignore)

---

## Testing Workflows

### Text Workflow

```
Input: "A cat wearing sunglasses"
        ↓
Enhance: AI adds details about lighting, style, etc.
        ↓
Approve: You review and can edit
        ↓
Generate: DALL-E creates the image
        ↓
Output: Beautiful image!
```

### Image Workflow

```
Upload: Your local image file
        ↓
Analyze: Gemini detects objects, colors, style
        ↓
Generate: DALL-E creates variations
        ↓
Output: Multiple styled versions!
```

---

## Troubleshooting Quick Links

| Problem | Solution |
|---------|----------|
| "npm not found" | Install Node.js from nodejs.org |
| ".env not working" | File must be named exactly `.env` |
| "API key invalid" | Copy key WITHOUT leading/trailing spaces |
| "Image generation slow" | Normal! Takes 15-30 seconds |
| "Module not found" | Run `npm install` again |
| "Port 3000 in use" | Kill other process or use different port |

---

## Next Steps

1. ✅ **Read this file** (you are here!)
2. 🔑 **Get API keys** (see SETUP.md for detailed guide)
3. 🔧 **Configure .env** (add your keys)
4. 🚀 **Run locally** (`npm start`)
5. 🎯 **Test workflows** (both text and image)
6. 🌐 **Deploy** (see DEPLOYMENT.md when ready)
7. 🎬 **Record video** (see SUBMISSION.md)
8. 📦 **Submit** (collect links)

---

## Important Links

- **Live Website:** Will be your Vercel URL after deploy
- **GitHub Repo:** github.com/yourname/pearmedia-ai-prototype
- **API Documentation:**
  - OpenAI: https://platform.openai.com/docs
  - Gemini: https://ai.google.dev/docs

---

## File Locations

```
Main project root:
c:\Users\jagad\OneDrive\Desktop\pear\

Your files:
.env ← Create this! (Add your API keys)
src/App.js ← Main component
src/components/ ← All React components
src/utils/ ← API and helper functions
package.json ← Dependencies list
```

---

## Commands Cheat Sheet

```bash
npm start              # Run development server
npm stop               # Stop server (Ctrl+C)

npm install            # Install dependencies
npm install package    # Add new package

npm run build          # Create production build
npm test               # Run tests

npm run deploy         # Deploy to GitHub Pages (if configured)

git status             # Check git status
git add .              # Stage all changes
git commit -m "msg"    # Commit changes
git push               # Push to GitHub
```

---

## Speed Optimization Tips

### Faster API calls
- First call may take longer (API warming up)
- Subsequent calls usually faster
- Normal: 10-30 seconds for image generation

### Faster Development
- Use React DevTools browser extension
- Use code editor shortcuts
- Test locally before deploying

---

## Getting Help

1. **Check browser console:** F12 → Console tab
2. **Read error messages:** They tell you what's wrong!
3. **Check SETUP.md:** Most issues covered there
4. **Google the error:** Usually has solutions
5. **Read API docs:** Official documentation is your friend

---

## Before Submitting

Verify:
- [ ] Website loads at deployed URL
- [ ] Creative Studio works end-to-end
- [ ] Style Lab works end-to-end
- [ ] No console errors (F12)
- [ ] Image downloads work
- [ ] Mobile responsive
- [ ] Execution video recorded
- [ ] GitHub repo public
- [ ] All links working

---

## You're Ready! 🚀

This project is fully set up and ready to go.

**Next action:** Get your API keys and update `.env`

Then run: `npm start`

Enjoy! 🎨

---

**Questions?** Check the detailed guides:
- Setup issues → SETUP.md
- Deployment → DEPLOYMENT.md
- Assignment info → SUBMISSION.md
- Project overview → README.md

**PEAR MEDIA © 2024**
