const express = require('express');
const request = require('supertest');

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn().mockResolvedValue({}),
  })),
}));

jest.mock('../models/Contact', () => ({
  create: jest.fn(),
}));

jest.mock('../models/Artisan', () => ({
  findByPk: jest.fn(),
}));

const Contact = require('../models/Contact');
const Artisan = require('../models/Artisan');
const contactsRoutes = require('./contacts');

const app = express();
app.use(express.json());
app.use('/api/contacts', contactsRoutes);

const validPayload = {
  nom: 'Jean Dupont',
  email: 'jean.dupont@example.com',
  objet: 'Demande de devis',
  message: 'Bonjour, je souhaite obtenir un devis.',
  artisan_id: 1,
};

describe('POST /api/contacts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retourne 400 si artisan_id est absent', async () => {
    const { artisan_id, ...payload } = validPayload;

    const response = await request(app).post('/api/contacts').send(payload);

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'artisan_id' }),
      ])
    );
  });

  it('retourne 400 si email invalide', async () => {
    const response = await request(app)
      .post('/api/contacts')
      .send({ ...validPayload, email: 'email-invalide' });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'email' }),
      ])
    );
  });

  it('retourne 400 si message trop court', async () => {
    const response = await request(app)
      .post('/api/contacts')
      .send({ ...validPayload, message: 'Court' });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'message' }),
      ])
    );
  });

  it('retourne 404 si artisan inexistant', async () => {
    Artisan.findByPk.mockResolvedValue(null);

    const response = await request(app).post('/api/contacts').send(validPayload);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Artisan non trouvé' });
  });

  it('retourne 201 et cree le contact si payload valide', async () => {
    Artisan.findByPk.mockResolvedValue({ id: 1, email: 'artisan@example.com' });
    Contact.create.mockResolvedValue({
      id: 42,
      nom: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      objet: 'Demande de devis',
    });

    const response = await request(app).post('/api/contacts').send(validPayload);

    expect(response.status).toBe(201);
    expect(Contact.create).toHaveBeenCalledWith({
      artisan_id: 1,
      nom: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      objet: 'Demande de devis',
      message: 'Bonjour, je souhaite obtenir un devis.',
    });
    expect(response.body.message).toBe('Message envoyé avec succès');
    expect(response.body.contact).toEqual(
      expect.objectContaining({ id: 42, nom: 'Jean Dupont' })
    );
  });
});
