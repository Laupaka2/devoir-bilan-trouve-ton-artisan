/**
 * Devoir bilan – Trouve ton artisan
 * Modèle Sequelize Contact (table contacts) : artisan_id, nom, email, objet, message, lu.
 * Validation des longueurs. Pas de updatedAt ; index sur artisan_id et lu.
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Artisan = require('./Artisan');

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  artisan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Artisan,
      key: 'id'
    }
  },
  nom: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 200]
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  objet: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 200]
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [10, 5000]
    }
  },
  lu: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'contacts',
  timestamps: true,
  updatedAt: false, // On ne met pas à jour les contacts
  indexes: [
    {
      fields: ['artisan_id']
    },
    {
      fields: ['lu']
    }
  ]
});

Contact.belongsTo(Artisan, { foreignKey: 'artisan_id', as: 'artisan' });
Artisan.hasMany(Contact, { foreignKey: 'artisan_id', as: 'contacts' });

module.exports = Contact;

