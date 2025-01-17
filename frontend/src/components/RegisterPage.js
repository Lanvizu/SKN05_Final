import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:8000/api/accounts/register/', {
        email,
        password,
        password2,
      });
      alert('회원가입 성공');
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);

      if (error.response && error.response.data) {
        const errorData = error.response.data;
        let errorMessage = '';
        if (errorData.email && errorData.email.length > 0) {
          errorMessage = errorData.email[0];
        }
        if (errorMessage) {
          alert(errorMessage);
        } else {
          alert('회원가입 실패: 알 수 없는 오류가 발생했습니다.');
        }
      } else {
        alert('회원가입 실패: 서버 오류가 발생했습니다.');
      }
    } 
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>회원가입</h2>
      <p style={styles.sub_title}>
        서비스를 이용하기 위해 회원가입을 해주세요.
      </p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={styles.input}
        />
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Confirm Password"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.submitButton}>
          가입하기
        </button>
      </form>
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
};

export default RegisterPage;
