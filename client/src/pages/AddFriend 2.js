import React, { useState } from 'react';
import './AddFriend 2.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const AddFriend = () => {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const { user } = useAuth0(); // Get user info from Auth0

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendRequest = async () => {
    try {
      // Validate recipient email directly against the local database
      const userCheckResponse = await axios.get(
        `http://localhost:5001/api/users/check?email=${encodeURIComponent(email)}`
      );

      if (!userCheckResponse.data.exists) {
        setStatusMessage('The specified email does not belong to a registered user.');
        return;
      }

      // Send the friend request to the backend
      const response = await axios.post('http://localhost:5001/add-friend', {
        requesterEmail: user.email, // Logged-in user's email
        recipientEmail: email.trim() // Email entered in the input field
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