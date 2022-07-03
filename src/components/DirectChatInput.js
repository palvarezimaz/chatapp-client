import React from 'react';
import './css/Input.css';

function DirectChatInput({
  sendDirectChat,
  privateMessage,
  handleDirectMessageChange,
}) {
  return (
    <div className="DirectChatInput">
      <form className="form" action="">
        <input
          className="input"
          id="input"
          onChange={handleDirectMessageChange}
          value={privateMessage}
        />
        <button onClick={sendDirectChat}>Send</button>
      </form>
    </div>
  );
}

export default DirectChatInput;
