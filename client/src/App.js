import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorkoutPage from './pages/WorkoutPage'; 
import BlockedFriendsPage from './pages/BlockedFriendsPage';
import WorkoutListPage from './pages/WorkoutListPage';

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
    <Router>
      <div>
        <Routes>
          <Route path="/workouts" element={<WorkoutPage />} />
          <Route path="/friends/blocked" element={<BlockedFriendsPage />} />
          <Route path="/workoutslist" element={<WorkoutListPage />} /> 
        </Routes>
      </div>
    </Router>
  );

  
}

export default App;
