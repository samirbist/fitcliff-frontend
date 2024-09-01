import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './SideMenu.css';
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
    <div className="side-menu">
       {/* Logo Section */}
      <div className="logo-container">
        <img src={logo} alt="Fitcliff Logo" className="logo" />
      </div>

      <ul>
        
        <li
          className={activePage === 'SearchPage' ? 'active' : ''}
          onClick={() => handleClick('SearchPage')}
        >
          Search Customers
        </li>
        <li
          className={activePage === 'CreateCustomer' ? 'active' : ''}
          onClick={() => handleClick('CreateCustomer')}
        >
          Create Customer
        </li>
          <li
          className={activePage === 'CreateGroup' ? 'active' : ''}
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
