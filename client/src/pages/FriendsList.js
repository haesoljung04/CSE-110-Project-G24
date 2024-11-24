import React, { useState } from 'react';
import './FriendsList.css';

const Friend = ({ name }) => (
    <div className="friend-container">
      <div className="friend-avatar"></div>
      <span className="friend-name">{name}</span>
      <button className="friend-button">Block</button>
      <button className="friend-button">Delete</button>
    </div>
  );
  
  const FriendsList = () => {
    // Placeholder friends list
    const friends = ['Friend 1', 'Friend 2', 'Friend 3', 'Friend 4'];
  
    return (
      <div className="friends-list">
        <h2>Friends</h2>
        <h3>All</h3>
        {friends.map((friend, index) => (
          <Friend key={index} name={friend} />
        ))}
      </div>
    );
  };
  
  export default FriendsList;