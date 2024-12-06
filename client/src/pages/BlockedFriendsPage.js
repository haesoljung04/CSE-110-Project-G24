import React from 'react';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import './BlockedFriendsPage.css';

const BlockedFriendsPage = () => {
  // Mocked data for blocked friends
  const blockedFriends = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'Diana' },
  ];

  // Handle unblock action
  const handleUnblock = (id) => {
    console.log(`Unblock friend with id: ${id}`);
    // Add logic to call the backend API to unblock the friend
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