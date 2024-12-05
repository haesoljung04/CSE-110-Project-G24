import React, { useEffect, useState } from 'react';
import './ProfilePage.css'; // Optional styling
import { useAuth0 } from '@auth0/auth0-react';

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Fetch user profile data from the backend
      fetch(`http://localhost:5001/api/profile?auth0_id=${user.sub}`)
        .then((response) => response.json())
        .then((data) => setProfileData(data))
        .catch((error) => console.error('Error fetching profile:', error));
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated || !profileData) {
    return <p>Loading profile...</p>;
  }

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
        <p>You have gone to the gym {profileData.gym_streak} times!</p>
        <p>You achieved 225 pounds of deadlift!</p>
        <p>You achieved 200 pounds of benchpress!</p>
      </section>
    </div>
  );
};

export default ProfilePage;