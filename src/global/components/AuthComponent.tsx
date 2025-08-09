import React, { useState } from 'react';
import { Login } from '@pages/Login';
import { Register } from '@pages/Register';

type AuthView = 'login' | 'register';

export const AuthComponent: React.FC = () => {
  const [currentView, setCurrentView] = useState<AuthView>('login');

  const switchToLogin = () => setCurrentView('login');
  const switchToRegister = () => setCurrentView('register');

  if (currentView === 'login') {
    return <Login onSwitchToRegister={switchToRegister} />;
  }

  return <Register onSwitchToLogin={switchToLogin} />;
};
