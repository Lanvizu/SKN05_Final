import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationLinks from './NavigationLinks';
import InterestStocksModal from './InterestStocksModal';
import axios from 'axios';

const MyPage = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [userData, setUserData] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [isLoadingStocks, setIsLoadingStocks] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/accounts/mypage/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
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
  }, [BASE_URL]);
    
  const fetchStocks = useCallback(async () => {
    setIsLoadingStocks(true);
    try {
        const response = await axios.get(`${BASE_URL}/api/stocks/`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setStocks(response.data);
      } else {
        console.error('주식 데이터를 가져오지 못했습니다.');
      }
    } catch (error) {
      console.error('주식 API 요청 중 오류 발생:', error);
    } finally {
      setIsLoadingStocks(false);
    }
  }, [BASE_URL]);
    
  const refreshData = useCallback(() => {
    fetchUserData();
    fetchStocks();
  }, [fetchUserData, fetchStocks]);
  
  useEffect(() => {
    refreshData();
  }, [refreshData]);
    
  const handleEditInterestStocks = () => {
    setIsModalOpen(true);
  };
    
  const handleDeleteAccount = async () => {
    if (window.confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        const response = await fetch(`${BASE_URL}/api/accounts/mypage/delete/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        if (response.ok) {
          alert('회원 탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.');
          window.location.href = '/';
        } else {
          alert('회원 탈퇴에 실패했습니다.');
        }
      } catch (error) {
        console.error('회원 탈퇴 요청 중 오류 발생:', error);
        alert('오류가 발생했습니다.');
      }
    }
  };
  
  const handleChangePassword = () => {
    navigate('/mypage/change-password');
  };
  
  if (!userData) {
    return <div style={styles.loading}>로딩 중...</div>;
  }
    
  return (
    <div>
      <NavigationLinks />
      <div style={styles.container}>
        <div style={styles.infoContainer}>
          <h2 style={styles.title}>관심 주식</h2>
          <span onClick={handleEditInterestStocks} style={styles.editText}>
          편집
          </span>
          <div style={styles.stocksContainer}>
            {isLoadingStocks ? (
            <p>로딩 중...</p>
            ) : stocks.length > 0 ? (
            stocks.map((stock, index) => (
            <div key={index} style={styles.stockCard}>
              <div style={styles.stockDetails}>
                <div style={styles.row}>
                  <h4 style={styles.stockName}>{stock.name}</h4>
                  <span style={styles.stockPrice}>${stock.price}</span>
                </div>
                <div style={styles.row}>
                  <span style={styles.stockVolume}>거래량: {stock.volume}</span>
                  <span
                  style={{
                  color: stock.change.includes('-') ? 'blue' : 'red',
                  marginLeft: '10px',
                  fontSize: '14px',
                  }}
                  >
                  {stock.change}
                  </span>
                </div>
              </div>
            </div>
            ))
            ) : (
            <p>관심 주식을 추가해주세요!</p>
            )}
          </div>
        </div>
        <div style={styles.container2}>
          <span onClick={handleChangePassword} style={styles.editText}>
            비밀번호 수정
          </span>
          <span onClick={handleDeleteAccount} style={styles.editText}>
            회원 탈퇴
          </span>
        </div>
      </div>
    <InterestStocksModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      currentStocks={userData.interest_tickers || []}
      onUpdate={refreshData}
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
    minHeight: 'calc(100vh - 60px)',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '24px',
    margin: '18px',
    textAlign: 'center',
  },
  infoContainer: {
    width: '100%',
    maxWidth: '400px',
    marginTop: '100px',
    padding: '20px',
    paddingTop: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    minHeight: '400px',
  },
  stocksContainer: {
    marginTop: '10px',
  },
  container2: {
    width: '100%',
    maxWidth: '400px',
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  editText: {
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  subtitle: {
    fontSize: '18px',
  },
  stockList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  stockItem: {
    padding: '5px 0',
  },
  stockCard: {
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
  },
  stockDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
    justifyContent: 'space-between',
  },
  stockName: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  stockPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginLeft: '5px',
  },
  stockVolume: {
    fontSize: '14px',
  },
};

export default MyPage;
