const express = require('express');
const app = express();
const { sequelize, syncDatabase } = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

const EnvironmentalData = require('./models/environmentalData')(sequelize);

// Maak een nieuwe router aan
const router = express.Router();

// GET route to fetch all data
router.get('/all_data', async (req, res) => {
  try {
    const data = await EnvironmentalData.findAll();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// POST route to add new data
router.post('/add_data', async (req, res) => {
  try {
    const { country, city, temperature, soilMoisture, winds } = req.body;
    // Validate the data
    if (!country || !city) {
      return res.status(400).send('Missing required fields: country, or city');
    }
    // Explicitly set the date to the current date and time
    const data = {
      date: new Date(),
      country,
      city,
      temperature,
      soilMoisture,
      winds
    };
    console.log(data);
    await EnvironmentalData.create(data);
    res.send('Data added successfully');
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).send('Error adding data');
  }
});

// Voeg de router toe aan je app met de '/api' prefix
app.use('/api', router);

// Sync database and start server
syncDatabase().then(() => {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}).catch(err => {
  console.error('Error syncing database:', err);
});
