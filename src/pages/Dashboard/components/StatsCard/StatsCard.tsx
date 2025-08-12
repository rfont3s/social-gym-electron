import React from 'react';
import { Card } from '@components';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColorClass: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  bgColorClass,
}) => {
  return (
    <Card variant='elevated'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
            {title}
          </p>
          <p className='text-3xl font-bold mt-1 text-gray-900 dark:text-white'>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
        <div
          className={`w-12 h-12 ${bgColorClass} rounded-lg flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
};
