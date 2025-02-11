import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const LogoutButton = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/accounts/logout/`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        logout();
        navigate('/');
        alert('로그아웃 성공');
      } else {
        console.error('로그아웃 실패:', response.statusText);
        alert('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
      alert('로그아웃 실패!');
    }
  };
  return <span onClick={handleLogout} style={styles.link}>Logout</span>;
};
const styles = {
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
}

export default LogoutButton;
