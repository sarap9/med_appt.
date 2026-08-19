import React, { useState } from 'react';
import './ReviewForm.css';

function ReviewForm() {
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.review.trim() && Number(formData.rating) > 0) {
      setSubmittedMessage(formData);
      setShowForm(false);
      setShowWarning(false);
      setIsButtonDisabled(true);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="review-form-container">
      <h2>Consultation Reviews</h2>

      {!showForm && (
        <button 
          className="btn-give-review" 
          onClick={handleButtonClick}
          disabled={isButtonDisabled}
        >
          {isButtonDisabled ? 'Feedback Submitted' : 'Click Here to Give Feedback'}
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="feedback-form">
          <h3>Give Your Feedback</h3>

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

          <div className="form-group">
            <label htmlFor="rating">Rating (1 to 5):</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            >
              <option value="0">Select Rating</option>
              <option value="1">1 ★ - Poor</option>
              <option value="2">2 ★★ - Fair</option>
              <option value="3">3 ★★★ - Good</option>
              <option value="4">4 ★★★★ - Very Good</option>
              <option value="5">5 ★★★★★ - Excellent</option>
            </select>
          </div>

          <button type="submit" className="btn-submit">Submit</button>
        </form>
      )}

      {submittedMessage && (
        <div className="submitted-feedback-card">
          <h3>Submitted Feedback:</h3>
          <p><strong>Name:</strong> {submittedMessage.name}</p>
          <p><strong>Review:</strong> {submittedMessage.review}</p>
          <p><strong>Rating:</strong> {'★'.repeat(Number(submittedMessage.rating))}</p>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;