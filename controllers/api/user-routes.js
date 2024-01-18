const router = require('express').Router();
const { User } = require('../../models');
const express = require('express');
const app = express();
const sequelize = require('../../config/connection');

// CRUD Routes...

// Login route
router.post('/login', (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then((data) => {
      // Check if the user with the provided email exists
      if (!data) {
        res.status(400).json({ message: 'Incorrect username!' });
        return;
      }

      // Check if the provided password matches the hashed password in the database
      const isCorrectPassword = data.checkPassword(req.body.password);

      if (!isCorrectPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }

      // Save user session upon successful login
      req.session.save(() => {
        req.session.user_id = data.id;
        req.session.email = data.email;
        req.session.loggedIn = true;

        res.json({ user: data, message: 'You are now logged in!' });
      });
    })
    .catch((err) => {
      // Handle unexpected errors
      res.status(500).json(err);
    });
});

// Logout route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Destroy user session upon logout
    req.session.destroy(() => {
      res.status(200).end();
    });
  } else {
    // No active session found, return 404 status
    res.status(404).end();
  }
});

//Signup route
router.post('/signup', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then((userData) => {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.email = userData.email;
        req.session.loggedIn = true;
 
        res.json({ user: userData, message: 'You are now signed up and logged in!' });
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
 });

module.exports = router;