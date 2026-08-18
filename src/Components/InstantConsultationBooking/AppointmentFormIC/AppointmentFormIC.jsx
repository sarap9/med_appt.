import React, { useState } from 'react';

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ name, phoneNumber });
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <h2>Book Instant Consultation</h2>
      <p>Doctor: {doctorName} ({doctorSpeciality})</p>
      
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn-primary">Book Now</button>
    </form>
  );
};

export default AppointmentFormIC;