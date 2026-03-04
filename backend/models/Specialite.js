/**
 * Devoir bilan – Trouve ton artisan
 * Modèle Sequelize Specialite (table specialites) : id, nom, slug, categorie_id. Relation belongsTo Categorie.
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categorie = require('./Categorie');

const Specialite = sequelize.define('Specialite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  categorie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Categorie,
      key: 'id'
    }
  }
}, {
  tableName: 'specialites',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Specialite.belongsTo(Categorie, { foreignKey: 'categorie_id', as: 'categorie' });
Categorie.hasMany(Specialite, { foreignKey: 'categorie_id', as: 'specialites' });

module.exports = Specialite;

