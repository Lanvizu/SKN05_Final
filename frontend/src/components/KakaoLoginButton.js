import React from 'react';
import kakaoIcon from '../assets/kakao_icon.png';
import axios from 'axios';

const KakaoLoginButton = () => {
  const handleKakaoLogin = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/accounts/kakao/login-request/`
      );
      window.location.href = response.data.authorization_url;
    } catch (error) {
      console.error('네이버 로그인 초기화 실패:', error);
    }
  };

  return (
    <button 
      onClick={handleKakaoLogin}
      style={styles.kakaoButton}
    >
      <div style={styles.buttonContent}>
        <img 
          src={kakaoIcon} 
          alt="Kakao" 
          style={styles.kakaoIcon} 
        />
        <span style={styles.buttonText}>Continue with Kakao</span>
      </div>
    </button>
  );
};

const styles = {
  kakaoButton: {
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
  kakaoIcon: {
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

export default KakaoLoginButton;
