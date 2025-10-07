export interface User {
  id: number;
  auth0Id?: string;
  firstName: string;
  lastName: string;
  email: string;
  isOnline?: boolean;
  lastSeen?: Date;
  profilePicture?: string;
  status?: string;
}

export interface Conversation {
  id: string;
  type: ConversationType;
  name?: string;
  participants: ConversationParticipant[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount?: number;
  onlineCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationParticipant {
  id: string;
  conversationId: string;
  userId: number;
  user: User;
  role: ParticipantRole;
  joinedAt: Date;
  leftAt?: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: number;
  sender: User;
  content: string;
  messageType: MessageType;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  replyToId?: string;
  replyTo?: Message;
  reactions?: MessageReaction[];
  readBy: MessageRead[];
  isEdited: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageRead {
  id: string;
  messageId: string;
  userId: number;
  user: User;
  readAt: Date;
}

export interface MessageReaction {
  id: string;
  messageId: string;
  userId: number;
  user: User;
  emoji: string;
  createdAt: Date;
}

export const ConversationType = {
  DIRECT: 'DIRECT',
  GROUP: 'GROUP',
} as const;

export type ConversationType =
  (typeof ConversationType)[keyof typeof ConversationType];

export const ParticipantRole = {
  MEMBER: 'MEMBER',
  ADMIN: 'ADMIN',
} as const;

export type ParticipantRole =
  (typeof ParticipantRole)[keyof typeof ParticipantRole];

export const MessageType = {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  FILE: 'FILE',
  AUDIO: 'AUDIO',
  VIDEO: 'VIDEO',
} as const;

export type MessageType = (typeof MessageType)[keyof typeof MessageType];

export const SocketEvents = {
  // Connection
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  JOIN_CONVERSATION: 'join_conversation',
  LEAVE_CONVERSATION: 'leave_conversation',

  // Messages
  SEND_MESSAGE: 'send_message',
  MESSAGE_SENT: 'message_sent',
  NEW_MESSAGE: 'new_message',
  MESSAGE_UPDATED: 'message_updated',
  MESSAGE_DELETED: 'message_deleted',

  // Typing
  TYPING_START: 'typing_start',
  TYPING_STOP: 'typing_stop',
  USER_TYPING: 'user_typing',
  USER_STOPPED_TYPING: 'user_stopped_typing',

  // Read receipts
  MARK_AS_READ: 'mark_as_read',
  MESSAGE_READ: 'message_read',

  // User status
  USER_ONLINE: 'user_online',
  USER_OFFLINE: 'user_offline',

  // Conversations
  CONVERSATION_CREATED: 'conversation_created',
  CONVERSATION_UPDATED: 'conversation_updated',
  USER_JOINED_CONVERSATION: 'user_joined_conversation',
  USER_LEFT_CONVERSATION: 'user_left_conversation',

  // Reactions
  ADD_REACTION: 'add_reaction',
  REMOVE_REACTION: 'remove_reaction',
  REACTION_ADDED: 'reaction_added',
  REACTION_REMOVED: 'reaction_removed',
} as const;

export type SocketEvents = (typeof SocketEvents)[keyof typeof SocketEvents];

export interface SocketMessage {
  conversationId: string;
  content: string;
  messageType: MessageType;
  replyToId?: string;
  fileData?: {
    url: string;
    fileName: string;
    fileSize: number;
  };
}

export interface TypingData {
  conversationId: string;
  userId: number;
}

export interface ReactionData {
  messageId: string;
  emoji: string;
}

export interface ChatConfig {
  apiBaseUrl: string;
  socketUrl: string;
  auth0Domain?: string;
  enableTypingIndicators: boolean;
  enableReadReceipts: boolean;
  enableReactions: boolean;
  enableFileUploads: boolean;
  maxFileSize: number;
  allowedFileTypes: string[];
  reconnectAttempts: number;
  reconnectDelay: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
  userId?: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ChatState {
  conversations: Conversation[];
  activeConversation?: Conversation;
  currentUser?: User;
  isConnected: boolean;
  isLoading: boolean;
  error?: string;
  typingUsers: Record<string, number[]>;
}

export interface ChatContextValue extends ChatState {
  // Actions
  sendMessage: (
    conversationId: string,
    content: string,
    messageType?: MessageType,
    replyToId?: string
  ) => Promise<void>;
  loadConversations: () => Promise<void>;
  loadMessages: (conversationId: string, page?: number) => Promise<Message[]>;
  createConversation: (
    participants: number[],
    name?: string,
    type?: ConversationType
  ) => Promise<Conversation>;
  markAsRead: (conversationId: string, messageId: string) => Promise<void>;
  startTyping: (conversationId: string) => void;
  stopTyping: (conversationId: string) => void;
  addReaction: (messageId: string, emoji: string) => Promise<void>;
  removeReaction: (messageId: string, emoji: string) => Promise<void>;
  addGroupMember: (conversationId: string, memberUserId: number) => Promise<void>;
  removeGroupMember: (conversationId: string, memberUserId: number) => Promise<void>;
  setActiveConversation: (conversation?: Conversation) => Promise<void>;
  uploadFile: (file: File, conversationId: string) => Promise<void>;

  // Socket connection
  connect: () => void;
  disconnect: () => void;
  updateUserStatus: (status: 'ONLINE' | 'BUSY' | 'AWAY' | 'OFFLINE' | 'INVISIBLE') => Promise<void>;
}
