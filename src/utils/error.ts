import { BaseError } from '@/types/errors/base';

export function ensureError(value: unknown): Error {
  if (value instanceof Error) return value;

  let message: string;
  if (typeof value === 'string') {
    message = value;
  } else if (typeof value === 'object' && value !== null && 'message' in value) {
    message = String(value.message);
  } else {
    message = `Unknown error: ${JSON.stringify(value)}`;
  }

  return new Error(message);
}

export function isBaseError(error: unknown): error is BaseError {
  return error instanceof BaseError;
}

export function formatErrorMessage(error: unknown): string {
  const err = ensureError(error);
  if (isBaseError(err)) {
    return `${err.name}: ${err.message} (${err.metadata.code})`;
  }
  return err.message;
} 