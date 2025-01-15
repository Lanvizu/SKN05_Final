import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton';
import { useAuth } from '../AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/accounts/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        login();
        alert('로그인 성공');
        navigate('/main');
      } else {
        const errorData = await response.json();
        alert(errorData.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleForgetClick = () => {
    navigate('/forgot');
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to Our App</h1>
      <p>Please log in to continue</p>
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
        <button type="submit" style={styles.loginButton}>로그인</button>
      </form>
      <GoogleLoginButton />
      <button style={styles.registerButton} onClick={handleRegisterClick}>
        Register
      </button>
      <button style={styles.registerButton} onClick={handleForgetClick}>
        Forgot
      </button>
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
    backgroundColor: '#f5f5f5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '300px',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  loginButton: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  registerButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default LoginPage;
