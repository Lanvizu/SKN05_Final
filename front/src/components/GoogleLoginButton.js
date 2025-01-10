import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleLoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.post('http://localhost:8000/accounts/google/login-request/', {
          access_token: response.access_token,
        });
        console.log('JWT Token:', res.data);
        alert('Logged in successfully!');
      } catch (err) {
        console.error('Error during login:', err);
      }
    },
    onError: (error) => console.error('Login Failed:', error),
  });

  return (
    <button onClick={() => login()}>
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
