// src/components/AuthPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Title from './Title';
import FormGroup from './FormGroup';
import Checkbox from './Checkbox';
import './Login.css';
import { readRecords } from '../utils/supabaseCRUD';

const AuthPage = () => {
  const [showRegister, setShowRegister] = useState(false); // Toggle register mode
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Toggle forgot password mode
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await readRecords('Users', { username });
      
      if (data.length === 0) {
        alert('Username does not exist');
      } else if (data[0].password === password) {
        alert('Login successful!');
        navigate('/dashboard'); // Redirect to dashboard on success
      } else {
        alert('Incorrect password. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      alert('An error occurred during login. Please try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // Registration code (not shown for brevity)
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to: ${email}`);
  };

  return (
    <div className="login-container">
      <Title />

      {isForgotPassword ? (
        // Forgot Password View
        <form onSubmit={handleForgotPassword}>
          <FormGroup
            label="Email"
            type="email"
            id="forgot-password-email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="login-btn">
            Send Reset Link
          </button>
          <div className="create-account">
            <a onClick={() => setIsForgotPassword(false)}>Back to Login</a>
          </div>
        </form>
      ) : showRegister ? (
        // Register View
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
        // Login View
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
            <a onClick={() => setIsForgotPassword(true)}>Forgot Password?</a>
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









