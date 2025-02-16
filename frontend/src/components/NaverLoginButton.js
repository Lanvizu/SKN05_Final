import React from 'react';
import naverIcon from '../assets/naver_icon.png';
import axios from 'axios';

const NaverLoginButton = () => {
  const handleNaverLogin = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/accounts/naver/login-request/`
      );
      window.location.href = response.data.authorization_url;
    } catch (error) {
      console.error('네이버 로그인 초기화 실패:', error);
    }
  };

  return (
    <button 
      onClick={handleNaverLogin}
      style={styles.naverButton}
    >
      <div style={styles.buttonContent}>
        <img 
          src={naverIcon} 
          alt="Naver" 
          style={styles.naverIcon} 
        />
        <span style={styles.buttonText}>Continue with Naver</span>
      </div>
    </button>
  );
};

const styles = {
  naverButton: {
    width: '100%',
    padding: '10px',
    border: '1px solid #dadce0',
    borderRadius: '4px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    marginTop: '10px'
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  naverIcon: {
    width: '18px',
    height: '18px',
    position: 'absolute'
  },
  buttonText: {
    color: '#3c4043',
    fontSize: '14px',
    fontWeight: '500',
    flex: 1,
    textAlign: 'center'
  }
};

export default NaverLoginButton;
