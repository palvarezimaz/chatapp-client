import React, { useState } from 'react';
import { Socket } from 'socket.io-client';

function Login() {
  const [userName, setUserName] = useState('');
  // const [room]

  /// Under construction

  const userLogin = () => {
    if (userName == !'') {
      Socket.emit('joinRoom', { userName });
    }
  };
  return (
    <div className="Login">
      <h1>Welcome to ChatApp</h1>
      <input
        type="text"
        placeholder="Your username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button>Get me in</button>
    </div>
  );
}

export default Login;
