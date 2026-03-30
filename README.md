# 🍐 Pear Media - AI Creative Studio

A responsive web application that bridges the gap between simple user inputs and advanced AI outputs through two powerful workflows.

## 🎯 Overview

**Pear Media** is a full-stack AI application featuring:

- **Workflow A (Creative Studio):** Transform simple text prompts into stunning images using AI prompt engineering
- **Workflow B (Style Lab):** Upload images to analyze artistic style and generate variations

Built with React, Tailwind CSS, and powered by OpenAI & Google Gemini APIs.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Workflows](#workflows)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

### Creative Studio (Text Workflow)
- ✍️ Write simple creative prompts
- 🤖 AI-enhanced prompt generation
- ✅ Human-in-the-loop approval system
- 🖼️ Generate stunning images with DALL-E 3
- 💾 Download generated images

### Style Lab (Image Workflow)
- 📤 Upload any image (JPEG, PNG, WebP)
- 🔍 AI visual analysis (objects, colors, style)
- 🎨 Generate stylistic variations
- 🌈 Artistic style detection
- ⚡ Batch variation generation

### General Features
- 🎨 Clean, modern "Tech" aesthetic UI
- 📱 Fully responsive design
- ⚡ Real-time loading states
- 🔐 Secure API key management
- ❌ Comprehensive error handling
- 📊 Progress feedback during operations

---

## 🛠️ Tech Stack

### Frontend
- **React 18** — UI library
- **Tailwind CSS 3** — Utility-first CSS framework
- **Lucide React** — Modern icon library
- **Axios** — HTTP client for API calls

### Backend/APIs
- **OpenAI (GPT-4o-mini)** — Text prompt enhancement
- **DALL-E 3** — Image generation
- **Google Gemini 1.5 Flash** — Multimodal image analysis

### Build & Deploy
- **Create React App** — Project scaffolding
- **npm/yarn** — Package management
- **Vercel** — Hosting & deployment

---

## 📦 Prerequisites

- **Node.js v18+** — JavaScript runtime
- **npm v9+** or **yarn v3+** — Package manager
- **Active API Keys:**
  - OpenAI API key (for GPT-4o-mini & DALL-E 3)
  - Google Gemini API key (for vision analysis)

### Get Your API Keys

1. **OpenAI:**
   - Go to [platform.openai.com](https://platform.openai.com)
   - Sign up or login
   - Create a new API key
   - Add credits to your account

2. **Google Gemini:**
   - Go to [makersuite.google.com](https://makersuite.google.com)
   - Click "Get API Key"
   - Create new API key
   - Save the key securely

---

## 📁 Project Structure

```
pearmedia-ai-prototype/
├── .env                    # Environment variables (API keys) - DO NOT COMMIT
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies
├── README.md               # This file
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration

public/
└── index.html              # HTML entry point

src/
├── index.js                # React entry point
├── index.css               # Global styles
├── App.js                  # Main app component & state
├── App.css                 # App-specific styles
│
├── components/
│   ├── Navbar.js           # Navigation bar with tab switcher
│   ├── WorkflowText.js     # Text-to-image workflow (Creative Studio)
│   ├── WorkflowImage.js    # Image analysis workflow (Style Lab)
│   └── ImageCard.js        # Reusable image display card
│
└── utils/
    ├── apiHelpers.js       # All API integration logic
    └── constants.js        # Configuration & default values
```

---

## 🚀 Installation & Setup

### Step 1: Clone or Initialize Repository

```bash
# Option A: If you have git
git clone https://github.com/yourusername/pearmedia-ai-prototype.git
cd pearmedia-ai-prototype

# Option B: Create manually
mkdir pearmedia-ai-prototype
cd pearmedia-ai-prototype
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the project root and add your API keys:

```env
# OpenAI Configuration
REACT_APP_OPENAI_KEY=your_openai_api_key_here
REACT_APP_OPENAI_ENDPOINT=https://api.openai.com/v1

# Gemini Configuration
REACT_APP_GEMINI_KEY=your_gemini_api_key_here
REACT_APP_GEMINI_ENDPOINT=https://generativelanguage.googleapis.com/v1beta/models
```

⚠️ **Remember:** Never commit the `.env` file to git. It's already in `.gitignore`.

### Step 4: Start Development Server

```bash
npm start
# or
yarn start
```

The app will open at `http://localhost:3000`

---

## 🔧 Environment Variables

All environment variables must be prefixed with `REACT_APP_` for React to access them.

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_OPENAI_KEY` | OpenAI API key | ✅ Yes |
| `REACT_APP_GEMINI_KEY` | Google Gemini API key | ✅ Yes |
| `REACT_APP_OPENAI_ENDPOINT` | OpenAI API endpoint | ✅ Yes |
| `REACT_APP_GEMINI_ENDPOINT` | Gemini API endpoint | ✅ Yes |

---

## 📖 Getting Started

### First Run

1. Start the development server: `npm start`
2. Open `http://localhost:3000` in your browser
3. You'll see a warning if API keys are missing
4. Fill in your `.env` file with valid API keys
5. Restart the server to reload environment variables

### Using Creative Studio

1. Click the "Creative Studio" tab
2. Write a short prompt (e.g., "A sunset over mountains")
3. Click "Enhance with AI"
4. Review and optionally edit the AI-enhanced prompt
5. Click "Generate Image"
6. Download or regenerate variations

### Using Style Lab

1. Click the "Style Lab" tab
2. Upload an image (JPG, PNG, WebP, max 5MB)
3. Click "Analyze Image"
4. Review the detected style, colors, and mood
5. Click "Generate Variations" to create styled variations
6. Download or regenerate

---

## 🔄 Workflows

### Workflow A: Text → Image (Creative Studio)

```
User Input
    ↓
[Enhance Prompt] → Feed to GPT-4o-mini
    ↓
Display Enhanced Prompt
    ↓
[User Approval] → Edit if needed
    ↓
[Generate Image] → Send to DALL-E 3
    ↓
Display Image → Download/Regenerate
```

### Workflow B: Image → Variations (Style Lab)

```
Upload Image
    ↓
[Analyze Image] → Send to Gemini 1.5 Flash
    ↓
Extract: Objects, Colors, Style, Lighting
    ↓
[Generate Variations] → Multiple DALL-E 3 calls
    ↓
Display Variations → Download/Regenerate
```

---

## 🔌 API Integration

### OpenAI API

**Endpoints Used:**
- `POST /v1/chat/completions` — For prompt enhancement (GPT-4o-mini)
- `POST /v1/images/generations` — For image generation (DALL-E 3)

**Key Functions:** (`src/utils/apiHelpers.js`)
- `getEnhancedPrompt(input)` — Enhances user prompts
- `generateImage(prompt)` — Generates images from prompts

### Google Gemini API

**Endpoint Used:**
- `POST /v1beta/models/gemini-1.5-flash:generateContent` — For image analysis

**Key Functions:** (`src/utils/apiHelpers.js`)
- `analyzeImage(base64Image)` — Analyzes uploaded images
- `fileToBase64(file)` — Converts image files to Base64

### Error Handling

All API calls include try-catch blocks and user-friendly error messages:
- Invalid API keys
- Network timeouts
- Rate limit errors
- File validation errors

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial Pear Media commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/pearmedia-ai-prototype.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Import your repository
   - Click "Deploy"

3. **Add Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add `REACT_APP_OPENAI_KEY`
   - Add `REACT_APP_GEMINI_KEY`
   - Redeploy the project

4. **Your app is now live!** 🎉

### Alternative: Build for Production

```bash
npm run build
# Creates optimized build in 'build/' folder
```

Deploy the `build/` folder to any static hosting (Netlify, GitHub Pages, etc.)

---

## 🐛 Troubleshooting

### Common Issues

#### "API Key is missing" warning appears
- **Solution:** Add your API keys to `.env` file with correct format
- **Format:** `REACT_APP_KEYNAME=your_actual_key_here`
- **Restart:** Always restart `npm start` after updating `.env`

#### Images fail to generate
- **Check 1:** Verify OpenAI API key is valid
- **Check 2:** Ensure you have API credits (OpenAI uses pay-as-you-go)
- **Check 3:** Check API rate limits haven't been exceeded
- **Check 4:** Look at browser console for error details

#### Image upload fails
- **Check 1:** File size is under 5MB
- **Check 2:** File type is JPEG, PNG, or WebP
- **Check 3:** Verify Gemini API key is correct

#### Slow response times
- **Note:** Image generation takes 10-30 seconds (normal)
- **Note:** First request may be slower
- **Tip:** Use free tier estimates for testing

#### "Invalid model" error
- **Solution:** Ensure model names match API documentation
- **GPT:** `gpt-4o-mini` (not `gpt-4`)
- **Vision:** `gemini-1.5-flash` (not `gemini-pro-vision`)

### Debug Mode

To see detailed logs:

1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Look for any error messages
4. Copy error details and check against API docs

---

## 📝 Notes & Tips

- **Free Tier Limits:** Both APIs have free tier limits; monitor usage
- **API Costs:** Each generation costs money; design your prompts carefully
- **Image Quality:** DALL-E 3 provides high-quality results (1024x1024)
- **Privacy:** All images are generated client-side; server doesn't store data
- **Rate Limiting:** Implement delays between rapid requests in production

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 📞 Support & Questions

For issues, questions, or suggestions:
- Open an GitHub Issue
- Check existing issues first
- Provide detailed error descriptions
- Include your environment info (Node version, OS, etc.)

---

## 🙏 Acknowledgments

- **OpenAI** — For GPT-4o-mini and DALL-E 3 APIs
- **Google** — For Gemini multimodal API
- **Tailwind Labs** — For Tailwind CSS framework
- **Vercel** — For hosting & deployment platform

---

## 🎯 Roadmap

Potential future enhancements:

- [ ] Image history & favorites
- [ ] Batch image generation
- [ ] Advanced prompt templates
- [ ] User authentication & profiles
- [ ] Social sharing features
- [ ] Mobile app version
- [ ] Dark mode support
- [ ] Advanced image editing tools

---

---

## 🎓 Assignment Requirements

This project fulfills the **Pear Media Assignment: Webpage for Image and Text Generation**

### ✅ Official Deliverables Checklist

- [x] **Working Hosted Webpage** — Available at deployed URL (see deployment section)
- [x] **GitHub Repository** — Complete source code with Git history
- [x] **Comprehensive README** — Installation, setup, API usage, project flow
- [x] **Project Structure** — Clean, organized, and well-documented
- [x] **Two Integrated Workflows:**
  - Text Enhancement → Approval → Image Generation
  - Image Analysis → Style Detection → Variation Generation
- [ ] **Execution Video** — 5-minute walkthrough (see instructions below)

### Workflow Verification

**Text Workflow (Creative Studio):**
1. User provides text prompt ✅
2. System enhances using NLP (GPT-4o-mini) ✅
3. User reviews and approves enhanced prompt ✅
4. System generates image using DALL-E 3 ✅

**Image Workflow (Style Lab):**
1. User uploads image ✅
2. System analyzes (objects, colors, style, lighting) using Gemini Vision ✅
3. System generates variations maintaining style essence ✅

### API Integration Summary

| API | Purpose | Model | Status |
|-----|---------|-------|--------|
| OpenAI | Prompt Enhancement | GPT-4o-mini | ✅ Integrated |
| OpenAI DALL-E | Image Generation | DALL-E 3 | ✅ Integrated |
| Google Gemini | Image Analysis | Gemini 1.5 Flash | ✅ Integrated |

### Assignment Account

- **Gmail:** Create `namepearmedia@gmail.com` 
- **Used For:** All API registrations and centralized key management
- **APIs Registered:** OpenAI, Google Gemini

---

## 📹 Creating an Execution Video

### Requirements
- **Duration:** Maximum 5 minutes
- **Content:** Both workflows + API in action
- **Recommended Tools:** OBS Studio (free), Loom, or similar

### Video Script

```
[0:00-0:30] Introduction
- Brief intro to Pear Media
- Show both tabs (Creative Studio & Style Lab)

[0:30-2:00] Text Workflow Demo
- Enter a simple prompt
- Click "Enhance with AI"
- Show enhanced version
- Click "Generate Image"
- Show result
- Download image

[2:00-3:30] Image Workflow Demo
- Upload an image
- Click "Analyze Image"
- Show analysis results (objects, colors, style)
- Click "Generate Variations"
- Show multiple variations
- Download a result

[3:30-4:30] Technical Highlights
- Brief mention of APIs used
- Show source code structure
- Explain key components

[4:30-5:00] Call-to-action
- GitHub link
- Deployment link
- Thank you
```

### Recording Steps

1. **Windows/Mac:**
   - Use OBS Studio (free, open-source)
   - Set to 1080p, 30fps
   - Record full screen

2. **Web-based:**
   - Use Loom (loom.com)
   - Simpler recording with webcam option

3. **Upload:**
   - YouTube (unlisted link)
   - Google Drive
   - Vimeo

4. **Share:**
   - Provide link in README
   - Include in GitHub releases

---

**Made with ❤️ for creative minds.**

**Pear Media © 2024 — Bridging AI and Creativity**
