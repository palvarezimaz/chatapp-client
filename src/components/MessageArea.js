import React, { useState } from 'react';

// import socket from '../sockets';
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io('localhost:3002');
socket.connect();

function MessageArea({ userName }) {
  const loggedUser = userName;
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState('');

  function handleMessageChange(event) {
    setMessage(event.target.value);
  }

  const sendMessage = (e) => {
    e.preventDefault();

    console.log(message);
    if (message !== '') {
      socket.emit('chat message', message, loggedUser);
      setMessage('');
    }
  };

  socket.on('chat message', (message) => {
    setMessageList([...messageList, message]);
    console.log(messageList);
    setMessage(message);
    console.log(message, loggedUser);
    setMessage('');
  });

  const sendMessage2 = (userName) => {
    socket.emit('Welcome Message', loggedUser);
  };

  return (
    <div className="MessageArea">
      <h1>Message Area</h1>
      <h2>Welcome {userName} 🎉</h2>
      <button onClick={sendMessage2}>Remind everybody that you are here</button>
      <Chat
        loggedUser={loggedUser}
        sendMessage={sendMessage}
        message={message}
        messageList={messageList}
        handleMessageChange={handleMessageChange}
      />
    </div>
  );
}

export default MessageArea;
