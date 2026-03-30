# 🚀 Pear Media Setup Guide

Complete step-by-step guide to get your project running locally and ready for deployment.

---

## Phase 1: Account & API Setup (15 minutes)

### Step 1: Create Email Account

1. Go to [gmail.com](https://gmail.com)
2. Click "Create account"
3. Enter name: `namepearmedia` (or similar)
4. Create password (save it!)
5. **Keep this email for all API signups**

### Step 2: OpenAI API Setup

1. Go to [platform.openai.com](https://platform.openai.com)
2. Click "Sign Up" and use your new Gmail
3. Verify email and complete verification
4. Go to "API Keys" section
5. Click "Create new secret key"
6. Copy the key (looks like: `sk-...`)
7. **Save this key safely** - you won't see it again!
8. Add $5-$10 credit to your account:
   - Go to "Billing"
   - Click "Add to balance"
   - Add payment method
   - Choose amount

### Step 3: Google Gemini API Setup

1. Go to [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Sign in with your Gmail account
3. Click "Get API key" or "Create new API key"
4. **If Free Tier:**
   - You'll get `AIzaSy...` format key
5. Copy the key
6. **Save this key safely**

---

## Phase 2: Local Development Setup (10 minutes)

### Step 4: Prepare Your Environment

1. Open terminal/PowerShell in your project folder:
   ```bash
   cd c:\Users\jagad\OneDrive\Desktop\pear
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   
   This installs all packages listed in `package.json`:
   - React 18
   - Tailwind CSS
   - Lucide icons
   - Axios

3. Create `.env` file:
   ```bash
   # Windows PowerShell
   New-Item -Path ".env" -Type File
   
   # Or manually: Right-click → New → Text Document, rename to ".env"
   ```

### Step 5: Add Your API Keys

1. Open `.env` file in VS Code
2. Add your keys (replace `your_XXX_here`):

```env
REACT_APP_OPENAI_KEY=sk-your_actual_openai_key
REACT_APP_GEMINI_KEY=AIzaSy_your_actual_gemini_key
REACT_APP_OPENAI_ENDPOINT=https://api.openai.com/v1
REACT_APP_GEMINI_ENDPOINT=https://generativelanguage.googleapis.com/v1beta/models
```

3. **⚠️ IMPORTANT:** Add this to `.gitignore`:
   - `.env` file should already be in `.gitignore`
   - Verify it's there: `node_modules/` and `.env`

### Step 6: Start Development Server

```bash
npm start
```

**What happens:**
- Browser opens to `http://localhost:3000`
- You should see Pear Media UI
- If you see API warnings, check your `.env` file

---

## Phase 3: Testing Workflows (10 minutes)

### Test Text Workflow

1. Click "Creative Studio" tab
2. Enter prompt: `"A serene mountain landscape at sunset"`
3. Click "Enhance with AI"
4. Wait 10-20 seconds
5. You should see enhanced prompt
6. Click "Generate Image"
7. Wait 20-30 seconds
8. Image appears!

**If error:** Check console (F12) for API warnings

### Test Image Workflow

1. Click "Style Lab" tab
2. Find any image on your computer
3. Upload it (drag & drop or click)
4. Click "Analyze Image"
5. Wait 10-15 seconds
6. See analysis results (colors, style, objects)
7. Click "Generate Variations"
8. Wait for variations to generate

**If error:** Check console (F12) for file size warnings

---

## Phase 4: Prepare for Deployment (15 minutes)

### Before Deployment Checklist

- [ ] `.env` file is in `.gitignore`
- [ ] All npm dependencies installed
- [ ] App runs locally with `npm start`
- [ ] Both workflows tested successfully
- [ ] No sensitive keys in code or git history

### Create GitHub Repository

1. Create account at [github.com](https://github.com)
2. Click "+" → "New repository"
3. Name: `pearmedia-ai-prototype`
4. Description: "AI-powered image and text generation web app"
5. Choose "Public"
6. **Do NOT add .gitignore or README** (we have these)
7. Click "Create repository"

### Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial Pear Media commit with all workflows"

# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/pearmedia-ai-prototype.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Phase 5: Deploy to Vercel (5 minutes) - RECOMMENDED

### Deploy Steps

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" (use GitHub account - click "Continue with GitHub")
3. Authorize GitHub
4. Click "New Project"
5. Find `pearmedia-ai-prototype` in your repos
6. Click "Import"
7. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add `REACT_APP_OPENAI_KEY` = your key
   - Add `REACT_APP_GEMINI_KEY` = your key
   - Add the two endpoint variables
8. Click "Deploy"
9. **Wait 3-5 minutes** for deployment
10. You get a live URL! 🎉

### Your Live Link
```
https://pearmedia-ai-prototype.vercel.app
```

---

## Alternative: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Sign up" → "Sign up with GitHub"
3. Click "New site from Git"
4. Select `pearmedia-ai-prototype`
5. Set Build command: `npm run build`
6. Set Publish directory: `build`
7. Add environment variables (same as Vercel)
8. Click "Deploy"

---

## Alternative: Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update `package.json`:
   ```json
   "homepage": "https://username.github.io/pearmedia-ai-prototype",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build",
     ...
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

---

## Troubleshooting

### Issue: "npm: command not found"
**Solution:** Install Node.js from [nodejs.org](https://nodejs.org) (v18+)

### Issue: ".env not recognized"
**Solution:** Create as text file, name it `.env` (not `.env.txt`)

### Issue: "API Key is invalid"
**Solution:** 
- Copy key WITHOUT any spaces
- Make sure you're using the right key (not api_key hash)
- Restart `npm start` after updating `.env`

### Issue: "Image generation fails"
**Solution:**
- Check OpenAI account has credits
- Check API key in OpenAI dashboard hasn't been revoked
- Wait 30 seconds and try again

### Issue: "Can't upload image"
**Solution:**
- Image must be under 5MB
- Must be JPG, PNG, or WebP
- Try a smaller image first

### Issue: "Deployed site shows blank page"
**Solution:**
- Check Vercel/Netlify build logs
- Ensure all environment variables are set
- Check browser console (F12) for errors

---

## Running Production Build Locally

To test your production build:

```bash
npm run build
npm install -g serve
serve -s build
```

Visit `http://localhost:3000` to see production version.

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm start` | Start development server |
| `npm run build` | Create production build |
| `npm test` | Run tests |
| `npm install package-name` | Add new package |
| `git add .` | Stage all changes |
| `git commit -m "msg"` | Commit changes |
| `git push` | Push to GitHub |

---

## Next Steps

1. ✅ Get API keys
2. ✅ Set up `.env`
3. ✅ Test locally
4. ✅ Push to GitHub
5. ✅ Deploy to Vercel
6. ⏭️ Create execution video
7. ⏭️ Submit assignment

---

## Need Help?

- **Browser Console:** Press `F12`, check Console tab for errors
- **Terminal Errors:** Read error messages carefully, search on Google
- **API Docs:**
  - OpenAI: [platform.openai.com/docs](https://platform.openai.com/docs)
  - Gemini: [ai.google.dev/docs](https://ai.google.dev/docs)

---

**Happy building! 🚀**
