import {
  DirectionsRun,
  FitnessCenter,
  SportsGymnastics,
  SportsMartialArts,
} from '@mui/icons-material';
import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className='absolute inset-0 overflow-hidden'>
      {/* Gradient Circles */}
      <div className='absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 bg-primary-500/30' />
      <div className='absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 bg-secondary-500/30' />
      <div className='absolute top-1/2 -left-20 w-60 h-60 rounded-full opacity-10 bg-primary-400/20' />
      <div className='absolute top-1/4 -right-20 w-40 h-40 rounded-full opacity-15 bg-secondary-400/25' />

      {/* Floating Gym Icons */}
      <div className='absolute top-32 left-20 text-primary-500/20 dark:text-primary-400/20 animate-pulse'>
        <FitnessCenter sx={{ fontSize: 120 }} />
      </div>
      <div className='absolute top-32 right-32 text-secondary-500/15 dark:text-secondary-400/15 animate-pulse delay-1000'>
        <DirectionsRun sx={{ fontSize: 120 }} />
      </div>
      <div className='absolute bottom-32 right-20 text-secondary-500/20 dark:text-secondary-400/20 animate-pulse delay-500'>
        <SportsGymnastics sx={{ fontSize: 120 }} />
      </div>
      <div className='absolute bottom-32 left-8 text-primary-500/15 dark:text-primary-400/15 animate-pulse delay-1500'>
        <SportsMartialArts sx={{ fontSize: 120 }} />
      </div>
    </div>
  );
};
