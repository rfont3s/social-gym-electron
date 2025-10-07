import { useContext } from 'react';
import type { ChatContextValue } from '../types/chat';
import { ChatContext } from './ChatContext';

export function useChatContext(): ChatContextValue {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }

  return context;
}
