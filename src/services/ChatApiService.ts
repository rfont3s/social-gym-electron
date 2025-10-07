import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type {
  Conversation,
  Message,
  User,
  ApiResponse,
  PaginationParams,
} from '../types/chat';
import { ConversationType } from '../types/chat';

export class ChatApiService {
  private api: AxiosInstance;

  constructor(baseURL: string, getAuthToken?: () => string | null) {
    this.api = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add auth interceptor if token getter is provided
    if (getAuthToken) {
      this.api.interceptors.request.use((config) => {
        const token = getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });
    }

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          console.warn('Unauthorized access - token may be expired');
        }
        return Promise.reject(error);
      },
    );
  }

  // Conversations
  async getConversations(params?: PaginationParams): Promise<ApiResponse<Conversation[]>> {
    const response: AxiosResponse<ApiResponse<Conversation[]>> = await this.api.get(
      '/chat/conversations',
      {
        params,
      },
    );
    return response.data;
  }

  async getConversation(id: string): Promise<ApiResponse<Conversation>> {
    const response: AxiosResponse<ApiResponse<Conversation>> =
      await this.api.get(`/chat/conversations/${id}`);
    return response.data;
  }

  async createConversation(
    participants: number[],
    name?: string,
    type: ConversationType = ConversationType.DIRECT,
  ): Promise<ApiResponse<Conversation>> {
    const response: AxiosResponse<ApiResponse<Conversation>> = await this.api.post(
      '/chat/conversations',
      {
        participants,
        name,
        type,
      },
    );
    return response.data;
  }

  async updateConversation(
    id: string,
    data: Partial<Conversation>,
  ): Promise<ApiResponse<Conversation>> {
    const response: AxiosResponse<ApiResponse<Conversation>> = await this.api.put(
      `/conversations/${id}`,
      data,
    );
    return response.data;
  }

  async deleteConversation(id: string): Promise<ApiResponse<void>> {
    const response: AxiosResponse<ApiResponse<void>> =
      await this.api.delete(`/conversations/${id}`);
    return response.data;
  }

  async addParticipant(conversationId: string, userId: number): Promise<ApiResponse<void>> {
    const response: AxiosResponse<ApiResponse<void>> = await this.api.post(
      `/conversations/${conversationId}/participants`,
      { userId },
    );
    return response.data;
  }

  async removeParticipant(conversationId: string, userId: number): Promise<ApiResponse<void>> {
    const response: AxiosResponse<ApiResponse<void>> = await this.api.delete(
      `/conversations/${conversationId}/participants/${userId}`,
    );
    return response.data;
  }

  // Messages
  async getMessages(
    conversationId: string,
    params?: PaginationParams,
  ): Promise<ApiResponse<Message[]>> {
    const response: AxiosResponse<ApiResponse<Message[]>> = await this.api.get(
      `/chat/conversations/${conversationId}/messages`,
      { params },
    );
    return response.data;
  }

  async sendMessage(
    conversationId: string,
    content: string,
    messageType: string = 'TEXT',
    replyToId?: string,
  ): Promise<ApiResponse<Message>> {
    const response: AxiosResponse<ApiResponse<Message>> = await this.api.post(
      `/conversations/${conversationId}/messages`,
      {
        content,
        messageType,
        replyToId,
      },
    );
    return response.data;
  }

  async updateMessage(messageId: string, content: string): Promise<ApiResponse<Message>> {
    const response: AxiosResponse<ApiResponse<Message>> = await this.api.put(
      `/messages/${messageId}`,
      {
        content,
      },
    );
    return response.data;
  }

  async deleteMessage(messageId: string, userId?: number): Promise<ApiResponse<void>> {
    const response: AxiosResponse<ApiResponse<void>> =
      await this.api.delete(`/chat/messages/${messageId}`, {
        params: { userId }
      });
    return response.data;
  }

  async markAsRead(conversationId: string, messageId: string, userId?: number): Promise<ApiResponse<void>> {
    const response: AxiosResponse<ApiResponse<void>> = await this.api.post(
      `/chat/conversations/${conversationId}/messages/${messageId}/read`,
      {},
      { params: { userId } }
    );
    return response.data;
  }

  // Reactions
  async addReaction(messageId: string, emoji: string, userId?: number): Promise<ApiResponse<void>> {
    const response: AxiosResponse<ApiResponse<void>> = await this.api.post(
      `/chat/messages/${messageId}/reactions`,
      { emoji },
      { params: { userId } }
    );
    return response.data;
  }

  async removeReaction(messageId: string, emoji: string, userId?: number): Promise<ApiResponse<void>> {
    const response: AxiosResponse<ApiResponse<void>> = await this.api.delete(
      `/chat/messages/${messageId}/reactions`,
      {
        data: { emoji },
        params: { userId }
      }
    );
    return response.data;
  }

  // Users
  async getUsers(search?: string): Promise<ApiResponse<User[]>> {
    const response: AxiosResponse<ApiResponse<User[]>> = await this.api.get('/chat/users', {
      params: { search },
    });
    return response.data;
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response: AxiosResponse<ApiResponse<User>> = await this.api.get('/users/me');
    return response.data;
  }

  async updateUserStatus(isOnline: boolean): Promise<ApiResponse<void>> {
    const response: AxiosResponse<ApiResponse<void>> = await this.api.put('/users/me/status', {
      isOnline,
    });
    return response.data;
  }

  // File uploads
  async uploadFile(
    file: File,
    conversationId: string,
  ): Promise<ApiResponse<{ url: string; fileName: string; fileSize: number }>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('conversationId', conversationId);

    const response: AxiosResponse<ApiResponse<{ url: string; fileName: string; fileSize: number }>> =
      await this.api.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    return response.data;
  }

  // Online users
  async getOnlineUsers(): Promise<ApiResponse<number[]>> {
    const response: AxiosResponse<ApiResponse<number[]>> = await this.api.get('/chat/online-users');
    return response.data;
  }

  // Get user by ID
  async getUserById(userId: number): Promise<ApiResponse<any>> {
    const response: AxiosResponse<ApiResponse<any>> = await this.api.get(`/chat/user/${userId}`);
    return response.data;
  }

  // Update user status
  async updateUserStatus(status: 'ONLINE' | 'BUSY' | 'AWAY' | 'OFFLINE' | 'INVISIBLE', userId?: number): Promise<ApiResponse<void>> {
    const response: AxiosResponse<ApiResponse<void>> = await this.api.post(
      '/chat/status',
      { status },
      { params: { userId } }
    );
    return response.data;
  }

  // Add member to group
  async addGroupMember(conversationId: string, memberUserId: number, currentUserId?: number): Promise<ApiResponse<any>> {
    console.log('[ChatApiService] POST /chat/conversations/' + conversationId + '/members', 'memberUserId:', memberUserId, 'currentUserId:', currentUserId);
    try {
      const response: AxiosResponse<ApiResponse<any>> = await this.api.post(
        `/chat/conversations/${conversationId}/members`,
        { userId: memberUserId },
        { params: { userId: currentUserId } }
      );
      console.log('[ChatApiService] Add member response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('[ChatApiService] Error adding member:', error.response?.data);
      throw error;
    }
  }

  // Remove member from group
  async removeGroupMember(conversationId: string, memberUserId: number, currentUserId?: number): Promise<ApiResponse<void>> {
    console.log('[ChatApiService] DELETE /chat/conversations/' + conversationId + '/members/' + memberUserId, 'userId:', currentUserId);
    try {
      const response: AxiosResponse<ApiResponse<void>> = await this.api.delete(
        `/chat/conversations/${conversationId}/members/${memberUserId}`,
        { params: { userId: currentUserId } }
      );
      console.log('[ChatApiService] Remove member response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('[ChatApiService] Error response:', error.response?.data);
      throw error;
    }
  }

  async muteConversation(conversationId: string, duration: 'day' | 'week' | 'forever' | null, currentUserId?: number): Promise<ApiResponse<void>> {
    console.log('[ChatApiService] POST /chat/conversations/' + conversationId + '/mute', 'duration:', duration, 'userId:', currentUserId);
    try {
      const response: AxiosResponse<ApiResponse<void>> = await this.api.post(
        `/chat/conversations/${conversationId}/mute`,
        { duration },
        { params: { userId: currentUserId } }
      );
      console.log('[ChatApiService] Mute conversation response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('[ChatApiService] Error response:', error.response?.data);
      throw error;
    }
  }

  // Utility method to get file URL
  getFileUrl(fileName: string): string {
    return `${this.api.defaults.baseURL}/files/${fileName}`;
  }
}
