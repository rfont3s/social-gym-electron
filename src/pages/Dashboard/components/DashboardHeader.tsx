import React from 'react';
import { DarkMode, LightMode } from '@mui/icons-material';
import { Button } from '@components';

interface DashboardHeaderProps {
  user: {
    name: string;
  } | null;
  theme: {
    mode: 'light' | 'dark';
    toggleTheme: () => void;
  };
  onLogout: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  user,
  theme,
  onLogout,
}) => {
  return (
    <header className='bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center space-x-4'>
            <div className='w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold'>
              SG
            </div>
            <div>
              <h1 className='text-xl font-bold text-gray-900 dark:text-white'>
                Social Gym
              </h1>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Olá, {user?.name || 'Usuário'}!
              </p>
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            <button
              onClick={theme.toggleTheme}
              className='p-2 rounded-lg transition-all duration-200 hover:scale-110 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
            >
              {theme.mode === 'light' ? (
                <DarkMode fontSize='small' />
              ) : (
                <LightMode fontSize='small' />
              )}
            </button>

            <Button variant='secondary' onClick={onLogout}>
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
