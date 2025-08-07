import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Button } from './Button';
import { Card } from './Card';
import {
  DarkMode,
  LightMode,
  People,
  AttachMoney,
  DirectionsRun,
  Schedule,
  Assessment,
  FitnessCenter,
} from '@mui/icons-material';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { mode, toggleTheme } = useTheme();

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300'>
      {/* Header */}
      <header className='bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center space-x-4'>
              <div className='w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold'>
                SG
              </div>
              <h1 className='text-xl font-bold text-gray-900 dark:text-white'>
                Social Gym
              </h1>
            </div>

            <div className='flex items-center space-x-4'>
              <button
                onClick={toggleTheme}
                className='p-2 rounded-lg transition-all duration-200 hover:scale-110 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
              >
                {mode === 'light' ? (
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

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
          {/* Stats Cards */}
          <Card variant='elevated'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                  Membros Ativos
                </p>
                <p className='text-3xl font-bold mt-1 text-gray-900 dark:text-white'>
                  1,234
                </p>
              </div>
              <div className='w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center'>
                <People className='text-primary-500' fontSize='large' />
              </div>
            </div>
          </Card>

          <Card variant='elevated'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                  Receita Mensal
                </p>
                <p className='text-3xl font-bold mt-1 text-gray-900 dark:text-white'>
                  R$ 45,670
                </p>
              </div>
              <div className='w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center'>
                <AttachMoney className='text-secondary-500' fontSize='large' />
              </div>
            </div>
          </Card>

          <Card variant='elevated'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                  Check-ins Hoje
                </p>
                <p className='text-3xl font-bold mt-1 text-gray-900 dark:text-white'>
                  89
                </p>
              </div>
              <div className='w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center'>
                <DirectionsRun className='text-accent-500' fontSize='large' />
              </div>
            </div>
          </Card>
        </div>

        {/* Welcome Message */}
        <Card variant='elevated' className='text-center'>
          <h2 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white'>
            Bem-vindo ao Social Gym! 🎉
          </h2>
          <p className='text-lg mb-6 text-gray-600 dark:text-gray-400'>
            Sua aplicação Electron está funcionando perfeitamente com React,
            TypeScript, Tailwind CSS e sistema de temas dark mode!
          </p>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-center'>
            <div className='p-4'>
              <div className='flex justify-center mb-2'>
                <Schedule className='text-primary-500' fontSize='large' />
              </div>
              <p className='font-medium text-gray-900 dark:text-white'>
                Vite Build
              </p>
            </div>
            <div className='p-4'>
              <div className='flex justify-center mb-2'>
                <DarkMode className='text-secondary-500' fontSize='large' />
              </div>
              <p className='font-medium text-gray-900 dark:text-white'>
                Dark Mode
              </p>
            </div>
            <div className='p-4'>
              <div className='flex justify-center mb-2'>
                <Assessment className='text-accent-500' fontSize='large' />
              </div>
              <p className='font-medium text-gray-900 dark:text-white'>
                Hot Reload
              </p>
            </div>
            <div className='p-4'>
              <div className='flex justify-center mb-2'>
                <FitnessCenter className='text-primary-500' fontSize='large' />
              </div>
              <p className='font-medium text-gray-900 dark:text-white'>
                Desktop App
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};
