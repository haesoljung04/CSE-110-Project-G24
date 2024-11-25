// src/pages/Settings.js
import React, { useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ThemeContext } from '../context/ThemeContext'; // Import the context
import '../styles/Settings.css';

export const Settings = () => {
    const { logout } = useAuth0();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { getAccessTokenSilently, user } = useAuth0();
    const { isDarkMode, toggleTheme } = useContext(ThemeContext); // Use context for theme

    const handleResetPassword = async () => {
        const token = await getAccessTokenSilently();
        try {
            await fetch(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/dbconnections/change_password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
                    email: user.email,
                    connection: 'Username-Password-Authentication',
                }),
            });
            alert('Password reset email sent!');
        } catch (error) {
            console.error('Error sending reset password email:', error);
        }
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        console.log("Account deleted");
        setShowDeleteModal(false);
    };

    return (
        <div className="settings-container">
            <h1 className="settings-title">Settings</h1>
            <div className="center-buttons">
                <button className="edit-profile-image">Edit</button>
                <button className="edit-profile">Edit Profile</button>
            </div>

            <div className="ghost-mode">
                <label>Ghost mode</label>
                <label className="slider">
                    <input type="checkbox" />
                    <span className="slider-container"></span>
                </label>
            </div>

            {/* Toggle Light/Dark Mode */}
            <div className="light-dark-mode">
                <label>Light/Dark mode</label>
                <label className="slider">
                    <input 
                        type="checkbox" 
                        checked={isDarkMode} 
                        onChange={toggleTheme} // Call the toggleTheme function
                    />
                    <span className="slider-container"></span>
                </label>
            </div>

            <p onClick={() => logout({ returnTo: window.location.origin })}>Log Out</p>
            <p className="reset-password" onClick={handleResetPassword}>Reset Password</p>
            <p className="delete-account" onClick={handleDeleteClick}>Delete Account</p>

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>Are you sure?</p>
                        <button onClick={handleConfirmDelete} className="modal-delete-button">Delete</button>
                        <button onClick={handleCancelDelete} className="modal-cancel-button">Keep Account</button>
                    </div>
                </div>
            )}
        </div>
    );
};
