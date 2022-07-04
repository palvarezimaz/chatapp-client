import React, { useState } from 'react';
import './css/MessageArea.css';
import MessageInput from './MessageInput';
import DirectChatInput from './DirectChatInput';
import Chat from './Chat';
import DirectChat from './DirectChat';
import SidePanel from './SidePanel';
import socket from '../socket';
import RemoveUser from './RemoveUser';

function MessageArea({ userName }) {
  const loggedUser = userName;
  const user = userName;
  socket.auth = { user };

  socket.connect();

  const [message, setMessage] = useState('');
  const [privateMessage, setPrivateMessage] = useState('');

  const [messageList, setMessageList] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const rooms = ['General', 'Partial'];
  //////////// USERS //////////////
  /////////////////////////////////
  const initReactiveProperties = (user) => {
    user.connected = true;
    user.directMessages = [];
    user.hasNewMessages = false;
  };

  socket.on('users', (users) => {
    users.forEach((user) => {
      user.self = user.userID === socket.id;
      initReactiveProperties(user);
    });
    //sort them. this nees some react
    users = users.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    });
    setUsersList(users);
  });

  //////////////////////////////
  /////////////////////////////
  ///////////// MESSAGES //////////
  //////////////////////////////////
  function handleMessageChange(event) {
    setMessage(event.target.value);
  }

  const sendMessage = (e) => {
    e.preventDefault();

    if (message !== '') {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  socket.on('chat message', (data) => {
    const newMessage = {
      userName: data.username,
      message: data.message,
      timeStamp: data.timestamp,
    };
    console.log('general chat message received');
    setMessageList([...messageList, newMessage]);
    // console.log(messageList);
    // setMessage(newMessage);
    // console.log(message, loggedUser);
    setMessage('');
  });
  ////////////////////////////////////////////
  /////////////// Direct messaging //////////
  ////////////////////////////////////////////

  //Direct chat USer name
  const [selectedUserForDirectChat, setSelectedUserForDirectChat] =
    useState(null);

  // Direct Chat User ID
  const [selectedDirectChatUserID, setSelectedDirectChatUserID] =
    useState(null);

  function userForDirectChat(index) {
    if (usersList[index].username !== loggedUser) {
      let directChatUserName = usersList[index].username;
      let directChatUserID = usersList[index].userID;

      setSelectedUserForDirectChat(directChatUserName);
      console.log(directChatUserName);
      setSelectedDirectChatUserID(directChatUserID);
      console.log(directChatUserID);
      // `Direct message to "${selectedUserForDirectChat}"`

      console.log(directChatUserID);
      console.log(`Selected user for direct chat${selectedUserForDirectChat}`);
    } else {
      console.log('no self messaging... yet!');
    }
    // setSelectedUserForDirectChat(x);
    console.log(selectedUserForDirectChat);
    // usersList[indexOfUser].username;
  }

  const removeDirectChatUser = () => setSelectedUserForDirectChat(null);
  // setSelectedDirectChatUserID(null);
  ///// SELECT USER

  ////////////////////////////////////////
  /// Direct messages implementation /////
  ////////////////////////////////////////
  // let selectedUser = usersList[0];
  ////// change selectedUser TO PROPER NAME
  function handleDirectMessageChange(event, usersList) {
    setPrivateMessage(event.target.value);
  }

  const sendDirectChat = (e) => {
    e.preventDefault();

    if (privateMessage !== '') {
      socket.emit('direct message', {
        content: privateMessage,
        to: selectedDirectChatUserID,
      });
    }
    /// Adds the message to the current user
    // INTO usersList.directMessages
    usersList[0].directMessages.push({
      from: usersList[0].username,
      message: privateMessage,
      to: selectedDirectChatUserID,
      timestamp: new Date().toLocaleTimeString(),
    });
    setPrivateMessage('');
  };

  function hola(msg) {
    const usersChat = usersList;
    console.log(`new direct message ${msg}`);

    usersChat.map((element) => console.log(element.directMessages));
    // console.log(`hola func ${usersChat[0].userName}`);
    // usersChat[0].directMessages.push(msg);
    // console.log(`hola func ${usersChat[0][0]}`);
    // setUsersList([...usersList[0].directMessages, msg]);

    // usersList[0].directMessages.push(msg);
    // = [...directMessages, msg];
    // console.log(usersList[0].
  }

  // socket.on('direct message', ({ data, from }) => {
  socket.on('direct message', (content) => {
    const newMessage = {
      from: content.from,
      message: content.message,
      timeStamp: content.timestamp,
      to: content.to,
    };
    hola(newMessage);
    console.log('im catcing a message');
  });

  /////////////////////
  // setUsersList([...usersList[0].directMessages[0], newMessage]);
  // console.log(newMessage);
  // console.log(usersList);
  // hola(newMessage, usersList);
  // hola(usersList[0].directMessages);
  //

  //// Check its use
  // const onSelectUser = (user) => {
  //   selectedUser = user;
  //   user.hasNewMessages = false;
  // };

  // Add the direct message to both sender and receiver direct message list inside userList.
  // for (let i = 0; i < usersList.length; i++) {
  //// This is probably un-needed as its pushed before leaving the user
  // if (usersList[i].userID === selectedDirectChatUserID) {
  //   console.log(' gettign my own message');
  // usersList[0].directMessages.push(content); // } else
  // if (usersList[i].userID === from) {
  //   console.log('the message im receiving');
  //   usersList[i].directMessages.push(data);

  // = [...usersList[i].directMessages, data];

  // }
  // for (let i = 0; i < this.users.length; i++) {
  //   const user = this.users[i];
  //   if (user.userID === from) {
  //     user.messages.push({
  //       data,
  //       fromSelf: false,
  //       timestamp: data.timestamp,
  //     });
  //     if (user !== this.selectedUser) {
  //       user.hasNewMessages = true;
  //     }
  //     break;
  //   }
  // }
  // setPrivateMessage('');
  // });

  ////////////// END OF DIRECT CHAT SOCKET IO logic
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////

  ////////////////////////

  const sendMessage2 = (userName) => {
    socket.emit('Welcome Message', loggedUser);
    // socket.on('Welcome Message', name => {} )
  };

  return (
    <>
      <div className="SidePanel side-panel">
        <SidePanel
          usersList={usersList}
          rooms={rooms}
          selectedUserForDirectChat={selectedUserForDirectChat}
          userForDirectChat={userForDirectChat}
        />
        <RemoveUser
          selectedUserForDirectChat={selectedUserForDirectChat}
          removeDirectChatUser={removeDirectChatUser}
        />
      </div>
      <div className="MessageArea message-area">
        <h1 className="MessageArea-Title">
          <span className="Chat-name">Chat</span>
          <span className="App-name">App</span>
        </h1>
        <h2 className="Welcome-message">🎉 Welcome {userName} 🎉</h2>

        {selectedUserForDirectChat === null ? (
          <Chat messageList={messageList} />
        ) : (
          <DirectChat
            usersList={usersList}
            selectedUserForDirectChat={selectedUserForDirectChat}
            loggedUser={loggedUser}
          />
        )}
        {selectedUserForDirectChat === null ? (
          <MessageInput
            sendMessage={sendMessage}
            message={message}
            handleMessageChange={handleMessageChange}
          />
        ) : (
          <DirectChatInput
            sendDirectChat={sendDirectChat}
            privateMessage={privateMessage}
            handleDirectMessageChange={handleDirectMessageChange}
          />
        )}
      </div>
    </>
  );
}

export default MessageArea;

////////// DISCONNECTION
///////////// DOUBLE CHECK

/* <button >Future Disconnect</button> */

// socket.on('disconnect', (users) => {
//   users.forEach((user) => {
//     if (user.self) {
//       user.connected = false;
//     }
//   });
//   setUsersList(users);
// });
// socket.on('user disconnected', (users, id) => {
//   for (let i = 0; i < this.users.length; i++) {
//     const user = users[i];
//     if (user.userID === id) {
//       user.connected = false;
//       break;
//     }
//     setUsersList(users);
//   }
// });
// //////// DOUBLE CHECK
// const disconnectUser = (userName) => {
//   socket.on('disconnect', (users) => {
//     users.forEach((user) => {
//       if (user.self) {
//         user.connected = false;
//       }
//     });
//     setUsersList(users);
//   });
//   socket.on('user disconnected', (users, id) => {
//     for (let i = 0; i < this.users.length; i++) {
//       const user = users[i];
//       if (user.userID === id) {
//         user.connected = false;
//         break;
//       }
//       setUsersList(users);
//     }
//     userName.setState(null);
//   });
// };

//////////////////////////////////// DISCONNECTION CLIENT SIDE LOGIC --- NOT NEEDED????

// IM HANDLING IT SERVERSIDE
//BUG//BUG//BUG//BUG//BUG//BUG//BUG//BUG
//////// BUG //// THIS DOES NOT REFRESH IMMEDIATELY///
// socket.on('disconnect', (userID) => {
//   let discoUsers = usersList.filter((user) => user.userID !== socket.id);
//   setUsersList(discoUsers);
//   // let users = users.filter((user) => user.userID !== socket.id);
//   // setUsersList(users);
//   // // console.log(users);
//   console.log(`client user ${socket.id} disconnected`);
//   console.log(
//     `side panel userlist: ${usersList.map((user) => user.username)}`
//   );
// setUsersList(
//   usersList.forEach((user) => {
//     if (user.userID === socket.id) {
//       user.connected = false;
//       user.username = 'disconnected';
//     }
//   })
// );X
// socket.emit('disconnect', usersList);
// });
