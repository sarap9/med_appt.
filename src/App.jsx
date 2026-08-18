import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import 'reactjs-popup/dist/index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/instant-consultation" element={<InstantConsultation />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;