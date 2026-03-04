/**
 * Devoir bilan – Trouve ton artisan
 * Modèle Sequelize Artisan (table artisans) : nom, email, note, spécialité, image, artisan_du_mois, etc.
 * Relations : belongsTo Specialite. Index sur nom, specialite_id, artisan_du_mois.
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Specialite = require('./Specialite');

const Artisan = sequelize.define('Artisan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  telephone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  adresse: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  code_postal: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  ville: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  note: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: false,
    defaultValue: 0.00,
    validate: {
      min: 0,
      max: 5
    }
  },
  nombre_avis: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  specialite_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Specialite,
      key: 'id'
    }
  },
  image_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  site_web: {
    type: DataTypes.STRING(500),
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  a_propos: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  artisan_du_mois: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'artisans',
  timestamps: true,
  indexes: [
    {
      fields: ['nom']
    },
    {
      fields: ['specialite_id']
    },
    {
      fields: ['artisan_du_mois']
    }
  ]
});

Artisan.belongsTo(Specialite, { foreignKey: 'specialite_id', as: 'specialite' });
Specialite.hasMany(Artisan, { foreignKey: 'specialite_id', as: 'artisans' });

module.exports = Artisan;

