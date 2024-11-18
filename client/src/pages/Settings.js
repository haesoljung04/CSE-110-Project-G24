import React, {useState} from "react";
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/Settings.css'

export const Settings = () => {
    const { logout } = useAuth0();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        //neeed to finish this!!!!
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

            <div className="light-dark-mode">
                <label>Light/Dark mode</label>
                <label className="slider">
                    <input type="checkbox" />
                    <span className="slider-container"></span>
                </label>
            </div>

            <p onClick={() => logout({ returnTo: window.location.origin })}>Log Out</p>

            <p className="reset-password">Reset Password</p>
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