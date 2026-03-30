# 📦 Pear Media - Deployment Guide

Complete instructions for deploying to production.

---

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] No errors in `npm start`
- [ ] Both workflows tested locally
- [ ] `.env` file exists and has all keys
- [ ] `.env` is in `.gitignore` (verify!)
- [ ] API keys are valid (no placeholder text)
- [ ] Git repository created and pushed
- [ ] No sensitive data in code comments

---

## Option 1: Deploy to Vercel (⭐ RECOMMENDED)

### Why Vercel?
- Free tier for projects
- Best for React apps
- Automatic deployments on git push
- Fast, reliable CDN
- Easiest setup

### Step-by-Step

#### 1. Create Vercel Account

```bash
# Go to vercel.com
# Sign up with GitHub (easier)
# Or use Google/email
```

#### 2. Import from GitHub

1. Log in to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Click "Continue with GitHub"
4. Select `pearmedia-ai-prototype`
5. Click "Import"

#### 3. Configure Environment Variables

1. You'll see "Environment Variables" section
2. Add each variable:
   ```
   REACT_APP_OPENAI_KEY = sk-your-actual-key
   REACT_APP_GEMINI_KEY = AIzaSy-your-actual-key
   REACT_APP_OPENAI_ENDPOINT = https://api.openai.com/v1
   REACT_APP_GEMINI_ENDPOINT = https://generativelanguage.googleapis.com/v1beta/models
   ```
3. Make sure "All" radio button is selected (for production)
4. Click each "Add" button

#### 4. Deploy

1. Click "Deploy" button
2. Wait 2-5 minutes
3. You'll see "Congratulations!" when done
4. Your URL: `https://[project-name].vercel.app`

#### 5. Custom Domain (Optional)

1. Go to Project Settings
2. Click "Domains"
3. Add your domain
4. Follow instructions to update DNS

### After Deployment

Your site is now live! 

- **URL:** `https://pearmedia-ai-prototype.vercel.app`
- **Auto-redeploy:** Every time you push to GitHub
- **Logs:** Check Vercel Dashboard under "Deployments"

---

## Option 2: Deploy to Netlify

### Why Netlify?
- Free tier with generous limits
- Alternative to Vercel
- Good documentation
- Similar to Vercel in simplicity

### Step-by-Step

#### 1. Create Netlify Account

Go to [netlify.com](https://netlify.com) and sign up with GitHub

#### 2. Connect GitHub Repo

1. Click "New site from Git"
2. Select GitHub
3. Find and select `pearmedia-ai-prototype`

#### 3. Configure Build Settings

```
Build command: npm run build
Publish directory: build
```

#### 4. Add Environment Variables

1. Go to "Site Settings"
2. Click "Environment"
3. Add your variables:
   - `REACT_APP_OPENAI_KEY=...`
   - `REACT_APP_GEMINI_KEY=...`
   - etc.

#### 5. Deploy

1. Click "Deploy"
2. Wait for "Deploy to production"
3. Your URL: `https://[random-name].netlify.app`

### Verify Deployment

Check:
- ✅ Site loads without errors
- ✅ Creative Studio workflow works
- ✅ Style Lab workflow works
- ✅ Images generate correctly
- ✅ No console errors (F12)

---

## Option 3: Deploy to GitHub Pages

### Why GitHub Pages?
- Completely free
- Hosted directly from GitHub
- Good for static sites
- Limited to your username

### Limitations
- ⚠️ GitHub Pages doesn't support environment variables in the browser
- **Solution:** Store keys in Vercel/Netlify instead

### If You Still Want to Use GitHub Pages

1. Update `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/pearmedia-ai-prototype",
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add to `package.json` scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. In GitHub Settings → Pages, enable GitHub Pages on `gh-pages` branch

---

## Option 4: Deploy to Heroku (Alternative Backend)

If you add a backend server later:

```bash
npm install -g heroku

heroku login

# In your project folder
heroku create pearmedia-prototype

heroku config:set REACT_APP_OPENAI_KEY=sk-your-key

git push heroku main
```

---

## Post-Deployment Testing

### Manual Testing

1. Visit your deployed URL
2. Test Creative Studio:
   - Enter prompt
   - Click "Enhance"
   - Click "Generate"
   - Verify image appears

3. Test Style Lab:
   - Upload image
   - Click "Analyze"
   - Click "Generate Variations"
   - Verify variations appear

4. Check Console:
   - Open DevTools (F12)
   - Go to Console tab
   - Should have no errors

### Performance Check

1. Open DevTools (F12)
2. Go to Network tab
3. Check load time (should be < 3 seconds)
4. Check image generation time (10-30 seconds is normal)

---

## Troubleshooting Deployment

### Issue: "Build failed"

**Check:**
- Error message in deployment logs
- Missing dependencies in `package.json`
- Node version compatibility
- `.env` file not in repo (should only be in Vercel/Netlify)

**Solution:**
```bash
npm install  # Locally
npm run build  # Test build locally
# Fix errors, then push to git
```

### Issue: "Environment variables not working"

**Check:**
- Variables prefixed with `REACT_APP_`
- Variables set in Vercel/Netlify dashboard
- Redeployed after adding variables
- Variable names match exactly in code

**Solution:**
1. Go to Vercel/Netlify dashboard
2. Re-add all environment variables
3. Trigger redeploy

### Issue: "Blank page on deployed site"

**Check:**
- Build logs for compile errors
- Browser console (F12) for runtime errors
- Network tab (F12) to see if JS files loaded
- Try hard refresh (Ctrl+Shift+R)

**Solution:**
```bash
# Test locally
npm run build
npx serve -s build

# If works locally, check:
# - Environment variables on platform
# - Deployment logs for errors
```

### Issue: "API calls failing on deployed site"

**Likely cause:** Missing/wrong environment variables

**Solution:**
1. Verify keys in Vercel/Netlify dashboard
2. Ensure keys have no extra spaces
3. Check API account still has credits (OpenAI)
4. Try the free tier for limiting hits (Gemini)

### Issue: CORS errors

**Symptom:** "Access to XMLHttpRequest blocked by CORS policy"

**This shouldn't happen because:**
- OpenAI/Gemini APIs handle CORS properly
- Requests go directly from browser to API

**If it happens:**
- Check browser console for exact error
- Verify API key is correct
- Check API documentation

---

## Monitoring After Deployment

### Set Up Alerts (Optional)

**Vercel:**
1. Go to Settings → Notifications
2. Enable email alerts for failures

**Netlify:**
1. Go to Site Settings → Notifications
2. Add Slack/email for deploys

### Check Deployment History

**Vercel:**
- Dashboard shows all deployments
- Click any deployment to view logs
- Rollback if needed

**Netlify:**
- "Deploys" tab shows all versions
- Can rollback to previous deploy

### Monitor Errors

**From Vercel:**
```bash
vercel logs --tail  # Real-time logs
```

**From Netlify:**
- Check "Deploys" → "Deploy log"
- Check "Analytics" for traffic

---

## Updating After Deployment

### Simple Workflow

```bash
# Make changes locally
# Test with: npm start

# Commit and push
git add .
git commit -m "Fix bug XYZ"
git push

# Vercel/Netlify auto-deploys!
# Watch dashboard for deployment status
```

---

## Performance Tips

### For Faster Deploys

1. **Optimize bundle size:**
   ```bash
   npm install --save-dev source-map-explorer
   npm run build
   source-map-explorer 'build/static/js/*'
   ```

2. **Use code splitting:**
   ```javascript
   const Component = React.lazy(() => import('./Component'));
   ```

3. **Cache busting:**
   - Vercel does this automatically

### For Faster API Calls

1. Implement request caching
2. Add loading indicators (already done! ✅)
3. Batch API calls when possible

---

## Rolling Back a Deployment

### If Something Breaks

**Vercel:**
1. Go to Deployments
2. Find previous working version
3. Click "..." → "Promote to Production"

**Netlify:**
1. Go to Deploys
2. Find previous version
3. Click "Publish deploy"

---

## Custom Domain (Optional)

### For Vercel

1. Purchase domain (GoDaddy, Namecheap, etc.)
2. In Vercel → Settings → Domains
3. Add your domain
4. Follow DNS instructions
5. Update nameservers at registrar
6. Wait 24-48 hours for propagation

### Example
```
Instead of: https://pearmedia-ai-prototype.vercel.app
Use: https://pearmedia.app
```

---

## Setting Up CI/CD (Advanced)

GitHub Actions automatically deploys when you push:

**Already set up for Vercel/Netlify!**

To check:
1. Go to GitHub repo
2. Click "Actions" tab
3. Should see workflow runs

---

## Final Verification

Before considering deployment complete:

- [ ] Site loads without errors
- [ ] Creative Studio generates images
- [ ] Style Lab analyzes and creates variations
- [ ] No console errors (F12)
- [ ] Mobile responsive
- [ ] Loading messages appear
- [ ] Error messages show on failures
- [ ] Download buttons work
- [ ] Regenerate buttons work

---

## Getting Your Live Link

After successful deployment:

```
Your Public URL:
→ https://pearmedia-ai-prototype.vercel.app
  (or similar for your platform)

GitHub Repo:
→ https://github.com/yourusername/pearmedia-ai-prototype

Share these for the assignment!
```

---

**Deployment complete! 🎉**

Next: Create your execution video and submit!
