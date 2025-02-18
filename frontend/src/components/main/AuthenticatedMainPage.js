import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import NavigationLinks from '../NavigationLinks';
import axios from 'axios';
import send_arrow from '../../assets/asset/chatIcons/send_arrow.png';

const initialIndices = [
  { 
    id: "^VIX", 
    name: "VIX", 
    description: "VIX는 30일간 예상 S&P500 변동성을 나타내며, 시장의 불안감(공포 지수)으로 자주 불립니다." 
  },
  { 
    id: "GC=F", 
    name: "금 선물", 
    description: "금 선물은 미래 금 가격에 대한 변동성을 추적하는 파생상품입니다." 
  },
  { 
    id: "^DJI", 
    name: "다우존스", 
    description: "다우존스 산업평균지수는 미국의 30대 대형 우량기업 주가를 기반으로 계산되는 가격 가중치 지수입니다." 
  },
  { 
    id: "^IXIC", 
    name: "나스닥", 
    description: "나스닥 지수는 주로 기술주 중심의 미국 증시 전반의 성과를 측정합니다." 
  },
  { 
    id: "^GSPC", 
    name: "S&P 500", 
    description: "S&P 500은 미국 상장 대기업 500개의 시가총액을 기반으로 한 주가 지수입니다." 
  },
  { 
    id: "^RUT", 
    name: "러셀 2000", 
    description: "러셀 2000은 미국 소형주 2000개의 성과를 측정하는 지수로, 경제 전반의 경기 흐름을 반영합니다." 
  }
];

const AuthenticatedMainPage = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const [indices, setIndices] = useState(initialIndices);
  const [stocks, setStocks] = useState([]);
  const [news, setNews] = useState([]);
  const [isLoadingIndices, setIsLoadingIndices] = useState(true);
  const [isLoadingStocks, setIsLoadingStocks] = useState(true);
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  const fetchIndices = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/stocks/indices/`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        const updatedIndices = initialIndices.map(index => {
          const fetchedIndex = response.data.find(item => item.name === index.id);
          return {
            ...index,
            value: fetchedIndex ? fetchedIndex.value : null,
            change: fetchedIndex ? fetchedIndex.change : null
          };
        });
        setIndices(updatedIndices);
      } else {
        console.error('인덱스 데이터를 가져오지 못했습니다.');
      }
    } catch (error) {
      console.error('인덱스 API 요청 중 오류 발생:', error);
    } finally {
      setIsLoadingIndices(false);
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

const fetchNews = useCallback(async () => {
  setIsLoadingNews(true);
  try {
    const response = await axios.get(`${BASE_URL}/api/news/`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      setNews(response.data);
    } else {
      console.error("뉴스 데이터를 가져오지 못했습니다.");
    }
  } catch (error) {
    console.error("뉴스 API 요청 중 오류 발생:", error);
  } finally {
    setIsLoadingNews(false);
  }
  }, [BASE_URL]);
  
  useEffect(() => {
    fetchIndices();
    fetchStocks();
    fetchNews();
  }, [fetchIndices, fetchStocks, fetchNews]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      try {
        const roomResponse = await axios.post(
          `${BASE_URL}/api/chat/room/create/`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        if (roomResponse.status === 201) {
          const newRoom = roomResponse.data;
          await axios.post(
            `${BASE_URL}/api/chat/room/${newRoom.id}/`,
            { input: inputValue },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }
          );
          navigate('/chat', { state: { newRoomId: newRoom.id } });
        } else {
          alert('새로운 채팅방을 생성하는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('Error creating new chat room or sending message:', error);
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div>
      <NavigationLinks />
      <div style={styles.container}>
        <div style={styles.content}>
          <h2 style={styles.title}>퀀톡에게 무엇이든 물어보세요</h2>
          <p style={styles.sub_title}>
            환영합니다! 채팅을 시작하실 수 있습니다.
          </p>
          <form onSubmit={handleSubmit} style={styles.inputContainer}>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) =>
                  (e.target.placeholder =
                    "종목, 주가, 뉴스, 지표 등 다양한 정보를 물어보세요!")
                }
                placeholder="종목, 주가, 뉴스, 지표 등 다양한 정보를 물어보세요!"
                style={styles.input}
              />
            </div>
            <img
              src={send_arrow}
              alt="Send Arrow"
              onClick={handleSubmit}
              style={styles.sendButton}
            />
          </form>
        </div>

        <div style={styles.layout}>
          <div style={styles.sidebar}>
            <div style={styles.section}>
              <h3>이번 달 주요 일정</h3>
              <div style={styles.scheduleList}>
                <div style={styles.schedule}>02.17</div>
                <div style={styles.schedule}>미국 증시 휴장 (워싱턴 기념일)</div>
                <div style={styles.schedule}>02.20</div>
                <div style={styles.schedule}>미국 FOMC 의사록 공개</div>
                <div style={styles.schedule}>02.21</div>
                <div style={styles.schedule}>2월 S&P 글로벌 PMI 발표</div>
                <div style={styles.schedule}>02.27</div>
                <div style={styles.schedule}>엔비디아 실적 발표</div>
              </div>
            </div>
            <div style={styles.section}>
              <div style={styles.interestContainer}>
                <h3 style={styles.interestTitle}>관심 종목</h3>
                <span 
                    onClick={() => navigate('/mypage')} 
                    style={styles.myPageButton}
                >
                  편집
                </span>
              </div>
              {isLoadingStocks ? (
                <p>로딩 중...</p>
              ) : stocks.length > 0 ? (
                stocks.map((stock, idx) => (
                  <div key={idx} style={styles.stockCard}>
                    <div style={styles.stockDetails}>
                      <div style={styles.row}>
                        <h4 style={styles.stockName}>{stock.name}</h4>
                        <span
                          style={{
                            fontWeight: 'bold',
                            fontSize: '18px',
                            marginLeft: '5px',
                          }}
                        >
                          ${stock.price}
                        </span>
                      </div>
                      <div style={styles.row}>
                        <div style={styles.volume}>
                          <span style={styles.stockVolume}>거래량</span>
                          <span style={{ ...styles.stockVolume, marginLeft: '5px' }}>
                            {stock.volume}
                          </span>
                        </div>
                        <span
                          style={{
                            color: stock.change.includes('-') ? 'blue' : 'red',
                            fontSize: '13px',
                            marginLeft: '5px',
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

          <div style={styles.mainContent}>
            <div style={styles.indicesContainer}>
              {indices.map((index, idx) => (
                <div key={idx} style={styles.indexCard}>
                  <span 
                    data-tooltip-id={`tooltip-${index.name}`}
                    data-tooltip-content={index.description}
                    style={styles.tooltip}
                  >
                    ?
                  </span>
                  <Tooltip id={`tooltip-${index.name}`} />
                  <h3 style={styles.indexName}>{index.name}</h3>
                  {isLoadingIndices ? (
                    <>
                      <p style={styles.indexValue}><span style={styles.loadingText}>로딩 중...</span></p>
                      <p style={styles.loadingText}>로딩 중...</p>
                    </>
                  ) : (
                    <>
                      <p style={styles.indexValue}>
                        {index.value !== null ? index.value.toFixed(2) : 'N/A'}
                      </p>
                      <p
                        style={
                          index.change && index.change.includes('-')
                            ? styles.negativeChange
                            : styles.positiveChange
                        }
                      >
                        {index.change || 'N/A'}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div style={styles.newsContainer}> 
              <div style={styles.headerContainer}> 
                <h3 style={styles.newsTitle}>주요 뉴스</h3>
                <button 
                  style={styles.refreshButton} 
                  onMouseEnter={(e) => e.target.style.backgroundColor = styles.refreshButtonHover.backgroundColor} 
                  onMouseLeave={(e) => e.target.style.backgroundColor = styles.refreshButton.backgroundColor} 
                  onClick={(e) => fetchNews(e)}
                >
                  ↻
                </button>
              </div> 
              {isLoadingNews ? ( <p>뉴스 로딩중...</p> ) : news.length > 0 ? ( news.map((newsItem, index) => ( 
                <div key={index} style={styles.newsCard}> 
                  <p>{newsItem.title}</p> 
                  <span style={{fontSize: '14px',}}>{newsItem.published}</span> 
                </div> )) ) : ( 
                  <p>뉴스 데이터가 없습니다.</p> )} 
              </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: '0 auto',
    padding: '40px 60px',
    maxWidth: '1600px',
    backgroundColor: '#fff',
  },
  content: {
    marginTop: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
  },
  sub_title: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '30px',
    textAlign: 'center',
  },
  inputContainer: {
    padding: '5px',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #ddd',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '15px',
    margin: '10px',
    width: '100%',
    maxWidth: '600px',
  },
  scheduleList: {
    marginTop: '10px'
  },
  schedule: {
    marginTop: '10px'
  },
  interestContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  myPageButton:{
    marginLeft: '10px',
    fontSize: '12px',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  inputWrapper: {
    flex: 1,
    marginRight: '10px',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: 'none',
    fontSize: '14px',
    outline: 'none',
    textAlign: 'center',
  },
  sendButton: {
    width: '25px',
    height: '25px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  layout: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '25px',
    marginTop: '50px',
  },
  sidebar: {
    flex: '0 0 20%',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
  },
  section: {
    marginBottom: '25px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  indicesContainer: {
    display: 'flex',
    // justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '30px',
    maxWidth: '900px',
  },
  indexCard: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    textAlign: 'center',
    width: '200px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  indexName: {
    flex: '1',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  indexValue: {
    fontSize: '18px',
    margin: '12px 0',
  },
  positiveChange: {
    color: 'red',
    fontSize: '16px',
  },
  negativeChange: {
    color: 'blue',
    fontSize: '16px',
  },
  newsTitle:{
    marginRight: "10px",
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  refreshButton: {
    padding: "8px",
    cursor: "pointer",
    border: "none",
    borderRadius: "50%",
    backgroundColor: "white",
    color: "#333",
    transition: "all 0.3s ease",
  },
  refreshButtonHover: {
    backgroundColor: "#e0e0e0",
    transform: "scale(1.1)",
  },
  
  newsContainer: {
    marginTop: '50px',
  },
  newsCard: {
    padding: '5px',
    borderBottom: '1px solid #ddd',
  },
  mainContent: {
    flex: '0 0 68%',
  },
  loadingText: {
    color: '#888',
    fontStyle: 'italic'
  },
  interestTitle: {
  },
  stockCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  stockDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stockName: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  volume: {
    display: 'flex',
    alignItems: 'center',
  },
  stockVolume: {
    fontSize: '13px',
    color: 'gray',
  },
  indicesRow: {
    display: 'flex',
    alignItems: 'center',
  },
  tooltip: {
    marginLeft: '90%',
    color: '#555',
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: '50%',
    padding: '0 5px',
    fontSize: '12px',
  },
};

export default AuthenticatedMainPage;
