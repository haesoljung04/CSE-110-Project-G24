import React, {useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { SignInPage } from './pages/SignInPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FriendsList from './pages/FriendsList'; 
import { Settings } from './pages/Settings';
import { ThemeContext } from './context/ThemeContext';  // Import context
import WorkoutRoutineDisplay from './pages/workoutRoutineDisplay';
import ProfilePage from './pages/ProfilePage';
import WorkoutPage from './pages/WorkoutPage';
import WorkoutListPage  from './pages/WorkoutListPage';
import BlockedFriendsPage from './pages/BlockedFriendsPage';


function App() {
  const { logout, isAuthenticated, user } = useAuth0();
  const { isDarkMode } = useContext(ThemeContext); // Access theme state


  useEffect(() => {
    fetch('http://localhost:5001/api') // Use full backend URL
      .then((response) => response.json())
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

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('Auth0 user ID:', user.sub); // Debugging
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


          <Router>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="friends"> friends </Link>
        <Link to="WorkoutListPage"> WorkoutListPage </Link>
        <Link to="WorkoutPage"> CreateWorkout </Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="friends" element={<FriendsList />} />
        <Route path="WorkoutRoutineDisplay" element={<WorkoutRoutineDisplay />} />
        <Route path="WorkoutListPage" element={<WorkoutListPage />} />
        <Route path="WorkoutPage" element={<WorkoutPage />} />
        <Route path="Settings" element={<Settings />}>
        </Route>
      </Routes>
    </Router>
        </>
      
      )}

    </div>
  );
}

export default App;
