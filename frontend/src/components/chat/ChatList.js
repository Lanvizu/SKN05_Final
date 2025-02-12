import React, { useState } from 'react';
import axios from 'axios';
import plus_button from '../../assets/asset/chatIcons/plus_button.png';
import toggle_arrow_right from '../../assets/asset/chatIcons/toggle_arrow_right.png';
import toggle_arrow_left from '../../assets/asset/chatIcons/toggle_arrow_left.png';
import delete_button from '../../assets/asset/chatIcons/delete_button.png';

const ChatList = ({ chatRooms, onSelectRoom, selectedRoom, onChatRoomCreated, onChatRoomDeleted }) => {
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

  const handleDeleteRoom = async (room, e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm('정말 해당 채팅방을 삭제하시겠습니까?');
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`${BASE_URL}/api/chat/room/${room.id}/`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (onChatRoomDeleted) {
        onChatRoomDeleted(room);
      }
    } catch (error) {
      console.error('Error deleting chat room:', error);
      alert('채팅방 삭제에 실패했습니다.');
    }
  };

  const recentChatRooms = chatRooms.slice(0, 8);

  return (
    <div style={isOpen ? styles.container : styles.closedContainer}>
      {isOpen ? (
        <>
          <div style={styles.header}>
            <img
              src={toggle_arrow_left}
              alt="Toggle Arrow Right"
              onClick={toggleSidebar}
              style={styles.toggleButton}
            />
            <h2 style={styles.title}>채팅 목록</h2>
            <img
              src={plus_button}
              alt="Plus Button"
              onClick={handleCreateNewChat}
              style={styles.newChatButton}
            />
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
                  <p style={{ ...styles.firstQuestion, ...styles.truncate }}>
                    {room.first_question}
                  </p>
                ) : (
                  <p style={styles.inactiveMessage}>진행한 채팅 내용이 없습니다.</p>
                )}
                <img
                  src={delete_button}
                  alt="Delete Button"
                  onClick={(e) => handleDeleteRoom(room, e)}
                  style={styles.deleteButton}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div style={styles.closedHeader}>
          <img
              src={toggle_arrow_right}
              alt="Toggle Arrow Right"
              onClick={toggleSidebar}
              style={styles.toggleButtonClosed}
            />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
    borderRight: '1px solid #ccc',
    padding: '10px',
    overflowY: 'auto',
  },
  closedContainer: {
    width: '50px',
    borderRight: '1px solid #ccc',
    padding: '10px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closedHeader: {
    display: 'flex',
    justifyContent: 'center',
  },
  toggleButton: {
    width: '25px',
    height: '25px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  toggleButtonClosed: {
    width: '25px',
    height: '25px',
    cursor: 'pointer',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    margin: 0,
  },
  newChatButton: {
    width: '25px',
    height: '25px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    padding: '10px',
    borderBottom: '1px solid #eee',
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedItem: {
    backgroundColor: '#f0f0f0',
  },
  firstQuestion: {
    margin: 0,
  },
  inactiveMessage: {
    color: '#888',
    fontStyle: 'italic',
  },
  truncate: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  deleteButton: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    marginRight: '10px',
  },
};

export default ChatList;