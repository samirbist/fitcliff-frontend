import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/SideMenu.module.css';
import logo from '../assests/fitcliff-logo.jpeg'; 

function SideMenu() {
  const [activePage, setActivePage] = useState('SearchPage');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = (page) => {
    setActivePage(page);
    // Navigate to the selected page
    if (page === 'CreateCustomer') {
      navigate('/create-customer');
    } else if (page === 'SearchPage') {
      navigate('/search');
    } else if (page === 'CreateGroup') {
      navigate('/create-group'); // Add navigation for CreateGroup
    }
    // Add more conditions for other pages if needed
  };

  return (
    <div className={styles.sideMenu}>
      {/* Logo Section */}
      <div className={styles.logoContainer}>
        <img src={logo} alt="Fitcliff Logo" className={styles.logo} />
      </div>

      <ul>
        <li
          className={activePage === 'SearchPage' ? styles.active : ''}
          onClick={() => handleClick('SearchPage')}
        >
          Search Customers
        </li>
        <li
          className={activePage === 'CreateCustomer' ? styles.active : ''}
          onClick={() => handleClick('CreateCustomer')}
        >
          Create Customer
        </li>
        <li
          className={activePage === 'CreateGroup' ? styles.active : ''}
          onClick={() => handleClick('CreateGroup')}
        >
          Create Group
        </li>
        {/* Add more menu items as needed */}
      </ul>
    </div>
  );
}

export default SideMenu;
