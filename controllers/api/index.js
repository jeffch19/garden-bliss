const router = require('express').Router();
const plantRoutes = require('./plant.js');
const userRoutes = require('./user-routes.js');
const tipRoutes = require('./tip-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes.js');


router.use('/plant', plantRoutes);
router.use('/users', userRoutes);
router.use('/tips', tipRoutes);
router.use('/posts', postRoutes);
router.use('/comments',commentRoutes);

module.exports = router;