import React from 'react';
import { DashboardHeader, StatsGrid, WelcomeCard } from './components';
import type { DashboardData } from './index';

interface DashboardViewProps {
  data: DashboardData;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ data }) => {
  const { user, stats, theme, actions } = data;

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300'>
      {/* Header */}
      <DashboardHeader 
        user={user}
        theme={theme}
        onLogout={actions.logout}
      />

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <StatsGrid stats={stats} />
        <WelcomeCard />
      </main>
    </div>
  );
};
