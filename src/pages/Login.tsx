import React, { useState } from 'react';
import { useTheme } from '@hooks/useTheme';
import { Button, Card, Input } from '@components';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  DarkMode,
  LightMode,
  Google,
  GitHub,
} from '@mui/icons-material';

interface LoginProps {
  onLogin: (credentials: { email: string; password: string }) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { mode, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    onLogin({ email, password });
    setIsLoading(false);
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300'>
      {/* Background Pattern */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 bg-primary-500/30' />
        <div className='absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 bg-secondary-500/30' />
      </div>

      {/* Login Card */}
      <div className='relative w-full max-w-md'>
        <Card variant='elevated' className='backdrop-blur-sm'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='flex items-center justify-center mb-4'>
              <div className='w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold bg-primary-500'>
                SG
              </div>
            </div>
            <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
              Social Gym
            </h1>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Entre na sua conta para continuar
            </p>
          </div>

          {/* Theme Toggle */}
          <div className='absolute top-4 right-4'>
            <button
              onClick={toggleTheme}
              className='p-2 rounded-lg transition-all duration-200 hover:scale-110 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600'
            >
              {mode === 'light' ? (
                <DarkMode fontSize='small' />
              ) : (
                <LightMode fontSize='small' />
              )}
            </button>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email Field */}
            <div>
              <label className='block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300'>
                Email
              </label>
              <div className='relative'>
                <Input
                  type='email'
                  value={email}
                  onChange={setEmail}
                  placeholder='seu@email.com'
                  disabled={isLoading}
                />
                <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                  <Email className='text-gray-400' fontSize='small' />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className='block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300'>
                Senha
              </label>
              <div className='relative'>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={setPassword}
                  placeholder='••••••••'
                  disabled={isLoading}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                >
                  {showPassword ? (
                    <VisibilityOff fontSize='small' />
                  ) : (
                    <Visibility fontSize='small' />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className='flex items-center justify-between'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='rounded mr-2 accent-primary-500'
                />
                <span className='text-sm text-gray-600 dark:text-gray-400'>
                  Lembrar-me
                </span>
              </label>
              <button
                type='button'
                className='text-sm hover:underline text-primary-500'
              >
                Esqueceu a senha?
              </button>
            </div>

            {/* Login Button */}
            <Button type='submit' disabled={isLoading} className='w-full'>
              {isLoading ? (
                <div className='flex items-center justify-center'>
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
                  Entrando...
                </div>
              ) : (
                <>
                  <Lock className='mr-2' fontSize='small' />
                  Entrar
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className='mt-8 text-center'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Não tem uma conta?{' '}
              <button className='font-medium hover:underline text-primary-500'>
                Cadastre-se
              </button>
            </p>
          </div>

          {/* Social Login */}
          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300 dark:border-gray-600' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400'>
                  Ou continue com
                </span>
              </div>
            </div>

            <div className='mt-6 grid grid-cols-2 gap-3'>
              <Button
                variant='outline'
                onClick={() => console.log('Login com Google')}
                className='flex items-center justify-center'
              >
                <Google className='mr-2' fontSize='small' />
                Google
              </Button>
              <Button
                variant='outline'
                onClick={() => console.log('Login com GitHub')}
                className='flex items-center justify-center'
              >
                <GitHub className='mr-2' fontSize='small' />
                GitHub
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
