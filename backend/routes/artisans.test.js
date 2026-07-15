const express = require('express');
const request = require('supertest');
const { Sequelize } = require('sequelize');

jest.mock('../models/Artisan', () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
}));

jest.mock('../models/Specialite', () => ({}));
jest.mock('../models/Categorie', () => ({}));

jest.mock('../config/database', () => ({
  query: jest.fn(),
}));

const Artisan = require('../models/Artisan');
const sequelize = require('../config/database');
const artisansRoutes = require('./artisans');

const app = express();
app.use(express.json());
app.use('/api/artisans', artisansRoutes);

describe('GET /api/artisans', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retourne 404 si artisan inexistant', async () => {
    Artisan.findByPk.mockResolvedValue(null);

    const response = await request(app).get('/api/artisans/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Artisan non trouvé' });
  });

  it('retourne 200 avec artisan existant', async () => {
    Artisan.findByPk.mockResolvedValue({
      id: 1,
      nom: 'Chocolaterie Labbé',
    });

    const response = await request(app).get('/api/artisans/1');

    expect(response.status).toBe(200);
    expect(response.body.nom).toBe('Chocolaterie Labbé');
  });

  it('retourne un tableau vide si recherche sans resultat', async () => {
    sequelize.query.mockResolvedValue([]);

    const response = await request(app).get('/api/artisans?search=xxx');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
    expect(Artisan.findAll).not.toHaveBeenCalled();
  });

  it('filtre par recherche avec requete parametree', async () => {
    sequelize.query.mockResolvedValue([{ id: 5 }]);
    Artisan.findAll.mockResolvedValue([{ id: 5, nom: 'Labbé' }]);

    const response = await request(app).get('/api/artisans?search=Labb%C3%A9');

    expect(response.status).toBe(200);
    expect(sequelize.query).toHaveBeenCalledWith(
      expect.stringContaining('LOWER(nom) LIKE LOWER(:search)'),
      expect.objectContaining({
        replacements: { search: '%Labbé%' },
        type: Sequelize.QueryTypes.SELECT,
      })
    );
    expect(Artisan.findAll).toHaveBeenCalled();
  });

  it('retourne les artisans du mois avec limite 3', async () => {
    Artisan.findAll.mockResolvedValue([
      { id: 1, nom: 'Artisan 1' },
      { id: 2, nom: 'Artisan 2' },
    ]);

    const response = await request(app).get('/api/artisans/du-mois');

    expect(response.status).toBe(200);
    expect(Artisan.findAll).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { artisan_du_mois: true },
        limit: 3,
      })
    );
    expect(response.body).toHaveLength(2);
  });
});
