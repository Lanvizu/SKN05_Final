import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ForgotPage from './components/ForgotPage';
import MainPage from './components/navigation/MainPage';
import MyPage from './components/navigation/MyPage';
import ResetPassword from './components/ResetPassword';
import { GoogleOAuthProvider } from '@react-oauth/google';
import VerifyEmail from './components/VerifyEmail';
import ChatPage from './components/chat/ChatPage';
import ProfileEditPage from './components/ProfileEditPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <GoogleOAuthProvider clientId="745619133914-8gsplqn8ahi82njujtggl2cufkvrrs09.apps.googleusercontent.com">
                <LoginPage />
              </GoogleOAuthProvider>
            }
          />
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:roomId"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <ProfileEditPage />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot" element={<ForgotPage />} />
          <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
          <Route path="/verify-email/:key" element={<VerifyEmail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
