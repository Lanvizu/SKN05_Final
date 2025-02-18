import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import send_arrow from '../../assets/asset/chatIcons/send_arrow.png';
import TickerToggle from './TickerToggle';
import Loading from '../../LoadingModal';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkEmoji from "remark-emoji";
import './markdown-content.css';

const ChatWindow = ({ roomId, onUpdateRoom }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTicker, setSelectedTicker] = useState('');
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchMessages = useCallback(async () => {
    try {
      setError(null);
      const response = await axios.get(`${BASE_URL}/api/chat/room/${roomId}/`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setMessages(response.data.messages);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages. Please try again.');
    }
  }, [roomId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    try {
      const userMessage = { content: input, is_user: true };
      setMessages((prev) => [...prev, userMessage]);
      const payload = {
        input,
      };
      const response = await axios.post(
        `${BASE_URL}/api/chat/room/${roomId}/`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      const botMessage = { content: response.data.message, is_user: false };

      setMessages((prev) => [...prev, botMessage]);

      if (messages.length === 0) {
        onUpdateRoom(roomId, input);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setMessages((prev) => [...prev, { content: 'Error: Unable to get response', is_user: false }]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  const handleCompanyAnalysis = async () => {
    if (!selectedTicker) {
      alert('티커를 선택해 주세요.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/chat/room/${roomId}/analyze-company/`,
        { ticker: selectedTicker },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      const report = response.data.report || "기업 분석 실패";
      setMessages((prev) => [...prev, { content: report, is_user: false }]);
    } catch (err) {
      console.error('기업 분석 에러:', err);
      setMessages((prev) => [
        ...prev,
        { content: '기업 분석 에러: ' + err.message, is_user: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailAnalysis = async () => {
    if (!selectedTicker) {
      alert('티커를 선택해 주세요.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/chat/room/${roomId}/analyze-detail/`,
        { ticker: selectedTicker },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      const report = response.data.report || "상세 분석 실패";
      setMessages((prev) => [...prev, { content: report, is_user: false }]);
    } catch (err) {
      console.error('상세 분석 에러:', err);
      setMessages((prev) => [
        ...prev,
        { content: '상세 분석 에러: ' + err.message, is_user: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleChartView = async () => {
    if (!selectedTicker) {
      alert('티커를 선택해 주세요.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/chat/room/${roomId}/chart/`,
        { ticker: selectedTicker },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      const chartHtml = response.data.chart_html || "<h3>차트 HTML 없음</h3>";
      const analysisText = response.data.analysis || "분석 데이터 없음";
      const newWin = window.open("", "_blank", "width=820,height=420");
      newWin.document.write(chartHtml);
      newWin.document.close();

      setMessages((prev) => [...prev, { content: analysisText, is_user: false }]);
    } catch (err) {
      console.error('차트 요청 오류:', err);
      alert('차트 요청 오류: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsView = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/chat/room/${roomId}/call-news/`,
        { },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      const report = response.data.report || "뉴스 보기 실패";
      const newsTitles = response.data.news || [];
      setMessages((prev) => [...prev, 
        { content: report, news: newsTitles, is_user: false, type: 'news' },]);
    } catch (err) {
      console.error('뉴스 보기 에러:', err);
      setMessages((prev) => [
        ...prev,
        { content: '뉴스 보기 에러: ' + err.message, is_user: false, type: 'news' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsMoreCommand = async () => {
    setLoading(true);
    try {
      const text = '뉴스 더보기';
      const userMessage = { content: text, is_user: true };
      setMessages((prev) => [...prev, userMessage]);
      const payload = { input: text };

      const response = await axios.post(
        `${BASE_URL}/api/chat/room/${roomId}/`,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      const botMessage = { content: response.data.message, is_user: false };
      setMessages((prev) => [...prev, botMessage]);

    } catch (err) {
      console.error('뉴스 더보기 전송 에러:', err);
      setMessages((prev) => [
        ...prev,
        { content: 'Error: 뉴스 더보기 전송 실패', is_user: false }
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleNewsTitleClick = async (index) => {
    setLoading(true);
    try{
      const text = `뉴스 분석 ${index + 1}`;
      const userMessage = { content: text, is_user: true };
      setMessages((prev) => [...prev, userMessage]);
      const payload = { input: text };

      const response = await axios.post(
        `${BASE_URL}/api/chat/room/${roomId}/`,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      const botMessage = { content: response.data.message, is_user: false };
      setMessages((prev) => [...prev, botMessage]);

    }catch (err) {
      console.error('뉴스 분석 전송 에러:', err);
      setMessages((prev) => [
        ...prev,
        { content: 'Error: 뉴스 분석 전송 실패', is_user: false }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.tickerButtonContainer}>
        <TickerToggle onSelect={setSelectedTicker} />
        <div style={styles.buttonContainer}>
          <button 
            style={styles.actionButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor} 
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.actionButton.backgroundColor} 
            onClick={handleCompanyAnalysis}>
            기업 분석
          </button>
          <button 
            style={styles.actionButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor} 
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.actionButton.backgroundColor} 
            onClick={handleDetailAnalysis}>
            상세 분석
          </button>
          <button 
            style={styles.actionButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor} 
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.actionButton.backgroundColor} 
            onClick={handleChartView}>
            차트 보기
          </button>
          <button 
            style={styles.actionButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor} 
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.actionButton.backgroundColor} 
            onClick={handleNewsView}>
            뉴스 보기
          </button>
        </div>
      </div>
      <div style={styles.messagesContainer}> 
        {error && <div style={styles.error}>{error}</div>} 
        {messages.length === 0 ? ( 
          <div style={styles.noMessagesText}> 
            채팅을 시작하려면 메시지를 입력하세요. 
          </div> 
        ) : ( 
          messages.map((message, index) => ( 
            <div 
              key={index} 
              style={{ 
                ...(message.is_user ? styles.userMessage : styles.botMessage), 
                whiteSpace: 'pre-wrap' 
              }} 
            > 
              {message.type !== 'news' ? ( 
                <ReactMarkdown className="markdown-content" remarkPlugins={[remarkGfm, remarkEmoji]}> 
                  {message.content} 
                </ReactMarkdown> 
              ) : ( 
                <>
                  {message.content
                    .split('\n')
                    .filter((item) => item.trim() !== '')
                    .map((newsItem, newsIndex) => (
                      <div
                        key={newsIndex}
                        style={{
                          marginBottom: '10px',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = 'rgb(240 240 240)')}
                        onClick={() => handleNewsTitleClick(newsIndex)}
                      >
                        <ReactMarkdown className="markdown-content" remarkPlugins={[remarkGfm, remarkEmoji]}>
                          {newsItem}
                        </ReactMarkdown>
                      </div>
                    ))}
                <div style={styles.newsButtonCotainer}> 
                  <button 
                    style={styles.newsButton}
                    onMouseEnter={(e) => e.target.style.backgroundColor = styles.newsButtonHover.backgroundColor} 
                    onMouseLeave={(e) => e.target.style.backgroundColor = styles.newsButton.backgroundColor} 
                    onClick={handleNewsMoreCommand} > 
                    뉴스 더보기 
                  </button>
                  <span style={styles.clickText}>
                    제목을 클릭해 뉴스 분석을 진행해보세요
                  </span>
                </div> 
              </> )} 
            </div> )) 
          )}
          {loading && (
            <Loading />
          )}
          <div ref={messagesEndRef} /> 
          </div>
      <div style={styles.inputContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) =>
                (e.target.placeholder =
                  "종목, 주가, 뉴스, 지표 등 다양한 정보를 물어보세요!")
              }
              placeholder="종목, 주가, 뉴스, 지표 등 다양한 정보를 물어보세요!"
              style={styles.input}
            />
        </form>
        <img
          src={send_arrow}
          alt="Send Arrow"
          onClick={handleSubmit}
          style={styles.sendButton}
        />
      </div>
    </div>
  );  
};

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '90%',
    maxWidth: '800px',
    margin: '0 auto',
  },
  tickerButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
  },
  actionButton:{
    margin: '0 3px',
    cursor: "pointer",
    border: "none",
    backgroundColor: "white",
    borderRadius: "4px",
    color: "#333",
    transition: "all 0.3s ease",
  },
  actionButtonHover: {
    backgroundColor: "#e0e0e0",
    transform: "scale(1.1)",
  },
  clickText: {
    fontSize: '14px',
    color: 'gray',
  },
  newsButtonCotainer: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
  },
  userMessage: {
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '15px',
    marginBottom: '10px',
    maxWidth: '70%',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    width: 'fit-content',
    padding: '10px 15px',
  },
  botMessage: {
    backgroundColor: '#f0f0f0',
    padding: '10px 15px',
    borderRadius: '15px',
    marginBottom: '10px',
    // maxWidth: '70%',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    padding: '5px',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #ddd',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '15px',
    margin: '10px 0px',
  },
  form: {
    flex: 1,
    marginRight: '10px',
  },
  input: {
    width: '95%',
    padding: '12px 15px',
    border: 'none',
    fontSize: '14px',
    outline: 'none',
  },
  sendButton: {
    width: '25px',
    height: '25px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  error: {
    color: '#ff0000',
    marginBottom: '10px',
  },
  noMessagesText: {
    textAlign: 'center',
    color: '#999',
    fontSize: '14px',
    fontStyle: 'italic',
    marginTop: '20px',
  },   
  newsButton: {
    padding: "8px",
    cursor: "pointer",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "rgb(240 240 240)",
    color: "#333",
    transition: "all 0.3s ease",
    margin: "0 5px"
  },
  newsButtonHover: {
    backgroundColor: "#e0e0e0",
    transform: "scale(1.1)",
  },
};

export default ChatWindow;
