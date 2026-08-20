import React, { useState, useEffect } from 'react';
import './ProfileCard.css';

function ProfileCard() {
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 234 567 890'
  });

  useEffect(() => {
    const storedName = sessionStorage.getItem('name');
    const storedEmail = sessionStorage.getItem('email');
    const storedPhone = sessionStorage.getItem('phone');

    if (storedName || storedEmail || storedPhone) {
      setUserDetails({
        name: storedName || 'John Doe',
        email: storedEmail || 'johndoe@example.com',
        phone: storedPhone || '+1 234 567 890'
      });
    }
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Profile</h2>
        <div className="profile-details">
          <div className="profile-field">
            <label>Full Name:</label>
            <p>{userDetails.name}</p>
          </div>
          <div className="profile-field">
            <label>Email Address:</label>
            <p>{userDetails.email}</p>
          </div>
          <div className="profile-field">
            <label>Phone Number:</label>
            <p>{userDetails.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;