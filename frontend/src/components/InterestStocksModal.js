import React, { useState, useEffect } from 'react';

const InterestStocksModal = ({ isOpen, onClose, currentStocks, onUpdate }) => {
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
            headers: { 'Content-Type': 'application/json' },
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

  useEffect(() => {
    if (isOpen) {
      const storedStocks = localStorage.getItem('interestStocks');
      if (storedStocks) {
        setSelectedStocks(JSON.parse(storedStocks));
      } else if (currentStocks) {
        setSelectedStocks(currentStocks);
      }
    }
  }, [isOpen, currentStocks]);

  const handleStockToggle = (ticker) => {
    setSelectedStocks((prev) =>
      prev.includes(ticker)
        ? prev.filter((s) => s !== ticker)
        : prev.length < 10
        ? [...prev, ticker]
        : prev
    );
  };

  const handleRemoveTicker = (ticker) => {
    setSelectedStocks((prev) => prev.filter((s) => s !== ticker));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/accounts/interest-tickers/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ interest_tickers: selectedStocks }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('interestStocks', JSON.stringify(selectedStocks));
        console.log('관심 종목 업데이트 성공:', data);
        onClose();
        if (onUpdate) {
          onUpdate();
        }
      } else {
        console.error('관심 종목 업데이트 실패. 상태 코드:', response.status);
      }
    } catch (error) {
      console.error('관심 종목 업데이트 중 에러 발생:', error);
    }
  };

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={styles.title}>관심종목 설정</h2>
        <p style={styles.maxStocksInfo}>최대 10개까지 등록 가능합니다.</p>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="종목 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <div style={styles.buttonContainer}>
            <button onClick={handleSave} style={styles.saveButton}>
              저장
            </button>
            <button onClick={onClose} style={styles.cancelButton}>
              취소
            </button>
          </div>
        </div>
        {selectedStocks.length > 0 && (
          <div style={styles.selectedStocksContainer}>
            {selectedStocks.map((ticker) => (
              <div key={ticker} style={styles.selectedStockItem}>
                <span>{ticker}</span>
                <button style={styles.removeButton} onClick={() => handleRemoveTicker(ticker)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
        <div style={styles.stockListContainer}>
          <ul style={styles.stockList}>
            {filteredStocks.map((stock) => (
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
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '600px',
    height: '500px',
  },
  title: {
    marginTop: 0,
    marginBottom: '10px',
  },
  maxStocksInfo: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px',
  },
  searchContainer: {
    marginTop: '10px',
    marginBottom: '10px',
    display: 'flex',
  },
  searchInput: {
    width: '95%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginRight: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
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
  selectedStocksContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '10px',
  },
  selectedStockItem: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: '4px',
    padding: '5px 5px 5px 10px',
    marginRight: '5px',
    marginBottom: '5px',
  },
  removeButton: {
    background: 'transparent',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    color: '#888',
  },
  stockListContainer: {
    flex: 1,
    overflowY: 'auto',
    borderTop: '1px solid #eee',
    paddingTop: '10px',
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

export default InterestStocksModal;
