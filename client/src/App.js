import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { SignInPage } from './pages/SignInPage';
import { Settings } from './pages/Settings';
import { ThemeContext } from './context/ThemeContext';  // Import context
import WorkoutRoutineDisplay from './pages/workoutRoutineDisplay';

function App() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [message, setMessage] = useState('');
  const { isDarkMode } = useContext(ThemeContext); // Access theme state


  useEffect(() => {
    fetch('http://localhost:5001/api') // Use full backend URL
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Error:', error));
  
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
  
  // Apply dark mode styles when the theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode'); // Add dark mode class
    } else {
      document.body.classList.remove('dark-mode'); // Remove dark mode class
    }
  }, [isDarkMode]); // This will run whenever `isDarkMode` changes
  
  // return (
  //   <div>
  //     <h1>Message from Backend:</h1>
  //     <p>{message}</p>

  //     {!isAuthenticated ? (
  //       <button onClick={() => loginWithRedirect()}>Log In</button>
  //     ) : (
  //       <>
  //         <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
  //         <h2>Welcome, {user.name}</h2>
  //       </>
  //     )}
  //   </div>
  // );

  // Testing purpose for workout routine display frontend
  return (
    <div>
      {/* Conditionally render based on authentication */}
      {!isAuthenticated ? (
        <SignInPage /> 
      ) : (
        <>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
          <h2>Welcome, {user.name}</h2>
          <Settings/>
        </>
      
      )}

    </div>
  );
}

export default App;
