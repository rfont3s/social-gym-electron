import React from 'react';
import { MobileBottomNavigation } from '../MobileBottomNavigation';
import { MobileHeader } from '../MobileHeader';
import { Sidebar } from '../Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showSidebar = true,
}) => {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Mobile Header - only visible on mobile */}
      <MobileHeader />

      <div className='flex'>
        {/* Desktop Sidebar - hidden on mobile */}
        {showSidebar && <Sidebar />}

        {/* Main Content */}
        <div className='flex-1 min-h-screen'>
          <div className='pt-16 md:pt-0 pb-16 md:pb-0'>{children}</div>
        </div>
      </div>

      {/* Mobile Bottom Navigation - only visible on mobile */}
      <MobileBottomNavigation />
    </div>
  );
};
