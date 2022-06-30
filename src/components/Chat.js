// import { loggedUser } from './MessageArea';
import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('localhost:3002');
let messageList = [];
function Chat({ loggedUser }) {
  const [message, setMessage] = useState('');

  const updateMessage = (event) => {
    setMessage(event.target.value);
  };
  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    if (message !== '') {
      socket.emit('chat message', message, loggedUser);
      // socket.on('chat message', message);
      messageList = [...messageList, message];
      console.log(messageList);
      setMessage('');
    }
  };
  /////////

  return (
    <div className="Chat">
      <ul id="messages">{messageList}</ul>
      <form id="form" action="">
        <input
          className="sendMessage"
          id="input"
          onChange={updateMessage}
          // autoComplete="off"
          value={message}
        />
        <button onClick={sendMessage}>Send</button>
      </form>
    </div>
  );
}

export default Chat;
