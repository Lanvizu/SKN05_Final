import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Intro = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const introContainerRef = useRef(null);

  // 메시지 전송 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 사용자 메시지 추가
    setMessages(prev => [...prev, { text: input, isUser: true }]);

    try {
      const response = await axios.post('http://localhost:8000/api/chat/chat/', { input: input });
      const botResponse = response.data;

      // 챗봇 응답 추가
      setMessages(prev => [...prev, { text: botResponse.message, isUser: false }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { text: 'Error: Unable to get response', isUser: false }]);
    }

    setInput('');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (introContainerRef.current) {
        introContainerRef.current.style.display = "block";
      }
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section className="intro_wrap">
        <div className="intro_wallpaper">
          <div className="intro_wallpaper_css"></div>
          <div className="intro_container" ref={introContainerRef}>
            <div className="intro_textwrap">
              <h1>주식의 모든것<br />퀀톡에게 쉽고 간편하게</h1>
            </div>

            {/* ✅ 채팅 UI 추가 */}
            <div style={{ ...styles.chatContainer, marginTop: '40px' }}>  {/* 👈 여기를 줄임 */}
            <div style={styles.messagesContainer}>
                {messages.map((msg, index) => (
                <div 
                    key={index} 
                    style={msg.isUser ? styles.userMessage : styles.botMessage}
                >
                    {msg.text}
                </div>
                ))}
            </div>
            </div>

            {/* 입력 폼 */}
            <form onSubmit={handleSubmit} style={{ ...styles.form, marginTop: '10px' }}>  {/* 👈 여기도 줄임 */}
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="메시지를 입력하세요..."
                style={styles.input}
            />
            <button type="submit" style={styles.sendButton}>
                전송
            </button>
            </form>

            {/* 앱 다운로드 버튼 */}
            <div className="intro_mobile_wrap">
              <div className="store_button">
                <a href="https://apps.apple.com/kr/app/%ED%86%A0%EC%8A%A4/id839333328">
                  <img src={require('../assets/asset/icons_timeline/applekorea.png')} alt="apple icon" />
                  <span>App Store</span>
                </a>
              </div>
              <div className="store_button">
                <a href="https://play.google.com/store/apps/details?id=viva.republica.toss&pli=1">
                  <img src={require('../assets/asset/icons_timeline/googleplay.png')} alt="googleplay icon" />
                  <span>Play Store</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="intro2_wrap2">
        <div className="intro2_wallpaper">
          <h2>당신만의 투자 가치관을 확립하세요.</h2>
          <h2>퀀톡이 제공하는 스마트한 투자 분석으로</h2>
          <h2>데이터 기반의 인사이트를 얻고, 더 나은 금융 결정을 내리세요</h2>
          <h2>퀀톡과 함께하면, 당신의 투자 여정이 새로워질 거에요</h2>
        </div>
      </section>
    </>
  );
};

// ✅ 스타일 추가 (채팅 UI)
const styles = {
  chatContainer: {
    width: '100%',
    maxWidth: '600px',
    height: '100px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    marginBottom: '20px',
    padding: '10px',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '10px',
  },
  userMessage: {
    backgroundColor: '#3182f6',
    color: '#fff',
    padding: '10px',
    borderRadius: '18px',
    marginBottom: '10px',
    maxWidth: '70%',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  botMessage: {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderRadius: '18px',
    marginBottom: '10px',
    maxWidth: '70%',
    alignSelf: 'flex-start',
  },
  form: {
    display: 'flex',
    width: '100%',
    maxWidth: '600px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    marginRight: '10px',
  },
  sendButton: {
    padding: '12px 20px',
    backgroundColor: '#3182f6',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default Intro;