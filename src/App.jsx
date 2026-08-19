import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Notification from './Components/Notification/Notification';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import 'reactjs-popup/dist/index.css';

function App() {
  return (
    <BrowserRouter>
      <Notification>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <InstantConsultation />
                  <ReviewForm />
                </>
              }
            />
            <Route
              path="/instant-consultation"
              element={
                <>
                  <InstantConsultation />
                  <ReviewForm />
                </>
              }
            />
            <Route path="/reviews" element={<ReviewForm />} />
          </Routes>
        </div>
      </Notification>
    </BrowserRouter>
  );
}

export default App;