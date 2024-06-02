const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance was not passed to the model definition.');
  }

  const EnvironmentalData = sequelize.define('EnvironmentalData', {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    farm: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    temperature: DataTypes.FLOAT,
    soilMoisture: DataTypes.FLOAT,
    humidity: DataTypes.FLOAT,
  }, {
    timestamps: false
  });

  return EnvironmentalData;
};