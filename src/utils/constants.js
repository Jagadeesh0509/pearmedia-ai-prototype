

export const DEFAULT_ENHANCEMENT_PROMPT = 'You are an expert prompt engineer. Transform the following simple request into a 50-word descriptive masterpiece including lighting, camera angle, and artistic style.';

export const INITIAL_USER_PROMPTS = [
  'A serene mountain landscape at sunset',
  'A futuristic cyberpunk city street',
  'A cozy coffee shop interior',
  'Abstract digital art with flowing colors',
  'A portrait with dramatic lighting'
];

export const ARTISTIC_STYLES = [
  'Oil Painting',
  'Digital Art',
  'Photography',
  'Illustration',
  'Watercolor',
  'Cyberpunk',
  'Steampunk',
  'Anime',
  'Calligraphy'
];

export const COLOR_PALETTES = {
  warm: ['#FF6B6B', '#FFA500', '#FFD700', '#FFA07A'],
  cool: ['#4A90E2', '#0080FF', '#00D9FF', '#87CEEB'],
  vibrant: ['#FF0080', '#FF8C00', '#00FF00', '#0000FF'],
  neutral: ['#808080', '#A9A9A9', '#D3D3D3', '#FFFFFF']
};

export const LOADING_MESSAGES = {
  enhancing: 'Enhancing your prompt with AI magic...',
  generating: 'Generating your image (this may take a moment)...',
  analyzing: 'Analyzing your image...',
  creating_variation: 'Creating stylistic variation...'
};

export const ERROR_MESSAGES = {
  INVALID_API_KEY: 'Invalid API key. Please check your .env file.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  IMAGE_TOO_LARGE: 'Image file is too large. Please use an image under 5MB.',
  INVALID_FILE_TYPE: 'Invalid file type. Please upload a JPG or PNG image.',
  API_RATE_LIMIT: 'API rate limit reached. Please wait a moment before trying again.'
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ACCEPTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];

export const TABS = {
  TEXT: 'text',
  IMAGE: 'image'
};

export const STEPS = {
  INPUT: 'input',
  ENHANCE: 'enhance',
  APPROVE: 'approve',
  GENERATE: 'generate',
  COMPLETE: 'complete'
};

export const IMAGE_WORKFLOW_STEPS = {
  UPLOAD: 'upload',
  ANALYZE: 'analyze',
  GENERATE: 'generate',
  COMPLETE: 'complete'
};
