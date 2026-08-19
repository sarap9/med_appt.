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

  const handleStarClick = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.review.trim() && formData.rating > 0) {
      setSubmittedMessage(formData);
      setShowForm(false);
      setShowWarning(false);
      setIsButtonDisabled(true);
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
          <tr>
            <td>1</td>
            <td>Dr. Denis Raj</td>
            <td>Dentist</td>
            <td>
              <button 
                className="btn-give-review" 
                onClick={handleButtonClick}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? 'Submitted' : 'Click Here'}
              </button>
            </td>
            <td>
              {submittedMessage ? submittedMessage.review : 'No review given yet'}
            </td>
          </tr>
        </tbody>
      </table>

      {showForm && (
        <div className="modal-overlay">
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
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {submittedMessage && (
        <div className="submitted-feedback-card">
          <h3>Submitted Feedback:</h3>
          <p><strong>Name:</strong> {submittedMessage.name}</p>
          <p><strong>Review:</strong> {submittedMessage.review}</p>
          <p><strong>Rating:</strong> {'★'.repeat(submittedMessage.rating)}</p>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;
