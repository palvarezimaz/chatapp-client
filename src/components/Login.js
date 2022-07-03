import React, { useRef } from 'react';
// import { Container, Form, Button } from 'react-bootstrap';
// import Animation from './Animation';
import './Login.css';
import Slider from './Slider';

function Login({ onUserNameSubmit }) {
  const userName = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUserNameSubmit(userName.current.value);
  }

  return (
    <div className="Login">
      <div className="LoginArea">
        <Slider />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            ref={userName}
            placeholder="Enter your username..."
            required
          />

          <button type="submit" className="LoginButton">
            Join
          </button>
        </form>
        <div className="backgroundLogin"></div>

        {/* <Animation /> */}
      </div>
    </div>
  );
}

export default Login;
