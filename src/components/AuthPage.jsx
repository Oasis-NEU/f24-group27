// src/components/AuthPage.jsx
import React, { useState } from 'react';
import Title from './Title';
import FormGroup from './FormGroup';
import Checkbox from './Checkbox';
import './Login.css';

const AuthPage = () => {
  const [showRegister, setShowRegister] = useState(false); // Toggle views
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logged in with Username: ${username}`);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Account created for ${username} with phone: ${phone}`);
  };

  return (
    <div className="login-container">
      <Title />

      {showRegister ? (
        <form onSubmit={handleRegister}>
          <FormGroup
            label="Email"
            type="email"
            id="register-email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormGroup
            label="Phone Number"
            type="tel"
            id="register-phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="123-456-7890"
          />
          <FormGroup
            label="Username"
            type="text"
            id="register-username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormGroup
            label="Password"
            type={passwordVisible ? 'text' : 'password'}
            id="register-password"
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
            Register
          </button>
          <div className="create-account">
            <a onClick={() => setShowRegister(false)}>Already have an Account?</a>
          </div>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <FormGroup
            label="Username"
            type="text"
            id="login-username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormGroup
            label="Password"
            type={passwordVisible ? 'text' : 'password'}
            id="login-password"
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
          <div className="forgot-password">
            <a href="#">Forgot Password?</a> {/* Forgot Password Link */}
          </div>
          <div className="create-account">
            <a onClick={() => setShowRegister(true)}>Don't have an Account?</a>
          </div>
        </form>
      )}
    </div>
  );
};

export default AuthPage;


