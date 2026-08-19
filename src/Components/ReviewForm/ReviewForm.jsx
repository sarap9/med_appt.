import React, { useState } from 'react';
import './ReviewForm.css';

function ReviewForm({ doctorsData }) {
  // Datos por defecto en caso de no recibir la prop doctorsData
  const initialDoctors = doctorsData || [
    { id: 1, name: 'Dr. Denis Raj', specialty: 'Dentist' },
    { id: 2, name: 'Dr. Michael Smith', specialty: 'General Physician' },
    { id: 3, name: 'Dr. Laura Taylor', specialty: 'General Physician' }
  ];

  const [reviews, setReviews] = useState({});
  const [activeDoctor, setActiveDoctor] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });

  const handleOpenForm = (doctor) => {
    setActiveDoctor(doctor);
    setFormData({ name: '', review: '', rating: 0 });
    setShowWarning(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStarClick = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.review.trim() && formData.rating > 0) {
      setReviews((prev) => ({
        ...prev,
        [activeDoctor.id]: {
          name: formData.name,
          review: formData.review,
          rating: formData.rating
        }
      }));
      setActiveDoctor(null);
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="review-container">
      <h2>Reviews and Feedback</h2>

      <table className="review-table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Doctor Name</th>
            <th>Doctor Specialty</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {initialDoctors.map((doc, index) => {
            const hasReview = reviews[doc.id];
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.name}</td>
                <td>{doc.specialty}</td>
                <td>
                  <button
                    className="btn-give-review"
                    onClick={() => handleOpenForm(doc)}
                    disabled={!!hasReview}
                  >
                    {hasReview ? 'Submitted' : 'Click Here'}
                  </button>
                </td>
                <td>
                  {hasReview ? hasReview.review : 'No review given yet'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {activeDoctor && (
        <div className="modal-overlay">
          <form onSubmit={handleSubmit} className="feedback-form">
            <h3>Give Your Feedback for {activeDoctor.name}</h3>
            <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: '0.9rem' }}>
              Specialty: <strong>{activeDoctor.specialty}</strong>
            </p>

            {showWarning && (
              <p className="warning-msg">Please fill out all fields including rating.</p>
            )}

            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="review">Review:</label>
              <textarea
                id="review"
                name="review"
                rows="4"
                value={formData.review}
                onChange={handleChange}
                placeholder="Write your review here..."
              />
            </div>

            <div className="form-group star-rating-container">
              <label>Rating (1 to 5):</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${formData.rating >= star ? 'filled' : ''}`}
                    onClick={() => handleStarClick(star)}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">Submit</button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setActiveDoctor(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;