const router = require('express').Router();
const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.API_KEY || 'default_api_key';

router.get('/list', async (req, res) => {
  const searchTerm = req.query.query; // Get the search term from the query parameter
  try {
    // Use the search term in the API request
    const data = await axios.get(`https://perenual.com/api/species-list?query=${searchTerm}&key=${apiKey}`);
    console.log(JSON.stringify(data.data, null, 2));
    res.json(data.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/species/:species_id', async (req, res) => {
  try {
    const data = await axios.get(`https://perenual.com/api/species/details/${req.params.species_id}?key=${apiKey}`);
    console.log(JSON.stringify(data.data, null, 2));
    res.json(data.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// router.get('/plantsearch', (req, res) => {
//   res.render('plantsearch', {
//     // Any data you want to pass to the template
//   });
// });

module.exports = router;
