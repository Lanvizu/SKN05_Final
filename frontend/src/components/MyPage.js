import React, { useState, useEffect } from 'react';

const MyPage = () => {
  const [userData, setUserData] = useState(null); // 사용자 데이터 상태

  // 마이페이지 데이터 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/accounts/mypage/', {
          method: 'GET', // POST 요청 사용
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // 쿠키를 포함하여 요청
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data); // 사용자 데이터를 상태에 저장
        } else {
          alert('마이페이지 데이터를 불러오지 못했습니다.');
        }
      } catch (error) {
        console.error('마이페이지 데이터 요청 중 오류 발생:', error);
        alert('오류가 발생했습니다.');
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>로딩 중...</div>; // 데이터 로딩 중 표시
  }

  return (
    <div>
      <h2>마이페이지</h2>
      <p>이메일: {userData.email}</p>
      <p>가입일: {userData.date_joined}</p>
      <p>마지막 로그인: {userData.last_login}</p>
    </div>
  );
};

export default MyPage;
