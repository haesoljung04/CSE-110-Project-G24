import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AddFriend from './pages/AddFriend 2';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


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
    if (isAuthenticated && user) {
      navigate('/add-friend');
    }
  }, [isAuthenticated, user, navigate]);
  
  return (
      <div>
        <h1>Message from Backend:</h1>
        <p>{message}</p>

        {!isAuthenticated ? (
          <button onClick={() => loginWithRedirect()}>Log In</button>
        ) : (
          <>
            <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
            <h2>Welcome, {user.name}</h2>
          </>
        )}
        <Routes>
        <Route path="/" element={<div>Welcome to the App! Please log in.</div>} />
        <Route
          path="/add-friend"
          element={
            <ProtectedRoute>
              <AddFriend />
            </ProtectedRoute>
          }
        />
      </Routes>
      </div>
  );
}

export default App;
