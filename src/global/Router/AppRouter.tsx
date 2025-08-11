import { useAuth } from '@/global/hooks/useAuth';
import { Dashboard, Feed, Login, Register } from '@pages';
import { Navigate, Route, Routes } from 'react-router-dom';

// Componente para rotas protegidas
interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
        <div className='text-center'>
          <div className='w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4' />
          <p className='text-gray-600 dark:text-gray-400'>Carregando...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to='/' replace />;
}

// Componente para a página inicial - decide automaticamente entre Login ou Feed
function HomePage() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
        <div className='text-center'>
          <div className='w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4' />
          <p className='text-gray-600 dark:text-gray-400'>Carregando...</p>
        </div>
      </div>
    );
  }

  // Se estiver logado, mostra o Feed. Se não, mostra o Login
  return isAuthenticated ? <Feed /> : <Login />;
}

// Componente para rotas públicas (redireciona logados para home)
interface PublicRouteProps {
  children: React.ReactNode;
}

function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
        <div className='text-center'>
          <div className='w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4' />
          <p className='text-gray-600 dark:text-gray-400'>Carregando...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to='/' replace /> : <>{children}</>;
}

export function AppRouter() {
  return (
    <Routes>
      {/* Rota inicial - Login ou Feed dependendo da autenticação */}
      <Route path='/' element={<HomePage />} />

      {/* Rota de cadastro */}
      <Route
        path='/register'
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Rota do feed (protegida) - mantida para compatibilidade */}
      <Route
        path='/feed'
        element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        }
      />

      {/* Rota do dashboard (protegida) */}
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Rota para páginas não encontradas */}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}
