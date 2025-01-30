import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationLinks from './NavigationLinks';

const MainPage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div>
      <NavigationLinks />
      <div style={styles.content}>
        <h2 style={styles.title}>메인 페이지</h2>
        <p style={styles.sub_title}>
          로그인하시면 더 많은 기능을 이용하실 수 있습니다.
        </p>
        <div style={styles.form}>
          <input
            type="text"
            placeholder="채팅 시작하기..."
            style={styles.input}
            onClick={handleLoginRedirect}
            readOnly
          />
          <button onClick={handleLoginRedirect} style={styles.button}>
            채팅 시작
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  content: {
    marginTop: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 60px)',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  sub_title: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '30px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '300px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default MainPage;
