// src/components/Login.jsx
import React, { useState } from 'react';
import Title from './Title';
import FormGroup from './FormGroup';
import Checkbox from './Checkbox';
import './Login.css'; // Import login-specific styles

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Login attempted with Username: ${username}`);
  };

  return (
    <div className="login-container">
      <Title />
      <form onSubmit={handleLogin}>
        <FormGroup
          label="Username"
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormGroup
          label="Password"
          type={passwordVisible ? 'text' : 'password'}
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Checkbox
          isChecked={passwordVisible}
          onChange={togglePasswordVisibility}
          label="Show Password"
        />
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      <div className="forgot-password">
        <a href="#">Forgot Password?</a>
      </div>
      <div className="create-account">
        <a href="/register.html">Don't have an Account?</a>
      </div>
    </div>
  );
};

export default Login;


