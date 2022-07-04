import React, { useEffect, useRef } from 'react';
import './css/Chat.css';

function DirectChat({ directMessageList }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' }, [
      directMessageList,
    ]);
  });
  return (
    <div className="Chat">
      <h3 className="Chat-section">Direct chat</h3>
      <section className="messages">
        {/* {console.log(`direct message list${directMessageList[2].userName}`)} */}
        {directMessageList &&
          directMessageList.map((eachMsg, index) => (
            <li key={index} className="messagesEntry">
              <b>{eachMsg.from}</b> said at {eachMsg.timestamp}:<br />
              {eachMsg.message}
            </li>
          ))}
      </section>
      <div ref={bottomRef} />
    </div>
  );
}

export default DirectChat;

/////////////
// const hola = { userName: 'jaimito', timeStamp: 'now', message: 'test' };
// // console.log(hola);
// usersList[0].directMessages = [...usersList[0].directMessages, hola];
// console.log(usersList[0].directMessages);
// let directMessageList = [];
// let directMessageList = usersList[0].directMessages;
// for (let i = 0; i < usersList.length; i++) {
//   if (usersList[i].directMessages[0] !== undefined) {
//     console.log('on the right track!');
//     // console.log(`users list user 0 all direct messages ${hola}`);
//     for (let j = 0; j < usersList[i].directMessage.length; j++) {
//       if (
//         usersList[i].directMessages[j].userName === loggedUser ||
//         usersList[i].directMessages[j].userName === selectedUserForDirectChat
//       ) {
//         usersList[i].directMessageList.push(usersList[i].directMessages[j]);
//       }
//     }
//   } else {
//     // console.log('direct message array is empty');
//     // console.log(usersList);
//     // console.log(directMessageList);
//   }
// }
// directMessageList = [...directMessageList, usersList[0].directMessages];
// console.log(`direct message list after pushing one ${directMessageList}`);
// From userList
