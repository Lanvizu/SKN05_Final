import React, { useState, useEffect, useRef } from 'react';

const TickerToggle = ({ onSelect }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicker, setSelectedTicker] = useState('');
  const [showTickerList, setShowTickerList] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
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
  }, [BASE_URL]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowTickerList(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleTickerClick = (ticker) => {
    setSelectedTicker(ticker);
    setSearchTerm(ticker);
    setShowTickerList(false);
    onSelect && onSelect(ticker);
  };

  const handleRemoveTicker = () => {
    setSelectedTicker('');
    setSearchTerm('');
    onSelect && onSelect('');
  };

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container} ref={containerRef}>
      <div style={styles.inputWrapper}>
        <input
          type="text"
          placeholder="티커를 검색 또는 선택하세요"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowTickerList(true);
          }}
          onFocus={() => setShowTickerList(true)}
          style={styles.searchInput}
        />
        {selectedTicker && (
          <button style={styles.removeButton} onClick={handleRemoveTicker}>
            ✕
          </button>
        )}
      </div>
      {showTickerList && (
        <div style={styles.tickerContainer}>
          {filteredStocks.map((stock) => (
            <button
              key={stock.ticker}
              onClick={() => handleTickerClick(stock.ticker)}
              style={{
                ...styles.tickerButton,
                backgroundColor:
                  stock.ticker === selectedTicker ? '#007bff' : '#fff',
                color: stock.ticker === selectedTicker ? '#fff' : '#000',
              }}
            >
              {stock.ticker} - {stock.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '60%',
    marginRight: '5px',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  searchInput: {
    width: '100%',
    padding: '10px 40px 10px 15px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  removeButton: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    color: '#888',
  },
  tickerContainer: {
    position: 'absolute',
    top: 'calc(100% + 5px)',
    left: 0,
    width: '100%',
    maxHeight: '200px',
    overflowY: 'auto',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '15px',
    marginTop: '5px',
    zIndex: 1000,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
  },
  tickerButton: {
    width: '100%',
    padding: '10px 15px',
    textAlign: 'left',
    background: 'none',
    border: 'none',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
    outline: 'none',
  },
};

export default TickerToggle;
