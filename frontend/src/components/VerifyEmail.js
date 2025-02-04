import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function VerifyEmail() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [status, setStatus] = useState('진행 중');
  const { key } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/api/accounts/registration/verify-email/`, { key });
        console.log(response.data);
        setStatus('완료');
        setTimeout(() => navigate('/'), 3000);
      } catch (error) {
        setStatus('실패');
        console.error('Error details:', error.response?.data || error.message);
      }
    };

    verifyEmail();
  }, [key, navigate]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>이메일 인증</h2>
      {status === '진행 중' && (
        <p style={styles.sub_title}>
          이메일 인증을 진행 중입니다. 잠시만 기다려주세요.
        </p>
      )}
      {status === '완료' && (
        <p style={styles.message}>이메일이 성공적으로 인증되었습니다!</p>
      )}
      {status === '실패' && (
        <p style={styles.message}>이메일 인증에 실패했습니다. 다시 시도해주세요.</p>
      )}
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

export default VerifyEmail;
