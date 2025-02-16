import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ForgotPage from './components/ForgotPage';
import MainPage from './components/main/MainPage';
import MyPage from './components/MyPage';
import ResetPassword from './components/ResetPassword';
import VerifyEmail from './components/VerifyEmail';
import ChatPage from './components/chat/ChatPage';
import ProfileEditPage from './components/ProfileEditPage';
import AuthenticatedMainPage from './components/main/AuthenticatedMainPage';
import GoogleCallback from './components/GoogleCallback';
import NaverCallback from './components/NaverCallback';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const MainPageRouter = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <ProtectedRoute>
      <AuthenticatedMainPage />
    </ProtectedRoute>
  ) : (
    <MainPage />
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
                <MainPageRouter />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage />
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
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
          <Route path="/auth/naver/callback" element={<NaverCallback />} />
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
