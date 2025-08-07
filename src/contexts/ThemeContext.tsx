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
  const [mode, setMode] = useState<ThemeMode>('light');

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-preference') as ThemeMode;
    const initialMode = savedTheme || 'light';
    setMode(initialMode);

    // Apply initial theme class to document
    if (initialMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  useEffect(() => {
    // Save theme preference
    localStorage.setItem('theme-preference', mode);

    // Apply theme class to document
    if (mode === 'dark') {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
