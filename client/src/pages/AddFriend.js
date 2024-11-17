import React, { useState } from 'react';
import './AddFriend.css';
import axios from 'axios';


const AddFriend = () => {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState(''); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendRequest = async () => {
    try {
      // Replace with your actual Auth0 user ID if available
      const requesterId = 'auth0-user-id-placeholder'; 

      // Send the request to the backend
      const response = await axios.post('http://localhost:5001/api/send-friend-request', {
        requesterId, // The ID of the logged-in user
        recipientEmail: email, // Email entered by the user
      });

      // Display success message
      setStatusMessage(response.data.message || 'Friend request sent!');
    } catch (error) {
      // Handle errors and display the error message
      const errorMessage =
        error.response?.data?.message || 'An error occurred while sending the friend request.';
      setStatusMessage(errorMessage);
    }
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
      {statusMessage && <p className="add-friend-status">{statusMessage}</p>}
    </div>
  );
};

export default AddFriend;