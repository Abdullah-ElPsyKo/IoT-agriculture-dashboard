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

// GET route to fetch all unique cities
router.get('/unique_cities', async (req, res) => {
  try {
    const cities = await EnvironmentalData.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('city')), 'city']],
    });
    res.json(cities.map(city => city.city));
  } catch (error) {
    console.error('Error fetching unique cities:', error);
    res.status(500).send('Error fetching unique cities');
  }
});

// GET route to fetch all unique farms of a specific city
router.get('/unique_farms/:city', async (req, res) => {
  const { city } = req.params;
  try {
    const farms = await EnvironmentalData.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('farm')), 'farm']],
      where: { city: city }
    });
    // Map the results to extract just the farm names
    const farmNames = farms.map(farm => farm.farm);
    res.json(farmNames);
  } catch (error) {
    console.error(`Error fetching farms for city ${city}:`, error);
    res.status(500).send(`Error fetching farms for city ${city}`);
  }
});

// GET route to fetch all data for a specific city and farm
router.get('/city_farm_data/:city/:farm', async (req, res) => {
  const { city, farm } = req.params;
  try {
    const data = await EnvironmentalData.findAll({
      where: { city, farm }
    });
    if (data.length > 0) {
      res.json(data);
    } else {
      res.status(404).send(`No data found for city ${city} and farm ${farm}`);
    }
  } catch (error) {
    console.error(`Error fetching data for city ${city} and farm ${farm}:`, error);
    res.status(500).send(`Error fetching data for city ${city} and farm ${farm}`);
  }
});

// GET route to fetch all data for a specific city
router.get('/city_data/:city', async (req, res) => {
  const { city } = req.params;
  try {
    const data = await EnvironmentalData.findAll({ where: { city } });
    res.json(data);
  } catch (error) {
    console.error(`Error fetching data for city ${city}:`, error);
    res.status(500).send(`Error fetching data for city ${city}`);
  }
});

// GET route to fetch the latest data for a specific city
router.get('/latest_city_data/:city', async (req, res) => {
  const { city } = req.params;
  try {
    const data = await EnvironmentalData.findOne({
      where: { city },
      order: [['date', 'DESC']],
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send(`No data found for city ${city}`);
    }
  } catch (error) {
    console.error(`Error fetching latest data for city ${city}:`, error);
    res.status(500).send(`Error fetching latest data for city ${city}`);
  }
});

// GET route to fetch the latest [number] of data entries (not city-specific)
router.get('/latest_data/:number', async (req, res) => {
  const { number } = req.params;
  try {
    const data = await EnvironmentalData.findAll({
      order: [['date', 'DESC']],
      limit: parseInt(number, 10),
    });
    res.json(data);
  } catch (error) {
    console.error(`Error fetching latest ${number} data entries:`, error);
    res.status(500).send(`Error fetching latest ${number} data entries`);
  }
});

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.get('/latest_city_data/:city/page/:page/limit/:limit', async (req, res) => {
  try {
    const { city, page, limit } = req.params;
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const offset = (pageNumber - 1) * pageSize;

    // Validate input
    if (isNaN(pageNumber) || isNaN(pageSize) || pageNumber < 1 || pageSize < 1) {
      return res.status(400).json({ error: 'Invalid page or limit parameter' });
    }

    // Fetch the paginated data
    const data = await EnvironmentalData.findAll({
      where: { city },
      order: [['date', 'DESC']],
      limit: pageSize,
      offset: offset
    });

    // Fetch the total count of records for the city
    const totalCount = await EnvironmentalData.count({
      where: { city }
    });

    // Send both the paginated data and the total count
    res.json({
      data: data,
      totalCount: totalCount
    });

  } catch (error) {
    console.error(`Error fetching data for city ${city} with pagination:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// GET route to fetch data entries with pagination (not city-specific)
router.get('/latest_data/page/:page/limit/:limit', async (req, res) => {
  const { page, limit } = req.params;

  try {
    const totalCount = await EnvironmentalData.count(); // Get total count of all entries
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const data = await EnvironmentalData.findAll({
      order: [['date', 'DESC']],
      limit: parseInt(limit, 10),
      offset: offset
    });
    res.json({ data, totalCount });
  } catch (error) {
    console.error(`Error fetching data with pagination:`, error);
    res.status(500).send('Error fetching data with pagination');
  }
});



// POST route to add new data
router.post('/add_data', async (req, res) => {
  try {
    const { country, city, temperature, soilMoisture, humidity, farm } = req.body;
    // Validate the data
    if (!country || !city) {
      return res.status(400).send('Missing required fields: country, or city');
    }
    // Explicitly set the date to the current date and time
    const data = {
      farm,
      date: new Date(),
      country,
      city,
      temperature,
      soilMoisture,
      humidity
    };
    console.log(data);
    await EnvironmentalData.create(data);
    res.send('Data added successfully');
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).send('Error adding data');
  }
});

// GET route to fetch data from the last year
router.get('/last_year_data', async (req, res) => {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  try {
    const data = await EnvironmentalData.findAll({
      where: {
        date: {
          [Op.gte]: oneYearAgo
        }
      }
    });
    res.json(data);
  } catch (error) {
    console.error('Error fetching last year data:', error);
    res.status(500).send('Error fetching last year data');
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
