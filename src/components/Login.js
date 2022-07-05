import React, { useRef, useState } from 'react';
import './css/Login.scss';
import Slider from './Slider';
import ToGitHub from './ToGitHub';

function Login({ onUserNameSubmit }) {
  const userName = useRef();

  const [formLabel, setFormLabel] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    onUserNameSubmit(userName.current.value);
  }

  return (
    <div className="Login">
      <div className="LoginArea">
        <Slider />
        <div className="form-class">
          <form className="LoginForm" onSubmit={handleSubmit}>
            <label className="form-label">
              <span className={`label ${formLabel === 'hide' ? 'hide' : ''}`}>
                Enter your username
              </span>

              <input
                type="text"
                name="name"
                id="name"
                className="form-input"
                ref={userName}
                required
                onFocus={(event) => setFormLabel('hide')}
                onBlur={(event) => setFormLabel('none')}
              />
            </label>
          </form>
        </div>
      </div>
      <div className="backgroundLogin"></div>

      <div>
        <ToGitHub />
      </div>
    </div>
  );
}

export default Login;
