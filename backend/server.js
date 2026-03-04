/**
 * Devoir bilan – Trouve ton artisan
 * Serveur API Node.js/Express. J'ai configuré helmet, CORS (origine front), limite JSON 10 Mo,
 * routes (categories, specialites, artisans, contacts), 404 et gestion d'erreurs. Démarrage après connexion MySQL.
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Sécurité : en-têtes HTTP (helmet) et CORS limité au front
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' && process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL
    : 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
const categoriesRoutes = require('./routes/categories');
const specialitesRoutes = require('./routes/specialites');
const artisansRoutes = require('./routes/artisans');
const contactsRoutes = require('./routes/contacts');

app.get('/', (req, res) => {
  res.json({
    message: 'API Trouve ton artisan',
    version: '1.0.0',
    endpoints: {
      categories: '/api/categories',
      specialites: '/api/specialites',
      artisans: '/api/artisans',
      contacts: '/api/contacts',
      health: '/api/health'
    },
    documentation: 'Consultez le README.md pour plus d\'informations'
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'API Trouve ton artisan',
    version: '1.0.0',
    endpoints: {
      categories: '/api/categories',
      specialites: '/api/specialites',
      artisans: '/api/artisans',
      contacts: '/api/contacts',
      health: '/api/health'
    }
  });
});

app.use('/api/categories', categoriesRoutes);
app.use('/api/specialites', specialitesRoutes);
app.use('/api/artisans', artisansRoutes);
app.use('/api/contacts', contactsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API Trouve ton artisan' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

app.use((err, req, res, next) => {
  console.error('Erreur:', err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Une erreur est survenue' 
      : err.message
  });
});

sequelize.authenticate()
  .then(() => {
    console.log('✅ Connexion à la base de données réussie');
    return sequelize.sync({ alter: false });
  })
  .then(() => {
    console.log('✅ Modèles synchronisés avec la base de données');
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Erreur de connexion à la base de données:', error);
    process.exit(1);
  });

module.exports = app;

