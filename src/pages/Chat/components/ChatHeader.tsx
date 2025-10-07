import { Users } from 'lucide-react';
import type { Conversation, User } from '../../../types/chat';
import { ConversationType } from '../../../types/chat';

interface ChatHeaderProps {
  conversation: Conversation;
  currentUser?: User;
  onManageMembers?: () => void;
}

export function ChatHeader({ conversation, currentUser, onManageMembers }: ChatHeaderProps) {
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
    <div className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center gap-3">
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
          <h2 className="font-semibold text-gray-900">{getConversationName()}</h2>
          <p className="text-sm text-gray-500">{getOnlineStatus()}</p>
        </div>

        {/* Group members button */}
        {isGroup && onManageMembers && (
          <button
            onClick={onManageMembers}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Gerenciar membros"
          >
            <Users size={20} className="text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
}
