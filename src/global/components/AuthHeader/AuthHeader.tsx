import React from 'react';
import { useTheme } from '@hooks/useTheme';
import { DarkMode, LightMode } from '@mui/icons-material';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  showThemeToggle?: boolean;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ 
  title, 
  subtitle, 
  showThemeToggle = true 
}) => {
  const { mode, toggleTheme } = useTheme();

  return (
    <>
      {/* Theme Toggle */}
      {showThemeToggle && (
        <div className='flex justify-end mb-6'>
          <button
            onClick={toggleTheme}
            className='p-2 rounded-lg transition-all duration-200 hover:scale-110 bg-white dark:bg-gray-800 shadow-md'
          >
            {mode === 'light' ? (
              <DarkMode className='text-gray-900' fontSize='small' />
            ) : (
              <LightMode className='text-yellow-500' fontSize='small' />
            )}
          </button>
        </div>
      )}

      {/* Header Content */}
      <div className='text-center mb-8'>
        <div className='w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4'>
          <span className='text-2xl font-bold text-white'>SG</span>
        </div>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
          {title}
        </h1>
        <p className='text-gray-600 dark:text-gray-400 mt-2'>
          {subtitle}
        </p>
      </div>
    </>
  );
};
