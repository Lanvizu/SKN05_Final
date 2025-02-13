import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Loading from '../LoadingModal';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const dnsAddress = process.env.REACT_APP_DNS_ADDRESS;
  const ipAddress = process.env.REACT_APP_IP_ADDRESS;
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    if (window.location.hostname === dnsAddress) {
      const newURL = window.location.href.replace(dnsAddress, ipAddress);
      window.location.replace(newURL);
      return;
    }

    const exchangeCodeForToken = async () => {
      const code = new URLSearchParams(window.location.search).get('code');

      if (!code) {
        console.error('인증 코드 없음');
        return navigate('/login');
      }

      try {
        const response = await axios.post(
          `${baseUrl}/api/accounts/google/callback/`,
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
  }, [navigate, login, dnsAddress, ipAddress, baseUrl]);

  return <Loading />;
};

export default GoogleCallback;
