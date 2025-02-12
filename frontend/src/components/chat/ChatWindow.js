import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import send_arrow from '../../assets/asset/chatIcons/send_arrow.png';

const ChatWindow = ({ roomId, onUpdateRoom }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
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

    try {
      const userMessage = { content: input, is_user: true };
      setMessages((prev) => [...prev, userMessage]);

      const response = await axios.post(
        `${BASE_URL}/api/chat/room/${roomId}/`,
        { input },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      const botMessage = { content: response.data.message, is_user: false };

      setMessages((prev) => [...prev, botMessage]);

      // 첫 메시지인 경우 ChatList 업데이트
      if (messages.length === 0) {
        onUpdateRoom(roomId, input);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setMessages((prev) => [...prev, { content: 'Error: Unable to get response', is_user: false }]);
    }

    setInput('');
  };

  return (
    <div style={styles.container}>
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
                ...message.is_user ? styles.userMessage : styles.botMessage,
                whiteSpace: 'pre-wrap'
              }}
            >
              {message.content}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div style={styles.inputContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
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
    margin: '10px',
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
};

export default ChatWindow;
