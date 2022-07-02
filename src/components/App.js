import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import MessageArea from './MessageArea';
// import socket from '../socket';

function App() {
  const [userName, setUserName] = useState();

  // socket.connect();

  // return (
  //   <div className="App">
  //     <Login onUserNameSubmit={setUserName} />
  //   </div>
  // );

  //Reserved for when users are persistent
  return userName ? (
    <MessageArea userName={userName} />
  ) : (
    <Login onUserNameSubmit={setUserName} />
  );
}

export default App;
