import React from 'react';
import { FormInput } from '@components/FormInput';
import { Email, Lock, Person, Visibility, VisibilityOff } from '@mui/icons-material';
import type { FieldErrors, UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import type { RegisterFormData } from '@schemas/validationSchemas';

interface RegisterFormFieldsProps {
  form: {
    register: UseFormRegister<RegisterFormData>;
    handleSubmit: UseFormHandleSubmit<RegisterFormData>;
    errors: FieldErrors<RegisterFormData>;
    isValid: boolean;
  };
  state: {
    isLoading: boolean;
    showPassword: boolean;
    showConfirmPassword: boolean;
  };
  actions: {
    togglePassword: () => void;
    toggleConfirmPassword: () => void;
  };
}

export const RegisterFormFields: React.FC<RegisterFormFieldsProps> = ({ form, state, actions }) => {
  return (
    <>
      {/* First Name Field */}
      <FormInput
        {...form.register('firstName')}
        label='Primeiro Nome'
        type='text'
        placeholder='João'
        disabled={state.isLoading}
        error={form.errors.firstName}
        required
        autoComplete="off"
        icon={<Person fontSize='small' />}
      />

      {/* Last Name Field */}
      <FormInput
        {...form.register('lastName')}
        label='Sobrenome'
        type='text'
        placeholder='Silva'
        disabled={state.isLoading}
        error={form.errors.lastName}
        required
        autoComplete="off"
        icon={<Person fontSize='small' />}
      />

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
          autoComplete="new-password"
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

      {/* Confirm Password Field */}
      <div className='relative'>
        <FormInput
          {...form.register('confirmPassword')}
          label='Confirmar Senha'
          type={state.showConfirmPassword ? 'text' : 'password'}
          placeholder='••••••••'
          disabled={state.isLoading}
          error={form.errors.confirmPassword}
          required
          autoComplete="new-password"
          icon={<Lock fontSize='small' />}
          endAdornment={
            <button
              type='button'
              onClick={actions.toggleConfirmPassword}
              className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none'
            >
              {state.showConfirmPassword ? (
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
