const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('yourdbname', 'user', 'password', {
  host: 'db',
  dialect: 'postgres',
  logging: false
});

const EnvironmentalData = require('../models/environmentalData')(sequelize);

// Function to sync database and seed data
async function syncDatabase() {
  await sequelize.sync({ force: true });
  console.log("Database synced!");

  // Call your seed function here, using the method attached to the model
  await EnvironmentalData.insertInitialData();
}

// Exporting the sync function along with the sequelize connection
module.exports = { sequelize, syncDatabase };
