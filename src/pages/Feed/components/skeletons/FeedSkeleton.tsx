import React from 'react';
import { StoriesSkeleton } from './StoriesSkeleton';
import { PostSkeleton } from './PostSkeleton';

export const FeedSkeleton: React.FC = () => {
  return (
    <div className='w-full md:max-w-md lg:max-w-lg md:mx-auto py-6'>
      {/* Stories Skeleton */}
      <StoriesSkeleton />

      {/* Posts Skeleton */}
      <div className='space-y-6 md:px-4'>
        {[...Array(3)].map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
