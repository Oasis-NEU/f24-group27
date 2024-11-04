// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import UserDashboard from './components/UserDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} /> {/* Login page as the default route */}
        <Route path="/dashboard" element={<UserDashboard />} /> {/* Dashboard route */}
      </Routes>
    </Router>
  );
}

export default App;





