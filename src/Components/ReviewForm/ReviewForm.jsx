
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

  // Función para manejar el clic en las estrellas y actualizar el rating
  const handleStarClick = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación: campos no vacíos y rating > 0
    if (formData.name.trim() && formData.review.trim() && formData.rating > 0) {
      setSubmittedMessage(formData);
      setShowForm(false);
      setShowWarning(false);
      setIsButtonDisabled(true); // Deshabilitar el botón después de enviar
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

          {/* Selector de calificación interactivo con estrellas */}
          <div className="form-group star-rating-container">
            <label htmlFor="rating">Rating (1 to 5):</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${formData.rating >= star ? 'filled' : ''}`}
                  onClick={() => handleStarClick(star)}
                >
                  &#9733; {/* Código HTML para una estrella rellena: ★ */}
                </span>
              ))}
            </div>
            {/* Campo oculto para asegurar que la calificación sea parte del formulario enviado */}
            <input type="hidden" name="rating" value={formData.rating} />
          </div>

          <button type="submit" className="btn-submit">Submit</button>
        </form>
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