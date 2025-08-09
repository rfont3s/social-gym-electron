import React from 'react';
import { DarkMode, LightMode } from '@mui/icons-material';

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
          <div className='w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold bg-primary-500'>
            SG
          </div>
        </div>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
          Social Gym
        </h1>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          Entre na sua conta para continuar
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
