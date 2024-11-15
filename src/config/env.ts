export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ASSETS_URL: process.env.NEXT_PUBLIC_ASSETS_URL || 'http://localhost:3000/assets',
  PREVIEW_URL: process.env.NEXT_PUBLIC_PREVIEW_URL || 'http://localhost:3000/preview',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
} as const; 