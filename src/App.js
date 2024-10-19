import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import Home from './Home';
import Login from './Login';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
