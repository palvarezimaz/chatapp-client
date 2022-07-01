import React from 'react';
import './Chat.css';

function Chat({
  loggedUser,
  sendMessage,
  message,
  messageList,
  handleMessageChange,
}) {
  return (
    <div className="Chat">
      <section className="messages">
        {messageList &&
          messageList.map((eachMsg, index) => (
            <li key={index} className="messagesEntry">
              {eachMsg}
            </li>
          ))}
      </section>
      {/* <ul id="messages">{message}</ul> */}

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

export default Chat;
