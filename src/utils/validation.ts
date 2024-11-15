import { ValidationError } from '@/utils/errors';

export interface ValidationError {
  field: string;
  message: string;
}

export class ValidationResult {
  private errors: ValidationError[] = [];

  addError(field: string, message: string): void {
    this.errors.push({ field, message });
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErrors(): ValidationError[] {
    return [...this.errors];
  }

  throwIfErrors(): void {
    if (this.hasErrors()) {
      throw new AppError('Validation failed', 400, { errors: this.errors });
    }
  }
}

export function validateRequired<T>(value: T | null | undefined, fieldName: string): ValidationResult {
  const result = new ValidationResult();
  
  if (value === null || value === undefined) {
    result.addError(fieldName, `${fieldName} is required`);
  }
  
  return result;
}

export function validateString(value: unknown, fieldName: string, options: {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
} = {}): ValidationResult {
  const result = new ValidationResult();
  
  if (!isString(value)) {
    result.addError(fieldName, `${fieldName} must be a string`);
    return result;
  }

  if (options.minLength && value.length < options.minLength) {
    result.addError(fieldName, `${fieldName} must be at least ${options.minLength} characters`);
  }

  if (options.maxLength && value.length > options.maxLength) {
    result.addError(fieldName, `${fieldName} must be at most ${options.maxLength} characters`);
  }

  if (options.pattern && !options.pattern.test(value)) {
    result.addError(fieldName, `${fieldName} has an invalid format`);
  }

  return result;
}

export function assertNonNullable<T>(
  value: T,
  message = 'Value cannot be null or undefined'
): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new ValidationError(message);
  }
}

export function assertCondition(
  condition: boolean,
  message: string
): asserts condition {
  if (!condition) {
    throw new ValidationError(message);
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
} 