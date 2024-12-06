import React, { useEffect, useState } from 'react';
import './ProfilePage.css'; // Optional styling
import { useAuth0 } from '@auth0/auth0-react';

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/profile?auth0_id=${user.sub}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`);
      }
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfileData = async (updates) => {
    try {
      const response = await fetch(`http://localhost:5001/api/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auth0_id: user.sub, ...updates }),
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      await fetchProfileData(); // Refresh the data after update
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const incrementGymStreak = () => {
    updateProfileData({ gym_streak: (profileData.gym_streak || 0) + 1 });
  };

  const updatePR = (exercise, value) => {
    updateProfileData({ [exercise]: value });
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchProfileData();
    }
  }, [isAuthenticated, user]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="profile-page">
      <section className="profile-header">
        <img 
          src={profileData.profile_picture || 'default-profile-pic.jpg'} 
          alt="Profile" 
          className="profile-picture"
        />
        <h2>{profileData.name}</h2>
      </section>

      <section className="workout-tracking">
        <h3>Gym Streak</h3>
        <p>You have gone to the gym {profileData.gym_streak || 0} times!</p>
        <button onClick={incrementGymStreak}>Increment Streak</button>

        <h3>Personal Records</h3>
        <div>
          <label>
            Squat (lbs): 
            <input 
              type="number" 
              value={profileData.squat || ''} 
              onChange={(e) => updatePR('squat', parseInt(e.target.value, 10))}
            />
          </label>
        </div>
        <div>
          <label>
            Bench Press (lbs): 
            <input 
              type="number" 
              value={profileData.benchpress || ''} 
              onChange={(e) => updatePR('benchpress', parseInt(e.target.value, 10))}
            />
          </label>
        </div>
        <div>
          <label>
            Deadlift (lbs): 
            <input 
              type="number" 
              value={profileData.deadlift || ''} 
              onChange={(e) => updatePR('deadlift', parseInt(e.target.value, 10))}
            />
          </label>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;