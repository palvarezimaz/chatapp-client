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
      timestamp: data.timestamp,
    };

    setMessageList([...messageList, newMessage]);
    // icq.play(0.2);
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

  const [directMessageList, setDirectMessageList] = useState([]);

  function userForDirectChat(index) {
    if (usersList[index].username !== loggedUser) {
      let directChatUserName = usersList[index].username;
      let directChatUserID = usersList[index].userID;
      usersList[index].hasNewMessage = false;

      setSelectedUserForDirectChat(directChatUserName);

      setSelectedDirectChatUserID(directChatUserID);
    } else {
      console.log('no self messaging... yet!');
    }
    //
  }

  const removeDirectChatUser = () => setSelectedUserForDirectChat(null);

  ///// SELECT USER

  ////////////////////////////////////////
  /// Direct messages implementation /////
  ////////////////////////////////////////

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
    setDirectMessageList([
      ...directMessageList,
      {
        from: usersList[0].username,
        message: privateMessage,
        to: selectedDirectChatUserID,
        toName: selectedUserForDirectChat,
        timestamp: new Date().toLocaleTimeString(),
        self: true,
      },
    ]);
    setPrivateMessage('');
  };

  socket.on('direct message', (content) => {
    const newMessage = {
      from: content.from,
      toName: loggedUser,
      message: content.message,
      timestamp: content.timestamp,
      to: content.to,
      self: false,
      hasNewMessage: true,
    };
    setDirectMessageList([...directMessageList, newMessage]);
  });

  ////////////// END OF DIRECT CHAT SOCKET IO logic
  /////////////////////////////////////////
  /////////////////////////////////////////

  //// FUTURE DEVELOPMENT
  // const sendMessage2 = (userName) => {
  //   socket.emit('Welcome Message', loggedUser);
  //   // socket.on('Welcome Message', name => {} )
  // };

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
            directMessageList={directMessageList}
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
