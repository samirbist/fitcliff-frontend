// App.js (Main Component)
import React, { useState } from "react";
import SideMenu from "./components/SideMenu";
import CreateCustomer from "./components/CreateCustomer";
import SearchPage from "./components/SearchPage";
// Import other components if necessary

import "./App.css";

const App = () => {
  const [activePage, setActivePage] = useState("createCustomer");

  const renderActivePage = () => {
    switch (activePage) {
      case "createCustomer":
        return <CreateCustomer />;
      case "searchPage":
        return <SearchPage />;
      // Include other cases for different pages if necessary
      default:
        return <CreateCustomer />;
    }
  };

  return (
    <div className="app-container">
      <SideMenu setActivePage={setActivePage} />
      <div className="content">{renderActivePage()}</div>
    </div>
  );
};

export default App;
