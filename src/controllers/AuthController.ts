import { API_URLS, api } from '@config/api';
import { ERROR_MESSAGES } from '@constants/messages';
import type { LoginFormData, RegisterFormData } from '@schemas/validationSchemas';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    access_token: string;
    user: {
      id: number;
      auth0Id: string;
      firstName: string;
      lastName: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  message: string;
}

export interface RegisterResponse {
  success: boolean;
  data: {
    access_token?: string;
    user?: {
      id: number;
      auth0Id: string;
      firstName: string;
      lastName: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  message: string;
}

export class AuthController {
  static async login(data: LoginFormData): Promise<{ token: string; user: User }> {
    try {
      const response = await api.post(API_URLS.LOGIN, data);

      if (response.status !== 200) {
        throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
      }

      const responseData = response.data as LoginResponse;
      const token = responseData.data.access_token;
      const userFromApi = responseData.data.user;

      // Mapear dados do backend para o formato esperado
      const user: User = {
        id: userFromApi.id.toString(),
        name: `${userFromApi.firstName} ${userFromApi.lastName}`,
        email: userFromApi.email,
      };

      return { token, user };
    } catch (error: unknown) {
      // Capturar mensagem de erro do backend
      if (error && typeof error === 'object' && 'response' in error) {
        const errorResponse = error as { response?: { data?: { message?: string } } };
        if (errorResponse.response?.data?.message) {
          throw new Error(errorResponse.response.data.message);
        }
      }
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error(ERROR_MESSAGES.GENERIC_LOGIN_ERROR);
    }
  }

  static async register(data: RegisterFormData): Promise<{ token: string; user: User }> {
    try {
      const response = await api.post(API_URLS.REGISTER, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      if (response.status !== 200 && response.status !== 201) {
        const errorMessage = (response.data as { message?: string })?.message || ERROR_MESSAGES.GENERIC_REGISTER_ERROR;
        throw new Error(errorMessage);
      }

      const responseData = response.data as RegisterResponse;
      
      // Se o backend retorna token diretamente após registro
      if (responseData.data.access_token && responseData.data.user) {
        const token = responseData.data.access_token;
        const userFromApi = responseData.data.user;

        // Mapear dados do backend para o formato esperado
        const user: User = {
          id: userFromApi.id.toString(),
          name: `${userFromApi.firstName} ${userFromApi.lastName}`,
          email: userFromApi.email,
        };

        return { token, user };
      }

      // Se não retorna token, fazer login automaticamente
      return await this.login({
        email: data.email,
        password: data.password,
      });
    } catch (error: unknown) {
      // Capturar mensagem de erro do backend
      if (error && typeof error === 'object' && 'response' in error) {
        const errorResponse = error as { response?: { data?: { message?: string } } };
        if (errorResponse.response?.data?.message) {
          throw new Error(errorResponse.response.data.message);
        }
      }
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error(ERROR_MESSAGES.GENERIC_REGISTER_ERROR);
    }
  }
}
