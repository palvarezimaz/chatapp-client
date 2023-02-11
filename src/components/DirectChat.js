import React, { useState, useEffect, useRef } from 'react';
import './css/Chat.css';
import UIfx from 'uifx';
import icqAudio from './sounds/Icq.mp3';

const icq = new UIfx(icqAudio);

function DirectChat({
  selectedUserForDirectChat,
  loggedUser,
  directMessageList,
}) {
  const [counter, setCounter] = useState(1);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' }, [
      directMessageList,
    ]);
  });

  if (counter <= directMessageList.length) {
    setCounter(directMessageList.length + 1);

    icq.play(0.2);
  }

  return (
    <div className="Chat">
      <h3 className="Chat-section">Direct chat</h3>
      <section className="messages">
        {directMessageList &&
          directMessageList.map((eachMsg, index) => (
            <li key={index} className="messagesEntry">
              <b>{eachMsg.from}</b> said to <b>{eachMsg.toName}</b> at{' '}
              {eachMsg.timestamp}:<br />
              {eachMsg.message}
            </li>
          ))}
      </section>
      <div ref={bottomRef} />
    </div>
  );
}

export default DirectChat;
