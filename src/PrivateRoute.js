// src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

// Function to get JWT token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('jwtToken');
};

const PrivateRoute = ({ children }) => {
  return getAuthToken() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
