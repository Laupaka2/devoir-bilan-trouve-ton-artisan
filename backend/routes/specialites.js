/**
 * Devoir bilan – Trouve ton artisan
 * Routes spécialités : liste (avec catégorie), par catégorie, par id.
 */
const express = require('express');
const router = express.Router();
const Specialite = require('../models/Specialite');
const Categorie = require('../models/Categorie');

router.get('/', async (req, res, next) => {
  try {
    const specialites = await Specialite.findAll({
      include: [{
        model: Categorie,
        as: 'categorie',
        attributes: ['id', 'nom', 'slug']
      }],
      order: [['nom', 'ASC']]
    });
    res.json(specialites);
  } catch (error) {
    next(error);
  }
});

router.get('/categorie/:categorieId', async (req, res, next) => {
  try {
    const specialites = await Specialite.findAll({
      where: { categorie_id: req.params.categorieId },
      include: [{
        model: Categorie,
        as: 'categorie',
        attributes: ['id', 'nom', 'slug']
      }],
      order: [['nom', 'ASC']]
    });
    res.json(specialites);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const specialite = await Specialite.findByPk(req.params.id, {
      include: [{
        model: Categorie,
        as: 'categorie',
        attributes: ['id', 'nom', 'slug']
      }]
    });

    if (!specialite) {
      return res.status(404).json({ error: 'Spécialité non trouvée' });
    }

    res.json(specialite);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

