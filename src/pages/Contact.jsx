import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { canSubmitForm, getRemainingTime, recordFormSubmit } from '../utils/rateLimiter';
import { sanitizeInput, sanitizeEmail } from '../utils/sanitize';
import './Contact.css';

const Contact = () => {
  const { sendContactEmail, contactLoading, contactSuccess, contactError, clearContactStatus } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Clear status when component unmounts
  useEffect(() => {
    return () => clearContactStatus();
  }, []);

  // Clear success message after 5 seconds
  useEffect(() => {
    if (contactSuccess) {
      const timer = setTimeout(() => {
        clearContactStatus();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [contactSuccess]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check rate limit
    if (!canSubmitForm()) {
      const remainingTime = getRemainingTime();
      alert(`Por favor espera ${remainingTime} minuto(s) antes de enviar otro mensaje.`);
      return;
    }
    
    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeEmail(formData.email),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message)
    };
    
    // Validate sanitized data
    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.message) {
      alert('Por favor completa todos los campos requeridos correctamente.');
      return;
    }
    
    try {
      await sendContactEmail(sanitizedData);
      // Record submission for rate limiting
      recordFormSubmit();
      // Clear form on success
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      // Error is handled by context
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="container section">
      <div className="section-header">
        <h1 className="section-title">Contacto</h1>
        <p className="section-subtitle">¿Tienes alguna pregunta? Estamos aquí para ayudarte.</p>
      </div>

      {/* Success Notification */}
      {contactSuccess && (
        <div className="notification notification-success">
          <FaCheckCircle className="notification-icon" />
          <div>
            <h4>¡Mensaje enviado!</h4>
            <p>Gracias por contactarnos. Te responderemos pronto.</p>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {contactError && (
        <div className="notification notification-error">
          <FaExclamationCircle className="notification-icon" />
          <div>
            <h4>Error al enviar</h4>
            <p>{contactError}</p>
          </div>
        </div>
      )}

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <div>
              <h3>Email</h3>
              <p>contacto@pablotraberzo.com</p>
            </div>
          </div>
          <div className="info-item">
            <FaPhone className="info-icon" />
            <div>
              <h3>Teléfono</h3>
              <p>+598 000 000 000</p>
            </div>
          </div>
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <div>
              <h3>Ubicación</h3>
              <p>Montevideo, Uruguay</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={contactLoading}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={contactLoading}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Asunto</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={contactLoading}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              disabled={contactLoading}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn" disabled={contactLoading}>
            {contactLoading ? (
              <>
                <span className="spinner"></span>
                Enviando...
              </>
            ) : (
              'Enviar Mensaje'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
