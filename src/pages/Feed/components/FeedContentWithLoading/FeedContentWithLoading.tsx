import React, { useEffect, useState } from 'react';
import { Post } from '../Post/Post';
import { PostSkeleton } from '../skeletons';
import { StoriesWithLoading } from '../StoriesWithLoading/StoriesWithLoading';

interface PostData {
  id: string;
  user: {
    username: string;
    avatar: string;
    verified?: boolean;
  };
  content: {
    images?: string[];
    video?: string;
    caption: string;
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  liked: boolean;
  saved: boolean;
  timestamp: string;
}

export const FeedContentWithLoading: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  // Simular carregamento de dados
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockPosts: PostData[] = [
        {
          id: '1',
          user: {
            username: 'fitness_academy',
            avatar:
              'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="%234a90e2"/><text x="20" y="25" text-anchor="middle" fill="white" font-size="14" font-family="Arial">FA</text></svg>',
            verified: true,
          },
          content: {
            images: [
              'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%233498db"/><text x="300" y="290" text-anchor="middle" fill="white" font-size="40" font-family="Arial">Treino</text><text x="300" y="340" text-anchor="middle" fill="white" font-size="40" font-family="Arial">Peito</text></svg>',
              'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23e74c3c"/><text x="300" y="290" text-anchor="middle" fill="white" font-size="36" font-family="Arial">Exercícios</text><text x="300" y="340" text-anchor="middle" fill="white" font-size="36" font-family="Arial">Fitness</text></svg>',
              'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%232ecc71"/><text x="300" y="290" text-anchor="middle" fill="white" font-size="40" font-family="Arial">Academia</text><text x="300" y="340" text-anchor="middle" fill="white" font-size="40" font-family="Arial">Gym</text></svg>',
            ],
            caption:
              'Treino de peito e tríceps hoje! 💪 Quem mais está treinando? #FitnessMotivation #GymLife #Treino',
          },
          stats: {
            likes: 1247,
            comments: 89,
            shares: 23,
          },
          liked: false,
          saved: false,
          timestamp: '2h',
        },
        {
          id: '2',
          user: {
            username: 'personal_trainer_ana',
            avatar:
              'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="%23e91e63"/><text x="20" y="25" text-anchor="middle" fill="white" font-size="14" font-family="Arial">PA</text></svg>',
            verified: false,
          },
          content: {
            images: [
              'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%2327ae60"/><text x="300" y="280" text-anchor="middle" fill="white" font-size="32" font-family="Arial">Alimentação</text><text x="300" y="320" text-anchor="middle" fill="white" font-size="32" font-family="Arial">Saudável</text><text x="300" y="360" text-anchor="middle" fill="white" font-size="24" font-family="Arial">🥗</text></svg>',
            ],
            caption:
              'Dicas de alimentação pré-treino: 🥗\n\n1. Carboidratos complexos (aveia, batata doce)\n2. Proteínas magras (frango, peixe)\n3. Hidratação adequada\n\nO que vocês costumam comer antes do treino?',
          },
          stats: {
            likes: 892,
            comments: 156,
            shares: 45,
          },
          liked: true,
          saved: true,
          timestamp: '4h',
        },
        {
          id: '3',
          user: {
            username: 'strongman_carlos',
            avatar:
              'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="%23ff9800"/><text x="20" y="25" text-anchor="middle" fill="white" font-size="14" font-family="Arial">SC</text></svg>',
            verified: false,
          },
          content: {
            images: [
              'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%239c27b0"/><text x="300" y="270" text-anchor="middle" fill="white" font-size="30" font-family="Arial">Levantamento</text><text x="300" y="310" text-anchor="middle" fill="white" font-size="48" font-family="Arial">200kg</text><text x="300" y="360" text-anchor="middle" fill="white" font-size="36" font-family="Arial">🔥</text></svg>',
            ],
            caption:
              'Levantamento terra com 200kg! 🔥 Mais um PR batido hoje. A jornada não para! #Powerlifting #PR #Strongman',
          },
          stats: {
            likes: 2156,
            comments: 234,
            shares: 78,
          },
          liked: false,
          saved: false,
          timestamp: '6h',
        },
      ];

      setPosts(mockPosts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className='w-full md:max-w-md lg:max-w-lg md:mx-auto py-6'>
        {/* Stories Skeleton */}
        <div className='mb-6'>
          <div className='flex justify-between px-4 md:px-0 overflow-x-auto scrollbar-hide'>
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className='flex flex-col items-center space-y-2 flex-shrink-0'
              >
                <div className='p-1 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700'>
                  <div className='p-1 bg-white dark:bg-gray-800 rounded-full'>
                    <div className='w-16 h-16 rounded-full animate-pulse bg-gray-200 dark:bg-gray-700' />
                  </div>
                </div>
                <div className='h-3 w-16 rounded animate-pulse bg-gray-200 dark:bg-gray-700' />
              </div>
            ))}
          </div>
        </div>

        {/* Posts Skeleton */}
        <div className='space-y-6 md:px-4'>
          {[...Array(3)].map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='w-full md:max-w-md lg:max-w-lg md:mx-auto py-6'>
      {/* Stories */}
      <StoriesWithLoading />

      {/* Posts */}
      <div className='space-y-6 md:px-4'>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>

      {/* Load More */}
      <div className='text-center py-8 px-4'>
        <button className='px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200'>
          Carregar mais posts
        </button>
      </div>
    </div>
  );
};
