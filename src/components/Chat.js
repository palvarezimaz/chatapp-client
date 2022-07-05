import React, { useEffect, useRef } from 'react';
import './css/Chat.css';
// import UIfx from 'uifx';
// import icqAudio from './sounds/Icq.mp3';

// const icq = new UIfx(icqAudio);

function Chat({ messageList }) {
  //// Uncomment for a full on ICQ experience
  // const [genCounter, setGenCounter] = useState(1);
  // if (genCounter <= messageList.length) {
  //   setGenCounter(messageList.length + 1);
  //   icq.play(0.2);
  // }

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
