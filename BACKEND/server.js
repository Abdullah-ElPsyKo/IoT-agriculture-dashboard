const express = require('express');
const app = express();
const { sequelize, syncDatabase } = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS for all routes

const EnvironmentalData = require('./models/environmentalData')(sequelize);

app.get('/all_data', async (req, res) => {
  try {
    const data = await EnvironmentalData.findAll();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

syncDatabase().then(() => {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}).catch(err => {
  console.error('Error syncing database:', err);
});
