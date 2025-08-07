import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const baseClasses = `
    bg-white dark:bg-gray-800 
    border border-gray-200 dark:border-gray-700 
    rounded-xl p-6
    ${className}
  `;

  const variantClasses = variant === 'elevated' ? 'shadow-lg' : 'shadow-sm';

  return <div className={`${baseClasses} ${variantClasses}`}>{children}</div>;
};

export default Card;
