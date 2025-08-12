import { AttachMoney, DirectionsRun, People } from '@mui/icons-material';
import React from 'react';
import type { DashboardStats } from '../../index';
import { StatsCard } from '../StatsCard/StatsCard';

interface StatsGridProps {
  stats: DashboardStats;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
      <StatsCard
        title='Membros Ativos'
        value={stats.activeMembers}
        icon={<People className='text-primary-500' fontSize='large' />}
        bgColorClass='bg-primary-100 dark:bg-primary-900/30'
      />

      <StatsCard
        title='Receita Mensal'
        value={stats.monthlyRevenue}
        icon={<AttachMoney className='text-secondary-500' fontSize='large' />}
        bgColorClass='bg-secondary-100 dark:bg-secondary-900/30'
      />

      <StatsCard
        title='Check-ins Hoje'
        value={stats.todayCheckins}
        icon={<DirectionsRun className='text-accent-500' fontSize='large' />}
        bgColorClass='bg-accent-100 dark:bg-accent-900/30'
      />
    </div>
  );
};
