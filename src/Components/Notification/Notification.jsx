import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

// Function component Notification to display user notifications
const Notification = ({ children }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  
  // State variable to determine when the notification should be displayed
  const [showNotification, setShowNotification] = useState(true);

  // useEffect hook to perform side effects in the component
  useEffect(() => {
    // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
      const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));
      if (storedAppointmentData) {
        setAppointmentData(storedAppointmentData);
      }
    }
  }, []);

  // Handler function to cancel appointment and hide notification
  const handleCancel = () => {
    if (doctorData?.name) {
      // Remove stored appointment from localStorage
      localStorage.removeItem(doctorData.name);
      localStorage.removeItem('doctorData');
    }
    // Updating state triggers re-render to remove notification from DOM
    setShowNotification(false);
  };

  // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  return (
    <div>
      {/* Render Navbar component */}
      <Navbar />
      
      {/* Render children components */}
      {children}
      
      {/* Display appointment details if user is logged in, notification is enabled, and appointmentData exists */}
      {isLoggedIn && appointmentData && showNotification && (
        <div className="appointment-card">
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Appointment Details</h3>
            
            {/* Display user name who booked appointment */}
            <p className="appointment-card__message">
              <strong>User:</strong> {username}
            </p>
            
            {/* Display doctor's name */}
            <p className="appointment-card__message">
              <strong>Doctor:</strong> {doctorData?.name}
            </p>
            
            {/* Display doctor's specialty */}
            <p className="appointment-card__message">
              <strong>Speciality:</strong> {doctorData?.speciality}
            </p>

            {/* Display appointment date */}
            <p className="appointment-card__message">
              <strong>Date:</strong> {appointmentData?.date}
            </p>

            {/* Display appointment time */}
            <p className="appointment-card__message">
              <strong>Time:</strong> {appointmentData?.time}
            </p>

            {/* Button to trigger state change and cancellation */}
            <button className="cancel-appointment-btn" onClick={handleCancel}>
              Cancel Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification;