import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import WorkoutPage from './pages/WorkoutPage'; 

function App() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [message, setMessage] = useState('');

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
  
  return (
    <div>
      <h1>Message from Backend:</h1>
      <p>{message}</p>
      <WorkoutPage />

      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      ) : (
        <>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
          <h2>Welcome, {user.name}</h2>
        </>
      )}
    </div>
  );
}

export default App;
