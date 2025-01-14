import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 초기화

  const handleRegister = async () => {
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
      alert('회원가입 성공!');
      console.log(response.data);
      navigate('/'); // 회원가입 성공 후 로그인 페이지로 이동
    } catch (err) {
      console.error('회원가입 중 오류 발생:', err);
      alert('회원가입 실패!');
    }
  };

  return (
    <div style={styles.container}>
      <h1>회원가입</h1>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
        style={styles.input}
      />
      <button style={styles.registerButton} onClick={handleRegister}>
        가입하기
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
  input: {
    marginBottom: '10px',
    padding: '10px',
    width: '300px',
    fontSize: '16px',
  },
  registerButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default RegisterPage;
