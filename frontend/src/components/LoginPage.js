import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton';
import NaverLoginButton from './NaverLoginButton';
import KakaoLoginButton from './KakaoLoginButton';
import { useAuth } from '../AuthContext';
import NavigationLinks from './NavigationLinks';

const LoginPage = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/accounts/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        login();
        // alert('로그인 성공');
        navigate('/');
      } else {
        // const errorData = await response.json();
        alert(data.non_field_errors || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <NavigationLinks />
      <div style={styles.container}>
        <h2 style={styles.title}>로그인</h2>
        <p style={styles.sub_title}>서비스를 이용하시려면 로그인을 해주세요</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            required
            style={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
            style={styles.input}
          />
          <button type="submit" style={styles.loginButton}>
            로그인
          </button>
          <div style={styles.bottomContainer}>
            <div style={styles.links}>
              <div style={styles.linkContainer}>
                <span 
                  onClick={() => navigate('/register')} 
                  style={styles.linkText}
                >
                  회원가입
                </span>
              </div>
              <div style={styles.linkContainer}>
                <span 
                  onClick={() => navigate('/forgot')} 
                  style={styles.linkText}
                >
                  비밀번호 찾기
                </span>
              </div>
            </div>
            <div style={styles.divider}>
              {/* <span>또는</span> */}
            </div>
            <div style={styles.socialLogin}>
              <GoogleLoginButton />
              <NaverLoginButton />
              <KakaoLoginButton />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  sub_title: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '14px',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    boxSizing: 'border-box',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  loginButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '5px',
  },
  bottomContainer: {
    textAlign: 'center',
  },
  divider: {
    position: 'relative',
    marginTop: '20px',
    marginBottom: '10px',
    borderTop: '1px solid #ddd',
    // color: '#666',
    // fontSize: '12px'
  },
  socialLogin: {
    // display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  socialButton: {
    width: '40px',
    height: '40px',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    padding: '0',
    backgroundColor: 'transparent',
  },
  socialIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  links: {
    display: 'flex',
    justifyContent: 'space-arround',
    margin: '10px',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    fontSize: '14px',
    flex: '0 0 50%',
    padding: 0,
    margin: 0,
    
  },
  linkContainer: {
    flex: '0 0 50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    color: '#666',
    cursor: 'pointer',
    fontSize: '14px',
    textDecoration: 'underline',
    margin: '0 auto',
    textAlign: 'center',
  },
};

export default LoginPage;
