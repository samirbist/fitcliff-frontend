import React from 'react';
import SideMenu from './SideMenu'; // Import your side menu component
import './Layout.css'; // Import CSS for layout styling

function Layout({ children }) {
  return (
    <div className="layout">
      <SideMenu />
      <div className="content">
        {children} {/* This is where nested routes are rendered */}
      </div>
    </div>
  );
}

export default Layout;
