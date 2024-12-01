import React from 'react';

const Profile = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;