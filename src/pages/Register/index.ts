import { useAuth } from '@/global/hooks/useAuth';
import { useTheme } from '@/global/hooks/useTheme';
import { AuthController } from '@controllers/AuthController';
import { yupResolver } from '@hookform/resolvers/yup';
import type { RegisterFormData } from '@schemas/validationSchemas';
import { registerSchema } from '@schemas/validationSchemas';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RegisterView } from './view';

export interface RegisterData {
  form: {
    register: ReturnType<typeof useForm<RegisterFormData>>['register'];
    handleSubmit: ReturnType<typeof useForm<RegisterFormData>>['handleSubmit'];
    errors: ReturnType<typeof useForm<RegisterFormData>>['formState']['errors'];
    isValid: boolean;
  };
  state: {
    isLoading: boolean;
    showPassword: boolean;
    showConfirmPassword: boolean;
    error: string;
    success: string;
  };
  theme: {
    mode: 'light' | 'dark';
    toggleTheme: () => void;
  };
  actions: {
    onSubmit: (data: RegisterFormData) => Promise<void>;
    togglePassword: () => void;
    toggleConfirmPassword: () => void;
    onSwitchToLogin?: () => void;
  };
}

interface RegisterProps {
  onSwitchToLogin?: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const { mode, toggleTheme } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const { token, user } = await AuthController.register(data);
      login(token, user);
      // Navegar para o dashboard após registro bem-sucedido
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  const registerData: RegisterData = {
    form: {
      register,
      handleSubmit,
      errors,
      isValid,
    },
    state: {
      isLoading,
      showPassword,
      showConfirmPassword,
      error,
      success,
    },
    theme: {
      mode,
      toggleTheme,
    },
    actions: {
      onSubmit,
      togglePassword: () => setShowPassword(!showPassword),
      toggleConfirmPassword: () => setShowConfirmPassword(!showConfirmPassword),
      onSwitchToLogin,
    },
  };

  // Usando createElement para criar a view e passar as props
  return React.createElement(RegisterView, {
    data: registerData,
  } as React.ComponentProps<typeof RegisterView>);
};
