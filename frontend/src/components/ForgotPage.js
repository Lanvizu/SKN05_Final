import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPage = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/accounts/password-reset/`, { email });
      setMessage(response.data.detail);
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      setMessage(error.response?.data?.detail || 'An error occurred. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>비밀번호 찾기</h2>
      <p style={styles.sub_title}>
        비밀번호를 재설정하기 위한 이메일을 입력해주세요.
      </p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.submitButton}>
          비밀번호 재설정 링크 보내기
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      <div style={styles.bottomContainer}>
        <button
          onClick={() => navigate('/')}
          style={styles.backButton}
        >
          로그인 페이지로 돌아가기
        </button>
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
    textAlign: 'center',
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
  submitButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    fontSize: '14px',
    textDecoration: 'underline',
  },
  message: {
    marginTop: '10px',
    color: '#666',
    fontSize: '14px',
    textAlign: 'center',
  },
};

export default ForgotPage;
