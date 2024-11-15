import { ERROR_CODES } from '@/constants';

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];

export interface ErrorMetadata {
  statusCode: number;
  code: ErrorCode;
  timestamp: string;
  requestId?: string;
  details?: Record<string, unknown>;
}

export class AppError extends Error {
  public readonly metadata: ErrorMetadata;

  constructor(
    message: string,
    code: ErrorCode,
    statusCode: number = 500,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);

    this.metadata = {
      code,
      statusCode,
      timestamp: new Date().toISOString(),
      details
    };
  }

  public toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      metadata: this.metadata
    };
  }
} 