import React from 'react';
import './Chat.css';

/// THINK OF A WAY TO INDIVDUALIZE THE LISTS OF MESSAGES - MAYBE USING THE GENERATING USER?
// A NEW LIST PER USER TO?????
function DirectChat({ messageList }) {
  return (
    <div className="Chat">
      <h2>!!!!Direct chat!!!!!!!!</h2>
      <section className="messages">
        {console.log(messageList)}
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

export default DirectChat;
