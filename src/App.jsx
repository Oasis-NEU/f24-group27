// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import UserDashboard from './components/UserDashboard';

function DashboardWrapper() {
  const location = useLocation();
  const { loggedInUsername } = location.state || {}; // Retrieve logged-in username from location state

  return <UserDashboard loggedInUsername={loggedInUsername} />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} /> {/* Login page as the default route */}
        <Route path="/dashboard" element={<DashboardWrapper />} /> {/* Dashboard route */}
      </Routes>
    </Router>
  );
}

export default App;






