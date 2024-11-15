export interface ErrorMetadata {
  code: string;
  timestamp: string;
  requestId?: string;
  [key: string]: unknown;
}

export abstract class BaseError extends Error {
  public readonly metadata: ErrorMetadata;

  constructor(
    message: string,
    code: string,
    metadata: Partial<ErrorMetadata> = {}
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, BaseError.prototype);

    this.metadata = {
      code,
      timestamp: new Date().toISOString(),
      ...metadata
    };
  }

  public toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      metadata: this.metadata,
      stack: this.stack
    };
  }
} 