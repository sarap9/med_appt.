import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Notification from './Components/Notification/Notification';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import ProfileCard from './Components/ProfileCard/ProfileCard';
// Descomenta e importa estos componentes si existen en tu proyecto:
// import SignUp from './Components/SignUp/SignUp';
// import Login from './Components/Login/Login';

import 'reactjs-popup/dist/index.css';

function App() {
  const doctorsData = [
    { id: 1, name: 'Dr. Denis Raj', specialty: 'Dentist' },
    { id: 2, name: 'Dr. Michael Smith', specialty: 'General Physician' },
    { id: 3, name: 'Dr. Laura Taylor', specialty: 'General Physician' }
  ];

  return (
    <BrowserRouter>
      <Navbar />
      <Notification>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <InstantConsultation />
                  <ReviewForm doctorsData={doctorsData} />
                </>
              }
            />
            <Route
              path="/instant-consultation"
              element={
                <>
                  <InstantConsultation />
                  <ReviewForm doctorsData={doctorsData} />
                </>
              }
            />
            <Route path="/appointments" element={<InstantConsultation />} />
            <Route path="/reviews" element={<ReviewForm doctorsData={doctorsData} />} />
            <Route path="/profile" element={<ProfileCard />} />
            
            {/* Rutas adicionales de autenticación si las requieres */}
            {/* <Route path="/signup" element={<SignUp />} /> */}
            {/* <Route path="/login" element={<Login />} /> */}
          </Routes>
        </div>
      </Notification>
    </BrowserRouter>
  );
}

export default App;