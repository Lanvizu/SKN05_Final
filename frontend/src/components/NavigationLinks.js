import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuth } from '../AuthContext';

const NavigationLinks = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAuthenticatedNavigation = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  return (
    <nav style={styles.container}>
      {isAuthenticated && (
        <div style={styles.leftSection}>
          <span onClick={() => handleNavigation('/')} style={styles.link}>
            Main
          </span>
        </div>
      )}
      <div style={styles.rightSection}>
        {isAuthenticated ? (
          <>
            <span onClick={() => handleAuthenticatedNavigation('/chat')} style={styles.link}>
              Chat
            </span>
            <span onClick={() => handleNavigation('/mypage')} style={styles.link}>
              MyPage
            </span>
            <LogoutButton onClick={handleLogout} />
          </>
        ) : (
          <>
            <span onClick={handleLogin} style={styles.link}>
              Login
            </span>
            <span onClick={handleRegister} style={styles.link}>
              SignUp
            </span>
          </>
        )}
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
    padding: '15px 20px',
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    zIndex: '1000',
  },
  leftSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  centerSection: {
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
  },
  rightSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  link: {
    color: '#000',
    fontSize: '14px',
    cursor: 'pointer',
    margin: '0 15px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

export default NavigationLinks;