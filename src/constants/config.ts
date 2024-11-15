export const CONFIG = {
  API: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api',
    TIMEOUT: 10000,
    RETRY_COUNT: 3,
  },
  AUTH: {
    TOKEN_KEY: 'auth_token',
    REFRESH_TOKEN_KEY: 'refresh_token',
    SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  },
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },
} as const; 