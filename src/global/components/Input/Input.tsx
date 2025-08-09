import React from 'react';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  disabled?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  type = 'text',
  disabled = false,
  className = '',
}) => {
  const inputClasses = `
    w-full px-4 py-3 rounded-lg border
    bg-white dark:bg-gray-700
    text-gray-900 dark:text-gray-100
    border-gray-300 dark:border-gray-600
    placeholder-gray-500 dark:placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
    transition-all duration-200
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
    ${className}
  `;

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      disabled={disabled}
      className={inputClasses}
    />
  );
};

export default Input;
