import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationLinks from './NavigationLinks';

const ProfileEditPage = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [userData, setUserData] = useState({
    email: '',
    first_name: '',
    last_name: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // 사용자 데이터 불러오기
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/accounts/mypage/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          alert('사용자 데이터를 불러오지 못했습니다.');
        }
      } catch (error) {
        console.error('사용자 데이터 요청 중 오류 발생:', error);
        alert('오류가 발생했습니다.');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/accounts/update-profile/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('프로필이 성공적으로 업데이트되었습니다.');
        navigate('/mypage');
      } else {
        alert('프로필 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('프로필 업데이트 중 오류 발생:', error);
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <NavigationLinks />
      <div style={styles.container}>
        <h2 style={styles.title}>개인정보 수정</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>이메일:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              style={styles.input}
              disabled
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="first_name" style={styles.label}>이름:</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="last_name" style={styles.label}>성:</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={userData.last_name}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.submitButton}>
            변경사항 저장
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 60px)',
    backgroundColor: '#fff',
    marginTop: '60px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  submitButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default ProfileEditPage;
