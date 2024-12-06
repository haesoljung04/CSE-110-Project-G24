import React, { useState, useEffect } from 'react';
import './FriendsList.css';

const Friend = ({ name, onBlock, onDelete }) => (
  <div className="friend-container">
    <div className="friend-avatar"></div>
    <span className="friend-name">{name}</span>
    <button className="friend-button" onClick={onBlock}>Block</button>
    <button className="friend-button" onClick={onDelete}>Delete</button>
  </div>
);

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);

  // Replacing placeholders and actually fetching friends from the backend
  useEffect(() => {
    fetch('http://localhost:5001/api/friends')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch friends list');
        }
        return response.json();
      })
      .then(data => setFriends(data))
      .catch(error => setError(error.message));
  }, []);

  const handleBlock = (id) => {
    fetch('http://localhost:5001/api/friends/block-friend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to block friend');
        return response.json();
      })
      .then(() => {
        setFriends(prevFriends =>
          prevFriends.map(friend =>
            friend.id === id ? { ...friend, blocked: true } : friend
          )
        );
      })
      .catch(err => alert(err.message));
  };

  const handleDelete = (id) => {
    fetch('http://localhost:5001/api/friends/delete-friend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete friend');
        return response.json();
      })
      .then(() => {
        setFriends(prevFriends => prevFriends.filter(friend => friend.id !== id));
      })
      .catch(err => alert(err.message));
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="friends-list">
      <h2>Friends</h2>
      <h3>All</h3>
      {friends.map(friend => (
        <Friend
          key={friend.id}
          name={friend.name}
          onBlock={() => handleBlock(friend.id)}
          onDelete={() => handleDelete(friend.id)}
        />
      ))}
    </div>
  );
};

export default FriendsList;