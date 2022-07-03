import React from 'react';
import './MessageInput.css';

function DirectChatInput({ sendDirectChat, message, handleMessageChange }) {
  return (
    <div className="MessageInput">
      <form className="form" action="">
        <input
          className="input"
          id="input"
          onChange={handleMessageChange}
          value={message}
        />
        <button onClick={sendDirectChat}>Send</button>
      </form>
    </div>
  );
}

export default DirectChatInput;
