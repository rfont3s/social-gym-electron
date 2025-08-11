import React from 'react';
import logo from '../../../assets/logo.svg';

export const MobileHeader: React.FC = () => {
  return (
    <div className='fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-40 md:hidden'>
      <div className='flex items-center justify-between px-4 py-3'>
        {/* Logo */}
        <div className='flex-1'>
          <img
            src={logo}
            alt='Social Gym'
            className='h-8 object-contain dark:invert'
          />
        </div>

        {/* Right icons */}
        <div className='flex items-center space-x-4'>
          {/* Notifications */}
          <button className='text-gray-700 dark:text-gray-300'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              />
            </svg>
          </button>

          {/* Messages */}
          <button className='text-gray-700 dark:text-gray-300 relative'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
              />
            </svg>
            {/* Notification badge */}
            <div className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center'>
              <span className='text-white text-xs font-bold'>3</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
