import { Users, BellOff, Bell, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Conversation, User } from '../../../types/chat';
import { ConversationType } from '../../../types/chat';

interface ChatHeaderProps {
  conversation: Conversation;
  currentUser?: User;
  onManageMembers?: () => void;
  onMuteConversation?: (duration: 'day' | 'week' | 'forever' | null) => void;
  onBackToList?: () => void;
}

export function ChatHeader({ conversation, currentUser, onManageMembers, onMuteConversation, onBackToList }: ChatHeaderProps) {
  const [showMuteMenu, setShowMuteMenu] = useState(false);

  // Check if conversation is muted for current user
  const currentParticipant = conversation.participants?.find(p => p.userId === currentUser?.id);
  const isMuted = currentParticipant?.mutedUntil && new Date(currentParticipant.mutedUntil) > new Date();

  // Close menu when muted status changes
  useEffect(() => {
    setShowMuteMenu(false);
  }, [isMuted]);

  console.log('[ChatHeader] currentParticipant:', currentParticipant);
  console.log('[ChatHeader] mutedUntil:', currentParticipant?.mutedUntil);
  console.log('[ChatHeader] isMuted:', isMuted);
  const getConversationName = () => {
    if (conversation.type === ConversationType.GROUP && conversation.name) {
      return conversation.name;
    }

    // For direct messages, show the other user's name
    const otherParticipant = conversation.participants?.find((p) => p.userId !== currentUser?.id);

    return otherParticipant
      ? `${otherParticipant.user.firstName} ${otherParticipant.user.lastName}`
      : 'Conversa';
  };

  const getOnlineStatus = () => {
    if (conversation.type === ConversationType.GROUP) {
      const onlineCount = conversation.participants.filter((p) => p.user.isOnline).length;
      return `${onlineCount} online`;
    }

    const otherParticipant = conversation.participants.find((p) => p.userId !== currentUser?.id);
    return otherParticipant?.user.isOnline ? 'Online' : 'Offline';
  };

  const isGroup = conversation.type === ConversationType.GROUP;

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-4">
      <div className="flex items-center gap-3">
        {/* Back button for mobile */}
        {onBackToList && (
          <button
            onClick={onBackToList}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            title="Voltar para lista"
          >
            <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        )}
        {isGroup ? (
          // Avatares sobrepostos para grupos
          <div className='relative w-10 h-10 flex-shrink-0'>
            {/* Avatar 1 - Fundo */}
            <div className='absolute top-0 left-0 w-7 h-7 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs border-2 border-white'>
              {conversation.participants?.[0]?.user.firstName.charAt(0).toUpperCase() || 'G'}
            </div>
            {/* Avatar 2 - Meio */}
            <div className='absolute top-1 left-1.5 w-7 h-7 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs border-2 border-white'>
              {conversation.participants?.[1]?.user.firstName.charAt(0).toUpperCase() || 'R'}
            </div>
            {/* Avatar 3 - Frente */}
            <div className='absolute top-2 left-3 w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs border-2 border-white'>
              {conversation.participants?.[2]?.user.firstName.charAt(0).toUpperCase() || 'G'}
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
            {getConversationName().charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">{getConversationName()}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{getOnlineStatus()}</p>
        </div>

        {/* Mute button */}
        {onMuteConversation && (
          <div className="relative">
            <button
              onClick={() => setShowMuteMenu(!showMuteMenu)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              title={isMuted ? "Conversa silenciada" : "Silenciar notificações"}
            >
              {isMuted ? (
                <BellOff size={20} className="text-gray-600 dark:text-gray-400" />
              ) : (
                <Bell size={20} className="text-gray-600 dark:text-gray-400" />
              )}
            </button>

            {/* Mute menu */}
            {showMuteMenu && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowMuteMenu(false)}
                />
                <div className="absolute right-0 top-12 z-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl py-2 w-48">
                  {isMuted ? (
                    <button
                      onClick={() => {
                        onMuteConversation(null);
                        setShowMuteMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Reativar notificações
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          onMuteConversation('day');
                          setShowMuteMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Silenciar por 1 dia
                      </button>
                      <button
                        onClick={() => {
                          onMuteConversation('week');
                          setShowMuteMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Silenciar por 7 dias
                      </button>
                      <button
                        onClick={() => {
                          onMuteConversation('forever');
                          setShowMuteMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Silenciar para sempre
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Group members button */}
        {isGroup && onManageMembers && (
          <button
            onClick={onManageMembers}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            title="Gerenciar membros"
          >
            <Users size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
}
