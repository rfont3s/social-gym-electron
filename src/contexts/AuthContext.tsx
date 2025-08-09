import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';

interface User {
  id: string | number;
  name: string;
  email: string;
  picture?: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export { AuthContext };

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Carregar dados do localStorage ao inicializar
  useEffect(() => {
    const savedToken = localStorage.getItem('access_token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        // Limpar dados corrompidos
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
      }
    }

    setLoading(false);
  }, []);

  const login = (tokenFromBackend: string, userData: User) => {
    if (!tokenFromBackend || !userData) {
      return;
    }
    
    if (!userData.id || !userData.name || !userData.email) {
      return;
    }
    
    setToken(tokenFromBackend);
    setUser(userData);
    localStorage.setItem('access_token', tokenFromBackend);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
