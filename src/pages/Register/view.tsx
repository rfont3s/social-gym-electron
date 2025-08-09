import React from 'react';
import { Button, Card, Background } from '@components';
import { INFO_MESSAGES } from '@constants/messages';
import { PersonAdd } from '@mui/icons-material';
import {
  RegisterHeader,
  RegisterFormFields,
  RegisterFooter,
} from './components';
import type { RegisterData } from './index';

interface RegisterViewProps {
  data: RegisterData;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ data }) => {
  const { form, state, theme, actions } = data;

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300'>
      {/* Enhanced Background Pattern with Gym Icons */}
      <Background />

      {/* Register Card */}
      <div className='relative w-full max-w-md'>
        {/* Card glow effect */}
        <div className='absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl blur-xl opacity-30'></div>

        <Card
          variant='elevated'
          className='backdrop-blur-sm border border-white/20 dark:border-gray-700/50 relative z-10 shadow-2xl'
        >
          {/* Subtle gym pattern overlay */}
          <div className='absolute top-4 right-4 text-primary-500/10 dark:text-primary-400/10'>
            <PersonAdd sx={{ fontSize: 24 }} />
          </div>
          <RegisterHeader theme={theme} />

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
            <Button
              type='submit'
              disabled={state.isLoading || !form.isValid}
              className='w-full'
            >
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
        </Card>
      </div>
    </div>
  );
};
