import React, { useState, useEffect } from 'react';
import './App.css';
// import { io } from 'socket.io-client';
import Login, { userName } from './Login';
import MessageArea from './MessageArea';
import socket from '../socket';

function App() {
  const [userName, setUserName] = useState();

  //maybe use onUserNameSubmit
  // const onUserNameSelection = (userName) => {
  //   socket.auth = { userName };
  //   socket.connect();
  // };

  const sendMessage = () => {
    socket.emit('hello!');
  };

  return userName ? (
    <MessageArea userName={userName} />
  ) : (
    <Login onUserNameSubmit={setUserName} />
  );
}

export default App;

// const [isConnected, setIsConnected] = useState(socket.connected);
// const [lastMessage, setLastMessage] = useState(null);

// useEffect(() => {
//   socket.on('connect', () => {
//     setIsConnected(true);
//   });
//   socket.on('disconnect', () => {
//     setIsConnected(false);
//   });
//   socket.on('message', (data) => {
//     setLastMessage(data);
//   });
//   return () => {
//     socket.off('connect');
//     socket.off('disconnect');
//     socket.off('message');
//   };
// });
