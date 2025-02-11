import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationLinks from './NavigationLinks';
import InterestStocksModal from './InterestStocksModal';

const MyPage = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
          alert('마이페이지 데이터를 불러오지 못했습니다.');
        }
      } catch (error) {
        console.error('마이페이지 데이터 요청 중 오류 발생:', error);
        alert('오류가 발생했습니다.');
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleEditInterestStocks = () => {
    setIsModalOpen(true);
  };

  if (!userData) {
    return <div style={styles.loading}>로딩 중...</div>;
  }

  return (
    <div>
      <NavigationLinks />
      <div style={styles.container}>
        <h2 style={styles.title}>마이페이지</h2>
        <div style={styles.infoContainer}>
          <p style={styles.infoItem}>
            <span style={styles.label}>이메일:</span> {userData.email}
          </p>
          <p style={styles.infoItem}>
            <span style={styles.label}>가입일:</span> {new Date(userData.date_joined).toLocaleDateString()}
          </p>
          <p style={styles.infoItem}>
            <span style={styles.label}>마지막 로그인:</span> {new Date(userData.last_login).toLocaleString()}
          </p>
          <button onClick={handleEditProfile} style={styles.editButton}>
            개인정보 수정
          </button>
          <h3 style={styles.subtitle}>관심종목</h3>
          <ul style={styles.stockList}>
            {userData.interest_tickers && userData.interest_tickers.map((ticker, index) => (
              <li key={index} style={styles.stockItem}>{ticker}</li>
            ))}
          </ul>
          <button onClick={handleEditInterestStocks} style={styles.editButton}>
            관심종목 수정
          </button>
        </div>
      </div>
      <InterestStocksModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentStocks={userData.interest_tickers || []}
      />
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
  infoContainer: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  infoItem: {
    marginBottom: '10px',
    fontSize: '16px',
  },
  label: {
    fontWeight: 'bold',
    marginRight: '10px',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px',
  },
  editButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  subtitle: {
    fontSize: '18px',
    marginTop: '20px',
    marginBottom: '10px',
  },
  stockList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  stockItem: {
    padding: '5px 0',
  },
};

export default MyPage;
