import { AppRouter } from '@/global/Router';
import { AuthProvider } from '@contexts/AuthContext';
import { ChatProvider } from '@contexts/ChatContext';
import { ThemeProvider } from '@contexts/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ChatProvider
            apiBaseUrl={import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}
            socketUrl={import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001'}
            getAuthToken={getAuthToken}
            autoConnect={true}
          >
            <AppRouter />
          </ChatProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
