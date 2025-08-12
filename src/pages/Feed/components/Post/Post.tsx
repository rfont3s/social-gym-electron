import React, { useState } from 'react';

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

interface PostProps {
  post: PostData;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const [liked, setLiked] = useState(post.liked);
  const [saved, setSaved] = useState(post.saved);
  const [showComments, setShowComments] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const nextImage = () => {
    if (post.content.images) {
      setCurrentImageIndex(prev =>
        prev === post.content.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (post.content.images) {
      setCurrentImageIndex(prev =>
        prev === 0 ? post.content.images!.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className='bg-white dark:bg-gray-800 border-0 md:border md:border-gray-200 md:dark:border-gray-700 md:rounded-lg mb-6'>
      {/* Post Header */}
      <div className='p-4 flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <img
            src={post.user.avatar}
            alt={post.user.username}
            className='w-8 h-8 rounded-full object-cover'
          />
          <div className='flex items-center space-x-1'>
            <span className='font-semibold text-gray-900 dark:text-white'>
              {post.user.username}
            </span>
            {post.user.verified && (
              <svg
                className='w-4 h-4 text-blue-500'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z' />
              </svg>
            )}
          </div>
          <span className='text-gray-500 dark:text-gray-400 text-sm'>
            • {post.timestamp}
          </span>
        </div>
        <button className='text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'>
          <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
          </svg>
        </button>
      </div>

      {/* Post Media - Full width on mobile */}
      <div className='relative -mx-4 md:mx-0'>
        {post.content.images && post.content.images.length > 0 && (
          <div className='relative'>
            <img
              src={post.content.images[currentImageIndex]}
              alt='Post content'
              className='w-full h-96 object-cover'
            />

            {/* Navigation arrows for multiple images */}
            {post.content.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className='absolute left-4 md:left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all duration-200'
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 19l-7-7 7-7'
                    />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className='absolute right-4 md:right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all duration-200'
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </button>

                {/* Dots indicator */}
                <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
                  {post.content.images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex
                          ? 'bg-white'
                          : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {post.content.video && (
          <video
            controls
            className='w-full h-96 object-cover'
            poster='https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop'
          >
            <source src={post.content.video} type='video/mp4' />
            Seu navegador não suporta o elemento de vídeo.
          </video>
        )}
      </div>

      {/* Post Actions */}
      <div className='p-4'>
        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-center space-x-4'>
            <button
              onClick={handleLike}
              className={`transition-colors duration-200 ${
                liked
                  ? 'text-red-500'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-500'
              }`}
            >
              <svg
                className='w-6 h-6'
                fill={liked ? 'currentColor' : 'none'}
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                />
              </svg>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className='text-gray-700 dark:text-gray-300 hover:text-gray-500 transition-colors duration-200'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                />
              </svg>
            </button>
            <button className='text-gray-700 dark:text-gray-300 hover:text-gray-500 transition-colors duration-200'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z'
                />
              </svg>
            </button>
          </div>
          <button
            onClick={handleSave}
            className={`transition-colors duration-200 ${
              saved
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-500'
            }`}
          >
            <svg
              className='w-6 h-6'
              fill={saved ? 'currentColor' : 'none'}
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
              />
            </svg>
          </button>
        </div>

        {/* Post Stats */}
        <div className='mb-2'>
          <span className='font-semibold text-gray-900 dark:text-white'>
            {post.stats.likes.toLocaleString()} curtidas
          </span>
        </div>

        {/* Post Caption */}
        <div className='mb-2'>
          <span className='font-semibold text-gray-900 dark:text-white mr-2'>
            {post.user.username}
          </span>
          <span className='text-gray-900 dark:text-white'>
            {post.content.caption}
          </span>
        </div>

        {/* Comments */}
        {post.stats.comments > 0 && (
          <button
            onClick={() => setShowComments(!showComments)}
            className='text-gray-500 dark:text-gray-400 text-sm hover:underline'
          >
            Ver todos os {post.stats.comments} comentários
          </button>
        )}

        {/* Add Comment */}
        <div className='mt-3 flex items-center space-x-3'>
          <img
            src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><circle cx='16' cy='16' r='16' fill='%234a90e2'/><text x='16' y='21' text-anchor='middle' fill='white' font-size='14' font-family='Arial'>U</text></svg>"
            alt='Your avatar'
            className='w-8 h-8 rounded-full object-cover'
          />
          <input
            type='text'
            placeholder='Adicione um comentário...'
            className='flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none'
          />
          <button className='text-primary-500 font-semibold text-sm hover:text-primary-600'>
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
};
