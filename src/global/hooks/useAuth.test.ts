import { describe, it, expect } from 'vitest';
import { renderHook } from '../../test/utils';
import { useAuth } from './useAuth';
import { AuthProvider } from '../../contexts/AuthContext';

describe('useAuth', () => {
  it('returns auth context when used within AuthProvider', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current).toHaveProperty('isAuthenticated');
    expect(result.current).toHaveProperty('user');
    expect(result.current).toHaveProperty('token');
    expect(result.current).toHaveProperty('login');
    expect(result.current).toHaveProperty('logout');
    expect(result.current).toHaveProperty('loading');
  });

  it('throws error when used outside AuthProvider', () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth must be used within AuthProvider');
  });

  it('returns correct initial values', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBe(null);
    expect(result.current.token).toBe(null);
    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.logout).toBe('function');
    expect(typeof result.current.loading).toBe('boolean');
  });
});
