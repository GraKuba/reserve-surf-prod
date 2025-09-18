import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  sessionExpiry: number | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERNAME = 'demo';
const DEMO_PASSWORD = 'surf2025';
const SESSION_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionExpiry, setSessionExpiry] = useState<number | null>(null);

  useEffect(() => {
    // Check for existing session
    const storedExpiry = localStorage.getItem('sessionExpiry');
    if (storedExpiry) {
      const expiry = parseInt(storedExpiry, 10);
      if (expiry > Date.now()) {
        setIsAuthenticated(true);
        setSessionExpiry(expiry);
      } else {
        localStorage.removeItem('sessionExpiry');
      }
    }
  }, []);

  useEffect(() => {
    // Set up timer to check for session expiry
    if (sessionExpiry) {
      const checkInterval = setInterval(() => {
        if (Date.now() > sessionExpiry) {
          logout();
        }
      }, 1000); // Check every second

      return () => clearInterval(checkInterval);
    }
  }, [sessionExpiry]);

  const login = (username: string, password: string): boolean => {
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      const expiry = Date.now() + SESSION_DURATION;
      setIsAuthenticated(true);
      setSessionExpiry(expiry);
      localStorage.setItem('sessionExpiry', expiry.toString());
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setSessionExpiry(null);
    localStorage.removeItem('sessionExpiry');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, sessionExpiry }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}