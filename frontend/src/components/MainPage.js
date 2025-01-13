// MainPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const MainPage = () => {
  const navigate = useNavigate();

  const handleMyPageClick = () => {
    navigate('/mypage');
  };

  return (
    <div>
      <LogoutButton />
      <h2>메인 페이지</h2>
      <p>환영합니다! 로그인에 성공하셨습니다.</p>
      <button onClick={handleMyPageClick}>마이페이지</button>
    </div>
  );
};

export default MainPage;
