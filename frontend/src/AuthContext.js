import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import Loading from './LoadingModal';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/accounts/check-auth/`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('인증 상태 확인 중 오류 발생:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, [BASE_URL]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async () => {
    await checkAuthStatus();
  };

  const logout = () => setIsAuthenticated(false);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
