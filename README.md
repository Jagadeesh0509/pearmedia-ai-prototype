Pear Media – AI Creative Studio

A full-stack web application that transforms text and images into AI-generated visuals using OpenAI and Google Gemini APIs.

Features
Text-to-image generation with AI-enhanced prompts
Image upload with style analysis and variation generation
User-controlled workflow with approval step
Responsive and clean UI
Secure API integration
Tech Stack
Frontend: React, Tailwind CSS
APIs: OpenAI (GPT-4o-mini, DALL·E 3), Google Gemini
Deployment: Vercel
Installation
npm install
npm start
Environment Variables

Create a .env file:

REACT_APP_OPENAI_KEY=your_openai_key
REACT_APP_GEMINI_KEY=your_gemini_key
REACT_APP_OPENAI_ENDPOINT=https://api.openai.com/v1
REACT_APP_GEMINI_ENDPOINT=https://generativelanguage.googleapis.com/v1beta/models
Workflows
1. Creative Studio (Text → Image)
Enter prompt
AI enhances prompt
User reviews and edits
Generate image
2. Style Lab (Image → Variations)
Upload image
Analyze style and content
Generate styled variations
API Integration
OpenAI: prompt enhancement and image generation
Gemini: image analysis
Deployment
Push to GitHub
Import project into Vercel
Add environment variables
Deploy
Troubleshooting
Restart app after updating .env
Ensure API keys are valid
Check API credits if generation fails
Assignment Deliverables
Working deployed application
GitHub repository with source code
Two workflows implemented:
Text → Image
Image → Variations
Conclusion

Pear Media demonstrates practical integration of AI APIs into a modern web application, enabling intelligent content generation through structured workflows.
