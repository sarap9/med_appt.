import React from 'react';

export default function App() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', background: '#f4f6f8', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>
        Patient Dashboard - Integrated View
      </h1>

      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3>Profile Section</h3>
        <p>Aquí está integrada tu tarjeta de perfil.</p>
      </div>

      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3>Reports Section</h3>
        <p>Aquí está integrada tu tabla de reportes médicos con los botones View y Download.</p>
      </div>
    </div>
  );
}