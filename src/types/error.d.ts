interface Web3Error extends Error {
  code: number;
  data?: unknown;
}

interface MetaMaskError extends Web3Error {
  code: 4001 | 4902 | -32002 | -32603;
}

interface ChainError extends Web3Error {
  code: 4902;
  data: {
    originalError: {
      code: number;
      message: string;
    };
  };
} 