import type { AbiItem } from 'web3-utils';

declare module 'web3-eth-contract' {
  export class Contract {
    constructor(
      abi: AbiItem[],
      address: string,
      options?: {
        from?: string;
        gasPrice?: string;
        gas?: number;
      }
    );
    
    methods: Record<string, (...args: unknown[]) => {
      call: (options?: { from?: string }) => Promise<unknown>;
      send: (options?: { from: string; value?: string }) => Promise<unknown>;
    }>;

    events: Record<string, {
      addListener: (callback: (error: Error | null, event?: unknown) => void) => void;
      removeListener: (callback: (error: Error | null, event?: unknown) => void) => void;
    }>;
  }
}

declare module 'react-dropzone' {
  export function useDropzone(options?: any): {
    getRootProps: () => any;
    getInputProps: () => any;
    isDragActive: boolean;
    acceptedFiles: File[];
  };
}

declare module 'react-icons/tb' {
  export const TbUpload: React.FC<{ className?: string }>;
}

declare module 'react-icons/io5' {
  export const IoCloseSharp: React.FC<{ className?: string }>;
}

declare module '@nextui-org/react' {
  export const Progress: React.FC<{
    value: number;
    className?: string;
  }>;
  export const Card: React.FC<{
    children: React.ReactNode;
    className?: string;
  }>;
  export const CardBody: React.FC<{
    children: React.ReactNode;
    className?: string;
  }>;
} 