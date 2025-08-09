import React from 'react';
import { FormInput } from '@components/FormInput';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import type { LoginData } from '../index';

interface LoginFormFieldsProps {
  form: LoginData['form'];
  state: LoginData['state'];
  actions: LoginData['actions'];
}

export const LoginFormFields: React.FC<LoginFormFieldsProps> = ({
  form,
  state,
  actions,
}) => {
  return (
    <>
      {/* Email Field */}
      <FormInput
        {...form.register('email')}
        label='Email'
        type='email'
        placeholder='seu@email.com'
        disabled={state.isLoading}
        error={form.errors.email}
        required
        autoComplete="off"
        icon={<Email fontSize='small' />}
      />

      {/* Password Field */}
      <div className='relative'>
        <FormInput
          {...form.register('password')}
          label='Senha'
          type={state.showPassword ? 'text' : 'password'}
          placeholder='••••••••'
          disabled={state.isLoading}
          error={form.errors.password}
          required
          autoComplete="current-password"
          icon={<Lock fontSize='small' />}
          endAdornment={
            <button
              type='button'
              onClick={actions.togglePassword}
              className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none'
            >
              {state.showPassword ? (
                <VisibilityOff fontSize='small' />
              ) : (
                <Visibility fontSize='small' />
              )}
            </button>
          }
        />
      </div>
    </>
  );
};
