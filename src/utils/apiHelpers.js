
const retryWithBackoff = async (fn, maxRetries = 3) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
      if (error.message?.includes('429') || error.message?.includes('503')) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Rate limited. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
};

export const getEnhancedPrompt = async (input) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const lightingOptions = ['soft warm lighting', 'dramatic ray lighting', 'golden hour', 'cinematic blue lighting', 'cool neon glow'];
  const angleOptions = ['wide angle view', 'close-up perspective', 'bird\'s eye view', 'low angle shot', 'macro view'];
  const styleOptions = ['hyperrealistic', 'oil painting', 'cyberpunk concept art', 'fantasy illustration', 'photorealistic'];
  
  const lighting = lightingOptions[Math.floor(Math.random() * lightingOptions.length)];
  const angle = angleOptions[Math.floor(Math.random() * angleOptions.length)];
  const style = styleOptions[Math.floor(Math.random() * styleOptions.length)];
  
  return `${input}, with ${lighting}, ${angle}, ${style} art style, detailed and immersive, ultra high quality`;
};

export const generateImage = async (prompt) => {
  return retryWithBackoff(async () => {
    try {
      const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_STABILITY_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
              weight: 1
            }
          ],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          steps: 20,
          samples: 1,
          sampler: 'K_DPM_2_ANCESTRAL'
        })
      });

      if (!response.ok) {
        throw new Error(`Stability AI error: ${response.status}`);
      }

      const data = await response.json();
      if (data.artifacts && data.artifacts.length > 0) {
        return `data:image/png;base64,${data.artifacts[0].base64}`;
      }
      throw new Error('No image generated');
    } catch (error) {
      console.error('Image generation failed:', error);
      throw new Error(`Failed to generate image: ${error.message}`);
    }
  });
};

export const analyzeImage = async (base64Image) => {
  return retryWithBackoff(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_GEMINI_ENDPOINT}/models/gemini-1.5-flash:generateContent?key=${process.env.REACT_APP_GEMINI_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: 'Analyze this image and provide a JSON response with the following structure: { "mainObjects": [], "colorPalette": [], "artisticStyle": "", "lighting": "", "mood": "" }. Be concise but descriptive.'
                  },
                  {
                    inlineData: {
                      mimeType: 'image/jpeg',
                      data: base64Image
                    }
                  }
                ]
              }
            ]
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const analysisText = data.candidates[0].content.parts[0].text;


      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      return {
        mainObjects: [],
        colorPalette: [],
        artisticStyle: analysisText,
        lighting: 'Unknown',
        mood: 'Unknown'
      };
    } catch (error) {
      console.error('Image analysis failed:', error);
      throw new Error(`Failed to analyze image: ${error.message}`);
    }
  });
};

export const generateImageVariation = async (analysisData) => {
  return retryWithBackoff(async () => {
    try {
      const variationPrompt = `Create a stylistic variation inspired by: Objects: ${analysisData.mainObjects.join(', ')}, Colors: ${analysisData.colorPalette.join(', ')}, Style: ${analysisData.artisticStyle}, Lighting: ${analysisData.lighting}. Make it unique but maintain the essence.`;

      const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_STABILITY_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: variationPrompt,
              weight: 1
            }
          ],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          steps: 20,
          samples: 1,
          sampler: 'K_DPM_2_ANCESTRAL'
        })
      });

      if (!response.ok) {
        throw new Error(`Stability AI error: ${response.status}`);
      }

      const data = await response.json();
      if (data.artifacts && data.artifacts.length > 0) {
        return `data:image/png;base64,${data.artifacts[0].base64}`;
      }
      throw new Error('No image generated');
    } catch (error) {
      console.error('Image variation generation failed:', error);
      throw new Error(`Failed to generate variation: ${error.message}`);
    }
  });
};

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

export const validateApiKeys = () => {
  const keys = {
    openai: process.env.REACT_APP_OPENAI_KEY,
    gemini: process.env.REACT_APP_GEMINI_KEY
  };

  const missingKeys = Object.entries(keys)
    .filter(([, value]) => !value || value.includes('your_'))
    .map(([key]) => key);

  if (missingKeys.length > 0) {
    throw new Error(`Missing API keys: ${missingKeys.join(', ')}. Please add them to your .env file.`);
  }

  return true;
};
