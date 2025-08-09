import axios from 'axios';

// Configurações da API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:3000',
  ENDPOINTS: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    MEMBERS: '/members',
    USERS: '/users',
    PROFILE: '/profile',
  },
  TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 10000, // 10 segundos
};

// Instância do Axios configurada
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // Restaurar para enviar cookies/credenciais
});

// Interceptor para requisições (adiciona token automaticamente)
apiClient.interceptors.request.use(
  config => {
    // Pega o token do localStorage se existir
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor para respostas (trata erros de autenticação)
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Se token expirado/inválido, limpar localStorage
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      // Pode disparar um evento para forçar logout global
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
    return Promise.reject(error);
  }
);

// Helper para construir URLs completas (mantido para compatibilidade)
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Função utilitária para fazer requisições (agora com Axios)
export const apiRequest = async (endpoint: string, config = {}) => {
  try {
    const response = await apiClient.request({
      url: endpoint,
      ...config,
    });
    return response;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Métodos HTTP específicos para facilitar o uso
export const api = {
  get: (url: string, config = {}) => apiClient.get(url, config),

  post: (url: string, data = {}, config = {}) =>
    apiClient.post(url, data, config),

  put: (url: string, data = {}, config = {}) =>
    apiClient.put(url, data, config),

  delete: (url: string, config = {}) => apiClient.delete(url, config),

  patch: (url: string, data = {}, config = {}) =>
    apiClient.patch(url, data, config),
};

// Endpoints prontos para usar
export const API_URLS = {
  LOGIN: API_CONFIG.ENDPOINTS.LOGIN,
  REGISTER: API_CONFIG.ENDPOINTS.REGISTER,
  MEMBERS: API_CONFIG.ENDPOINTS.MEMBERS,
  USERS: API_CONFIG.ENDPOINTS.USERS,
  PROFILE: API_CONFIG.ENDPOINTS.PROFILE,
};
