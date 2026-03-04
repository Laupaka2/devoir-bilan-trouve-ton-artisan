/**
 * Devoir bilan – Trouve ton artisan
 * Route POST /contacts : validation express-validator (nom, email, objet, message, artisan_id),
 * création en BDD, envoi email optionnel à l'artisan si SMTP configuré.
 */
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const Artisan = require('../models/Artisan');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const contactValidation = [
  body('nom')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Le nom doit contenir entre 2 et 200 caractères'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email invalide'),
  body('objet')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('L\'objet doit contenir entre 3 et 200 caractères'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Le message doit contenir entre 10 et 5000 caractères'),
  body('artisan_id')
    .isInt()
    .withMessage('L\'ID de l\'artisan est requis')
];

router.post('/', contactValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { artisan_id, nom, email, objet, message } = req.body;

    const artisan = await Artisan.findByPk(artisan_id);
    if (!artisan) {
      return res.status(404).json({ error: 'Artisan non trouvé' });
    }

    const contact = await Contact.create({
      artisan_id,
      nom: nom.trim(),
      email: email.trim().toLowerCase(),
      objet: objet.trim(),
      message: message.trim()
    });
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        await transporter.sendMail({
          from: `"Trouve ton artisan" <${process.env.EMAIL_USER}>`,
          to: artisan.email,
          replyTo: email,
          subject: `Nouveau contact depuis Trouve ton artisan : ${objet}`,
          html: `
            <h2>Nouveau message de contact</h2>
            <p><strong>De :</strong> ${nom} (${email})</p>
            <p><strong>Objet :</strong> ${objet}</p>
            <p><strong>Message :</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><em>Ce message a été envoyé depuis le formulaire de contact de Trouve ton artisan.</em></p>
          `,
          text: `
Nouveau message de contact
De : ${nom} (${email})
Objet : ${objet}

Message :
${message}

---
Ce message a été envoyé depuis le formulaire de contact de Trouve ton artisan.
          `
        });
      } catch (emailError) {
        console.error('Erreur lors de l\'envoi de l\'email:', emailError);
      }
    }

    res.status(201).json({
      message: 'Message envoyé avec succès',
      contact: {
        id: contact.id,
        nom: contact.nom,
        email: contact.email,
        objet: contact.objet
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

