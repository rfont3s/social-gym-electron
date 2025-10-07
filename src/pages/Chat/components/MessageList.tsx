import { useRef, useEffect, useState } from 'react';
import type { Message, User } from '../../../types/chat';

interface MessageListProps {
  messages: Message[];
  currentUser?: User;
  className?: string;
  onAddReaction?: (messageId: string, emoji: string) => void;
  onRemoveReaction?: (messageId: string, emoji: string) => void;
  onDeleteMessage?: (messageId: string) => void;
}

export function MessageList({
  messages,
  currentUser,
  className = '',
  onAddReaction,
  onRemoveReaction,
  onDeleteMessage,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [showReactionPicker, setShowReactionPicker] = useState<string | null>(null);

  const availableReactions = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const canDeleteMessage = (message: Message) => {
    const now = new Date();
    const messageTime = new Date(message.createdAt);
    const diffInMinutes = (now.getTime() - messageTime.getTime()) / (1000 * 60);
    return diffInMinutes <= 2;
  };

  const shouldShowDateSeparator = (
    currentMessage: Message,
    previousMessage?: Message
  ) => {
    if (!previousMessage) return true;

    const currentDate = new Date(currentMessage.createdAt).toDateString();
    const previousDate = new Date(previousMessage.createdAt).toDateString();

    return currentDate !== previousDate;
  };

  if (messages.length === 0) {
    return (
      <div
        className={`flex items-center justify-center h-full text-gray-500 ${className}`}
      >
        <div className='text-center p-4'>
          <div className='text-4xl mb-2'>💭</div>
          <p>Ainda não há mensagens</p>
          <p className='text-sm text-gray-400 mt-1'>
            Envie uma mensagem para começar a conversa
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full overflow-hidden ${className}`}>
      <div className='flex-1 overflow-y-auto p-4 space-y-2'>
        {messages.map((message, index) => {
          const previousMessage = index > 0 ? messages[index - 1] : undefined;
          const showDateSeparator = shouldShowDateSeparator(
            message,
            previousMessage
          );
          const isOwnMessage = message.senderId === currentUser?.id;
          const showAvatar =
            !previousMessage ||
            previousMessage.senderId !== message.senderId ||
            showDateSeparator;

          return (
            <div key={message.id}>
              {showDateSeparator && (
                <div className='flex justify-center my-4'>
                  <span className='px-4 py-1 text-xs text-gray-500 bg-gray-200 rounded-full'>
                    {formatDate(message.createdAt)}
                  </span>
                </div>
              )}

              <div
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-1 group relative`}
                onMouseEnter={() => setHoveredMessageId(message.id)}
                onMouseLeave={() => setHoveredMessageId(null)}
              >
                <div
                  className={`flex gap-2 max-w-[70%] ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  {showAvatar && !isOwnMessage && (
                    <div className='w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 text-sm'>
                      {message.sender.firstName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {!showAvatar && !isOwnMessage && <div className='w-8' />}

                  {/* Message bubble */}
                  <div className='flex flex-col'>
                    {showAvatar && !isOwnMessage && (
                      <span className='text-xs text-gray-600 mb-1 px-2'>
                        {message.sender.firstName} {message.sender.lastName}
                      </span>
                    )}
                    <div
                      className={`
                      px-3 py-2 rounded-2xl break-words relative
                      ${
                        isOwnMessage
                          ? 'bg-blue-500 text-white rounded-br-sm'
                          : 'bg-gray-200 text-gray-900 rounded-bl-sm'
                      }
                    `}
                    >
                      {message.replyTo && (
                        <div
                          className={`
                          mb-2 p-2 rounded border-l-2
                          ${
                            isOwnMessage
                              ? 'bg-blue-600 border-blue-300'
                              : 'bg-gray-300 border-gray-500'
                          }
                        `}
                        >
                          <p className='text-xs opacity-75'>
                            {message.replyTo.sender.firstName}
                          </p>
                          <p className='text-sm truncate'>
                            {message.replyTo.content}
                          </p>
                        </div>
                      )}

                      {message.isDeleted ? (
                        <p className='text-sm italic opacity-60 pr-12'>
                          Mensagem excluída
                        </p>
                      ) : (
                        <p className='text-sm whitespace-pre-wrap pr-12'>
                          {message.content}
                        </p>
                      )}

                      <div className='flex items-center gap-1 absolute bottom-1 right-2'>
                        {message.isEdited && !message.isDeleted && (
                          <span
                            className={`text-[10px] italic ${isOwnMessage ? 'text-blue-100' : 'text-gray-500'}`}
                          >
                            editada
                          </span>
                        )}
                        <span
                          className={`text-[10px] ${isOwnMessage ? 'text-blue-100' : 'text-gray-500'}`}
                        >
                          {formatTime(message.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Reactions */}
                    {message.reactions && message.reactions.length > 0 && (
                      <div className='flex gap-0.5 mt-0.5 px-2 flex-wrap'>
                        {/* Group reactions by emoji */}
                        {Object.entries(
                          message.reactions.reduce((acc, reaction) => {
                            const key = reaction.emoji;
                            if (!acc[key]) acc[key] = [];
                            acc[key].push(reaction);
                            return acc;
                          }, {} as Record<string, typeof message.reactions>)
                        ).map(([emoji, reactions]) => {
                          const userReacted = reactions.some(r => r.userId === currentUser?.id);
                          return (
                            <button
                              key={emoji}
                              onClick={() => {
                                if (userReacted) {
                                  onRemoveReaction?.(message.id, emoji);
                                } else {
                                  onAddReaction?.(message.id, emoji);
                                }
                              }}
                              className={`text-[10px] rounded-full px-1.5 py-0.5 flex items-center gap-0.5 transition-colors ${
                                userReacted
                                  ? 'bg-blue-100 border border-blue-300'
                                  : 'bg-white border border-gray-300 hover:bg-gray-100'
                              }`}
                            >
                              <span className='text-xs'>{emoji}</span>
                              {reactions.length > 1 && (
                                <span className='text-[9px] text-gray-600'>
                                  {reactions.length}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action buttons (appear on hover) */}
                {hoveredMessageId === message.id && !message.isDeleted && (
                  <div className={`absolute -top-3 ${isOwnMessage ? 'right-2' : 'left-2'} flex gap-1 opacity-0 group-hover:opacity-100 z-10`}>
                    <button
                      onClick={() => setShowReactionPicker(showReactionPicker === message.id ? null : message.id)}
                      className='p-1 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-50 transition-colors w-7 h-7 flex items-center justify-center'
                      title='Adicionar reação'
                    >
                      <span className='text-base leading-none'>😊</span>
                    </button>

                    {isOwnMessage && onDeleteMessage && canDeleteMessage(message) && (
                      <button
                        onClick={() => {
                          if (window.confirm('Tem certeza que deseja excluir esta mensagem?')) {
                            onDeleteMessage(message.id);
                          }
                        }}
                        className='p-1 bg-white border border-gray-300 rounded-full shadow-md hover:bg-red-50 hover:border-red-300 transition-colors w-7 h-7 flex items-center justify-center'
                        title='Excluir mensagem (até 2 minutos após o envio)'
                      >
                        <svg className='w-4 h-4 text-gray-600 hover:text-red-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}

                {/* Reaction picker */}
                {showReactionPicker === message.id && (
                  <>
                    {/* Backdrop to close picker */}
                    <div
                      className='fixed inset-0 z-30'
                      onClick={() => setShowReactionPicker(null)}
                    />
                    <div className={`absolute z-40 -top-12 ${isOwnMessage ? 'right-2' : 'left-2'} bg-white border border-gray-300 rounded-lg shadow-xl p-2 flex gap-1`}>
                      {availableReactions.map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => {
                            onAddReaction?.(message.id, emoji);
                            setShowReactionPicker(null);
                          }}
                          className='text-xl hover:bg-gray-100 rounded p-1.5 transition-colors'
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
