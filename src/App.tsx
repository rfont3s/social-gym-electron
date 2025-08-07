import { useState } from 'react';
import { ThemeProvider } from '@contexts/ThemeContext';
import { Login, Dashboard } from '@pages';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (credentials: { email: string; password: string }) => {
    console.log('Login credentials:', credentials);
    // Simulate authentication
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider>
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </ThemeProvider>
  );
}

export default App;
