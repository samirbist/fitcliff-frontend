import React from 'react';
import SideMenu from './SideMenu'; // Import your side menu component
import styles from '../css/Layout.module.css'; // Import CSS for layout styling

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <SideMenu />
      <div className={styles.content}>
        {children} {/* This is where nested routes are rendered */}
      </div>
    </div>
  );
}

export default Layout;
