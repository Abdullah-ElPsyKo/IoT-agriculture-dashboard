const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('yourdbname', 'user', 'password', {
  host: 'db',
  dialect: 'postgres',
  logging: false
});

const EnvironmentalData = require('../models/environmentalData')(sequelize);

// Function to sync database
async function syncDatabase() {
  await sequelize.sync({ alter: true }); // Use alter instead of force to avoid dropping tables
  console.log("Database synced!");
}

// Exporting the sync function along with the sequelize connection
module.exports = { sequelize, syncDatabase };
