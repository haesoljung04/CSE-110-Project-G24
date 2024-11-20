import React, { useState } from 'react';
import './AddFriend.css';

const AddFriend = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendRequest = () => {
    // Placeholder function - you can add functionality here later if needed
    console.log(`Friend request sent to: ${email}`);
  };

  return (
    <div className="add-friend-container">
      <h1 className="add-friend-title">Friends</h1>
      <h2 className="add-friend-subtitle">Add</h2>
      <p className="add-friend-instructions">You can add friends using their email address.</p>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="example@gmail.com"
        className="add-friend-input"
      />
      <button onClick={handleSendRequest} className="add-friend-button">
        Send Friend Request
      </button>
    </div>
  );
};

export default AddFriend;