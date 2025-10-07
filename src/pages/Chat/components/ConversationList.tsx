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
      p => p.userId !== currentUser?.id
    );

    return otherParticipant
      ? `${otherParticipant.user.firstName} ${otherParticipant.user.lastName}`
      : 'Conversa';
  };

  const getOtherUser = (conversation: Conversation) => {
    if (conversation.type === ConversationType.GROUP) {
      return null;
    }

    return conversation.participants?.find(p => p.userId !== currentUser?.id)
      ?.user;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInHours =
      (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return messageDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  const formatLastSeen = (lastSeen?: Date) => {
    if (!lastSeen) return 'Offline';

    const now = new Date();
    const lastSeenDate = new Date(lastSeen);
    const diffInMinutes = Math.floor(
      (now.getTime() - lastSeenDate.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return 'Online agora';
    if (diffInMinutes < 60) return `Online há ${diffInMinutes} min`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Online há ${diffInHours}h`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Online há ${diffInDays}d`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    return `Online há ${diffInWeeks} semana${diffInWeeks > 1 ? 's' : ''}`;
  };

  if (conversations.length === 0) {
    return (
      <div
        className={`flex items-center justify-center h-full text-gray-500 ${className}`}
      >
        <div className='text-center p-4'>
          <div className='text-4xl mb-2'>💬</div>
          <p>Nenhuma conversa ainda</p>
          <p className='text-sm text-gray-400 mt-1'>
            Inicie uma nova conversa para começar
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status?: string, isOnline?: boolean) => {
    // Para usuários invisíveis ou offline (não conectados via Socket.IO)
    if (!isOnline || status === 'INVISIBLE' || status === 'OFFLINE') {
      return 'bg-white border-2 border-gray-400';
    }

    // Para usuários online via Socket.IO, usar o status escolhido
    switch (status) {
      case 'BUSY':
        return 'bg-red-500 border-2 border-white';
      case 'AWAY':
        return 'bg-yellow-500 border-2 border-white';
      case 'ONLINE':
      default:
        return 'bg-green-500 border-2 border-white';
    }
  };

  const getStatusText = (status?: string, isOnline?: boolean, lastSeen?: Date) => {
    // Se não está online via Socket.IO, mostrar "Offline" ou última vez visto
    if (!isOnline) {
      return formatLastSeen(lastSeen);
    }

    // Se está online, mostrar o status escolhido
    switch (status) {
      case 'BUSY':
        return 'Ocupado';
      case 'AWAY':
        return 'Ausente';
      case 'OFFLINE':
        return 'Offline';
      case 'INVISIBLE':
        // Para invisível, mostrar última vez visto ao invés de "Offline"
        return formatLastSeen(lastSeen);
      case 'ONLINE':
      default:
        return 'Online agora';
    }
  };

  return (
    <div className={`flex flex-col h-full overflow-hidden ${className}`}>
      <div className='flex-1 overflow-y-auto'>
        {conversations.map(conversation => {
          const isActive = activeConversation?.id === conversation.id;
          const lastMessage = conversation.lastMessage;
          const otherUser = getOtherUser(conversation);
          const isOnline = otherUser?.isOnline || false;
          const userStatus = otherUser?.status;

          return (
            <div
              key={conversation.id}
              onClick={() => onConversationSelect(conversation)}
              className={`
                p-2.5 border-b border-gray-200 cursor-pointer transition-colors
                ${isActive ? 'bg-blue-50' : 'hover:bg-gray-50'}
              `}
            >
              <div className='flex items-center gap-2.5'>
                <div className='relative'>
                  <div className='w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 text-sm'>
                    {getConversationName(conversation).charAt(0).toUpperCase()}
                  </div>
                  {otherUser && (
                    <div
                      className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${getStatusColor(userStatus, isOnline)}`}
                    ></div>
                  )}
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex justify-between items-center mb-0.5'>
                    <h3 className='font-semibold text-sm text-gray-900 truncate'>
                      {getConversationName(conversation)}
                    </h3>
                    {lastMessage && (
                      <span className='text-xs text-gray-500 ml-2 flex-shrink-0'>
                        {formatTime(lastMessage.createdAt)}
                      </span>
                    )}
                  </div>
                  {conversation.unreadCount > 0 ? (
                    <p className='text-xs text-gray-900 font-semibold truncate'>
                      {conversation.unreadCount}{' '}
                      {conversation.unreadCount === 1
                        ? 'nova mensagem'
                        : 'novas mensagens'}
                    </p>
                  ) : (
                    otherUser && (
                      <p className='text-xs text-gray-500 truncate'>
                        {getStatusText(userStatus, isOnline, otherUser.lastSeen)}
                      </p>
                    )
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
