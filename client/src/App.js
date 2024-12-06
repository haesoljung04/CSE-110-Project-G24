import React, { useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { SignInPage } from './pages/SignInPage';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import FriendsList from './pages/FriendsList';
import { Settings } from './pages/Settings';
import { ThemeContext } from './context/ThemeContext';
import WorkoutRoutineDisplay from './pages/workoutRoutineDisplay';
import ProfilePage from './pages/ProfilePage';
import WorkoutPage from './pages/WorkoutPage';
import WorkoutListPage from './pages/WorkoutListPage';
import BlockedFriendsPage from './pages/BlockedFriendsPage';
import './App.css'; // Import CSS file for styling

function App() {
  const { logout, isAuthenticated, user } = useAuth0();
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetch('http://localhost:5001/api')
      .then((response) => response.json())
      .catch((error) => console.error('Error:', error));

    if (isAuthenticated && user) {
      fetch('http://localhost:5001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auth0_id: user.sub,
          name: user.name,
          email: user.email,
        }),
      }).catch((error) => console.error('Error:', error));
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('Auth0 user ID:', user.sub);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div>
      {!isAuthenticated ? (
        <SignInPage />
      ) : (
        <>
          <button
            className="logout-button"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Log Out
          </button>
          <h2>Welcome, {user.name}</h2>

          <Router>

            <header className="navbar">
              <nav>
                <NavLink to="/" className="nav-link" activeClassName="active-link">
                  Home
                </NavLink>
                <NavLink to="/friends" className="nav-link" activeClassName="active-link">
                  Friends
                </NavLink>
                <NavLink
                  to="/WorkoutListPage"
                  className="nav-link"
                  activeClassName="active-link"
                >
                  Workout List
                </NavLink>
                <NavLink to="/WorkoutPage" className="nav-link" activeClassName="active-link">
                  Create Workout
                </NavLink>
              </nav>
            </header>

            <Routes>
              <Route path="/" element={<ProfilePage />} />
              <Route path="friends" element={<FriendsList />} />
              <Route
                path="WorkoutRoutineDisplay"
                element={<WorkoutRoutineDisplay />}
              />
              <Route path="Settings" element={<Settings />} />
              <Route path="WorkoutListPage" element={<WorkoutListPage />} />
              <Route path="WorkoutPage" element={<WorkoutPage />} />
            </Routes>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
