import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useChatContext } from '../../contexts/useChatContext';
import {
  ConversationList,
  MessageList,
  MessageInput,
  ChatHeader,
  NewConversationModal,
  GroupMembersModal,
} from './components';
import { StatusSelector, type UserStatus } from './components/StatusSelector';
import { MessageType } from '../../types/chat';

export function ChatPage() {
  const {
    conversations,
    activeConversation,
    currentUser,
    isConnected,
    isLoading,
    error,
    sendMessage,
    loadConversations,
    setActiveConversation,
    createConversation,
    startTyping,
    stopTyping,
    updateUserStatus,
    connect,
    disconnect,
    addReaction,
    removeReaction,
    deleteMessage,
    addGroupMember,
    removeGroupMember,
    muteConversation,
  } = useChatContext();

  const [isNewConversationModalOpen, setIsNewConversationModalOpen] =
    useState(false);
  const [isGroupMembersModalOpen, setIsGroupMembersModalOpen] =
    useState(false);
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);

  // Load conversations on mount
  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const handleSendMessage = async (content: string) => {
    if (!activeConversation) return;
    await sendMessage(activeConversation.id, content, MessageType.TEXT);
  };

  const handleTypingStart = () => {
    if (activeConversation) {
      startTyping(activeConversation.id);
    }
  };

  const handleTypingStop = () => {
    if (activeConversation) {
      stopTyping(activeConversation.id);
    }
  };

  const handleCreateConversation = async (
    userIds: number[],
    groupName?: string,
    type?: 'DIRECT' | 'GROUP'
  ) => {
    try {
      const conversationType = type || 'DIRECT';

      // Para conversas diretas (1-on-1), verificar se já existe
      if (conversationType === 'DIRECT' && userIds.length === 1) {
        const otherUserId = userIds[0];
        const existingConversation = conversations.find(conv => {
          if (conv.type !== 'DIRECT' || !conv.participants) return false;

          // Verificar se é uma conversa entre 2 pessoas (current user + other user)
          if (conv.participants.length !== 2) return false;

          const participantUserIds = conv.participants.map(p => p.userId);
          return (
            participantUserIds.includes(currentUser?.id ?? 0) &&
            participantUserIds.includes(otherUserId)
          );
        });

        if (existingConversation) {
          console.log(
            '[Chat] Found existing conversation:',
            existingConversation.id
          );
          setActiveConversation(existingConversation);
          return;
        }
      }

      // Create new conversation
      // Adicionar o usuário atual aos participantes
      const allParticipants = [currentUser?.id ?? 0, ...userIds];
      console.log(
        '[Chat] Creating new conversation with users:',
        allParticipants
      );
      console.log('[Chat] Type:', conversationType, 'Name:', groupName);

      const newConversation = await createConversation(
        allParticipants,
        groupName,
        conversationType
      );
      setActiveConversation(newConversation);
      setShowChatOnMobile(true);
    } catch (error) {
      console.error('Error creating/opening conversation:', error);
    }
  };

  const handleConversationSelect = (conversation: any) => {
    setActiveConversation(conversation);
    setShowChatOnMobile(true);
  };

  const handleBackToList = () => {
    setShowChatOnMobile(false);
  };

  const handleStatusChange = async (status: UserStatus) => {
    await updateUserStatus(status);

    if (status === 'OFFLINE') {
      // Desconectar do Socket.IO quando escolher OFFLINE
      console.log('[Chat] Disconnecting from Socket.IO');
      disconnect();
    }
  };

  const handleReconnect = async () => {
    // Reconectar e mudar status para ONLINE
    await updateUserStatus('ONLINE');
    connect();
  };

  const handleAddMember = async (userId: number) => {
    if (activeConversation) {
      console.log('[ChatPage] Adding member:', userId, 'to conversation:', activeConversation.id);
      console.log('[ChatPage] Current participants:', activeConversation.participants?.map(p => ({ userId: p.userId, leftAt: p.leftAt })));

      try {
        await addGroupMember(activeConversation.id, userId);

        // Wait a bit for Socket.IO event to arrive and update state
        await new Promise(resolve => setTimeout(resolve, 500));

        // If Socket.IO didn't update, force reload
        await loadConversations();
      } catch (error) {
        console.error('[ChatPage] Error adding member:', error);
        alert('Erro ao adicionar membro: ' + (error as any).message);
      }
    }
  };

  const handleRemoveMember = async (userId: number) => {
    if (activeConversation) {
      const conversationId = activeConversation.id;

      try {
        await removeGroupMember(conversationId, userId);

        // Wait a bit for Socket.IO event to arrive and update state
        await new Promise(resolve => setTimeout(resolve, 500));

        // If Socket.IO didn't update, force reload
        await loadConversations();
      } catch (error) {
        console.error('[ChatPage] Error removing member:', error);
        alert('Erro ao remover membro: ' + (error as any).message);
      }
    }
  };

  // Se o status é OFFLINE, mostrar tela de reconexão
  if (currentUser?.status === 'OFFLINE') {
    return (
      <div className='flex h-screen bg-gray-50 dark:bg-gray-900 items-center justify-center'>
        <div className='text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md'>
          <div className='text-6xl mb-4'>💬</div>
          <h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2'>
            Você está offline
          </h2>
          <p className='text-gray-600 dark:text-gray-400 mb-6'>
            Reconecte-se para continuar conversando
          </p>
          <button
            onClick={handleReconnect}
            className='px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium'
          >
            Reconectar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Conversation List Sidebar */}
      <div className={`${showChatOnMobile ? 'hidden md:block' : 'block'} w-full md:w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}>
        <div className='h-full flex flex-col'>
          {/* Header */}
          <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
            <div className='flex items-center justify-between mb-2'>
              <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>Mensagens</h2>
              <button
                onClick={() => setIsNewConversationModalOpen(true)}
                className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300'
                title='Nova conversa'
              >
                <Plus size={20} />
              </button>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-base font-medium text-gray-700 dark:text-gray-300'>
                {currentUser
                  ? `${currentUser.firstName} ${currentUser.lastName}`.trim() ||
                    currentUser.email
                  : ''}
              </span>
              <StatusSelector
                currentStatus={(currentUser?.status as UserStatus) || 'ONLINE'}
                onStatusChange={handleStatusChange}
              />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className='p-4 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800'>
              <p className='text-sm text-red-600 dark:text-red-400'>{error}</p>
            </div>
          )}

          {/* Loading state */}
          {isLoading && conversations.length === 0 ? (
            <div className='flex-1 flex items-center justify-center'>
              <div className='text-center'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 dark:border-blue-400 mx-auto' />
                <p className='text-sm text-gray-500 dark:text-gray-400 mt-2'>
                  Carregando conversas...
                </p>
              </div>
            </div>
          ) : (
            <ConversationList
              conversations={conversations}
              currentUser={currentUser}
              activeConversation={activeConversation}
              onConversationSelect={handleConversationSelect}
              className='flex-1'
            />
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${showChatOnMobile ? 'block' : 'hidden md:block'} flex-1 flex flex-col`}>
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <ChatHeader
              conversation={activeConversation}
              currentUser={currentUser}
              onManageMembers={() => setIsGroupMembersModalOpen(true)}
              onMuteConversation={(duration) => muteConversation(activeConversation.id, duration)}
              onBackToList={handleBackToList}
            />

            {/* Messages */}
            <MessageList
              messages={activeConversation.messages || []}
              currentUser={currentUser}
              className='flex-1'
              onAddReaction={addReaction}
              onRemoveReaction={removeReaction}
              onDeleteMessage={deleteMessage}
            />

            {/* Message Input */}
            <MessageInput
              onSendMessage={handleSendMessage}
              onTypingStart={handleTypingStart}
              onTypingStop={handleTypingStop}
              disabled={!isConnected}
            />
          </>
        ) : (
          /* Empty State */
          <div className='flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400'>
            <div className='text-center'>
              <div className='text-6xl mb-4'>💬</div>
              <h3 className='text-xl font-medium mb-2 text-gray-900 dark:text-gray-100'>
                Selecione uma conversa
              </h3>
              <p className='text-gray-400 dark:text-gray-500'>
                Escolha uma conversa para começar a trocar mensagens
              </p>
            </div>
          </div>
        )}
      </div>

      {/* New Conversation Modal */}
      <NewConversationModal
        isOpen={isNewConversationModalOpen}
        onClose={() => setIsNewConversationModalOpen(false)}
        onCreateConversation={handleCreateConversation}
        currentUserId={currentUser?.id}
      />

      {/* Group Members Modal */}
      {activeConversation && (
        <GroupMembersModal
          isOpen={isGroupMembersModalOpen}
          onClose={() => setIsGroupMembersModalOpen(false)}
          conversation={activeConversation}
          currentUserId={currentUser?.id}
          onAddMember={handleAddMember}
          onRemoveMember={handleRemoveMember}
          onSearchUsers={async (search) => {
            // Use the existing getUsers from ChatApiService
            console.log('[ChatPage] Searching users with term:', search);
            const chatApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
            const chatApi = new (await import('../../services/ChatApiService')).ChatApiService(
              chatApiUrl,
              () => null
            );
            const response = await chatApi.getUsers(search);
            console.log('[ChatPage] getUsers response:', response);
            console.log('[ChatPage] Users found:', response.data?.length || 0);
            return response.data || [];
          }}
        />
      )}
    </div>
  );
}
