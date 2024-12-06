import React from 'react';
import '../styles/MainPage.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

export const MainPage = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const { user } = useAuth0();

  return (
    <div className={`main-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <h1 className="main-title">Main Page</h1>
      <div className="profile-section">
        <div className="welcome-text">
        <h1 className="welcome-back-text">Welcome Back, {user ? user.name : 'Guest'}!</h1>
          <button className="check-in-button">Check In</button>
        </div>
      </div>
      <div className="action-buttons">
        <button className="action-button">Create Workout</button>
        <button className="action-button">Use Saved Workout</button>
      </div>
      <div className="bottom-section">
        <div className="friends-list">
          <h3>Friends</h3>
          <ul>
            <li className="friend"><span className="friend-indicator black"></span>Sammy</li>
            <li className="friend"><span className="friend-indicator black"></span>Haesol</li>
            <li className="friend"><span className="friend-indicator black"></span>Jeong</li>
            <li className="friend"></li>
          </ul>
        </div>
        <div className="last-workout">
          <h3>Last Workout:</h3>
          <p>Running</p>

        </div>
      </div>
    </div>
  );
};

