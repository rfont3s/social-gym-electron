import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const baseClasses = `
    inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium
    transition-all duration-200 border cursor-pointer
    ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90 hover:-translate-y-0.5'}
    ${className}
  `;

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-500 hover:bg-primary-600 text-white border-transparent';
      case 'secondary':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600';
      case 'outline':
        return 'bg-transparent text-primary-500 border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20';
      case 'ghost':
        return 'bg-transparent text-gray-700 dark:text-gray-300 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700';
      default:
        return 'bg-primary-500 hover:bg-primary-600 text-white border-transparent';
    }
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${getVariantClasses()}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
