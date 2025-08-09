import React from 'react';
import { Button, Card } from '@components';
import { INFO_MESSAGES } from '@constants/messages';
import {
  PersonAdd,
  FitnessCenter,
  SportsMartialArts,
  DirectionsRun,
  Pool,
  MonitorWeight,
  SportsGymnastics,
} from '@mui/icons-material';
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
      <div className='absolute inset-0 overflow-hidden'>
        {/* Gradient Circles */}
        <div className='absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 bg-primary-500/30' />
        <div className='absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 bg-secondary-500/30' />
        <div className='absolute top-1/2 -left-20 w-60 h-60 rounded-full opacity-10 bg-primary-400/20' />
        <div className='absolute top-1/4 -right-20 w-40 h-40 rounded-full opacity-15 bg-secondary-400/25' />

        {/* Floating Gym Icons */}
        <div className='absolute top-20 left-20 text-primary-500/20 dark:text-primary-400/20 animate-pulse'>
          <FitnessCenter sx={{ fontSize: 48 }} />
        </div>
        <div className='absolute top-32 right-32 text-secondary-500/15 dark:text-secondary-400/15 animate-pulse delay-1000'>
          <DirectionsRun sx={{ fontSize: 40 }} />
        </div>
        <div className='absolute bottom-32 left-16 text-primary-500/10 dark:text-primary-400/10 animate-pulse delay-2000'>
          <MonitorWeight sx={{ fontSize: 44 }} />
        </div>
        <div className='absolute bottom-20 right-20 text-secondary-500/20 dark:text-secondary-400/20 animate-pulse delay-500'>
          <SportsGymnastics sx={{ fontSize: 36 }} />
        </div>
        <div className='absolute top-1/2 left-8 text-primary-500/15 dark:text-primary-400/15 animate-pulse delay-1500'>
          <SportsMartialArts sx={{ fontSize: 42 }} />
        </div>
        <div className='absolute top-1/3 right-8 text-secondary-500/10 dark:text-secondary-400/10 animate-pulse delay-700'>
          <Pool sx={{ fontSize: 38 }} />
        </div>

        {/* Additional decorative elements */}
        <div className='absolute top-16 left-1/2 w-32 h-32 rounded-full opacity-5 bg-gradient-to-br from-primary-500 to-secondary-500' />
        <div className='absolute bottom-16 right-1/3 w-24 h-24 rounded-full opacity-8 bg-gradient-to-tl from-secondary-500 to-primary-500' />
      </div>

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
            <FitnessCenter sx={{ fontSize: 24 }} />
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
