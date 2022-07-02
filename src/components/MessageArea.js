import React, { useState, useEffect } from 'react';
import './MessageArea.css';
import MessageInput from './MessageInput';
import Chat from './Chat';
import DirectChat from './DirectChat';
import SidePanel from './SidePanel';
import socket from '../socket';
import RemoveUser from './RemoveUser';

function MessageArea({ userName }) {
  ////////// USERS LOGIC - PROBLEM with MIDDLEWARE
  const loggedUser = userName;
  const user = userName;
  socket.auth = { user };
  ////////////////////////
  socket.connect();

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const rooms = ['General', 'Partial'];
  //////////// USERS //////////////
  /////////////////////////////////
  const initReactiveProperties = (user) => {
    user.connected = true;
    user.messages = [];
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

  socket.on('disconnect', (userId) => {
    console.log(`user ${socket.id} disconnected`);
    setUsersList(
      usersList.forEach((user) => {
        if (user.userID === socket.id) {
          user.connected = false;
          user.username = 'disconnected';
        }
      })
    );
    socket.emit('disconnect', usersList);
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

    console.log(message);
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
    setMessageList([...messageList, newMessage]);
    // console.log(messageList);
    // setMessage(newMessage);
    // console.log(message, loggedUser);
    setMessage('');
  });

  /////////////// Private messaging //////////
  ////////////////////
  const [selectedUserForDirectChat, setselectedUserForDirectChat] =
    useState(null);
  const selectUserForDirectChat = (indexOfUser) => {
    console.log(usersList);
    const selectedUserForDirectChat = usersList[indexOfUser].username;
    console.log(`clicking ${selectedUserForDirectChat}`);
    // usersList[indexOfUser].username;
    setselectedUserForDirectChat(
      `Direct message to "${selectedUserForDirectChat}"`
    );
  };

  const removeDirectChatUser = () => setselectedUserForDirectChat(null);
  ///// SELECT USER
  let selectedUser = usersList[0];
  socket.on('private message', ({ content, from }) => {
    for (let i = 0; i < usersList.length; i++) {
      const user = usersList[i];
      if (user.userID === from) {
        user.messages.push({
          content,
          fromSelf: false,
        });
        if (user !== selectedUser) {
          user.hasNewMessages = true;
        }
        break;
      }
    }
  });

  const onMessage = (content) => {
    if (selectedUser) {
      socket.emit('private message', {
        content,
        to: selectedUser.userID,
      });
      selectedUser.messages.push({
        content,
        fromSelf: true,
      });
    }
  };
  const onSelectUser = (user) => {
    selectedUser = user;
    user.hasNewMessages = false;
  };
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
          selectedUserForDirectChat={selectUserForDirectChat}
          selectUserForDirectChat={selectUserForDirectChat}
        />
        <RemoveUser
          selectedUserForDirectChat={selectedUserForDirectChat}
          removeDirectChatUser={removeDirectChatUser}
        />
      </div>
      <div className="MessageArea message-area">
        <h1>Message Area</h1>
        <h2>Welcome {userName} 🎉</h2>

        <button onClick={sendMessage2}>
          Remind everybody that you are here
        </button>

        {selectedUserForDirectChat === null ? (
          <Chat
            loggedUser={loggedUser}
            sendMessage={sendMessage}
            message={message}
            messageList={messageList}
          />
        ) : (
          <DirectChat
            loggedUser={loggedUser}
            sendMessage={sendMessage}
            message={message}
            messageList={messageList}
          />
        )}
        <MessageInput
          sendMessage={sendMessage}
          message={message}
          handleMessageChange={handleMessageChange}
        />
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
