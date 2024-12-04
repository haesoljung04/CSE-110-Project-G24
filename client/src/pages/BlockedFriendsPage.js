import React, { useState } from 'react';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import './BlockedFriendsPage.css';

const BlockedFriendsPage = () => {
  const blockedFriends = [
    { id: 1, name: 'Name' },
    { id: 2, name: 'Name' },
    { id: 3, name: 'Name' },
    { id: 4, name: 'Name' },
  ];

  const handleUnblock = (id) => {
    console.log(`Unblock friend with id: ${id}`);
  };

  return (
    <div className="blocked-friends-page">
      <h1>Friends</h1>
      <h2>Blocked</h2>
      <div className="blocked-friends-list">
        {blockedFriends.map((friend) => (
          <div key={friend.id} className="blocked-friend-item">
            <div className="friend-avatar"></div>
            <span className="friend-name">{friend.name}</span>
            <button className="unblock-button" onClick={() => handleUnblock(friend.id)}>
              Unblock
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-navigation">
        <div className="nav-item home-icon">
          <FaHome />
          <span>Home</span>
        </div>
        <div className="nav-item profile-icon">
          <FaUser />
          <span>Profile</span>
        </div>
        <div className="nav-item settings-icon">
          <FaCog />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
};

export default BlockedFriendsPage;
