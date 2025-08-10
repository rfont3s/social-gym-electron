import { Button } from '@components';
import { INFO_MESSAGES } from '@constants/messages';
import { PersonAdd } from '@mui/icons-material';
import React from 'react';
import {
  RegisterFooter,
  RegisterFormFields,
  RegisterHeader,
} from './components';
import type { RegisterData } from './index';

interface RegisterViewProps {
  data: RegisterData;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ data }) => {
  const { form, state, theme, actions } = data;

  return (
    <div className='min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-300'>
      {/* Left Side - Image/Illustration */}
      <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary-500 to-primary-500 relative overflow-hidden'>
        {/* Gym themed background */}
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center text-white z-10'>
            <div className='mb-8'></div>
            <h1 className='text-5xl font-bold mb-4'>Junte-se</h1>
            <p className='text-4xl opacity-90 max-w-lg'>
              Faça parte da maior comunidade de Treinos e Conexões. Compartilhe,
              conecte e evolua!
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className='absolute top-32 right-20 w-28 h-28 rounded-full bg-white/10 animate-pulse'></div>
        <div className='absolute bottom-32 left-20 w-20 h-20 rounded-full bg-white/10 animate-pulse delay-1000'></div>
        <div className='absolute top-1/3 left-10 w-14 h-14 rounded-full bg-white/10 animate-pulse delay-500'></div>
      </div>

      {/* Right Side - Register Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-8'>
        <div className='w-full max-w-md space-y-8'>
          {/* Mobile Logo - only shown on small screens */}
          <div className='lg:hidden text-center mb-8'>
            <img
              src='/src/assets/logo.svg'
              alt='Social Gym Logo'
              className='w-50 object-contain dark:invert'
            />
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white mt-4'>
              Social Gym
            </h1>
            <p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
              Crie sua conta para começar
            </p>
          </div>

          {/* Register Header for desktop */}
          <div className='hidden lg:block'>
            <RegisterHeader theme={theme} />
          </div>

          {/* Form */}
          <form
            onSubmit={form.handleSubmit(actions.onSubmit)}
            className='space-y-6'
            autoComplete='off'
          >
            <RegisterFormFields form={form} state={state} actions={actions} />

            {/* Error Message */}
            {state.error && (
              <div className='text-red-600 dark:text-red-400 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800'>
                {state.error}
              </div>
            )}

            {/* Success Message */}
            {state.success && (
              <div className='text-green-600 dark:text-green-400 text-sm text-center bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800'>
                {state.success}
              </div>
            )}

            {/* Register Button */}
            <Button type='submit' disabled={state.isLoading} className='w-full'>
              {state.isLoading ? (
                <div className='flex items-center justify-center'>
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
                  {INFO_MESSAGES.LOADING_REGISTER}
                </div>
              ) : (
                <>
                  <PersonAdd className='mr-2' fontSize='small' />
                  Criar Conta
                </>
              )}
            </Button>
          </form>

          <RegisterFooter
            onSwitchToLogin={actions.onSwitchToLogin || (() => {})}
          />
        </div>
      </div>
    </div>
  );
};
