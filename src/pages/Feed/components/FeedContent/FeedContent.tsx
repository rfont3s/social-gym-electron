import React from 'react';
import { Post } from '../Post/Post';
import { Stories } from '../Stories/Stories';

export const FeedContent: React.FC = () => {
  const mockPosts = [
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

  return (
    <div className='w-full md:max-w-md lg:max-w-lg md:mx-auto py-6'>
      {/* Stories */}
      <Stories />

      {/* Posts */}
      <div className='space-y-6 md:px-4'>
        {mockPosts.map(post => (
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
