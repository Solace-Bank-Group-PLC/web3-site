import { Result, ok, err } from '@/types/result';
import { ApiError, ValidationError } from '@/types/errors';

export async function fetchData<T>(
  url: string,
  options?: RequestInit
): Promise<Result<T, ApiError | ValidationError>> {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      if (response.status === 422) {
        const data = await response.json();
        return err(new ValidationError('Validation failed', data.errors));
      }
      
      return err(new ApiError(
        'API request failed',
        response.status,
        { url, method: options?.method ?? 'GET' }
      ));
    }

    const data = await response.json();
    return ok(data as T);
  } catch (error) {
    return err(new ApiError(
      'Network request failed',
      0,
      { url, error: error instanceof Error ? error.message : String(error) }
    ));
  }
} 