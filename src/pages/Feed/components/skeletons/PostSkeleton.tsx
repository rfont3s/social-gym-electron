import React from 'react';
import { Skeleton } from '@/global/components/Skeleton';

export const PostSkeleton: React.FC = () => {
  return (
    <div className='bg-white dark:bg-gray-800 border-0 md:border md:border-gray-200 md:dark:border-gray-700 md:rounded-lg mb-6'>
      {/* Post Header */}
      <div className='p-4 flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <Skeleton
            variant='circular'
            width={32}
            height={32}
            className='w-8 h-8'
          />
          <div className='flex items-center space-x-2'>
            <Skeleton variant='text' width={100} height={16} className='h-4' />
            <Skeleton variant='text' width={30} height={14} className='h-3.5' />
          </div>
        </div>
        <Skeleton
          variant='circular'
          width={20}
          height={20}
          className='w-5 h-5'
        />
      </div>

      {/* Post Image */}
      <div className='relative -mx-4 md:mx-0'>
        <Skeleton variant='rectangular' className='w-full h-96' />
      </div>

      {/* Post Actions and Content */}
      <div className='p-4'>
        {/* Action Buttons */}
        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-center space-x-4'>
            <Skeleton
              variant='circular'
              width={24}
              height={24}
              className='w-6 h-6'
            />
            <Skeleton
              variant='circular'
              width={24}
              height={24}
              className='w-6 h-6'
            />
            <Skeleton
              variant='circular'
              width={24}
              height={24}
              className='w-6 h-6'
            />
          </div>
          <Skeleton
            variant='circular'
            width={24}
            height={24}
            className='w-6 h-6'
          />
        </div>

        {/* Likes */}
        <div className='mb-2'>
          <Skeleton variant='text' width={120} height={16} className='h-4' />
        </div>

        {/* Caption */}
        <div className='mb-2 space-y-2'>
          <Skeleton variant='text' width='100%' height={16} className='h-4' />
          <Skeleton variant='text' width='80%' height={16} className='h-4' />
          <Skeleton variant='text' width='60%' height={16} className='h-4' />
        </div>

        {/* Comments */}
        <Skeleton
          variant='text'
          width={150}
          height={14}
          className='h-3.5 mb-3'
        />

        {/* Add Comment */}
        <div className='flex items-center space-x-3'>
          <Skeleton
            variant='circular'
            width={32}
            height={32}
            className='w-8 h-8'
          />
          <Skeleton
            variant='text'
            width='100%'
            height={16}
            className='h-4 flex-1'
          />
          <Skeleton variant='text' width={60} height={16} className='h-4' />
        </div>
      </div>
    </div>
  );
};
