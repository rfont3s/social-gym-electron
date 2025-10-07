import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import type {
  SocketMessage,
  TypingData,
  ReactionData,
  Message,
  Conversation,
  User,
  ChatConfig,
} from '../types/chat';
import { SocketEvents } from '../types/chat';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SocketEventCallback = (...args: any[]) => void;

export class SocketService {
  private socket: Socket | null = null;
  private url: string;
  private config: Partial<ChatConfig>;
  private eventListeners: Map<string, SocketEventCallback[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts: number;

  constructor(url: string, config: Partial<ChatConfig> = {}) {
    this.url = url;
    this.config = config;
    this.maxReconnectAttempts = config.reconnectAttempts || 3;
  }

  connect(token?: string, userId?: number): void {
    if (this.socket?.connected) {
      return;
    }

    const socketOptions: Record<string, unknown> = {
      autoConnect: true,
      transports: ['websocket', 'polling'],
    };

    if (token) {
      socketOptions.auth = { token };
    }

    if (userId) {
      socketOptions.auth = {
        ...(socketOptions.auth as Record<string, unknown>),
        userId,
      };
    }

    console.log('[SocketService] Connecting with userId:', userId);
    this.socket = io(this.url, socketOptions);

    this.setupEventListeners();
  }

  disconnect(): void {
    if (this.socket) {
      console.log('[SocketService] Disconnecting socket:', this.socket.id);
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }
    this.eventListeners.clear();
    this.reconnectAttempts = 0;
  }

  private setupEventListeners(): void {
    if (!this.socket) return;

    // Connection events
    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.reconnectAttempts = 0;
      this.emit('connect');
    });

    this.socket.on('disconnect', reason => {
      console.log('Socket disconnected:', reason);
      this.emit('disconnect', reason);

      if (reason === 'io server disconnect') {
        // Server disconnected, attempt to reconnect
        this.handleReconnect();
      }
    });

    this.socket.on('connect_error', error => {
      console.error('Socket connection error:', error);
      this.emit('connect_error', error);
      this.handleReconnect();
    });

    // Message events
    this.socket.on(SocketEvents.NEW_MESSAGE, (message: Message) => {
      console.log('[SocketService] Received NEW_MESSAGE event:', message.id);
      this.emit(SocketEvents.NEW_MESSAGE, message);
    });

    this.socket.on(SocketEvents.MESSAGE_UPDATED, (message: Message) => {
      this.emit(SocketEvents.MESSAGE_UPDATED, message);
    });

    this.socket.on(SocketEvents.MESSAGE_DELETED, (messageId: string) => {
      this.emit(SocketEvents.MESSAGE_DELETED, messageId);
    });

    this.socket.on(
      SocketEvents.MESSAGE_READ,
      (data: { messageId: string; userId: number; readAt: Date }) => {
        this.emit(SocketEvents.MESSAGE_READ, data);
      }
    );

    // Typing events
    this.socket.on(
      SocketEvents.USER_TYPING,
      (data: TypingData & { user: User }) => {
        this.emit(SocketEvents.USER_TYPING, data);
      }
    );

    this.socket.on(
      SocketEvents.USER_STOPPED_TYPING,
      (data: TypingData & { user: User }) => {
        this.emit(SocketEvents.USER_STOPPED_TYPING, data);
      }
    );

    // User status events
    this.socket.on(SocketEvents.USER_ONLINE, (user: User) => {
      this.emit(SocketEvents.USER_ONLINE, user);
    });

    this.socket.on(SocketEvents.USER_OFFLINE, (user: User) => {
      this.emit(SocketEvents.USER_OFFLINE, user);
    });

    // User online status change (real-time from Socket.IO)
    this.socket.on(
      'user_online_status',
      (data: { userId: number; isOnline: boolean }) => {
        this.emit('user_online_status', data);
      }
    );

    // Conversation events
    this.socket.on(
      SocketEvents.CONVERSATION_CREATED,
      (conversation: Conversation) => {
        this.emit(SocketEvents.CONVERSATION_CREATED, conversation);
      }
    );

    this.socket.on(
      SocketEvents.CONVERSATION_UPDATED,
      (conversation: Conversation) => {
        this.emit(SocketEvents.CONVERSATION_UPDATED, conversation);
      }
    );

    this.socket.on(
      SocketEvents.USER_JOINED_CONVERSATION,
      (data: { conversationId: string; user: User }) => {
        this.emit(SocketEvents.USER_JOINED_CONVERSATION, data);
      }
    );

    this.socket.on(
      SocketEvents.USER_LEFT_CONVERSATION,
      (data: { conversationId: string; user: User }) => {
        this.emit(SocketEvents.USER_LEFT_CONVERSATION, data);
      }
    );

    // Reaction events
    this.socket.on(
      SocketEvents.REACTION_ADDED,
      (data: {
        messageId: string;
        userId: number;
        emoji: string;
        user: User;
      }) => {
        this.emit(SocketEvents.REACTION_ADDED, data);
      }
    );

    this.socket.on(
      SocketEvents.REACTION_REMOVED,
      (data: { messageId: string; userId: number; emoji: string }) => {
        this.emit(SocketEvents.REACTION_REMOVED, data);
      }
    );
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = (this.config.reconnectDelay || 1000) * this.reconnectAttempts;

    setTimeout(() => {
      console.log(
        `Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
      );
      this.socket?.connect();
    }, delay);
  }

  // Event emission methods
  on(event: string, callback: SocketEventCallback): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  off(event: string, callback?: SocketEventCallback): void {
    if (!callback) {
      this.eventListeners.delete(event);
      return;
    }

    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, ...args: unknown[]): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback(...args));
    }
  }

  // Socket actions
  joinConversation(conversationId: string): void {
    this.socket?.emit(SocketEvents.JOIN_CONVERSATION, { conversationId });
  }

  leaveConversation(conversationId: string): void {
    this.socket?.emit(SocketEvents.LEAVE_CONVERSATION, { conversationId });
  }

  sendMessage(message: SocketMessage): void {
    console.log(
      '[SocketService] Sending message to conversation:',
      message.conversationId
    );
    this.socket?.emit(SocketEvents.SEND_MESSAGE, message);
  }

  startTyping(data: TypingData): void {
    this.socket?.emit(SocketEvents.TYPING_START, data);
  }

  stopTyping(data: TypingData): void {
    this.socket?.emit(SocketEvents.TYPING_STOP, data);
  }

  markAsRead(conversationId: string, messageId: string): void {
    this.socket?.emit(SocketEvents.MARK_AS_READ, { conversationId, messageId });
  }

  addReaction(data: ReactionData): void {
    this.socket?.emit(SocketEvents.ADD_REACTION, data);
  }

  removeReaction(data: ReactionData): void {
    this.socket?.emit(SocketEvents.REMOVE_REACTION, data);
  }

  // Utility methods
  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getId(): string | undefined {
    return this.socket?.id;
  }
}
