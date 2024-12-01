import React from 'react';
import './ProfilePage.css'; // Optional, depending on your styling preference

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <section className="profile-header">
        <div className="profile-picture" />
        <h2>Name</h2>
      </section>

      <section className="workout-tracking">
        <h3>Monthly Workout Tracking</h3>
        <div className="tracking-chart"> {/* Replace with chart library if needed */}</div>
      </section>

      <section className="weekly-goals">
        <h3>Weekly Goal Streaks</h3>
        <ul>
          <li>You achieved 225 pounds of deadlift!</li>
          <li>You went to the gym 5 days this week!</li>
          <li>You achieved 200 pounds of benchpress!</li>
        </ul>
      </section>

      <section className="progress-report">
        <h3>Progress Report</h3>
        <div className="progress-item">
          <h4>Weightlifting</h4>
          <div className="progress-chart"> {/* Replace with a graph library if needed */}</div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;