import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext'; // Adjust the path if necessary

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  return auth ? children : <Navigate to="/home/login" />;
};

export default ProtectedRoute;
