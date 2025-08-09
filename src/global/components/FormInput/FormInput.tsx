import React, { forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';
import { Input } from '../Input';

export interface FormInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  error?: FieldError;
  helperText?: string;
  required?: boolean;
  icon?: React.ReactNode;
  endAdornment?: React.ReactNode;
  autoComplete?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      placeholder,
      type = 'text',
      disabled = false,
      className = '',
      error,
      helperText,
      required = false,
      icon,
      endAdornment,
      autoComplete,
      ...props
    },
    ref
  ) => {
    const inputClasses = `
      ${icon ? 'pl-12' : ''}
      ${endAdornment ? 'pr-12' : ''}
      ${className}
    `;

    return (
      <div className='space-y-1'>
        {label && (
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
            {label}
            {required && <span className='text-red-500 ml-1'>*</span>}
          </label>
        )}

        <div className='relative'>
          {icon && (
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <div className='text-gray-400'>{icon}</div>
            </div>
          )}

          <Input
            ref={ref}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            className={inputClasses}
            error={!!error}
            {...props}
          />

          {endAdornment && (
            <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
              {endAdornment}
            </div>
          )}
        </div>

        {error && (
          <p className='text-sm text-red-600 dark:text-red-400 flex items-center mt-1'>
            <svg
              className='w-4 h-4 mr-1'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
            {error.message}
          </p>
        )}

        {helperText && !error && (
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
