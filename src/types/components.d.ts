interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

interface ButtonProps extends BaseComponentProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
}

interface InputProps extends BaseComponentProps {
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'password' | 'email';
  placeholder?: string;
  error?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

interface SelectProps<T> extends BaseComponentProps {
  value: T;
  onChange: (value: T) => void;
  options: Array<{
    label: string;
    value: T;
  }>;
  placeholder?: string;
  error?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
} 