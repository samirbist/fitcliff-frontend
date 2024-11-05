import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CreateCustomer from './components/CreateCustomer';
import SearchPage from './components/SearchPage'; // Import your search page
import Layout from './components/Layout'; // Layout that includes the SideMenu
import CreateGroup from './components/CreateGroupForm';
import './App.css';
import PrivateRoute from './PrivateRoute';

function App() {

  return (
    <Router>
      <Routes>
        {/* Public Route for Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes with Layout */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <Navigate to="/search" />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/create-customer"
          element={
            <PrivateRoute>
              <Layout>
                <CreateCustomer />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <Layout>
                <SearchPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/create-group"
          element={
            <PrivateRoute>
              <Layout>
                <CreateGroup />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
