import React from 'react';
import './Chat.css';

/// THINK OF A WAY TO INDIVDUALIZE THE LISTS OF MESSAGES - MAYBE USING THE GENERATING USER?
// A NEW LIST PER USER TO?????
function DirectChat({ usersList }) {
  return (
    <div className="Chat">
      <h2>!!!!Direct chat!!!!!!!!</h2>
      <section className="messages">
        {console.log(usersList)}
        {usersList &&
          usersList.map((eachMsg, index) => (
            <li key={index} usclassName="messagesEntry">
              <b>{eachMsg.userName}</b> said at {eachMsg.timeStamp}:<br />
              {eachMsg.message}
            </li>
          ))}
      </section>
    </div>
  );
}

export default DirectChat;
