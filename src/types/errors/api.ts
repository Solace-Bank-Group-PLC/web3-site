import { BaseError } from './base';

export class ApiError extends BaseError {
  constructor(
    message: string,
    statusCode: number,
    metadata?: Record<string, unknown>
  ) {
    super(message, 'API_ERROR', {
      statusCode,
      ...metadata
    });
  }
}

export class ValidationError extends BaseError {
  constructor(
    message: string,
    fields: Record<string, string[]>,
    metadata?: Record<string, unknown>
  ) {
    super(message, 'VALIDATION_ERROR', {
      fields,
      ...metadata
    });
  }
}

export class AuthenticationError extends BaseError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'AUTHENTICATION_ERROR', metadata);
  }
}

export class AuthorizationError extends BaseError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'AUTHORIZATION_ERROR', metadata);
  }
} 