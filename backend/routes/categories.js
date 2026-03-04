/**
 * Devoir bilan – Trouve ton artisan
 * Routes catégories : liste avec spécialités, une catégorie par slug.
 */
const express = require('express');
const router = express.Router();
const Categorie = require('../models/Categorie');
const Specialite = require('../models/Specialite');

router.get('/', async (req, res, next) => {
  try {
    const categories = await Categorie.findAll({
      attributes: ['id', 'nom', 'slug'],
      include: [{
        model: Specialite,
        as: 'specialites',
        attributes: ['id', 'nom', 'slug']
      }],
      order: [['nom', 'ASC']]
    });
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const categorie = await Categorie.findOne({
      where: { slug: req.params.slug },
      attributes: ['id', 'nom', 'slug'],
      include: [{
        model: Specialite,
        as: 'specialites',
        attributes: ['id', 'nom', 'slug']
      }]
    });

    if (!categorie) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }

    res.json(categorie);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

