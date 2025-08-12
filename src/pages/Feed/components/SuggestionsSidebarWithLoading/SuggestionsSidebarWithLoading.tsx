import React, { useEffect, useState } from 'react';
import { SuggestionsSidebar } from '../SuggestionsSidebar/SuggestionsSidebar';
import { SuggestionsSkeleton } from '../skeletons';

export const SuggestionsSidebarWithLoading: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);

      // Simular delay de API para sugestões
      await new Promise(resolve => setTimeout(resolve, 1500));

      setLoading(false);
    };

    fetchSuggestions();
  }, []);

  if (loading) {
    return <SuggestionsSkeleton />;
  }

  return <SuggestionsSidebar />;
};
