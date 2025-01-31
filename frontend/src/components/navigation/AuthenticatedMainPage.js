import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationLinks from './NavigationLinks';
import axios from 'axios';

const AuthenticatedMainPage = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      try {
        const roomResponse = await axios.post(
          'http://localhost:8000/api/chat/room/create/',
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
            `http://localhost:8000/api/chat/room/${newRoom.id}/`,
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
              placeholder="종목, 주가, 뉴스, 지표 등 다양한 정보를 물어보세요!"
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.sendButton}>
            ↑
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  content: {
    marginTop: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 60px)',
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
    maxWidth: '500px',
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
    padding: '12px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '25%',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    minWidth: '30px',
    marginRight:'5px',
  },
};

export default AuthenticatedMainPage;