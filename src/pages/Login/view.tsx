import { Button } from '@components';
import { INFO_MESSAGES } from '@constants/messages';
import { Lock } from '@mui/icons-material';
import React from 'react';
import {
  LoginFooter,
  LoginFormFields,
  LoginHeader,
  SocialLogin,
} from './components';
import type { LoginData } from './index';

interface LoginViewProps {
  data: LoginData;
}

export const LoginView: React.FC<LoginViewProps> = ({ data }) => {
  const { form, state, theme, actions } = data;

  return (
    <div className='min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-300'>
      {/* Left Side - Image/Illustration */}
      <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-500 to-secondary-500 relative overflow-hidden'>
        {/* Gym themed background */}
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center text-white z-10'>
            <p className='text-4xl opacity-90 max-w-lg'>
              Conecte-se com outros atletas, compartilhe seus treinos e
              conquiste seus objetivos. Inspire-se nos profissionais do esporte
              e leve sua performance ao próximo nível.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className='absolute top-20 left-20 w-32 h-32 rounded-full bg-white/10 animate-pulse'></div>
        <div className='absolute bottom-20 right-20 w-24 h-24 rounded-full bg-white/10 animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 right-10 w-16 h-16 rounded-full bg-white/10 animate-pulse delay-500'></div>
      </div>

      {/* Right Side - Login Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-8'>
        <div className='w-full max-w-md space-y-8'>
          {/* Mobile Logo - only shown on small screens */}
          <div className='lg:hidden text-center mb-8'>
            <img
              src='/src/assets/logo.svg'
              alt='Social Gym Logo'
              className='w-50 object-contain dark:invert'
            />
            <p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
              Conecte-se com outros atletas, compartilhe seus treinos e
              conquiste seus objetivos. Inspire-se nos profissionais do esporte
              e leve sua performance ao próximo nível.
            </p>
          </div>

          {/* Login Header for desktop */}
          <div className='hidden lg:block'>
            <LoginHeader theme={theme} />
          </div>

          {/* Form */}
          <form
            onSubmit={form.handleSubmit(actions.onSubmit)}
            className='space-y-6'
            autoComplete='off'
          >
            <LoginFormFields form={form} state={state} actions={actions} />

            {/* Error Message */}
            {state.error && (
              <div className='text-red-600 dark:text-red-400 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800'>
                {state.error}
              </div>
            )}

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
            <Button type='submit' disabled={state.isLoading} className='w-full'>
              {state.isLoading ? (
                <div className='flex items-center justify-center'>
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
                  {INFO_MESSAGES.LOADING_LOGIN}
                </div>
              ) : (
                <>
                  <Lock className='mr-2' fontSize='small' />
                  Entrar
                </>
              )}
            </Button>
          </form>

          <SocialLogin />
          <LoginFooter onSwitchToRegister={actions.onSwitchToRegister} />
        </div>
      </div>
    </div>
  );
};
