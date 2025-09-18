import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginPage from '@/pages/LoginPage';
import SessionExpired from '@/pages/SessionExpired';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, sessionExpiry } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && sessionExpiry === null) {
      // Session never started or was cleared
      return;
    }

    if (!isAuthenticated && sessionExpiry !== null) {
      // Session existed but expired
      return;
    }
  }, [isAuthenticated, sessionExpiry]);

  // Check if session has expired
  if (!isAuthenticated && sessionExpiry !== null && Date.now() > sessionExpiry) {
    return <SessionExpired />;
  }

  // Not authenticated at all
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Authenticated - show protected content
  return <>{children}</>;
}