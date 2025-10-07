import { useTheme } from '@/global/hooks/useTheme';
import { useAuth } from '@/global/hooks/useAuth';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.svg';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const menuItems = [
    {
      icon: (
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
            d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
          />
        </svg>
      ),
      label: 'Página Inicial',
      path: '/',
      active: location.pathname === '/' || location.pathname === '/feed',
    },
    {
      icon: (
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
      label: 'Pesquisar',
      path: '/search',
      active: location.pathname === '/search',
    },
    {
      icon: (
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
            d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
          />
        </svg>
      ),
      label: 'Explorar',
      path: '/explore',
      active: location.pathname === '/explore',
    },
    {
      icon: (
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
      ),
      label: 'Chat',
      path: '/chat',
      active: location.pathname === '/chat',
    },
    {
      icon: (
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
      ),
      label: 'Notificações',
      path: '/notifications',
      active: location.pathname === '/notifications',
    },
    {
      icon: (
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
      label: 'Criar',
      path: '/create',
      active: location.pathname === '/create',
    },
    {
      icon: (
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
            d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
          />
        </svg>
      ),
      label: 'Dashboard',
      path: '/dashboard',
      active: location.pathname === '/dashboard',
    },
    {
      icon: (
        <img
          src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><circle cx='12' cy='12' r='12' fill='%234a90e2'/><text x='12' y='16' text-anchor='middle' fill='white' font-size='10' font-family='Arial'>RF</text></svg>"
          alt='Roberto Fontes'
          className='w-6 h-6 rounded-full object-cover'
        />
      ),
      label: 'Perfil',
      path: '/profile',
      active: location.pathname === '/profile',
    },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className='fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 hidden md:block'>
      <div className='p-6'>
        {/* Logo */}
        <div className='mb-8'>
          <img
            src={logo}
            alt='Social Gym Logo'
            className='w-40 object-contain dark:invert'
          />
        </div>

        {/* Menu Items */}
        <nav className='space-y-2'>
          {menuItems.map(item => (
            <button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors duration-200 ${
                item.active
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span
                className={
                  item.active
                    ? 'text-white'
                    : 'text-gray-500 dark:text-gray-400'
                }
              >
                {item.icon}
              </span>
              <span className='font-medium'>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Theme Toggle and Logout */}
        <div className='mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-2'>
          <button
            onClick={toggleTheme}
            className='w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'
          >
            {mode === 'dark' ? (
              <svg
                className='w-6 h-6 text-gray-500 dark:text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                />
              </svg>
            ) : (
              <svg
                className='w-6 h-6 text-gray-500 dark:text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                />
              </svg>
            )}
            <span className='font-medium'>
              {mode === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
            </span>
          </button>

          <button
            onClick={logout}
            className='w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200'
          >
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
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
              />
            </svg>
            <span className='font-medium'>Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
};
