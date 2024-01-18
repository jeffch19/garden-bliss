const express = require('express');
const router = express.Router();

// Logout route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // If the user is logged in, destroy their session
    req.session.destroy(() => {
      res.status(200).json({ message: 'Logout successful' });
    });
  } else {
    // If the user is not logged in, return a 404 status
    res.status(404).json({ message: 'User not logged in' });
  }
});

module.exports = router;