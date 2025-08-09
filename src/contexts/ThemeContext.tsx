import React, { createContext, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

export interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Inicializar com o tema salvo ou detectar preferência do sistema
  const getInitialTheme = (): ThemeMode => {
    // Primeiro, verificar se há tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme-preference') as ThemeMode;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }

    // Se não há tema salvo, verificar preferência do sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  };

  const [mode, setMode] = useState<ThemeMode>(getInitialTheme);

  // Aplicar tema inicial imediatamente na inicialização
  useEffect(() => {
    // Aplicar classe do tema ao documento
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(mode);

    // Garantir que o tema seja salvo no localStorage
    localStorage.setItem('theme-preference', mode);
  }, [mode]);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
