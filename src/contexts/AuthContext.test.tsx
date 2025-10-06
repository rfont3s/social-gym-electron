import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen, act } from '../test/utils';
import { useAuth } from '../global/hooks/useAuth';
import { AuthProvider } from './AuthContext';
import { localStorageMock } from '../test/utils';

// Test component that uses the auth context
const TestComponent = () => {
  const { isAuthenticated, user, token, login, logout, loading } = useAuth();

  return (
    <div>
      <div data-testid='loading'>{loading ? 'Loading' : 'Loaded'}</div>
      <div data-testid='authenticated'>
        {isAuthenticated ? 'Authenticated' : 'Not authenticated'}
      </div>
      <div data-testid='user'>{user ? user.name : 'No user'}</div>
      <div data-testid='token'>{token || 'No token'}</div>
      <button
        onClick={() =>
          login('test-token', {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
          })
        }
        data-testid='login-btn'
      >
        Login
      </button>
      <button onClick={logout} data-testid='logout-btn'>
        Logout
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('starts with unauthenticated state when no stored data', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('Loaded');
    expect(screen.getByTestId('authenticated')).toHaveTextContent(
      'Not authenticated'
    );
    expect(screen.getByTestId('user')).toHaveTextContent('No user');
    expect(screen.getByTestId('token')).toHaveTextContent('No token');
  });

  it('loads stored authentication data on initialization', async () => {
    const userData = {
      id: '1',
      name: 'Stored User',
      email: 'stored@example.com',
    };
    localStorageMock.getItem.mockImplementation(key => {
      if (key === 'access_token') return 'stored-token';
      if (key === 'user') return JSON.stringify(userData);
      return null;
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('authenticated')).toHaveTextContent(
      'Authenticated'
    );
    expect(screen.getByTestId('user')).toHaveTextContent('Stored User');
    expect(screen.getByTestId('token')).toHaveTextContent('stored-token');
  });

  it('handles corrupted stored user data gracefully', async () => {
    localStorageMock.getItem.mockImplementation(key => {
      if (key === 'access_token') return 'stored-token';
      if (key === 'user') return 'invalid-json';
      return null;
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('authenticated')).toHaveTextContent(
      'Not authenticated'
    );
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('access_token');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
  });

  it('performs login correctly', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginBtn = screen.getByTestId('login-btn');

    await act(async () => {
      loginBtn.click();
    });

    expect(screen.getByTestId('authenticated')).toHaveTextContent(
      'Authenticated'
    );
    expect(screen.getByTestId('user')).toHaveTextContent('Test User');
    expect(screen.getByTestId('token')).toHaveTextContent('test-token');

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'access_token',
      'test-token'
    );
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify({
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      })
    );
  });

  it('performs logout correctly', async () => {
    // Start with authenticated state
    localStorageMock.getItem.mockImplementation(key => {
      if (key === 'access_token') return 'stored-token';
      if (key === 'user')
        return JSON.stringify({
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
        });
      return null;
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Verify initial authenticated state
    expect(screen.getByTestId('authenticated')).toHaveTextContent(
      'Authenticated'
    );

    const logoutBtn = screen.getByTestId('logout-btn');

    await act(async () => {
      logoutBtn.click();
    });

    expect(screen.getByTestId('authenticated')).toHaveTextContent(
      'Not authenticated'
    );
    expect(screen.getByTestId('user')).toHaveTextContent('No user');
    expect(screen.getByTestId('token')).toHaveTextContent('No token');

    expect(localStorageMock.removeItem).toHaveBeenCalledWith('access_token');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
  });

  // Additional validation tests could be added here
});
