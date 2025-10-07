import type { Conversation, User } from '../../../types/chat';
import { ConversationType } from '../../../types/chat';

interface ConversationListProps {
  conversations: Conversation[];
  currentUser?: User;
  activeConversation?: Conversation;
  onConversationSelect: (conversation: Conversation) => void;
  className?: string;
}

export function ConversationList({
  conversations,
  currentUser,
  activeConversation,
  onConversationSelect,
  className = '',
}: ConversationListProps) {
  const getConversationName = (conversation: Conversation) => {
    if (conversation.type === ConversationType.GROUP && conversation.name) {
      return conversation.name;
    }

    // For direct messages, show the other user's name
    const otherParticipant = conversation.participants?.find(
      (p) => p.userId !== currentUser?.id
    );

    return otherParticipant
      ? `${otherParticipant.user.firstName} ${otherParticipant.user.lastName}`
      : 'Conversa';
  };

  const getOtherUser = (conversation: Conversation) => {
    if (conversation.type === ConversationType.GROUP) {
      return null;
    }

    return conversation.participants?.find(
      (p) => p.userId !== currentUser?.id
    )?.user;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return messageDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  if (conversations.length === 0) {
    return (
      <div className={`flex items-center justify-center h-full text-gray-500 ${className}`}>
        <div className="text-center p-4">
          <div className="text-4xl mb-2">💬</div>
          <p>Nenhuma conversa ainda</p>
          <p className="text-sm text-gray-400 mt-1">Inicie uma nova conversa para começar</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full overflow-hidden ${className}`}>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => {
          const isActive = activeConversation?.id === conversation.id;
          const lastMessage = conversation.lastMessage;
          const otherUser = getOtherUser(conversation);
          const isOnline = otherUser?.isOnline || false;

          return (
            <div
              key={conversation.id}
              onClick={() => onConversationSelect(conversation)}
              className={`
                p-4 border-b border-gray-200 cursor-pointer transition-colors
                ${isActive ? 'bg-blue-50' : 'hover:bg-gray-50'}
              `}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 text-sm">
                    {getConversationName(conversation).charAt(0).toUpperCase()}
                  </div>
                  {otherUser && (
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-white border-gray-300'}`}></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {getConversationName(conversation)}
                    </h3>
                    {lastMessage && (
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                        {formatTime(lastMessage.createdAt)}
                      </span>
                    )}
                  </div>
                  {conversation.unreadCount > 0 && (
                    <p className="text-sm text-gray-900 font-semibold truncate">
                      {conversation.unreadCount} {conversation.unreadCount === 1 ? 'nova mensagem' : 'novas mensagens'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
