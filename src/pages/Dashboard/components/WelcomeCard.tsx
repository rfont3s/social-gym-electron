import { Card } from '@components';
import {
  Assessment,
  DarkMode,
  FitnessCenter,
  Schedule,
} from '@mui/icons-material';
import React from 'react';

export const WelcomeCard: React.FC = () => {
  return (
    <Card variant='elevated' className='text-center'>
      <h2 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white'>
        Bem-vindo ao Worknnect! 🎉
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
          <p className='font-medium text-gray-900 dark:text-white'>Dark Mode</p>
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
  );
};
