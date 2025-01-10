import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/SignUpPage';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="745619133914-8gsplqn8ahi82njujtggl2cufkvrrs09.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
