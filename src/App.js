import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import HomeLanding from './components/home/HomeLanding';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} /> {/* Redirect root to /home */}
          <Route path="/home/*" element={<HomeLanding />} />
          <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
