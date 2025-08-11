import { Layout } from '@/global/components';
import React from 'react';
import {
  FeedContentWithLoading,
  SuggestionsSidebarWithLoading,
} from './components';

const Feed: React.FC = () => {
  return (
    <Layout>
      <div className='flex justify-center'>
        {/* Main Feed Content - Full width on mobile, centralized on desktop */}
        <div className='w-full md:flex-1 md:max-w-2xl'>
          <FeedContentWithLoading />
        </div>

        {/* Right Sidebar - Hidden on mobile/tablet */}
        <div className='hidden xl:block w-80 ml-8'>
          <div className='sticky top-6'>
            <SuggestionsSidebarWithLoading />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
