import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import LogoutButton from './LogoutButton';
import NavigationLinks from './NavigationLinks';

const MainPage = () => {
  return (
    <div>
      <NavigationLinks />
      <div style={styles.content}>
        <h2 style={styles.title}>메인 페이지</h2>
        <p style={styles.sub_title}>
          환영합니다! 로그인에 성공하셨습니다.
        </p>
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
    marginBottom: '30px',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '300px',
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
    marginBottom: '10px',
  },
  bottomContainer: {
    marginTop: '30px',
  },
  logoutButton: {
    background: 'none',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    fontSize: '14px',
    textDecoration: 'underline',
  },
};

export default MainPage;
