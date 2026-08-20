import React, { useState, useEffect } from 'react';
import './ProfileCard.css';

function ProfileCard() {
  const [userDetails, setUserDetails] = useState({
    name: 'Usuario Demo',
    email: 'usuario@ejemplo.com',
    phone: '+1 234 567 890'
  });

  useEffect(() => {
    // Al cargar la página, intenta recuperar los datos reales de la sesión
    const storedEmail = sessionStorage.getItem('email') || localStorage.getItem('email');
    const storedName = sessionStorage.getItem('name') || localStorage.getItem('name');
    const storedPhone = sessionStorage.getItem('phone') || localStorage.getItem('phone');

    // Si existen datos reales en el almacenamiento, actualiza el estado; si no, mantiene los de prueba
    if (storedEmail || storedName || storedPhone) {
      setUserDetails({
        name: storedName || (storedEmail ? storedEmail.split('@')[0] : 'Usuario Demo'),
        email: storedEmail || 'usuario@ejemplo.com',
        phone: storedPhone || '+1 234 567 890'
      });
    } else {
      // Guarda valores por defecto automáticamente para que toda la App reconozca la sesión activa
      sessionStorage.setItem('auth-token', 'token_demo_inicial');
      sessionStorage.setItem('email', 'usuario@ejemplo.com');
      sessionStorage.setItem('name', 'Usuario Demo');
      sessionStorage.setItem('phone', '+1 234 567 890');
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