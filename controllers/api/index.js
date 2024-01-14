const router = require('express').Router();
const plantRoutes = require('./plant.js');
const userRoutes = require('./user-routes.js');
const tipRoutes = require('./tip-routes.js');

router.use('/plant', plantRoutes);
router.use('/users', userRoutes);
router.use('/tips', tipRoutes);

module.exports = router;