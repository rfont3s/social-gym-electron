import React from 'react';
import { Skeleton } from '@/global/components/Skeleton';

export const SuggestionsSkeleton: React.FC = () => {
  return (
    <div className='p-6'>
      {/* User Profile Summary Skeleton */}
      <div className='bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 border border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <Skeleton
              variant='circular'
              width={48}
              height={48}
              className='w-12 h-12'
            />
            <div className='space-y-2'>
              <Skeleton
                variant='text'
                width={100}
                height={16}
                className='h-4'
              />
              <Skeleton
                variant='text'
                width={80}
                height={14}
                className='h-3.5'
              />
            </div>
          </div>
          <Skeleton variant='text' width={50} height={16} className='h-4' />
        </div>
      </div>

      {/* Suggestions Skeleton */}
      <div className='bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between mb-4'>
          <Skeleton variant='text' width={120} height={18} className='h-4.5' />
          <Skeleton variant='text' width={60} height={14} className='h-3.5' />
        </div>

        <div className='space-y-3'>
          {[...Array(5)].map((_, index) => (
            <div key={index} className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <Skeleton
                  variant='circular'
                  width={40}
                  height={40}
                  className='w-10 h-10'
                />
                <div className='space-y-2'>
                  <Skeleton
                    variant='text'
                    width={90}
                    height={14}
                    className='h-3.5'
                  />
                  <Skeleton
                    variant='text'
                    width={110}
                    height={12}
                    className='h-3'
                  />
                </div>
              </div>
              <Skeleton
                variant='text'
                width={50}
                height={14}
                className='h-3.5'
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Links Skeleton */}
      <div className='mt-6 space-y-4'>
        <div className='space-y-2'>
          <div className='flex flex-wrap gap-2'>
            {[...Array(4)].map((_, index) => (
              <Skeleton
                key={index}
                variant='text'
                width={40 + Math.random() * 20}
                height={12}
                className='h-3'
              />
            ))}
          </div>
          <div className='flex flex-wrap gap-2'>
            {[...Array(3)].map((_, index) => (
              <Skeleton
                key={index}
                variant='text'
                width={50 + Math.random() * 30}
                height={12}
                className='h-3'
              />
            ))}
          </div>
        </div>

        <Skeleton variant='text' width={100} height={12} className='h-3' />
      </div>
    </div>
  );
};
