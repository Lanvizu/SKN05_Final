import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../AuthContext';
import kakaoIcon from '../assets/kakao_icon.png';

const GoogleLoginButton = () => {
  // const navigate = useNavigate();
  // const { login } = useAuth();

  const handleGoogleLogin = async () => {
    const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=email profile`;

    try {
      window.location.href = GOOGLE_AUTH_URL;
    } catch (error) {
      console.error('구글 로그인 중 오류 발생:', error);
      alert('구글 로그인에 실패했습니다.');
    }
  };

  return (
    <button 
      onClick={handleGoogleLogin}
      style={styles.googleButton}
    >
      <div style={styles.buttonContent}>
        <img 
          src={kakaoIcon} 
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
