import React, { useState, useRef, useEffect } from 'react';
import Title from './Title';
import FormGroup from './FormGroup';
import Checkbox from './Checkbox';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import './Login.css'; // Your existing styles

const AuthPage = () => {
  const [showRegister, setShowRegister] = useState(false); // Track register mode
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Track forgot password mode
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const phoneInputRef = useRef(null); // Reference for the phone input field
  const itiInstance = useRef(null);   // Store the intlTelInput instance

  // Initialize intl-tel-input when the Register view is shown
  useEffect(() => {
    if (showRegister && phoneInputRef.current) {
      itiInstance.current = intlTelInput(phoneInputRef.current, {
        initialCountry: 'auto',
        geoIpLookup: (callback) => {
          fetch('https://ipinfo.io?token=<YOUR_TOKEN>')
            .then((response) => response.json())
            .then((data) => {
              const countryCode = data.country ? data.country : 'us';
              callback(countryCode);
            });
        },
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
      });

      // Event listener for country change
      phoneInputRef.current.addEventListener('countrychange', function () {
        const selectedCountryData = itiInstance.current.getSelectedCountryData();
        const prefix = selectedCountryData.dialCode;
        phoneInputRef.current.value = `+${prefix} `;
      });

      // Cleanup: destroy the `intl-tel-input` instance when the component unmounts or the view changes
      return () => {
        if (itiInstance.current) {
          itiInstance.current.destroy();
          itiInstance.current = null; // Clear the instance
        }
      };
    }
  }, [showRegister]); // Run this effect when `showRegister` changes

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
            <a onClick={() => setIsForgotPassword(false)}>Back to Login</a> {/* Go back to login */}
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
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              ref={phoneInputRef}
              type="tel"
              id="register-phone"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
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
            <a onClick={() => setIsForgotPassword(true)}>Forgot Password?</a> {/* Trigger Forgot Password */}
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







