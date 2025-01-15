import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import googleIcon from '../assets/google_icon.png'

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.post('http://localhost:8000/api/accounts/google/login-request/', {
          access_token: response.access_token,
        }, {
          withCredentials: true,
        });
  
        // 응답 데이터 확인 및 처리
        if (res.status === 200 || res.status === 201) {
          login();
          if (res.status === 200) {
            alert('구글 로그인 성공');
          } else {
            alert('회원가입 및 로그인 성공');
          }
          navigate('/main');
        } else {
          alert(res.data.error || '로그인 처리 중 오류가 발생했습니다.');
        }
      } catch (err) {
        console.error('로그인 중 오류 발생:', err.response?.data || err.message);
        alert(err.response?.data?.error || '서버 오류가 발생했습니다.');
      }
    },
    onError: (error) => {
      console.error('구글 로그인 실패:', error);
      alert('구글 로그인에 실패했습니다.');
    },
  });

  return (
    // <button onClick={() => googleLogin()}>
    //   Sign in with Google
    // </button>

    <button 
      onClick={googleLogin}
      style={styles.googleButton}
    >
      <img 
        src={googleIcon} 
        alt="Google" 
        style={styles.googleIcon} 
      />
      <span style={styles.buttonText}>Continue with Google</span>
    </button>
  );
};

const styles = {
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '10px',
    border: '1px solid #dadce0',
    borderRadius: '4px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    gap: '10px',
    marginTop: '10px'
  },
  googleIcon: {
    width: '18px',
    height: '18px'
  },
  buttonText: {
    color: '#3c4043',
    fontSize: '14px',
    fontWeight: '500'
  }
};

export default GoogleLoginButton;
