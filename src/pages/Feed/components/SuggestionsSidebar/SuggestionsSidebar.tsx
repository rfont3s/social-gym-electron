import React from 'react';

interface Suggestion {
  id: string;
  username: string;
  avatar: string;
  name: string;
  mutualFriends?: number;
  isFollowing: boolean;
}

export const SuggestionsSidebar: React.FC = () => {
  const suggestions: Suggestion[] = [
    {
      id: '1',
      username: 'maria_fitness',
      avatar:
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="%23e91e63"/><text x="20" y="25" text-anchor="middle" fill="white" font-size="14" font-family="Arial">MF</text></svg>',
      name: 'Maria Silva',
      mutualFriends: 12,
      isFollowing: false,
    },
    {
      id: '2',
      username: 'joao_crossfit',
      avatar:
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="%233498db"/><text x="20" y="25" text-anchor="middle" fill="white" font-size="14" font-family="Arial">JC</text></svg>',
      name: 'João Santos',
      mutualFriends: 8,
      isFollowing: false,
    },
    {
      id: '3',
      username: 'nutricionista_carol',
      avatar:
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="%2327ae60"/><text x="20" y="25" text-anchor="middle" fill="white" font-size="14" font-family="Arial">NC</text></svg>',
      name: 'Carolina Nutrição',
      mutualFriends: 15,
      isFollowing: false,
    },
    {
      id: '4',
      username: 'pilates_studio',
      avatar:
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="%239b59b6"/><text x="20" y="25" text-anchor="middle" fill="white" font-size="14" font-family="Arial">PS</text></svg>',
      name: 'Studio Pilates',
      mutualFriends: 6,
      isFollowing: false,
    },
    {
      id: '5',
      username: 'runner_paulo',
      avatar:
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="%23f39c12"/><text x="20" y="25" text-anchor="middle" fill="white" font-size="14" font-family="Arial">RP</text></svg>',
      name: 'Paulo Corrida',
      mutualFriends: 20,
      isFollowing: false,
    },
  ];

  const currentUser = {
    username: 'roberto_fontes',
    avatar:
      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="%234a90e2"/><text x="20" y="25" text-anchor="middle" fill="white" font-size="16" font-family="Arial">RF</text></svg>',
    name: 'Roberto Fontes',
  };

  return (
    <div className='p-6'>
      {/* User Profile Summary */}
      <div className='bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 border border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className='w-12 h-12 rounded-full object-cover'
            />
            <div>
              <p className='font-semibold text-gray-900 dark:text-white'>
                {currentUser.username}
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                {currentUser.name}
              </p>
            </div>
          </div>
          <button className='text-primary-500 font-semibold text-sm hover:text-primary-600'>
            Trocar
          </button>
        </div>
      </div>

      {/* Suggestions */}
      <div className='bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='font-semibold text-gray-900 dark:text-white'>
            Sugestões para você
          </h3>
          <button className='text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'>
            Ver tudo
          </button>
        </div>

        <div className='space-y-3'>
          {suggestions.map(suggestion => (
            <div
              key={suggestion.id}
              className='flex items-center justify-between'
            >
              <div className='flex items-center space-x-3'>
                <img
                  src={suggestion.avatar}
                  alt={suggestion.username}
                  className='w-10 h-10 rounded-full object-cover'
                />
                <div>
                  <p className='font-semibold text-gray-900 dark:text-white text-sm'>
                    {suggestion.username}
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    {suggestion.mutualFriends &&
                      `${suggestion.mutualFriends} amigos em comum`}
                  </p>
                </div>
              </div>
              <button className='text-primary-500 font-semibold text-sm hover:text-primary-600'>
                Seguir
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className='mt-6 space-y-4'>
        <div className='text-xs text-gray-500 dark:text-gray-400 space-y-2'>
          <div className='flex flex-wrap gap-2'>
            <a href='#' className='hover:underline'>
              Sobre
            </a>
            <span>•</span>
            <a href='#' className='hover:underline'>
              Ajuda
            </a>
            <span>•</span>
            <a href='#' className='hover:underline'>
              Imprensa
            </a>
            <span>•</span>
            <a href='#' className='hover:underline'>
              API
            </a>
          </div>
          <div className='flex flex-wrap gap-2'>
            <a href='#' className='hover:underline'>
              Carreiras
            </a>
            <span>•</span>
            <a href='#' className='hover:underline'>
              Privacidade
            </a>
            <span>•</span>
            <a href='#' className='hover:underline'>
              Termos
            </a>
          </div>
          <div className='flex flex-wrap gap-2'>
            <a href='#' className='hover:underline'>
              Localizações
            </a>
            <span>•</span>
            <a href='#' className='hover:underline'>
              Idioma
            </a>
          </div>
        </div>

        <div className='text-xs text-gray-400 dark:text-gray-500'>
          © 2025 Worknnect
        </div>
      </div>
    </div>
  );
};
