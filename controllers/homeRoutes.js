const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');


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
  
  module.exports = router;