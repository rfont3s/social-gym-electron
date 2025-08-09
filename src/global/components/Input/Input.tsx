import React, { forwardRef } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      type = 'text',
      disabled = false,
      className = '',
      error = false,
      ...props
    },
    ref
  ) => {
    const inputClasses = `
      w-full px-4 py-3 rounded-lg border
      bg-white dark:bg-gray-700
      text-gray-900 dark:text-gray-100
      placeholder-gray-500 dark:placeholder-gray-400
      focus:outline-none focus:ring-2 transition-all duration-200
      ${
        error
          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
          : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-transparent'
      }
      ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
      ${className}
    `;

    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
