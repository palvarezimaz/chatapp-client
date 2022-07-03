import React from 'react';
import './css/Chat.css';

// import socket from '../socket';

function Chat({ messageList }) {
  return (
    <div className="Chat">
      <section className="messages">
        <h3>General Chat</h3>
        {messageList &&
          messageList.map((eachMsg, index) => (
            <li key={index} className="messagesEntry">
              <b>{eachMsg.userName}</b> said at {eachMsg.timeStamp}:<br />
              {eachMsg.message}
            </li>
          ))}
      </section>
    </div>
  );
}

export default Chat;
