const { Sequelize } = require('sequelize');
require('dotenv').config();

// Support des variables Railway (MYSQLHOST, MYSQLUSER...) et standards (DB_HOST, DB_USER...)
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
      underscored: true,  // Utilise snake_case pour les colonnes (created_at au lieu de createdAt)
      freezeTableName: true
    }
  }
);

module.exports = sequelize;

