import logo from '@assets/logo.svg';
import { DarkMode, LightMode } from '@mui/icons-material';
import React from 'react';

interface LoginHeaderProps {
  theme: {
    mode: 'light' | 'dark';
    toggleTheme: () => void;
  };
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({ theme }) => {
  return (
    <>
      {/* Header */}
      <div className='text-center mb-8'>
        <div className='flex items-center justify-center mb-4'>
          <img
            src={logo}
            alt='Social Gym Logo'
            className='w-50 object-contain dark:invert'
          />
        </div>
      </div>

      {/* Theme Toggle */}
      <div className='absolute top-4 right-4'>
        <button
          onClick={theme.toggleTheme}
          className='p-2 rounded-lg transition-all duration-200 hover:scale-110 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600'
        >
          {theme.mode === 'light' ? (
            <DarkMode fontSize='small' />
          ) : (
            <LightMode fontSize='small' />
          )}
        </button>
      </div>
    </>
  );
};
