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
        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
          {getConversationName().charAt(0).toUpperCase()}
        </div>
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
