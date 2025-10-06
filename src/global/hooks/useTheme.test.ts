import { describe, it, expect } from 'vitest';
import { renderHook } from '../../test/utils';
import { useTheme } from './useTheme';
import { ThemeProvider } from '../../contexts/ThemeContext';

describe('useTheme', () => {
  it('returns theme context when used within ThemeProvider', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(result.current).toHaveProperty('mode');
    expect(result.current).toHaveProperty('toggleTheme');
    expect(result.current).toHaveProperty('setTheme');
  });

  it('throws error when used outside ThemeProvider', () => {
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within a ThemeProvider');
  });

  it('returns correct initial values', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(['light', 'dark']).toContain(result.current.mode);
    expect(typeof result.current.toggleTheme).toBe('function');
    expect(typeof result.current.setTheme).toBe('function');
  });
});
