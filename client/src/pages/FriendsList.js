import React, { useState, useEffect } from 'react';
import './FriendsList.css';
import { useAuth0 } from '@auth0/auth0-react'; // Make sure to import useAuth0

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
  const [email, setEmail] = useState(''); // State for the email search
  const [inviteStatus, setInviteStatus] = useState(''); // State for invite status message
  const { user, isAuthenticated } = useAuth0(); // Using useAuth0 hook

  // Fetch the friends list
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

  // Block a friend
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

  // Delete a friend
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

  // Send a friend invite by email
  const handleSendInvite = () => {
    if (!email) {
      alert('Please enter a valid email');
      return;
    }

    // Get the sender's email from the Auth0 user object
    const senderEmail = user?.email; // Use user email from Auth0
    if (!senderEmail) {
      alert('Sender email not found');
      return;
    }
    console.log({message: email});

    fetch('http://localhost:5001/api/friends/send-invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email, // Friend's email
        senderEmail, // Sender's email (authenticated user)
      }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to send invite');
        return response.json();
      })
      .then(() => {
        setInviteStatus('Invite sent successfully!'); // Show success message
        setEmail(''); // Clear email input field
      })
      .catch(err => {
        setInviteStatus(`Error: ${err.message}`); // Show error message
      });
  };

  // Display error message if any
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  
  const handleRespondInvite = (requestId, response) => {
    fetch('http://localhost:5001/api/friends/respond-invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ request_id: requestId, response }),
    })
      .then(response => response.json())
      .then(() => {
        setFriends(friends.filter(friend => friend.request_id !== requestId));
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
          status={friend.status}
          requestId={friend.request_id}
          onRespondInvite={handleRespondInvite}
        />
      ))}

      <section className="send-invite-section">
        <h3>Send Friend Invite</h3>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter friend's email"
        />
        <button onClick={handleSendInvite}>Send Invite</button>
        {inviteStatus && <p>{inviteStatus}</p>}
      </section>
    </div>
  );
};


export default FriendsList;
