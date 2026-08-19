import React, { useState } from 'react';
import './ReviewForm.css';

function ReviewForm() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0,
  });

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.review && formData.rating > 0) {
      setSubmitted(true);
    }
  };

  return (
    <div className="review-container">
      <h2>Reviews & Feedback</h2>
      
      {!showForm ? (
        <div className="review-intro">
          <p>Please share your feedback regarding your recent consultation.</p>
          <button className="btn-feedback" onClick={handleButtonClick}>
            Click Here to Give Feedback
          </button>
        </div>
      ) : (
        <div className="review-form-wrapper">
          {submitted ? (
            <div className="review-success">
              <h3>Thank you for your feedback!</h3>
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Feedback:</strong> {formData.review}</p>
              <p><strong>Rating:</strong> {'★'.repeat(formData.rating)}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="review-form">
              <h3>Consultation Feedback</h3>
              
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
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
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="rating">Rating (1 to 5):</label>
                <select
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                >
                  <option value="0">Select Rating</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>

              <button type="submit" className="btn-submit">Submit Feedback</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default ReviewForm;