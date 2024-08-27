// SideMenu.js
import React from "react";
import "./SideMenu.css";

const SideMenu = ({ setActivePage }) => {
  return (
    <div className="side-menu">
      <ul>
        <li onClick={() => setActivePage("createCustomer")}>Create Customer</li>
        <li onClick={() => setActivePage("searchPage")}>Search Customers</li>
        <li onClick={() => setActivePage("updateCustomer")}>Update Customer</li>
        <li onClick={() => setActivePage("createGroup")}>Create Group</li>
      </ul>
    </div>
  );
};

export default SideMenu;
