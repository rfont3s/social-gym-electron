import { BellOff } from 'lucide-react';
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

  const formatTimeDiff = (lastSeen?: Date) => {
    if (!lastSeen) return null;

    const now = new Date();
    const lastSeenDate = new Date(lastSeen);
    const diffInMinutes = Math.floor(
      (now.getTime() - lastSeenDate.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return 'agora mesmo';
    if (diffInMinutes < 60) return `há ${diffInMinutes} min`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `há ${diffInHours}h`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `há ${diffInDays}d`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    return `há ${diffInWeeks} semana${diffInWeeks > 1 ? 's' : ''}`;
  };


  if (conversations.length === 0) {
    return (
      <div
        className={`flex items-center justify-center h-full text-gray-500 dark:text-gray-400 ${className}`}
      >
        <div className='text-center p-4'>
          <div className='text-4xl mb-2'>💬</div>
          <p>Nenhuma conversa ainda</p>
          <p className='text-sm text-gray-400 dark:text-gray-500 mt-1'>
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

  const getStatusText = (
    status?: string,
    isOnline?: boolean,
    lastSeen?: Date
  ) => {
    // IMPORTANTE: Para usuários INVISIBLE ou OFFLINE (não conectados),
    // nunca mostrar "Online agora"
    if (status === 'INVISIBLE' || !isOnline) {
      const timeDiff = formatTimeDiff(lastSeen);
      if (!timeDiff) return 'Offline';

      // Se foi visto recentemente mas NÃO está online, mostrar "Visto recentemente"
      if (timeDiff === 'agora mesmo') return 'Visto recentemente';
      return `Visto ${timeDiff}`;
    }

    // Se está online via Socket.IO, mostrar o status escolhido
    switch (status) {
      case 'BUSY':
        return 'Ocupado';
      case 'AWAY':
        return 'Ausente';
      case 'OFFLINE':
        return 'Offline';
      case 'ONLINE':
        return 'Online';
      default:
        return 'Online';
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

          // Check if conversation is muted for current user
          const currentParticipant = conversation.participants?.find(
            p => p.userId === currentUser?.id
          );
          const isMuted =
            currentParticipant?.mutedUntil &&
            new Date(currentParticipant.mutedUntil) > new Date();

          return (
            <div
              key={conversation.id}
              onClick={() => onConversationSelect(conversation)}
              className={`
                py-1.5 px-2.5 border-b border-gray-200 dark:border-gray-700 cursor-pointer transition-colors
                ${isActive ? 'bg-blue-50 dark:bg-blue-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}
              `}
            >
              <div className='flex items-center gap-1.5'>
                {conversation.type === ConversationType.GROUP ? (
                  // Avatares sobrepostos para grupos
                  <div className='relative w-7 h-7 flex-shrink-0'>
                    {/* Avatar 1 - Fundo */}
                    <div className='absolute top-0 left-0 w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px] border border-white'>
                      {conversation.participants?.[0]?.user.firstName
                        .charAt(0)
                        .toUpperCase() || 'G'}
                    </div>
                    {/* Avatar 2 - Meio */}
                    <div className='absolute top-0.5 left-1 w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] border border-white'>
                      {conversation.participants?.[1]?.user.firstName
                        .charAt(0)
                        .toUpperCase() || 'R'}
                    </div>
                    {/* Avatar 3 - Frente */}
                    <div className='absolute top-1 left-2 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] border border-white'>
                      {conversation.participants?.[2]?.user.firstName
                        .charAt(0)
                        .toUpperCase() || 'G'}
                    </div>
                  </div>
                ) : (
                  // Avatar normal para conversas diretas
                  <div className='relative'>
                    <div className='w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 text-xs'>
                      {getConversationName(conversation)
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                    {otherUser && (
                      <div
                        className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${getStatusColor(userStatus, isOnline)}`}
                      ></div>
                    )}
                  </div>
                )}
                <div className='flex-1 min-w-0'>
                  <div className='flex justify-between items-center mb-0'>
                    <div className='flex items-center gap-1 flex-1 min-w-0'>
                      <h3 className='font-semibold text-xs text-gray-900 dark:text-gray-100 truncate'>
                        {getConversationName(conversation)}
                      </h3>
                      {isMuted && (
                        <BellOff size={12} className='text-gray-500 dark:text-gray-400 flex-shrink-0' />
                      )}
                    </div>
                    {lastMessage && (
                      <span className='text-[10px] text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0'>
                        {formatTime(lastMessage.createdAt)}
                      </span>
                    )}
                  </div>
                  {(conversation.unreadCount || 0) > 0 ? (
                    <p className='text-[10px] text-gray-900 dark:text-gray-100 font-semibold truncate'>
                      {conversation.unreadCount}{' '}
                      {(conversation.unreadCount || 0) === 1
                        ? 'nova mensagem'
                        : 'novas mensagens'}
                    </p>
                  ) : conversation.type === ConversationType.GROUP &&
                    lastMessage ? (
                    <p className='text-[10px] text-gray-500 dark:text-gray-400 truncate'>
                      {lastMessage.sender.firstName}:{' '}
                      {lastMessage.isDeleted
                        ? 'Mensagem excluída'
                        : lastMessage.content}
                    </p>
                  ) : (
                    otherUser && (
                      <p className='text-[10px] text-gray-500 dark:text-gray-400 truncate'>
                        {getStatusText(
                          userStatus,
                          isOnline,
                          otherUser.lastSeen
                        )}
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
