import { DarkMode, LightMode } from '@mui/icons-material';
import React from 'react';
import logo from '../../../assets/logo.svg';

interface RegisterHeaderProps {
  theme: {
    mode: 'light' | 'dark';
    toggleTheme: () => void;
  };
}

export const RegisterHeader: React.FC<RegisterHeaderProps> = ({ theme }) => {
  return (
    <>
      {/* Header */}
      <div className='text-center mb-8'>
        <div className='flex items-center justify-center mb-4'>
          <img
            src={logo}
            alt='Social Gym Logo'
            className='h-60 w-auto object-contain dark:invert'
          />
        </div>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          Crie sua conta para começar
        </p>
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
