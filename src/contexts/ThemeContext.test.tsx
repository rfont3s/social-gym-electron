import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '../test/utils';
import { useTheme } from '../global/hooks/useTheme';
import { ThemeProvider } from './ThemeContext';
import { localStorageMock } from '../test/utils';

// Test component that uses the theme context
const TestComponent = () => {
  const { mode, toggleTheme, setTheme } = useTheme();

  return (
    <div>
      <div data-testid='theme-mode'>{mode}</div>
      <button onClick={toggleTheme} data-testid='toggle-btn'>
        Toggle
      </button>
      <button onClick={() => setTheme('light')} data-testid='light-btn'>
        Light
      </button>
      <button onClick={() => setTheme('dark')} data-testid='dark-btn'>
        Dark
      </button>
    </div>
  );
};

// Mock document.documentElement
const mockDocumentElement = {
  classList: {
    remove: vi.fn(),
    add: vi.fn(),
  },
};

Object.defineProperty(document, 'documentElement', {
  value: mockDocumentElement,
  writable: true,
});

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
    mockDocumentElement.classList.remove.mockClear();
    mockDocumentElement.classList.add.mockClear();
  });

  it('initializes with light theme when no stored preference and no system preference', () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
    expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('light');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'theme-preference',
      'light'
    );
  });

  it('initializes with stored theme preference', () => {
    localStorageMock.getItem.mockReturnValue('dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
    expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('dark');
  });

  it('initializes with dark theme when system prefers dark mode', () => {
    localStorageMock.getItem.mockReturnValue(null);

    // Mock matchMedia to return dark preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
  });

  it('toggles theme from light to dark', async () => {
    localStorageMock.getItem.mockReturnValue('light');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');

    const toggleBtn = screen.getByTestId('toggle-btn');

    await act(async () => {
      toggleBtn.click();
    });

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
    expect(mockDocumentElement.classList.remove).toHaveBeenCalledWith(
      'light',
      'dark'
    );
    expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'theme-preference',
      'dark'
    );
  });

  it('toggles theme from dark to light', async () => {
    localStorageMock.getItem.mockReturnValue('dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');

    const toggleBtn = screen.getByTestId('toggle-btn');

    await act(async () => {
      toggleBtn.click();
    });

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
  });

  it('sets theme directly to light', async () => {
    localStorageMock.getItem.mockReturnValue('dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');

    const lightBtn = screen.getByTestId('light-btn');

    await act(async () => {
      lightBtn.click();
    });

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'theme-preference',
      'light'
    );
  });

  it('sets theme directly to dark', async () => {
    localStorageMock.getItem.mockReturnValue('light');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');

    const darkBtn = screen.getByTestId('dark-btn');

    await act(async () => {
      darkBtn.click();
    });

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'theme-preference',
      'dark'
    );
  });

  it('applies theme classes to document element', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(mockDocumentElement.classList.remove).toHaveBeenCalledWith(
      'light',
      'dark'
    );
    expect(mockDocumentElement.classList.add).toHaveBeenCalled();
  });
});
