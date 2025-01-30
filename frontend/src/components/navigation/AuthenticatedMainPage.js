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

          // 채팅 페이지로 이동
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
        <h2 style={styles.title}>인증된 메인 페이지</h2>
        <p style={styles.sub_title}>
          환영합니다! 채팅을 시작하실 수 있습니다.
        </p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="채팅 시작하기..."
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            채팅 시작
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
    fontSize: '24px',
    marginBottom: '20px',
  },
  sub_title: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '30px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '300px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default AuthenticatedMainPage;
