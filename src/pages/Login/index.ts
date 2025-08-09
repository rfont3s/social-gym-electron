import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import { useTheme } from '@hooks/useTheme';
import { AuthController } from '@controllers/AuthController';
import type { LoginFormData } from '@schemas/validationSchemas';
import { loginSchema } from '@schemas/validationSchemas';
import { LoginView } from './view';

export interface LoginData {
  form: {
    register: ReturnType<typeof useForm<LoginFormData>>['register'];
    handleSubmit: ReturnType<typeof useForm<LoginFormData>>['handleSubmit'];
    errors: ReturnType<typeof useForm<LoginFormData>>['formState']['errors'];
    isValid: boolean;
  };
  state: {
    isLoading: boolean;
    showPassword: boolean;
    error: string;
  };
  theme: {
    mode: 'light' | 'dark';
    toggleTheme: () => void;
  };
  actions: {
    onSubmit: (data: LoginFormData) => Promise<void>;
    togglePassword: () => void;
    onSwitchToRegister?: () => void;
  };
}

interface LoginProps {
  onSwitchToRegister?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onSwitchToRegister }) => {
  const { mode, toggleTheme } = useTheme();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const { token, user } = await AuthController.login(data);
      login(token, user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  const loginData: LoginData = {
    form: {
      register,
      handleSubmit,
      errors,
      isValid,
    },
    state: {
      isLoading,
      showPassword,
      error,
    },
    theme: {
      mode,
      toggleTheme,
    },
    actions: {
      onSubmit,
      togglePassword: () => setShowPassword(!showPassword),
      onSwitchToRegister,
    },
  };

  // Usando createElement para criar a view e passar as props
  return React.createElement(LoginView, { data: loginData } as React.ComponentProps<typeof LoginView>);
};
