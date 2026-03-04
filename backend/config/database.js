/**
 * Devoir bilan – Trouve ton artisan
 * Configuration Sequelize/MySQL. J'ai prévu les variables Railway (MYSQLHOST, etc.) et les variables
 * classiques (DB_HOST, DB_USER...). Timestamps et snake_case pour les colonnes.
 */
const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
  port: parseInt(process.env.DB_PORT || process.env.MYSQLPORT || '3306', 10),
  database: process.env.DB_NAME || process.env.MYSQLDATABASE,
  username: process.env.DB_USER || process.env.MYSQLUSER,
  password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,
};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  }
);

module.exports = sequelize;

