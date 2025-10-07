import { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  onTypingStart?: () => void;
  onTypingStop?: () => void;
  disabled?: boolean;
  className?: string;
}

export function MessageInput({
  onSendMessage,
  onTypingStart,
  onTypingStop,
  disabled = false,
  className = '',
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    // Typing indicators
    if (value && !isTyping) {
      setIsTyping(true);
      onTypingStart?.();
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      onTypingStop?.();
    }, 1000);
  };

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled) return;

    onSendMessage(trimmedMessage);
    setMessage('');
    setIsTyping(false);
    onTypingStop?.();

    // Clear timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 ${className}`}>
      <div className="flex gap-2 items-end">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Digite sua mensagem..."
          className="
            flex-1 resize-none rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2
            bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
            disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed
            max-h-32 min-h-[40px]
          "
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="
            px-6 py-2 rounded-lg font-medium
            bg-blue-500 dark:bg-blue-600 text-white
            hover:bg-blue-600 dark:hover:bg-blue-500
            disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed
            transition-colors
            flex-shrink-0
          "
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
