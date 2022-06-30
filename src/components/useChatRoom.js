import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const NewMessageEvent = 'new-message-event';
const SOCKET_SERVER_URL = 'http://localhost:3002';

const useChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    socketRef.current.on(NewMessageEvent, (message) => {
      const incomingMessage = {
        ...message,
        isOwner: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NewMessageEvent, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage };
};

export default useChatRoom;
