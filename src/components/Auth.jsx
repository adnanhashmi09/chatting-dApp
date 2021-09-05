import React from 'react';
import { useState } from 'react';
import { user } from '../auth/userAuth';

function Auth() {
  const [_username, setUsername] = useState('');
  const [_password, setPassword] = useState('');

  const signUp = (e) => {
    user.create(_username, _password, ({ err }) => {
      if (err) {
        alert(err);
      } else {
        login();
      }
    });
  };

  const login = (e) => {
    user.auth(_username, _password, ({ err }) => err && alert(err));
  };

  return (
    <div className="auth">
      <input
        type="text"
        className="auth-input"
        placeholder="Username"
        name="username"
        value={_username}
        onChange={(e) => setUsername(e.target.value)}
        required
      ></input>
      <input
        className="auth-input"
        placeholder="Password"
        name="password"
        type="password"
        value={_password}
        onChange={(e) => setPassword(e.target.value)}
        required
      ></input>
      <button type="submit" className="btn login" onClick={login}>
        Login
      </button>
      <button type="submit" className="btn signup" onClick={signUp}>
        Signup
      </button>
    </div>
  );
}

export default Auth;
