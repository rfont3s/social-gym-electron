import React from 'react';

interface RegisterFooterProps {
  onSwitchToLogin: () => void;
}

export const RegisterFooter: React.FC<RegisterFooterProps> = ({
  onSwitchToLogin,
}) => {
  return (
    <div className='mt-8 text-center'>
      <p className='text-sm text-gray-600 dark:text-gray-400'>
        Já tem uma conta?{' '}
        <button
          type='button'
          onClick={onSwitchToLogin}
          className='font-medium hover:underline text-primary-500'
        >
          Entrar
        </button>
      </p>
    </div>
  );
};
