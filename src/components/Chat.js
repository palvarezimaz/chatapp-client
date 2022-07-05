import React, { useEffect, useRef } from 'react';
import './css/Chat.css';

function Chat({ messageList }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' }, [messageList]);
  });
  return (
    <div className="Chat">
      <section className="messages">
        <h3 className="Chat-section">General Chat</h3>
        {messageList &&
          messageList.map((eachMsg, index) => (
            <li key={index} className="messagesEntry">
              <b>{eachMsg.userName}</b> said at {eachMsg.timestamp}:<br />
              {eachMsg.message}
            </li>
          ))}
      </section>
      <div ref={bottomRef} />
    </div>
  );
}

export default Chat;
