import { createTheme } from '@shopify/restyle';

// Cores do Tailwind - mantemos sincronizadas com tailwind.config.js
const tailwindColors = {
  light: {
    primary: '#4a90e2',
    secondary: '#f06292',
    accent: '#7c4dff',
    background: '#f8f9fa',
    card: '#ffffff',
    text: {
      primary: '#212529',
      secondary: '#6c757d',
      muted: '#adb5bd',
    },
    border: '#dee2e6',
    button: {
      primary: '#4a90e2',
      secondary: '#e9ecef',
    },
  },
  dark: {
    primary: '#60a5fa',
    secondary: '#f472b6',
    accent: '#a78bfa',
    background: '#121212',
    card: '#1e1e1e',
    text: {
      primary: '#f8f9fa',
      secondary: '#ced4da',
      muted: '#6c757d',
    },
    border: '#2d3748',
    button: {
      primary: '#3b82f6',
      secondary: '#374151',
    },
  },
};

// Tema base ReStyle usando as cores do Tailwind
const baseTheme = {
  colors: {
    // Cores dinâmicas que mudam com o tema
    primary: tailwindColors.light.primary,
    secondary: tailwindColors.light.secondary,
    accent: tailwindColors.light.accent,
    background: tailwindColors.light.background,
    card: tailwindColors.light.card,
    text: tailwindColors.light.text.primary,
    textSecondary: tailwindColors.light.text.secondary,
    textMuted: tailwindColors.light.text.muted,
    border: tailwindColors.light.border,
    buttonPrimary: tailwindColors.light.button.primary,
    buttonSecondary: tailwindColors.light.button.secondary,

    // Cores estáticas
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',

    // Status colors
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
    desktop: 1024,
  },
  textVariants: {
    defaults: {
      fontSize: 16,
      lineHeight: 24,
      color: 'text',
    },
    header: {
      fontWeight: 'bold',
      fontSize: 32,
      lineHeight: 40,
      color: 'text',
    },
    subheader: {
      fontWeight: '600',
      fontSize: 24,
      lineHeight: 32,
      color: 'text',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: 'text',
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      color: 'textSecondary',
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 20,
    },
  },
  buttonVariants: {
    defaults: {
      paddingVertical: 'm',
      paddingHorizontal: 'l',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 44,
    },
    primary: {
      backgroundColor: 'buttonPrimary',
    },
    secondary: {
      backgroundColor: 'buttonSecondary',
      borderWidth: 1,
      borderColor: 'border',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'primary',
    },
    ghost: {
      backgroundColor: 'transparent',
    },
  },
  cardVariants: {
    defaults: {
      backgroundColor: 'card',
      borderRadius: 12,
      padding: 'm',
      borderWidth: 1,
      borderColor: 'border',
    },
    elevated: {
      backgroundColor: 'card',
      borderRadius: 16,
      padding: 'l',
      shadowColor: 'black',
      shadowOpacity: 0.1,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
  },
};

// Tema Light - usa as cores do Tailwind Light
const lightTheme = createTheme({
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    primary: tailwindColors.light.primary,
    secondary: tailwindColors.light.secondary,
    accent: tailwindColors.light.accent,
    background: tailwindColors.light.background,
    card: tailwindColors.light.card,
    text: tailwindColors.light.text.primary,
    textSecondary: tailwindColors.light.text.secondary,
    textMuted: tailwindColors.light.text.muted,
    border: tailwindColors.light.border,
    buttonPrimary: tailwindColors.light.button.primary,
    buttonSecondary: tailwindColors.light.button.secondary,
  },
});

// Tema Dark - usa as cores do Tailwind Dark
const darkTheme = createTheme({
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    primary: tailwindColors.dark.primary,
    secondary: tailwindColors.dark.secondary,
    accent: tailwindColors.dark.accent,
    background: tailwindColors.dark.background,
    card: tailwindColors.dark.card,
    text: tailwindColors.dark.text.primary,
    textSecondary: tailwindColors.dark.text.secondary,
    textMuted: tailwindColors.dark.text.muted,
    border: tailwindColors.dark.border,
    buttonPrimary: tailwindColors.dark.button.primary,
    buttonSecondary: tailwindColors.dark.button.secondary,
  },
});

export type Theme = typeof lightTheme;
export { lightTheme, darkTheme, tailwindColors };
