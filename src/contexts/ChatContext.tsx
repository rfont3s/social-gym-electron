import type { ReactNode } from 'react';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useAuth } from '../global/hooks/useAuth';
import { ChatApiService } from '../services/ChatApiService';
import { SocketService } from '../services/SocketService';
import type {
  ChatContextValue,
  ChatState,
  Conversation,
  Message,
} from '../types/chat';
import { ConversationType, MessageType, SocketEvents } from '../types/chat';

interface ChatProviderProps {
  children: ReactNode;
  apiBaseUrl?: string;
  socketUrl?: string;
  getAuthToken?: () => string | null;
  autoConnect?: boolean;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({
  children,
  apiBaseUrl = 'http://localhost:3000/api',
  socketUrl = 'http://localhost:3000',
  getAuthToken,
  autoConnect = true,
}: ChatProviderProps) {
  const { user } = useAuth();

  const [state, setState] = useState<ChatState>({
    conversations: [],
    activeConversation: undefined,
    currentUser: undefined,
    isConnected: false,
    isLoading: false,
    error: undefined,
    typingUsers: {},
  });

  // Log state changes for debugging
  useEffect(() => {
    console.log(
      '[ChatContext] State updated - isConnected:',
      state.isConnected,
      'error:',
      state.error
    );
  }, [state.isConnected, state.error]);

  const [socketService] = useState(() => {
    console.log('[ChatContext] Creating NEW SocketService instance');
    return new SocketService(socketUrl, {
      reconnectAttempts: 3,
      reconnectDelay: 1000,
    });
  });
  const [apiService] = useState(
    () => new ChatApiService(apiBaseUrl, getAuthToken)
  );

  const markAsRead = useCallback(
    async (conversationId: string, messageId: string) => {
      try {
        await apiService.markAsRead(
          conversationId,
          messageId,
          user?.id ? Number(user.id) : undefined
        );
        socketService.markAsRead(conversationId, messageId);
      } catch (_error) {
        console.error('Failed to mark message as read', _error);
      }
    },
    [apiService, socketService, user?.id]
  );

  // Initialize socket connection when user is available
  useEffect(() => {
    if (autoConnect && user?.id) {
      console.log(
        '[ChatContext] User is available, connecting socket with userId:',
        user.id
      );

      // Load user data from backend to get the status
      const loadUserData = async () => {
        try {
          // Set temporary user data from Auth
          const tempUser = {
            id: Number(user.id),
            firstName: user.name.split(' ')[0] || '',
            lastName: user.name.split(' ').slice(1).join(' ') || '',
            email: user.email,
            profilePicture: user.picture,
            status: 'ONLINE', // Default status
          };

          setState(prev => ({
            ...prev,
            currentUser: tempUser,
          }));

          // Load full user data from backend to get status
          const userResponse = await apiService.getUserById(Number(user.id));

          if (userResponse.data) {
            console.log('[ChatContext] Loaded user status from backend:', userResponse.data.status);
            setState(prev => ({
              ...prev,
              currentUser: userResponse.data,
            }));

            // If status is OFFLINE, don't connect socket
            if (userResponse.data.status === 'OFFLINE') {
              console.log('[ChatContext] User status is OFFLINE, skipping socket connection');
              return;
            }
          }

          // Connect socket if not OFFLINE
          const token = getAuthToken?.() || undefined;
          const userId = Number(user.id);
          socketService.connect(token, userId);
        } catch (error) {
          console.error('[ChatContext] Error loading user data:', error);
          // On error, connect anyway
          const token = getAuthToken?.() || undefined;
          const userId = Number(user.id);
          socketService.connect(token, userId);
        }
      };

      loadUserData();

      // Handle window/app close
      const handleBeforeUnload = () => {
        console.log('[ChatContext] Window closing, disconnecting socket');
        socketService.disconnect();
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      // Only disconnect on unmount, not on every dependency change
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        socketService.disconnect();
      };
    }
  }, [
    user?.id,
    user?.name,
    user?.email,
    user?.picture,
    autoConnect,
    getAuthToken,
    socketService,
    apiService,
  ]);

  // Setup socket event listeners
  useEffect(() => {
    // Connection events
    socketService.on('connect', () => {
      console.log('[ChatContext] Socket connected!');
      setState(prev => ({ ...prev, isConnected: true, error: undefined }));
    });

    socketService.on('disconnect', () => {
      console.log('[ChatContext] Socket disconnected!');
      setState(prev => ({ ...prev, isConnected: false }));
    });

    socketService.on('connect_error', error => {
      console.error('[ChatContext] Socket connection error:', error);
      setState(prev => ({
        ...prev,
        isConnected: false,
        error: 'Failed to connect to chat',
      }));
    });

    // Message events
    socketService.on(SocketEvents.NEW_MESSAGE, (message: Message) => {
      console.log('[ChatContext] ===== NEW_MESSAGE EVENT RECEIVED =====');
      console.log(
        '[ChatContext] Message ID:',
        message.id,
        'Conversation:',
        message.conversationId,
        'Sender:',
        message.senderId
      );
      setState(prev => {
        const conversations = prev.conversations.map(conv => {
          if (conv.id === message.conversationId) {
            // Check if message already exists to avoid duplicates
            const messageExists = conv.messages.some(m => m.id === message.id);
            if (messageExists) {
              console.log(
                '[ChatContext] Message already exists, skipping:',
                message.id
              );
              return conv;
            }
            console.log('[ChatContext] Adding new message to conversation');

            // Incrementar unreadCount se não for a conversa ativa e não for mensagem do próprio usuário
            const isActiveConversation =
              prev.activeConversation?.id === conv.id;
            const isOwnMessage = message.senderId === prev.currentUser?.id;
            const shouldIncrementUnread =
              !isActiveConversation && !isOwnMessage;

            console.log(
              '[ChatContext] Unread logic - isActiveConversation:',
              isActiveConversation,
              'isOwnMessage:',
              isOwnMessage,
              'shouldIncrementUnread:',
              shouldIncrementUnread,
              'currentUnreadCount:',
              conv.unreadCount
            );

            // Se for a conversa ativa e não for mensagem própria, marcar como lida imediatamente
            if (isActiveConversation && !isOwnMessage && prev.currentUser?.id) {
              markAsRead(conv.id, message.id).catch(err =>
                console.error(
                  '[ChatContext] Error marking message as read:',
                  err
                )
              );
            }

            const newUnreadCount = shouldIncrementUnread
              ? (conv.unreadCount || 0) + 1
              : conv.unreadCount;

            console.log('[ChatContext] New unreadCount:', newUnreadCount);

            return {
              ...conv,
              messages: [...conv.messages, message],
              lastMessage: message,
              unreadCount: newUnreadCount,
            };
          }
          return conv;
        });

        // Update active conversation if this message is for it
        let activeConversation = prev.activeConversation;
        if (
          activeConversation &&
          activeConversation.id === message.conversationId
        ) {
          const messageExists = activeConversation.messages.some(
            m => m.id === message.id
          );
          if (!messageExists) {
            activeConversation = {
              ...activeConversation,
              messages: [...activeConversation.messages, message],
              lastMessage: message,
            };
          }
        }

        return { ...prev, conversations, activeConversation };
      });
    });

    // Typing events
    socketService.on(
      SocketEvents.USER_TYPING,
      (data: { conversationId: string; userId: number }) => {
        setState(prev => {
          const typingUsers = { ...prev.typingUsers };
          if (!typingUsers[data.conversationId]) {
            typingUsers[data.conversationId] = [];
          }
          if (!typingUsers[data.conversationId].includes(data.userId)) {
            typingUsers[data.conversationId].push(data.userId);
          }
          return { ...prev, typingUsers };
        });
      }
    );

    socketService.on(
      SocketEvents.USER_STOPPED_TYPING,
      (data: { conversationId: string; userId: number }) => {
        setState(prev => {
          const typingUsers = { ...prev.typingUsers };
          if (typingUsers[data.conversationId]) {
            typingUsers[data.conversationId] = typingUsers[
              data.conversationId
            ].filter(id => id !== data.userId);
          }
          return { ...prev, typingUsers };
        });
      }
    );

    // Conversation events
    socketService.on(
      SocketEvents.CONVERSATION_CREATED,
      (conversation: Conversation) => {
        setState(prev => {
          // Verificar se a conversa já existe para evitar duplicatas
          const exists = prev.conversations.some(
            conv => conv.id === conversation.id
          );
          if (exists) {
            console.log(
              '[ChatContext] Conversation already exists, skipping:',
              conversation.id
            );
            return prev;
          }

          console.log(
            '[ChatContext] Adding new conversation from socket:',
            conversation.id
          );

          // Auto-join na conversa para receber mensagens
          socketService.joinConversation(conversation.id);
          console.log(
            '[ChatContext] Auto-joined in conversation:',
            conversation.id
          );

          return {
            ...prev,
            conversations: [conversation, ...prev.conversations],
          };
        });
      }
    );

    // Online users count
    socketService.on(
      'conversation_online_users',
      (data: { conversationId: string; onlineCount: number }) => {
        console.log('[ChatContext] Online users update:', data);
        setState(prev => {
          const conversations = prev.conversations.map(conv => {
            if (conv.id === data.conversationId) {
              return { ...conv, onlineCount: data.onlineCount };
            }
            return conv;
          });

          // Update active conversation too
          let activeConversation = prev.activeConversation;
          if (
            activeConversation &&
            activeConversation.id === data.conversationId
          ) {
            activeConversation = {
              ...activeConversation,
              onlineCount: data.onlineCount,
            };
          }

          return { ...prev, conversations, activeConversation };
        });
      }
    );

    // User online status - atualizar baseado na lista de usuários online
    const updateOnlineStatus = async () => {
      try {
        const response = await apiService.getOnlineUsers();
        const onlineUserIds = response.data || [];

        setState(prev => {
          const conversations = prev.conversations.map(conv => {
            const participants = conv.participants?.map(p => ({
              ...p,
              user: {
                ...p.user,
                isOnline: onlineUserIds.includes(p.userId),
              },
            }));
            return { ...conv, participants };
          });

          let activeConversation = prev.activeConversation;
          if (activeConversation) {
            const participants = activeConversation.participants?.map(p => ({
              ...p,
              user: {
                ...p.user,
                isOnline: onlineUserIds.includes(p.userId),
              },
            }));
            activeConversation = { ...activeConversation, participants };
          }

          return { ...prev, conversations, activeConversation };
        });
      } catch (error) {
        console.error('[ChatContext] Error fetching online users:', error);
      }
    };

    // Atualizar status online quando receber evento
    socketService.on(
      'user_online_status',
      (data: { userId: number; isOnline: boolean }) => {
        console.log('[ChatContext] User online status event:', data);
        updateOnlineStatus();
      }
    );

    // Atualizar status do usuário (ONLINE, BUSY, AWAY, etc)
    socketService.on('user_status_change', (data: { userId: number; status: string }) => {
      console.log('[ChatContext] User status change:', data);
      setState(prev => {
        const conversations = prev.conversations.map(conv => {
          const participants = conv.participants?.map(p => {
            if (p.userId === data.userId) {
              return {
                ...p,
                user: {
                  ...p.user,
                  status: data.status,
                }
              };
            }
            return p;
          });
          return { ...conv, participants };
        });

        let activeConversation = prev.activeConversation;
        if (activeConversation) {
          const participants = activeConversation.participants?.map(p => {
            if (p.userId === data.userId) {
              return {
                ...p,
                user: {
                  ...p.user,
                  status: data.status,
                }
              };
            }
            return p;
          });
          activeConversation = { ...activeConversation, participants };
        }

        return { ...prev, conversations, activeConversation };
      });
    });

    // Atualizar status online periodicamente (a cada 5 segundos)
    const interval = setInterval(updateOnlineStatus, 5000);

    return () => {
      clearInterval(interval);
      socketService.off('connect');
      socketService.off('disconnect');
      socketService.off('connect_error');
      socketService.off(SocketEvents.NEW_MESSAGE);
      socketService.off(SocketEvents.USER_TYPING);
      socketService.off(SocketEvents.USER_STOPPED_TYPING);
      socketService.off(SocketEvents.CONVERSATION_CREATED);
      socketService.off('conversation_online_users');
      socketService.off('user_online_status');
    };
  }, [socketService, apiService, markAsRead]);

  const connect = useCallback(() => {
    const token = getAuthToken?.() || undefined;
    const userId = user?.id ? Number(user.id) : undefined;
    console.log('[ChatContext] Connecting with userId:', userId);
    socketService.connect(token, userId);
  }, [socketService, getAuthToken, user]);

  const disconnect = useCallback(() => {
    console.log('[ChatContext] Disconnect called');
    socketService.disconnect();
  }, [socketService]);

  const updateUserStatus = useCallback(async (status: 'ONLINE' | 'BUSY' | 'AWAY' | 'OFFLINE' | 'INVISIBLE') => {
    try {
      console.log('[ChatContext] Updating user status to:', status);
      await apiService.updateUserStatus(status, user?.id);

      // Atualizar o estado local do currentUser
      setState(prev => ({
        ...prev,
        currentUser: prev.currentUser ? {
          ...prev.currentUser,
          status,
        } : undefined,
      }));

      console.log('[ChatContext] User status updated successfully');
    } catch (error) {
      console.error('[ChatContext] Error updating user status:', error);
    }
  }, [apiService, user?.id]);

  const loadConversations = useCallback(async () => {
    try {
      if (!user?.id) {
        console.log(
          '[ChatContext] No user id available, skipping conversation load'
        );
        return;
      }

      setState(prev => ({ ...prev, isLoading: true, error: undefined }));
      const response = await apiService.getConversations({
        userId: Number(user.id),
      });
      // Initialize conversations with empty messages array - messages will be loaded separately
      const conversations = response.data.map(conv => ({
        ...conv,
        messages: [], // Start with empty array, will load when conversation is selected
      }));
      setState(prev => ({
        ...prev,
        conversations,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to load conversations:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to load conversations',
      }));
    }
  }, [apiService, user?.id]);

  const loadMessages = useCallback(
    async (conversationId: string, page: number = 1): Promise<Message[]> => {
      try {
        console.log(
          '[ChatContext] Loading messages for conversation:',
          conversationId
        );
        setState(prev => ({ ...prev, isLoading: true, error: undefined }));
        const response = await apiService.getMessages(conversationId, {
          page,
          limit: 50,
        });
        console.log(
          '[ChatContext] Loaded messages:',
          response.data.length,
          'messages'
        );
        setState(prev => {
          const conversations = prev.conversations.map(conv => {
            if (conv.id === conversationId) {
              return { ...conv, messages: response.data };
            }
            return conv;
          });

          // Also update activeConversation if this is the active one
          let activeConversation = prev.activeConversation;
          if (activeConversation && activeConversation.id === conversationId) {
            activeConversation = {
              ...activeConversation,
              messages: response.data,
            };
          }

          return {
            ...prev,
            conversations,
            activeConversation,
            isLoading: false,
          };
        });
        return response.data;
      } catch (error) {
        console.error('[ChatContext] Error loading messages:', error);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to load messages',
        }));
        return [];
      }
    },
    [apiService]
  );

  const sendMessage = useCallback(
    async (
      conversationId: string,
      content: string,
      messageType: MessageType = MessageType.TEXT,
      replyToId?: string
    ) => {
      try {
        socketService.sendMessage({
          conversationId,
          content,
          messageType,
          replyToId,
        });
      } catch (error) {
        console.error('Failed to send message:', error);
        setState(prev => ({
          ...prev,
          error: 'Failed to send message',
        }));
      }
    },
    [socketService]
  );

  const createConversation = useCallback(
    async (
      participants: number[],
      name?: string,
      type?: ConversationType
    ): Promise<Conversation> => {
      try {
        console.log(
          '[ChatContext] Creating conversation with participants:',
          participants
        );
        console.log('[ChatContext] Type:', type, 'Name:', name);
        const response = await apiService.createConversation(
          participants,
          name,
          type
        );
        const newConversation = response.data;

        console.log(
          '[ChatContext] Conversation created/found:',
          newConversation.id
        );

        // Verificar se a conversa já existe no state antes de adicionar
        setState(prev => {
          const exists = prev.conversations.some(
            conv => conv.id === newConversation.id
          );
          if (exists) {
            console.log(
              '[ChatContext] Conversation already in state, not adding again'
            );
            return prev;
          }

          console.log(
            '[ChatContext] Adding conversation to state:',
            newConversation.id
          );
          return {
            ...prev,
            conversations: [newConversation, ...prev.conversations],
          };
        });

        return newConversation;
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: 'Failed to create conversation',
        }));
        throw error;
      }
    },
    [apiService]
  );

  const startTyping = useCallback(
    (conversationId: string) => {
      if (state.currentUser) {
        socketService.startTyping({
          conversationId,
          userId: state.currentUser.id,
        });
      }
    },
    [socketService, state.currentUser]
  );

  const stopTyping = useCallback(
    (conversationId: string) => {
      if (state.currentUser) {
        socketService.stopTyping({
          conversationId,
          userId: state.currentUser.id,
        });
      }
    },
    [socketService, state.currentUser]
  );

  const addReaction = useCallback(
    async (messageId: string, emoji: string) => {
      try {
        await apiService.addReaction(messageId, emoji);
        socketService.addReaction({ messageId, emoji });
      } catch (error) {
        console.error('Failed to add reaction', error);
      }
    },
    [apiService, socketService]
  );

  const removeReaction = useCallback(
    async (messageId: string, emoji: string) => {
      try {
        await apiService.removeReaction(messageId, emoji);
        socketService.removeReaction({ messageId, emoji });
      } catch (error) {
        console.error('Failed to remove reaction', error);
      }
    },
    [apiService, socketService]
  );

  const setActiveConversation = useCallback(
    async (conversation?: Conversation) => {
      // Reset unreadCount to 0 for the conversation being opened
      setState(prev => {
        const conversations = prev.conversations.map(conv =>
          conv.id === conversation?.id ? { ...conv, unreadCount: 0 } : conv
        );

        return { ...prev, activeConversation: conversation, conversations };
      });

      if (conversation) {
        // Join conversation if not already joined (backend auto-joins on connect)
        socketService.joinConversation(conversation.id);
        // Load messages for this conversation and get them returned
        const messages = await loadMessages(conversation.id);
        console.log(
          '[ChatContext] Loaded messages for marking as read:',
          messages.length
        );

        // Mark ALL unread messages as read
        if (user?.id && messages.length > 0) {
          console.log('[ChatContext] User ID:', user.id);
          // Get all messages that haven't been read by current user
          const unreadMessages = messages.filter(msg => {
            // Skip own messages
            if (msg.senderId === user.id) {
              console.log('[ChatContext] Skipping own message:', msg.id);
              return false;
            }
            // Check if already read
            const hasRead = msg.readBy?.some(read => read.userId === user.id);
            console.log(
              '[ChatContext] Message',
              msg.id,
              'hasRead:',
              hasRead,
              'readBy:',
              msg.readBy
            );
            return !hasRead;
          });

          console.log(
            '[ChatContext] Found',
            unreadMessages.length,
            'unread messages to mark as read'
          );

          // Mark each unread message as read
          for (const msg of unreadMessages) {
            console.log('[ChatContext] Marking message as read:', msg.id);
            await markAsRead(conversation.id, msg.id);
          }
        }
      }
    },
    [socketService, loadMessages, markAsRead, user?.id]
  );

  const uploadFile = useCallback(
    async (file: File, conversationId: string) => {
      try {
        await apiService.uploadFile(file, conversationId);
      } catch (error) {
        console.error('Failed to upload file:', error);
        setState(prev => ({
          ...prev,
          error: 'Failed to upload file',
        }));
      }
    },
    [apiService]
  );

  const value: ChatContextValue = {
    ...state,
    sendMessage,
    loadConversations,
    loadMessages,
    createConversation,
    markAsRead,
    startTyping,
    stopTyping,
    addReaction,
    removeReaction,
    setActiveConversation,
    uploadFile,
    connect,
    disconnect,
    updateUserStatus,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export { ChatContext };
