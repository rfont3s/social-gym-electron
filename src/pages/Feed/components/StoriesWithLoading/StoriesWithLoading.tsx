import React, { useEffect, useState } from 'react';
import { Stories } from '../Stories/Stories';
import { StoriesSkeleton } from '../skeletons';

export const StoriesWithLoading: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);

      // Simular delay de API para stories
      await new Promise(resolve => setTimeout(resolve, 1000));

      setLoading(false);
    };

    fetchStories();
  }, []);

  if (loading) {
    return <StoriesSkeleton />;
  }

  return <Stories />;
};
