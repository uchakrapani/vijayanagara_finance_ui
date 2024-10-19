import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // Adjust your state management as needed
  const navigate = useNavigate();

  const login = (user) => {
    setAuth(user);
    navigate('/dashboard'); // Redirect after login
  };

  const logout = () => {
    setAuth(null);
    navigate('/login'); // Redirect after logout
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
