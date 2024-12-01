const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize with database credentials
const sequelize = new Sequelize(
  process.env.DB_NAME,       // Database name
  process.env.DB_USER,       // Database user
  process.env.DB_PASSWORD,   // Database password
  {
    host: process.env.DB_HOST, // Database host
    dialect: 'mysql',          // Specify MySQL as the database dialect
  }
);

// Test database connection
sequelize
  .authenticate()
  .then(() => console.log('Database connection established.'))
  .catch((err) => console.error('Unable to connect to the database:', err));

module.exports = sequelize; // Export the Sequelize instance