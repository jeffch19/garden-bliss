const router = require('express').Router();
const { User } = require('../../models');
const sequelize = require('../../config/connection');

// CRUD Routes...


// Signup route
router.post('/signup', (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
    .then((data) => {
      req.session.save(() => {
        req.session.user_id = data.id;
        req.session.email = data.email;
        req.session.loggedIn = true;
        
        res.json({ user: data, message: 'You are now signed up and logged in!' });
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
 });



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
        console.log("==========");
        console.log(req.session.loggedIn)
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

module.exports = router;