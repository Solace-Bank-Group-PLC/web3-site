/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REQUIRED_CHAIN_ID: string
  readonly VITE_INFURA_PROJECT_ID: string
  readonly VITE_ETHERSCAN_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_RPC_URL: string;
      NEXT_PUBLIC_CHAIN_ID: string;
      NEXT_PUBLIC_CONTRACT_ADDRESS: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {}; 