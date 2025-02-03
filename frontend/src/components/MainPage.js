import React, { useEffect, useState } from 'react';
import NavigationLinks from './NavigationLinksAfterLogin';

const MainPage = () => {
  const [indices, setIndices] = useState([]);
  const [search, setSearch] = useState('');
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // indices 데이터 가져오기
    const fetchIndices = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/indices/');
        if (response.ok) {
          const data = await response.json();
          setIndices(data);
        } else {
          console.error('데이터를 가져오지 못했습니다.');
        }
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      }
    };

    // stocks 데이터 가져오기
    const fetchStocks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/stocks/');
        if (response.ok) {
          const data = await response.json();
          setStocks(data);
        } else {
          console.error('주식 데이터를 가져오지 못했습니다.');
        }
      } catch (error) {
        console.error('주식 API 요청 중 오류 발생:', error);
      }
    };

    fetchIndices();
    fetchStocks();
  }, []);

  return (
    <div>
      <NavigationLinks />
      <div style={styles.container}>
        <div style={styles.topBar}>
          <input
            type="text"
            placeholder="종목, 뉴스, 정보 등 다양한 정보를 입력하세요"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <button style={styles.askButton}>ASK</button>
        </div>
        
        <h2 style={styles.title}>퀀톡에게 무엇이든 물어보세요</h2>

        <div style={styles.layout}>
          {/* 왼쪽 사이드바 */}
          <div style={styles.sidebar}>
            <div style={styles.section}>
              <h3>이번달 주요 일정</h3>
              <ul>
                <li>12.24 미국 소비자 심리 지수 발표</li>
                <li>12.26 미국 신규 실업수당 청구건수</li>
                <li>12.29 미국 PCE(물가지수) 발표</li>
              </ul>
            </div>
            <div style={styles.section}>
              <h3>관심 종목</h3>
              <ul>
                {stocks.length > 0 ? (
                  stocks.map((stock, idx) => (
                      <div style={{ marginBottom: '10px' }}>
                        <span style={{ display: 'block' }}>{stock.name}</span>
                        <span style={{ display: 'block' }}>
                          <strong>가격:</strong> 
                          <span style={{ color: stock.price < 0 ? 'red' : 'green' }}>
                            ${stock.price}
                          </span>
                        </span>
                        <span style={{ display: 'block' }}>
                          <strong>변화:</strong> 
                          <span style={{ color: stock.change < 0 ? 'red' : 'green' }}>
                            {stock.change}
                          </span>
                        </span>
                        <span style={{ display: 'block' }}>
                          <strong>거래량:</strong> {stock.volume}
                        </span>
                      </div>
                  ))
                ) : (
                  <li>데이터를 불러올 수 없습니다.</li>
                )}
              </ul>
            </div>
          </div>

          {/* 메인 콘텐츠 */}
          <div style={styles.mainContent}>
            <div style={styles.indicesContainer}>
              {indices.map((index, idx) => (
                <div key={idx} style={styles.indexCard}>
                  <h3 style={styles.indexName}>{index.name}</h3>
                  <p style={styles.indexValue}>Value: {index.value.toFixed(2)}</p>
                  <p style={index.change.includes('-') ? styles.negativeChange : styles.positiveChange}>
                    Change: {index.change}
                  </p>
                </div>
              ))}
            </div>

            <div style={styles.newsContainer}>
              <h3>주요 뉴스</h3>
              <div style={styles.newsCard}>
                <p>코스닥, 외인 매도에 집중 0.4% 하락</p>
                <span>25.01.09 이데일리</span>
              </div>
              <div style={styles.newsCard}>
                <p>올 마지막 공모주 파인메딕스 129% 급등</p>
                <span>25.01.09 이데일리</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: '0 auto',  // 컨테이너를 중앙에 배치
    padding: '40px 60px',  // 컨테이너의 상하 및 좌우 패딩
    maxWidth: '1600px',   // 컨테이너의 최대 너비
    backgroundColor: '#fff',  // 배경색을 흰색으로 설정
  },
  title: {
    fontSize: '32px',  // 제목의 글꼴 크기
    fontWeight: 'bold',  // 제목의 글꼴 두께
    textAlign: 'center',  // 제목을 중앙 정렬
    marginBottom: '30px',  // 제목 아래의 여백
  },
  topBar: {
    display: 'flex',  // 플렉스 박스 레이아웃 사용
    justifyContent: 'center',  // 자식 요소를 중앙에 정렬
    marginBottom: '30px',  // 아래쪽 여백
    marginTop: '50px',  // 위쪽 여백 (검색창과 네비게이션 링크 사이의 여백)
  },
  searchInput: {
    padding: '14px',  // 입력창의 내부 여백
    width: '500px',  // 입력창의 너비
    border: '1px solid #ddd',  // 입력창의 테두리
    borderRadius: '6px',  // 입력창의 모서리를 둥글게
    fontSize: '18px',  // 입력창의 글꼴 크기
  },
  askButton: {
    padding: '14px 30px',  // 버튼의 내부 여백
    backgroundColor: '#000',  // 버튼의 배경색
    color: '#fff',  // 버튼의 글자색
    border: 'none',  // 버튼의 테두리 제거
    borderRadius: '6px',  // 버튼의 모서리를 둥글게
    fontSize: '18px',  // 버튼의 글꼴 크기
    cursor: 'pointer',  // 마우스 커서를 포인터로 변경
    marginLeft: '10px',  // 왼쪽 여백
  },
  layout: {
    display: 'flex',  // 플렉스 박스 레이아웃 사용
    justifyContent: 'space-between',  // 자식 요소 사이에 공간 확보
    gap: '25px',  // 섹션 간 여백
  },
  sidebar: {
    flex: '0 0 15%',  // 사이드바의 너비 비율
    padding: '15px',  // 사이드바의 내부 여백
    backgroundColor: '#f9f9f9',  // 사이드바의 배경색
    borderRadius: '10px',  // 사이드바의 모서리를 둥글게
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',  // 사이드바의 그림자 효과
  },
  section: {
    marginBottom: '25px',  // 섹션 아래의 여백
    padding: '20px',  // 섹션의 내부 여백
    backgroundColor: '#fff',  // 섹션의 배경색
    borderRadius: '10px',  // 섹션의 모서리를 둥글게
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // 섹션의 그림자 효과
  },
  indicesContainer: {
    display: 'flex',  // 플렉스 박스 레이아웃 사용
    justifyContent: 'center',  // 자식 요소를 중앙에 정렬
    flexWrap: 'wrap',  // 자식 요소를 여러 줄로 배치
    gap: '30px',  // 자식 요소 간의 여백
  },
  indexCard: {
    padding: '20px',  // 카드의 내부 여백
    border: '1px solid #ddd',  // 카드의 테두리
    borderRadius: '10px',  // 카드의 모서리를 둥글게
    textAlign: 'center',  // 카드의 텍스트를 중앙 정렬
    width: '300px',  // 카드의 너비
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // 카드의 그림자 효과
  },
  indexName: {
    fontSize: '20px',  // 지수 이름의 글꼴 크기
    fontWeight: 'bold',  // 지수 이름의 글꼴 두께
  },
  indexValue: {
    fontSize: '18px',  // 지수 값의 글꼴 크기
    margin: '12px 0',  // 지수 값의 위아래 여백
  },
  positiveChange: {
    color: 'green',  // 긍정적인 변화의 글자색
    fontSize: '16px',  // 변화의 글꼴 크기
  },
  negativeChange: {
    color: 'red',  // 부정적인 변화의 글자색
    fontSize: '16px',  // 변화의 글꼴 크기
  },
  newsContainer: {
    marginTop: '50px',  // 뉴스 컨테이너의 위쪽 여백
  },
  newsCard: {
    padding: '5px',  // 뉴스 카드의 내부 여백
    borderBottom: '1px solid #ddd',  // 뉴스 카드의 하단 테두리
  },
  mainContent: {
    flex: '0 0 80%',  // 메인 콘텐츠의 너비 비율
  },
};

export default MainPage;