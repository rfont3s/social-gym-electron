import React from 'react';

interface LoginFooterProps {
  onSwitchToRegister: () => void;
}

export const LoginFooter: React.FC<LoginFooterProps> = ({
  onSwitchToRegister,
}) => {
  return (
    <div className='mt-8 text-center'>
      <p className='text-sm text-gray-600 dark:text-gray-400'>
        Não tem uma conta?{' '}
        <button
          type='button'
          onClick={onSwitchToRegister}
          className='font-medium hover:underline text-primary-500'
        >
          Cadastre-se
        </button>
      </p>
    </div>
  );
};
