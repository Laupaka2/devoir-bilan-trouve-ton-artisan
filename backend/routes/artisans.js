const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const Artisan = require('../models/Artisan');
const Specialite = require('../models/Specialite');
const Categorie = require('../models/Categorie');
const sequelize = require('../config/database');

// GET /api/artisans - Récupérer tous les artisans avec filtres optionnels
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
    
    // Filtre par catégorie (via la spécialité)
    if (categorie_id) {
      include[0].where = {
        categorie_id: categorie_id
      };
    }
    
    // Construire les conditions where
    const whereConditions = {};
    
    // Appliquer les filtres
    if (specialite_id) {
      whereConditions.specialite_id = specialite_id;
    }
    if (artisan_du_mois === 'true') {
      whereConditions.artisan_du_mois = true;
    }
    
    // Recherche insensible à la casse sur le nom de l'artisan
    if (search) {
      // Échapper les apostrophes pour éviter les injections SQL
      const escapedSearch = search.replace(/'/g, "''").replace(/\\/g, '\\\\');
      // Faire une requête SQL brute pour trouver les IDs des artisans correspondants
      // Cela évite l'ambiguïté de colonne avec les JOINs
      const results = await sequelize.query(
        `SELECT id FROM artisans WHERE LOWER(nom) LIKE LOWER(:search)`,
        {
          replacements: { search: `%${escapedSearch}%` },
          type: Sequelize.QueryTypes.SELECT
        }
      );
      
      // Vérifier si des résultats ont été trouvés
      if (Array.isArray(results) && results.length > 0) {
        const artisanIds = results.map(r => r.id);
        // Filtrer par les IDs trouvés
        whereConditions.id = {
          [Op.in]: artisanIds
        };
      } else {
        // Aucun artisan trouvé, retourner un tableau vide
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

// GET /api/artisans/du-mois - Récupérer les artisans du mois (limité à 3)
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

// GET /api/artisans/:id - Récupérer un artisan par son ID
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

