import React from 'react';
import './css/Input.css';

function MessageInput({ sendMessage, message, handleMessageChange }) {
  return (
    <div className="MessageInput">
      <form className="form" action="">
        <input
          className="input"
          id="input"
          onChange={handleMessageChange}
          value={message}
        />
        <button onClick={sendMessage}>Send</button>
      </form>
    </div>
  );
}

export default MessageInput;
