import React, { useRef, useState, useEffect } from 'react';
import App from '../App';
import './Message.css';
import useChat from './useChatRoom';

function Message() {
  const Message = () => {};
  const { messages, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const messageRef = useRef();

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage !== '') {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleSendKey = (event) => {
    if (event.key === 'Enter') {
      if (newMessage !== '') {
        sendMessage(newMessage);
        setNewMessage('');
      }
    }
  };
  // Unsure about this.
  useEffect(() => messageRef.current.scrollIntoView({ behavior: 'smooth' }));
  return (
    <div className="Message">
      <ol className="MessageList">
        {messages.map((message, i) => (
          <li key={i} className="MessageListEach">
            <span>{message.body}</span>
          </li>
        ))}
      </ol>
      <div ref={messageRef}> </div>
      <div className="MessageArea"></div>
      <ul id="messages"></ul>
      <form id="form" action="">
        <input
          onChange={handleNewMessageChange}
          onKeyUp={handleSendKey}
          id="message"
          value={newMessage}
          autoComplete="off"
        />
        <button className="SendButton" onClick={handleSendMessage}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Message;
