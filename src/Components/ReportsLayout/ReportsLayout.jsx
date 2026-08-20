import React from 'react';
import ProfileCard from '../ProfileCard/ProfileCard';

const ReportsLayout = () => {
  return (
    <div className="reports-container" style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Reports & Profile Management</h1>
      <ProfileCard />
    </div>
  );
};

export default ReportsLayout;