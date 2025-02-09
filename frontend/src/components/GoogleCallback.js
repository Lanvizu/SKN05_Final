import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      const code = new URLSearchParams(window.location.search).get('code');
      
      if (!code) {
        console.error('인증 코드 없음');
        return navigate('/login');
      }

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/accounts/google/callback/`,
          { code },
          { withCredentials: true }
        );

        if (response.status === 200 || response.status === 201) {
          login();
          navigate('/');
        }
      } catch (error) {
        console.error('토큰 교환 실패:', error.response?.data);
        navigate('/login', { state: { error: '구글 로그인 실패' } });
      }
    };

    exchangeCodeForToken();
  }, [navigate, login]);

  return <div>인증 처리 중...</div>;
};

export default GoogleCallback;
