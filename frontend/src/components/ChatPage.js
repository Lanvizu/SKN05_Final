import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import NavigationLinks from './NavigationLinksAfterLogin'; // 네비게이션 컴포넌트 추가

const ChatPage = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isUser: true }]);

    try {
      const response = await axios.post('http://localhost:8000/api/chat/chat/', { input: input });
      const botResponse = response.data;

      setMessages(prev => [...prev, { text: botResponse.message, isUser: false }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { text: 'Error: Unable to get response', isUser: false }]);
    }

    setInput('');
  };

  return (
    <div>
      {/* 네비게이션 바 추가 */}
      <NavigationLinks />
      
      {/* 채팅 콘텐츠 */}
      <div style={styles.container}>
        <h2 style={styles.title}>AI 챗봇</h2>
        <div style={styles.chatContainer}>
          <div style={styles.messagesContainer}>
            {messages.map((message, index) => (
              <div key={index} style={message.isUser ? styles.userMessage : styles.botMessage}>
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} style={styles.form}>
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
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 60px)', // 네비게이션 바 높이를 뺀 나머지 높이
    backgroundColor: '#fff',
    marginTop: '60px', // 네비게이션 바 높이만큼 여백 추가
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  chatContainer: {
    width: '100%',
    maxWidth: '600px',
    height: '70vh',
    border: '1px solid #ddd',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
  },
  userMessage: {
    backgroundColor: '#000',
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
    padding: '10px',
    borderTop: '1px solid #ddd',
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
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default ChatPage;
