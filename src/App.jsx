import React from 'react';
import ProfileCard from './Components/ProfileCard/ProfileCard';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';

export default function App() {
  return (
    <div style={{ padding: '30px', backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>
        Patient Dashboard
      </h1>

      {/* Tarjeta de Perfil */}
      <div style={{ maxWidth: '700px', margin: '0 auto 40px auto' }}>
        <ProfileCard />
      </div>

      <hr style={{ border: '0', borderTop: '1px solid #ddd', margin: '40px 0' }} />

      {/* Tabla de Reportes Médicos */}
      <ReportsLayout />
    </div>
  );
}