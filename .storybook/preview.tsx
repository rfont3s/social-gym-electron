import type { Preview } from '@storybook/react';
import '../src/index.css'; // Importar Tailwind CSS
import React from 'react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },

    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#f8fafc',
        },
        {
          name: 'dark',
          value: '#0f172a',
        },
      ],
    },

    layout: 'centered',
  },

  decorators: [
    (Story, context) => {
      const isDark = context.globals.theme === 'dark';
      
      return React.createElement('div', { className: isDark ? 'dark' : '' },
        React.createElement('div', { 
          className: 'min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4' 
        },
          React.createElement(Story)
        )
      );
    },
  ],

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        showName: true,
      },
    },
  },
};

export default preview;
