import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // AuthContext 사용

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, setIsAuthenticated } = useAuth(); // 전역 상태 사용
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (isAuthenticated === null) {
        try {
          const response = await fetch('http://localhost:8000/api/accounts/check-auth/', {
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
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, [isAuthenticated, setIsAuthenticated]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
