declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_CHAIN_ID: string;
    NEXT_PUBLIC_NETWORK_NAME: string;
    NEXT_PUBLIC_EXPLORER_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
} 