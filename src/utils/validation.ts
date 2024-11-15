import { ValidationError } from '@/utils/errors';

export interface ValidationError {
  field: string;
  message: string;
}

type ValidationOptions = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => boolean;
};

export class Validator {
  private errors: ValidationError[] = [];

  addError(field: string, message: string): void {
    this.errors.push({ field, message });
  }

  validate(field: string, value: unknown, options: ValidationOptions = {}): boolean {
    if (options.required && (value === undefined || value === null || value === '')) {
      this.addError(field, 'This field is required');
      return false;
    }

    if (typeof value === 'string') {
      if (options.minLength && value.length < options.minLength) {
        this.addError(field, `Minimum length is ${options.minLength}`);
        return false;
      }

      if (options.maxLength && value.length > options.maxLength) {
        this.addError(field, `Maximum length is ${options.maxLength}`);
        return false;
      }

      if (options.pattern && !options.pattern.test(value)) {
        this.addError(field, 'Invalid format');
        return false;
      }
    }

    if (options.custom && !options.custom(value)) {
      this.addError(field, 'Invalid value');
      return false;
    }

    return true;
  }

  getErrors(): ValidationError[] {
    return this.errors;
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
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