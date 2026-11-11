import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProfileCard from './Components/ProfileCard/ProfileCard';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';

export default function App() {
  return (
    <Routes>
      {/* Redirige la ruta raíz al dashboard de perfil */}
      <Route path="/" element={<Navigate to="/profile" replace />} />
      
      {/* Ruta principal con el Patient Dashboard */}
      <Route
        path="/profile"
        element={
          <div style={{ padding: '30px', backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>
              Patient Dashboard
            </h1>
            <div style={{ maxWidth: '700px', margin: '0 auto 40px auto' }}>
              <ProfileCard />
            </div>
            <hr style={{ border: '0', borderTop: '1px solid #ddd', margin: '40px 0' }} />
            <ReportsLayout />
          </div>
        }
      />
      
      {/* Ruta comodín por si se ingresa una URL desconocida */}
      <Route path="*" element={<Navigate to="/profile" replace />} />
    </Routes>
  );
}