import React, { useState, useEffect } from 'react';
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

  const fetchUserData = async () => {
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
  };

  useEffect(() => {
    fetchUserData();
  }, [BASE_URL]);

  const fetchStocks = async () => {
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
  };

  useEffect(() => {
    fetchStocks();
  }, [BASE_URL]);

  const refreshData = () => {
    fetchUserData();
    fetchStocks();
  };

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
        <div style={styles.infoContainer}>
          <h2 style={styles.title}>관심 주식</h2>
          <span onClick={handleEditInterestStocks} style={styles.editText}>
            편집
          </span>
          <div style={styles.container2}>
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
        <span onClick={handleEditProfile} style={styles.editText}>
          개인정보 수정
        </span>
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
    minHeight: '500px',
  },
  container2: {
    marginTop: '10px',
    height: '400px',  
    overflowY: 'auto',
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
    marginLeft: '90%',
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
