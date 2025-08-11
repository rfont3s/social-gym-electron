import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const MobileBottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      icon: (active: boolean) => (
        <svg
          className='w-6 h-6'
          fill={active ? 'currentColor' : 'none'}
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={active ? 0 : 2}
            d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
          />
        </svg>
      ),
      path: '/',
      active: location.pathname === '/' || location.pathname === '/feed',
    },
    {
      icon: () => (
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
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      ),
      path: '/search',
      active: location.pathname === '/search',
    },
    {
      icon: () => (
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
            d='M12 4v16m8-8H4'
          />
        </svg>
      ),
      path: '/create',
      active: location.pathname === '/create',
    },
    {
      icon: (active: boolean) => (
        <svg
          className='w-6 h-6'
          fill={active ? 'currentColor' : 'none'}
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={active ? 0 : 2}
            d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
          />
        </svg>
      ),
      path: '/dashboard',
      active: location.pathname === '/dashboard',
    },
    {
      icon: (active: boolean) => (
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center ${active ? 'bg-primary-500' : 'bg-gray-400'}`}
        >
          <span className='text-white text-xs font-bold'>RF</span>
        </div>
      ),
      path: '/profile',
      active: location.pathname === '/profile',
    },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 md:hidden'>
      <div className='flex justify-around items-center py-2'>
        {navigationItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavigate(item.path)}
            className={`p-3 transition-colors duration-200 ${
              item.active
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {item.icon(item.active)}
          </button>
        ))}
      </div>
    </div>
  );
};
