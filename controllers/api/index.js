const router = require('express').Router();
const plantRoutes = require('./plant');


router.use('/plant', plantRoutes);


module.exports = router;