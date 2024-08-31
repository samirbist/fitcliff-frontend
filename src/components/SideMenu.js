import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './SideMenu.css';

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
    }
    // Add more conditions for other pages if needed
  };

  return (
    <div className="side-menu">
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
        {/* Add more menu items as needed */}
      </ul>
    </div>
  );
}

export default SideMenu;
