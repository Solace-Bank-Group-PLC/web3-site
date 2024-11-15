declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

interface Window {
  ethereum?: any;
}

type ValidationError = {
  field: string;
  message: string;
};

type UseTransactionHistoryOptions = {
  maxTransactions?: number;
  address: string;
}; 