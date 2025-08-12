import React from 'react';

interface Story {
  id: string;
  username: string;
  avatar: string;
  viewed: boolean;
}

export const Stories: React.FC = () => {
  const stories: Story[] = [
    {
      id: '1',
      username: 'Seu story',
      avatar:
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="40" fill="%234a90e2"/><text x="40" y="50" text-anchor="middle" fill="white" font-size="28" font-family="Arial">U</text></svg>',
      viewed: false,
    },
    {
      id: '2',
      username: 'academia_fit',
      avatar:
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="40" fill="%23e74c3c"/><text x="40" y="50" text-anchor="middle" fill="white" font-size="24" font-family="Arial">AF</text></svg>',
      viewed: false,
    },
    {
      id: '3',
      username: 'personal_trainer',
      avatar:
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="40" fill="%23f39c12"/><text x="40" y="50" text-anchor="middle" fill="white" font-size="24" font-family="Arial">PT</text></svg>',
      viewed: true,
    },
    {
      id: '4',
      username: 'fitnessmotiv',
      avatar:
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="40" fill="%239b59b6"/><text x="40" y="50" text-anchor="middle" fill="white" font-size="24" font-family="Arial">FM</text></svg>',
      viewed: false,
    },
    {
      id: '5',
      username: 'healthy_life',
      avatar:
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="40" fill="%2327ae60"/><text x="40" y="50" text-anchor="middle" fill="white" font-size="24" font-family="Arial">HL</text></svg>',
      viewed: true,
    },
    {
      id: '6',
      username: 'strongbody',
      avatar:
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="40" fill="%2334495e"/><text x="40" y="50" text-anchor="middle" fill="white" font-size="24" font-family="Arial">SB</text></svg>',
      viewed: false,
    },
  ];

  return (
    <div className='mb-6'>
      <div className='flex justify-between px-4 md:px-0 overflow-x-auto scrollbar-hide'>
        {stories.slice(0, 6).map(story => (
          <div
            key={story.id}
            className='flex flex-col items-center space-y-2 flex-shrink-0'
          >
            <div
              className={`p-1 rounded-full ${
                story.viewed
                  ? 'bg-gray-300 dark:bg-gray-600'
                  : story.username === 'Seu story'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500'
              }`}
            >
              <div className='p-1 bg-white dark:bg-gray-800 rounded-full'>
                <img
                  src={story.avatar}
                  alt={story.username}
                  className='w-16 h-16 rounded-full object-cover'
                />
              </div>
            </div>
            <span className='text-xs text-gray-600 dark:text-gray-400 text-center max-w-[80px] truncate'>
              {story.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
