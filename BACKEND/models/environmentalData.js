const { DataTypes } = require('sequelize');

const countries = [
  {
    name: "United States",
    cities: ["New York", "Los Angeles", "Chicago", "Houston"]
  },
  {
    name: "United Kingdom",
    cities: ["London", "Manchester", "Birmingham", "Glasgow"]
  },
  {
    name: "France",
    cities: ["Paris", "Marseille", "Lyon", "Toulouse"]
  }
];

function generateRandomDate() {
  const currentDate = new Date();
  const pastDate = new Date(currentDate.getTime() - (365 * 24 * 60 * 60 * 1000)); // One year ago
  return new Date(pastDate.getTime() + Math.random() * (currentDate.getTime() - pastDate.getTime()));
}

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
    winds: DataTypes.FLOAT,
  }, {
    timestamps: false
  });

  EnvironmentalData.insertInitialData = async function() {
    const data = [...Array(500)].map(() => {
      const country = countries[Math.floor(Math.random() * countries.length)];
      const city = country.cities[Math.floor(Math.random() * country.cities.length)];
      return {
        date: generateRandomDate(),
        country: country.name,
        city: city,
        temperature: Math.random() * 35,
        soilMoisture: Math.random() * 100,
        winds: Math.random() * 100
      };
    });
    await this.bulkCreate(data);
    console.log('Initial data inserted successfully!');
  };

  return EnvironmentalData;
};
