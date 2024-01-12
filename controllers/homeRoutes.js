const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios');
require('dotenv').config();
const apiKey = process.env.API_KEY || 'default_api_key';

router.get('/', (req, res) => {
  res.render('home', {
    // fill in later???
    // layout: 'other_main' // layouts/other_main.handlebars
  });
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login', {
        title: "Garden Bliss",
        head_title: "Login Garden Bliss",

    });
  });
  
  //will need to add a withauth
  router.get('/plantsearchresults/:name', async (req, res) => {
    try {
      const data = await axios.get(`https://perenual.com/api/species-list?key=${apiKey}&q=${req.params.name}`);
      console.log(JSON.stringify(data.data, null, 2));
      const simpleData = JSON.parse(JSON.stringify(data.data))
      res.json(data.data);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
  module.exports = router;