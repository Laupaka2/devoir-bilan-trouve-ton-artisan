const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Chargement des variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares de sécurité
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' && process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL
    : 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS']
}));

// Middlewares pour parser le JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
const categoriesRoutes = require('./routes/categories');
const specialitesRoutes = require('./routes/specialites');
const artisansRoutes = require('./routes/artisans');
const contactsRoutes = require('./routes/contacts');

// Route racine de l'API
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

// Route racine de l'API (/api)
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

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API Trouve ton artisan' });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur:', err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Une erreur est survenue' 
      : err.message
  });
});

// Connexion à la base de données et démarrage du serveur
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

