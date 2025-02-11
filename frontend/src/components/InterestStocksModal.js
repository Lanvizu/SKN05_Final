import React, { useState, useEffect } from 'react';

const InterestStocksModal = ({ isOpen, onClose, currentStocks }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [stocks, setStocks] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState(currentStocks || []);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      const fetchTickers = async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/stocks/sp500/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          if (response.ok) {
            const data = await response.json();
            setStocks(data);
          } else {
            console.error('티커 데이터를 가져오지 못했습니다.');
          }
        } catch (error) {
          console.error('티커 데이터 요청 중 오류 발생:', error);
        }
      };
      fetchTickers();
    }
  }, [isOpen, BASE_URL]);

  const handleStockToggle = (ticker) => {
    setSelectedStocks(prev =>
      prev.includes(ticker)
        ? prev.filter(s => s !== ticker)
        : [...prev, ticker]
    );
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/accounts/interest-tickers/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ interest_tickers: selectedStocks }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('관심 종목 업데이트 성공:', data);
        onClose();
      } else {
        console.error('관심 종목 업데이트 실패. 상태 코드:', response.status);
      }
    } catch (error) {
      console.error('관심 종목 업데이트 중 에러 발생:', error);
    }
  };

  const filteredStocks = stocks.filter(stock =>
    stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>관심종목 설정</h2>
        <input
          type="text"
          placeholder="종목 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <ul style={styles.stockList}>
          {filteredStocks.map(stock => (
            <li key={stock.ticker} style={styles.stockItem}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedStocks.includes(stock.ticker)}
                  onChange={() => handleStockToggle(stock.ticker)}
                />
                {stock.ticker} - {stock.name} ({stock.sector})
              </label>
            </li>
          ))}
        </ul>
        <div style={styles.buttonContainer}>
          <button onClick={handleSave} style={styles.saveButton}>저장</button>
          <button onClick={onClose} style={styles.cancelButton}>취소</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '80%',
    overflowY: 'auto',
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  stockList: {
    listStyle: 'none',
    padding: 0,
  },
  stockItem: {
    padding: '5px 0',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default InterestStocksModal;
