import React from 'react';
import { Skeleton } from '@/global/components/Skeleton';

export const StoriesSkeleton: React.FC = () => {
  return (
    <div className='mb-6'>
      <div className='flex justify-between px-4 md:px-0 overflow-x-auto scrollbar-hide'>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className='flex flex-col items-center space-y-2 flex-shrink-0'
          >
            {/* Story Circle */}
            <div className='p-1 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700'>
              <div className='p-1 bg-white dark:bg-gray-800 rounded-full'>
                <Skeleton
                  variant='circular'
                  width={64}
                  height={64}
                  className='w-16 h-16'
                />
              </div>
            </div>
            {/* Story Username */}
            <Skeleton variant='text' width={60} height={12} className='h-3' />
          </div>
        ))}
      </div>
    </div>
  );
};
