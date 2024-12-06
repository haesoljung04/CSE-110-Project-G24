import React from "react";
import "./FriendsPage.css"; // Import the CSS file

const FriendsPage = () => {
  const handleRedirect = (section) => {
    console.log(`Redirect to ${section}`); // Placeholder for actual navigation
  };

  return (
    <div className="container">
      <h1 className="title">Friends</h1>
      <div className="button-container">
        <button className="button" onClick={() => handleRedirect("All")}>
          All
        </button>
        <button className="button" onClick={() => handleRedirect("Add")}>
          Add
        </button>
        <button className="button" onClick={() => handleRedirect("Pending")}>
          Pending
        </button>
        <button className="button" onClick={() => handleRedirect("Blocked")}>
          Blocked
        </button>
      </div>
     
    </div>
  );
};

export default FriendsPage;