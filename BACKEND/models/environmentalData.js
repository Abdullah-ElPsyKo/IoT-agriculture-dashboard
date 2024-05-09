const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('Sequelize instance was not passed to the model definition.');
  }

  const EnvironmentalData = sequelize.define('EnvironmentalData', {
    date: DataTypes.DATE,
    city: DataTypes.STRING,
    temperature: DataTypes.FLOAT,
    precipitation: DataTypes.FLOAT,
    soilMoisture: DataTypes.FLOAT,
    winds: DataTypes.FLOAT,
  }, {
    timestamps: false
  });

  EnvironmentalData.insertInitialData = async function() {
    const data = [...Array(500)].map(() => ({
      date: new Date(),
      city: "Sample City",
      temperature: Math.random() * 35,
      precipitation: Math.random() * 100,
      soilMoisture: Math.random() * 100,
      winds: Math.random() * 100
    }));
    await this.bulkCreate(data);
    console.log('Initial data inserted successfully!');
  };

  return EnvironmentalData;
};
