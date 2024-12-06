import React, { useEffect, useState } from "react";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
import "./BlockedFriendsPage.css";

const BlockedFriendsPage = () => {
  const [blockedFriends, setBlockedFriends] = useState([]);

  // Fetch blocked friends from the backend
  useEffect(() => {
    const fetchBlockedFriends = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/friends/blocked");
        if (!response.ok) throw new Error("Failed to fetch blocked friends.");
        const data = await response.json();
        setBlockedFriends(data); // Set blocked friends list
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchBlockedFriends();
  }, []);

  // Handle unblock friend
  const handleUnblock = async (id) => {
    try {
      const response = await fetch("http://localhost:5001/api/friends/blocked/unblock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to unblock friend.");
      const data = await response.json();
      console.log(data.message);

      // Update the blocked friends list
      setBlockedFriends((prev) => prev.filter((friend) => friend.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="blocked-friends-page">
      <h1>Friends</h1>
      <h2>Blocked</h2>
      <div className="blocked-friends-list">
        {blockedFriends.length === 0 ? (
          <p>No blocked friends.</p>
        ) : (
          blockedFriends.map((friend) => (
            <div key={friend.id} className="blocked-friend-item">
              <div className="friend-avatar"></div>
              <span className="friend-name">{friend.name}</span>
              <button className="unblock-button" onClick={() => handleUnblock(friend.id)}>
                Unblock
              </button>
            </div>
          ))
        )}
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