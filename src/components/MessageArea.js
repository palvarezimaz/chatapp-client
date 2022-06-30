// import React from 'react';

// import socket from '../sockets';
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io('localhost:3002');

function MessageArea({ userName }) {
  const loggedUser = userName;
  const sendMessage = (userName) => {
    socket.emit('Welcome Message', loggedUser);
  };
  return (
    <div className="MessageArea">
      <h1>Message Area</h1>
      <h2>Welcome {userName} 🎉</h2>
      <button onClick={sendMessage}>Remind everybody that you are here</button>
      <Chat loggedUser={loggedUser} />
    </div>
  );
}

export default MessageArea;
