import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './styles/style.css';

// 페이지 컴포넌트 임포트
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ForgotPage from './components/ForgotPage';
import MainPage from './components/MainPage';
import MyPage from './components/MyPage';
import ResetPassword from './components/ResetPassword';
import VerifyEmail from './components/VerifyEmail';
import ChatPage from './components/ChatPage';
import ProfileEditPage from './components/ProfileEditPage';
import LandingPage from './components/LandingPage';


// 보호된 라우트 컴포넌트
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

// 메인 앱 컴포넌트
const App = () => {
  return (
    <GoogleOAuthProvider clientId="745619133914-8gsplqn8ahi82njujtggl2cufkvrrs09.apps.googleusercontent.com">
      <AuthProvider>
        <Router>
          <Routes>
            {/* 초기 화면으로 랜딩 페이지 설정 */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot" element={<ForgotPage />} />
            <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
            <Route path="/verify-email/:key" element={<VerifyEmail />} />
            <Route path="/landing" element={<LandingPage />} />

            {/* 로그인 후 접근 가능한 라우트 */}
            <Route path="/main" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
            <Route path="/mypage" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
            <Route path="/edit-profile" element={<ProtectedRoute><ProfileEditPage /></ProtectedRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
