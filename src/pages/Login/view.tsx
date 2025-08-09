import React from 'react';
import { Button, Card } from '@components';
import { INFO_MESSAGES } from '@constants/messages';
import { Lock } from '@mui/icons-material';
import { LoginHeader, LoginFormFields, SocialLogin, LoginFooter } from './components';
import type { LoginData } from './index';

interface LoginViewProps {
  data: LoginData;
}

export const LoginView: React.FC<LoginViewProps> = ({ data }) => {
  const { form, state, theme, actions } = data;

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
          <LoginHeader theme={theme} />

          {/* Form */}
          <form onSubmit={form.handleSubmit(actions.onSubmit)} className='space-y-6' autoComplete="off">
            <LoginFormFields 
              form={form}
              state={state}
              actions={actions}
            />

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
            <Button
              type='submit'
              disabled={state.isLoading || !form.isValid}
              className='w-full'
            >
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

          <LoginFooter onSwitchToRegister={actions.onSwitchToRegister} />
          <SocialLogin />
        </Card>
      </div>
    </div>
  );
};
