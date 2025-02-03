import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationLinksBeforeLogin = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav style={styles.container}>
      <div style={styles.leftSection}>
        <span onClick={() => handleNavigation('/landing')} style={styles.link}>
          랜딩페이지
        </span>
      </div>
      <div style={styles.rightSection}>
        <span onClick={() => handleNavigation('/login')} style={styles.loginLink}>
          로그인
        </span>
      </div>
    </nav>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '10px 20px',
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  leftSection: {
    display: 'flex',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    color: '#000',
    fontSize: '14px',
    cursor: 'pointer',
    margin: '15px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  loginLink: {
    color: '#000',
    fontSize: '14px',
    cursor: 'pointer',
    marginLeft: '20px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

export default NavigationLinksBeforeLogin;
