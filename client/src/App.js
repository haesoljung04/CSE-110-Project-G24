import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Settings } from './pages/Settings';
import { ThemeContext } from './context/ThemeContext';  // Import context

function App() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [message, setMessage] = useState('');
  const { isDarkMode } = useContext(ThemeContext); // Access theme state

  // Fetch message from the backend when the app is loaded
  useEffect(() => {
    fetch('http://localhost:5001/api') // Use full backend URL
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Error:', error));

    // When the user is authenticated, send their details to the backend
    if (isAuthenticated && user) {
      fetch('http://localhost:5001/api/users', { // Full URL for POST request
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auth0_id: user.sub,
          name: user.name,
          email: user.email
        })
      }).catch((error) => console.error('Error:', error));
    }
  }, [isAuthenticated, user]);

  // Apply dark mode styles when the theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode'); // Add dark mode class
    } else {
      document.body.classList.remove('dark-mode'); // Remove dark mode class
    }
  }, [isDarkMode]); // This will run whenever `isDarkMode` changes

  return (
    <div>
      {/* Render the Settings component */}
      <Settings />
    </div>
  );
}

export default App;
