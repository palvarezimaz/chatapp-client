import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import MessageArea from './MessageArea';

function App() {
  const [userName, setUserName] = useState();

  return userName ? (
    <MessageArea userName={userName} />
  ) : (
    <Login onUserNameSubmit={setUserName} />
  );
}

export default App;
