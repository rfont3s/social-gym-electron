import React from 'react';
import { Button } from '@components';
import { Google, GitHub } from '@mui/icons-material';

export const SocialLogin: React.FC = () => {
  return (
    <div className='mt-6'>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-gray-300 dark:border-gray-600' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400'>
            Ou continue com
          </span>
        </div>
      </div>

      <div className='mt-6 grid grid-cols-2 gap-3'>
        <Button
          variant='outline'
          onClick={() => console.log('Login com Google')}
          className='flex items-center justify-center'
        >
          <Google className='mr-2' fontSize='small' />
          Google
        </Button>
        <Button
          variant='outline'
          onClick={() => console.log('Login com GitHub')}
          className='flex items-center justify-center'
        >
          <GitHub className='mr-2' fontSize='small' />
          GitHub
        </Button>
      </div>
    </div>
  );
};
