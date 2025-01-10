import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register'); // 회원가입 페이지로 이동
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to Our App</h1>
      <p>Please log in to continue</p>
      <GoogleLoginButton />
      <button style={styles.registerButton} onClick={handleRegisterClick}>
        Register
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
