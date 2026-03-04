/**
 * Devoir bilan – Trouve ton artisan
 * Routes artisans : liste (filtres search, categorie_id, artisan_du_mois), du-mois, détail par id.
 * Pour la recherche par nom j'échappe les apostrophes et j'utilise une requête paramétrée pour éviter l'injection SQL.
 */
const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const Artisan = require('../models/Artisan');
const Specialite = require('../models/Specialite');
const Categorie = require('../models/Categorie');
const sequelize = require('../config/database');

router.get('/', async (req, res, next) => {
  try {
    const { search, specialite_id, categorie_id, artisan_du_mois } = req.query;
    
    const include = [{
      model: Specialite,
      as: 'specialite',
      attributes: ['id', 'nom', 'slug'],
      include: [{
        model: Categorie,
        as: 'categorie',
        attributes: ['id', 'nom', 'slug']
      }]
    }];
    
    if (categorie_id) {
      include[0].where = {
        categorie_id: categorie_id
      };
    }
    
    const whereConditions = {};
    if (specialite_id) {
      whereConditions.specialite_id = specialite_id;
    }
    if (artisan_du_mois === 'true') {
      whereConditions.artisan_du_mois = true;
    }
    
    if (search) {
      const escapedSearch = search.replace(/'/g, "''").replace(/\\/g, '\\\\');
      const results = await sequelize.query(
        `SELECT id FROM artisans WHERE LOWER(nom) LIKE LOWER(:search)`,
        {
          replacements: { search: `%${escapedSearch}%` },
          type: Sequelize.QueryTypes.SELECT
        }
      );
      if (Array.isArray(results) && results.length > 0) {
        const artisanIds = results.map(r => r.id);
        whereConditions.id = {
          [Op.in]: artisanIds
        };
      } else {
        return res.json([]);
      }
    }
    
    const artisans = await Artisan.findAll({
      where: whereConditions,
      include,
      order: [
        ['artisan_du_mois', 'DESC'],
        ['note', 'DESC'],
        ['nom', 'ASC']
      ]
    });
    
    res.json(artisans);
  } catch (error) {
    next(error);
  }
});

router.get('/du-mois', async (req, res, next) => {
  try {
    const artisans = await Artisan.findAll({
      where: { artisan_du_mois: true },
      include: [{
        model: Specialite,
        as: 'specialite',
        attributes: ['id', 'nom', 'slug'],
        include: [{
          model: Categorie,
          as: 'categorie',
          attributes: ['id', 'nom', 'slug']
        }]
      }],
      order: [['note', 'DESC']],
      limit: 3
    });
    
    res.json(artisans);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: [{
        model: Specialite,
        as: 'specialite',
        attributes: ['id', 'nom', 'slug'],
        include: [{
          model: Categorie,
          as: 'categorie',
          attributes: ['id', 'nom', 'slug']
        }]
      }]
    });

    if (!artisan) {
      return res.status(404).json({ error: 'Artisan non trouvé' });
    }

    res.json(artisan);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

