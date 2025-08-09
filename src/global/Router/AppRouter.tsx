import { useAuth } from '@/global/hooks/useAuth';
import { AuthComponent } from '@components';
import { Dashboard } from '@pages';
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

// Componente para rotas públicas (quando já logado, redireciona)
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

  return isAuthenticated ? (
    <Navigate to='/dashboard' replace />
  ) : (
    <>{children}</>
  );
}

export function AppRouter() {
  return (
    <Routes>
      {/* Rota de autenticação */}
      <Route
        path='/'
        element={
          <PublicRoute>
            <AuthComponent />
          </PublicRoute>
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

      {/* Rota raiz - redireciona baseado na autenticação */}
      <Route path='/' element={<Navigate to='/dashboard' replace />} />

      {/* Rota para páginas não encontradas */}
      <Route path='*' element={<Navigate to='/dashboard' replace />} />
    </Routes>
  );
}
