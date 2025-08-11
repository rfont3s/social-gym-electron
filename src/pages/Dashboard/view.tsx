import { Layout } from '@/global/components';
import React from 'react';
import { StatsGrid, WelcomeCard } from './components';
import type { DashboardData } from './index';

interface DashboardViewProps {
  data: DashboardData;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ data }) => {
  const { stats } = data;

  return (
    <Layout>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Main Content */}
        <main className='py-8'>
          <StatsGrid stats={stats} />
          <WelcomeCard />
        </main>
      </div>
    </Layout>
  );
};
