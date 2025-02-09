import React from 'react';
import googleIcon from '../assets/google_icon.png';
import axios from 'axios';

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/accounts/google/login-request/`
      );
      window.location.href = response.data.authorization_url;
    } catch (error) {
      console.error('구글 로그인 초기화 실패:', error);
    }
  };

  return (
    <button 
      onClick={handleGoogleLogin}
      style={styles.googleButton}
    >
      <div style={styles.buttonContent}>
        <img 
          src={googleIcon} 
          alt="Google" 
          style={styles.googleIcon} 
        />
        <span style={styles.buttonText}>Continue with Google</span>
      </div>
    </button>
  );
};

const styles = {
    googleButton: {
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
    googleIcon: {
        width: '18px',
        height: '18px',
        position: 'absolute',
    },
    buttonText: {
        color: '#3c4043',
        fontSize: '14px',
        fontWeight: '500',
        flex: 1,
        textAlign: 'center'
    }
};

export default GoogleLoginButton;
