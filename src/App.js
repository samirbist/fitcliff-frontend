import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CreateCustomer from './components/CreateCustomer';
import SearchPage from './components/SearchPage'; // Import your search page
import Layout from './components/Layout'; // Layout that includes the SideMenu
import CreateGroup from './components/CreateGroupForm';
import './App.css';
import { useAuth } from './config/Authconfig';

function App() {
  
  const isAuthenticated = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Route for Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes with Layout */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Layout>
                <Routes>
                  {/* Redirect to search page after  login */}
                  <Route path="/" element={<Navigate to="/search" />} />
                  <Route path="/create-customer" element={<CreateCustomer />} />
                  <Route path="/search" element={<SearchPage />} /> {/* Your search page route */}
                  <Route path="/create-group" element={<CreateGroup />} /> {/* Add the CreateGroup route */}
                  {/* Add more routes as needed */}
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
