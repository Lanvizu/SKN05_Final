import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationLinks from '../navigation/NavigationLinks';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

const ChatPage = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/chat/rooms/', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('Chat rooms response:', response.data);
      setChatRooms(response.data);
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    }
  };

  const handleChatRoomCreated = (newRoom) => {
    setChatRooms(prevRooms => [newRoom, ...prevRooms]);
  };

  const updateChatRoom = (roomId, firstQuestion) => {
    setChatRooms(prevRooms => prevRooms.map(room => 
      room.id === roomId ? { ...room, first_question: firstQuestion } : room
    ));
  };

  return (
    <div>
      <NavigationLinks />
      <div style={styles.pageContainer}>
        <ChatList
          chatRooms={chatRooms}
          onSelectRoom={setSelectedRoom}
          selectedRoom={selectedRoom}
          onChatRoomCreated={handleChatRoomCreated}
        />
        {selectedRoom && <ChatWindow 
        roomId={selectedRoom.id}
        onUpdateRoom={updateChatRoom} />}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    height: 'calc(100vh - 60px)',
    marginTop: '60px',
  },
};

export default ChatPage;
