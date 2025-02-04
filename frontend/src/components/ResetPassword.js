import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/api/accounts/password-reset-confirm/${uid}/${token}/`, {
        new_password1: password,
        new_password2: confirmPassword
      });
      setMessage(response.data.detail);
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      setMessage(error.response?.data?.detail || '오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>새 비밀번호 설정</h2>
      <p style={styles.sub_title}>
        새로운 비밀번호를 입력해주세요.
      </p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="새 비밀번호"
          required
          style={styles.input}
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="새 비밀번호 확인"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.submitButton}>
          비밀번호 재설정
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
}

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

export default ResetPassword;
