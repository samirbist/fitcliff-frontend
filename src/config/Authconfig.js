import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = new createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          setIsAuthenticated(true);
          return;
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
    setIsAuthenticated(false);
    localStorage.removeItem("jwtToken");
  };

  const login = (token) => {
    localStorage.setItem("jwtToken", token);
    checkAuthentication();
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
