import React, { useState } from 'react';
import axios from 'axios';

const ChatList = ({ chatRooms, onSelectRoom, selectedRoom, onChatRoomCreated }) => {
    const [isOpen, setIsOpen] = useState(true);
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const handleCreateNewChat = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/chat/room/create/`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        if (response.status === 201) {
          const newRoom = response.data;
          onChatRoomCreated(newRoom);
          onSelectRoom(newRoom);
        } else {
          alert('새로운 채팅방을 생성하는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('Error creating new chat room:', error);
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    };
  
    const recentChatRooms = chatRooms.slice(0, 8);
  
    return (
        <div style={isOpen ? styles.container : styles.closedContainer}>
          {isOpen ? (
            <>
              <div style={styles.header}>
                <button onClick={toggleSidebar} style={styles.toggleButton}>
                  ◀
                </button>
                <h2 style={styles.title}>채팅 목록</h2>
                <button onClick={handleCreateNewChat} style={styles.newChatButton}>
                  +
                </button>
              </div>
              <ul style={styles.list}>
                {recentChatRooms.map((room) => (
                    <li
                    key={room.id}
                    style={{
                        ...styles.listItem,
                        ...(selectedRoom && selectedRoom.id === room.id ? styles.selectedItem : {}),
                    }}
                    onClick={() => onSelectRoom(room)}
                    >
                    {room.first_question ? (
                        <p style={{...styles.firstQuestion, ...styles.truncate}}>
                            {room.first_question}
                        </p>
                    ) : (
                        <p style={styles.inactiveMessage}>진행한 채팅 내용이 없습니다.</p>
                    )}
                    </li>
                ))}
              </ul>
            </>
            ) : (
            <div style={styles.closedHeader}>
                <button onClick={toggleSidebar} style={styles.toggleButtonClosed}>
                ▶
                </button>
            </div>
            )}
        </div>
    );
};

const styles = {
  container: {
    width: '250px',
    borderRight: '1px solid #ddd',
    padding: '20px',
    transition: 'width 0.3s ease-in-out',
  },
  closedContainer: {
    width: '40px',
    borderRight: '1px solid #ddd',
    transition: 'width 0.3s ease-in-out',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  closedHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px',
  },
  title: {
    fontSize: '20px',
    margin: 0,
    flex: 1,
    textAlign: 'center',
  },
  toggleButton: {
    width: '30px',
    height: '30px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  toggleButtonClosed: {
    width: '30px',
    height: '30px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  newChatButton: {
    width: '30px',
    height: '30px',
    fontSize: '20px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    height: '40px',
    padding: '5px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginBottom: '10px',
    border: '1px solid #ddd',
  },
  selectedItem: {
    backgroundColor: '#f0f0f0',
  },
  firstQuestion: {
    color: '#333',
    fontSize: '14px',
  },
  inactiveMessage: {
    color: '#999',
    fontSize: '14px',
    fontStyle: 'italic',
  },
  truncate: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

export default ChatList;
