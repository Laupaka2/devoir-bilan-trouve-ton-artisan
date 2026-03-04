/**
 * Devoir bilan – Trouve ton artisan
 * Formulaire de contact : nom, email, objet, message. Validation côté client (longueurs, format email).
 * J'envoie les données au parent qui appelle l'API ; j'affiche succès ou erreur et je réinitialise en cas de succès.
 */
import React, { useState } from 'react';
import './ContactForm.scss';

const ContactForm = ({ onSubmit, artisanNom }) => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    objet: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Règles de validation (alignées avec le backend express-validator)
  const validate = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    } else if (formData.nom.trim().length < 2) {
      newErrors.nom = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    if (!formData.objet.trim()) {
      newErrors.objet = 'L\'objet est requis';
    } else if (formData.objet.trim().length < 3) {
      newErrors.objet = 'L\'objet doit contenir au moins 3 caractères';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await onSubmit(formData);
      setSubmitMessage(result);
      
      if (result.success) {
        // Réinitialiser le formulaire
        setFormData({
          nom: '',
          email: '',
          objet: '',
          message: ''
        });
      }
    } catch (error) {
      setSubmitMessage({
        success: false,
        message: 'Une erreur est survenue. Veuillez réessayer.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate>
      {submitMessage && (
        <div className={`alert ${submitMessage.success ? 'alert-success' : 'alert-danger'}`} role="alert">
          {submitMessage.message}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="nom" className="form-label">
          Nom <span className="text-danger" aria-label="obligatoire">*</span>
        </label>
        <input
          type="text"
          className={`form-control ${errors.nom ? 'is-invalid' : ''}`}
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
          aria-describedby={errors.nom ? 'nom-error' : undefined}
        />
        {errors.nom && (
          <div id="nom-error" className="invalid-feedback">
            {errors.nom}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email <span className="text-danger" aria-label="obligatoire">*</span>
        </label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <div id="email-error" className="invalid-feedback">
            {errors.email}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="objet" className="form-label">
          Objet <span className="text-danger" aria-label="obligatoire">*</span>
        </label>
        <input
          type="text"
          className={`form-control ${errors.objet ? 'is-invalid' : ''}`}
          id="objet"
          name="objet"
          value={formData.objet}
          onChange={handleChange}
          required
          aria-describedby={errors.objet ? 'objet-error' : undefined}
        />
        {errors.objet && (
          <div id="objet-error" className="invalid-feedback">
            {errors.objet}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          Message <span className="text-danger" aria-label="obligatoire">*</span>
        </label>
        <textarea
          className={`form-control ${errors.message ? 'is-invalid' : ''}`}
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
          aria-describedby={errors.message ? 'message-error' : undefined}
        ></textarea>
        {errors.message && (
          <div id="message-error" className="invalid-feedback">
            {errors.message}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary-custom w-100"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>

      <p className="text-muted small mt-3 mb-0">
        * Champs obligatoires. Une réponse vous sera apportée sous 48h.
      </p>
    </form>
  );
};

export default ContactForm;

