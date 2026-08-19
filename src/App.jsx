import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Notification from './Components/Notification/Notification';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import 'reactjs-popup/dist/index.css';

function App() {
  return (
    <BrowserRouter>
      <Notification>
        <div className="App">
          <Routes>
            {/* Redirige la ruta raíz "/" automáticamente a "/instant-consultation" */}
            <Route path="/" element={<Navigate to="/instant-consultation" />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
          </Routes>
        </div>
      </Notification>
    </BrowserRouter>
  );
}

export default App;