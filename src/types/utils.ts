// Utility type for making all properties of a type required and non-nullable
export type Required<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

// Utility type for making all properties of a type optional
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Utility type for making all properties of a type readonly
export type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Utility type for picking specific properties from a type
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Utility type for omitting specific properties from a type
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Utility type for making all properties nullable
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
}; 