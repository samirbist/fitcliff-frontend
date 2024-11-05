// src/components/PrivateRoute.js

import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './config/Authconfig';

// Function to get JWT token from localStorage


const PrivateRoute = ({ children }) => {
  const authConfig = useAuth();

  useEffect(() => {
  },[authConfig]);


  return authConfig.isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
