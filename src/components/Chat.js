import React from 'react';

function Chat({
  loggedUser,
  sendMessage,
  message,
  messageList,
  handleMessageChange,
}) {
  return (
    <div className="Chat">
      <ul id="messages">{messageList}</ul>
      {/* <ul id="messages">{message}</ul> */}

      <form id="form" action="">
        <input
          className="sendMessage"
          id="input"
          onChange={handleMessageChange}
          value={message}
        />
        <button onClick={sendMessage}>Send</button>
      </form>
    </div>
  );
}

export default Chat;
