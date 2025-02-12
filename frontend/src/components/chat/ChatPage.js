import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationLinks from '../NavigationLinks';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

const ChatPage = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchChatRooms();
  }, []);

  useEffect(() => {
    if (chatRooms.length > 0 && !selectedRoom) {
      setSelectedRoom(chatRooms[0]);
    }
  }, [chatRooms, selectedRoom]);

  const fetchChatRooms = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/chat/rooms/`, {
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
    setSelectedRoom(newRoom);
  };

  const updateChatRoom = (roomId, firstQuestion) => {
    setChatRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === roomId
          ? { ...room, first_question: firstQuestion }
          : room
      )
    );
  };

  const handleChatRoomDeleted = (deletedRoom) => {
    setChatRooms(prevRooms =>
      prevRooms.filter(room => room.id !== deletedRoom.id)
    );
    if (selectedRoom && selectedRoom.id === deletedRoom.id) {
      setSelectedRoom(null);
    }
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
          onChatRoomDeleted={handleChatRoomDeleted}
        />
        {selectedRoom && (
          <ChatWindow roomId={selectedRoom.id} onUpdateRoom={updateChatRoom} />
        )}
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
