import { useCallback, useState } from 'react';
import { AppError } from '@/types/errors';
import { ERROR_CODES } from '@/constants';

interface AsyncState<T> {
  data: T | null;
  error: AppError | null;
  isLoading: boolean;
}

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const data = await asyncFunction();
      setState({ data, error: null, isLoading: false });
      return data;
    } catch (error) {
      const appError = error instanceof AppError 
        ? error 
        : new AppError(
            'Operation failed',
            ERROR_CODES.INTERNAL_ERROR,
            500,
            { originalError: error }
          );
      
      setState({ data: null, error: appError, isLoading: false });
      throw appError;
    }
  }, []);

  return { ...state, execute };
} 