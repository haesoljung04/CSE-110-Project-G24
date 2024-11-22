import React, { useState } from 'react';
import './AddFriend 2.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const AddFriend = () => {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const { user, getAccessTokenSilently } = useAuth0(); // Get user and token

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendRequest = async () => {
    try {
      // Retrieve Auth0 token
      const token = await getAccessTokenSilently();

      // Send the request to the backend
      const response = await axios.post(
        'http://localhost:5001/api/send-friend-request',
        {
          recipientEmail: email, // Email entered by the user
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Auth0 token to headers
          },
        }
      );

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