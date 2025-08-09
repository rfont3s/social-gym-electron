import React from 'react';
import {
  FitnessCenter,
  SportsMartialArts,
  DirectionsRun,
  Pool,
  MonitorWeight,
  SportsGymnastics,
  AccessTime,
  Group,
  TrendingUp,
} from '@mui/icons-material';

export const WelcomeBackground: React.FC = () => {
  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      {/* Gradient Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900' />

      {/* Large Background Shapes */}
      <div className='absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-br from-primary-500 to-secondary-500' />
      <div className='absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-15 bg-gradient-to-tr from-secondary-500 to-primary-500' />
      <div className='absolute top-1/2 -translate-y-1/2 -left-32 w-64 h-64 rounded-full opacity-8 bg-gradient-to-r from-primary-400 to-secondary-400' />
      <div className='absolute top-1/4 -right-24 w-48 h-48 rounded-full opacity-12 bg-gradient-to-l from-secondary-400 to-primary-400' />

      {/* Floating Gym Equipment Icons */}
      <div className='absolute top-16 left-20 text-primary-500/25 dark:text-primary-400/25 animate-pulse'>
        <FitnessCenter sx={{ fontSize: 64 }} />
      </div>
      <div className='absolute top-24 right-32 text-secondary-500/20 dark:text-secondary-400/20 animate-pulse delay-1000'>
        <DirectionsRun sx={{ fontSize: 56 }} />
      </div>
      <div className='absolute bottom-32 left-16 text-primary-500/15 dark:text-primary-400/15 animate-pulse delay-2000'>
        <MonitorWeight sx={{ fontSize: 60 }} />
      </div>
      <div className='absolute bottom-20 right-24 text-secondary-500/25 dark:text-secondary-400/25 animate-pulse delay-500'>
        <SportsGymnastics sx={{ fontSize: 52 }} />
      </div>
      <div className='absolute top-1/2 left-12 text-primary-500/20 dark:text-primary-400/20 animate-pulse delay-1500'>
        <SportsMartialArts sx={{ fontSize: 58 }} />
      </div>
      <div className='absolute top-1/3 right-12 text-secondary-500/15 dark:text-secondary-400/15 animate-pulse delay-700'>
        <Pool sx={{ fontSize: 54 }} />
      </div>

      {/* Additional Activity Icons */}
      <div className='absolute top-40 left-1/2 -translate-x-1/2 text-primary-500/10 dark:text-primary-400/10 animate-pulse delay-300'>
        <AccessTime sx={{ fontSize: 48 }} />
      </div>
      <div className='absolute bottom-40 left-1/3 text-secondary-500/12 dark:text-secondary-400/12 animate-pulse delay-1200'>
        <Group sx={{ fontSize: 50 }} />
      </div>
      <div className='absolute top-1/4 left-1/4 text-primary-500/8 dark:text-primary-400/8 animate-pulse delay-900'>
        <TrendingUp sx={{ fontSize: 46 }} />
      </div>

      {/* Decorative geometric shapes */}
      <div className='absolute top-20 left-1/2 -translate-x-1/2 w-2 h-20 bg-gradient-to-b from-primary-500/20 to-transparent rotate-12 animate-pulse delay-600' />
      <div className='absolute bottom-32 right-1/4 w-16 h-2 bg-gradient-to-r from-secondary-500/20 to-transparent rotate-45 animate-pulse delay-800' />
      <div className='absolute top-1/3 left-1/5 w-8 h-8 border-2 border-primary-500/15 rotate-45 animate-pulse delay-400' />
      <div className='absolute bottom-1/4 right-1/5 w-6 h-6 bg-secondary-500/10 rounded-full animate-pulse delay-1100' />

      {/* Grid pattern overlay */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='h-full w-full'
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Subtle gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent dark:via-gray-900/20' />
    </div>
  );
};
