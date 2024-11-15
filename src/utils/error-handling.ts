import { ErrorCode } from '@/constants/roles';
import { getErrorMessage } from './type-guards';

export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: ErrorCode,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static fromError(error: unknown): AppError {
    const message = getErrorMessage(error);
    
    if (error instanceof AppError) {
      return error;
    }

    return new AppError(message, ErrorCode.INTERNAL_ERROR, { originalError: error });
  }
} 