const express = require('express');
const router = express.Router();

// Import sub-routes
const userRoutes = require('./user');
const adminRoutes = require('./admin');
const farmRoutes = require('./farm');
const cropRoutes = require('./crop');
const productRoutes = require('./product');
const bookingRoutes = require('./booking');

// Mount routes
router.use('/users', userRoutes);
router.use('/admin', adminRoutes);
router.use('/farms', farmRoutes);
router.use('/crops', cropRoutes);
router.use('/products', productRoutes);
router.use('/bookings', bookingRoutes);

module.exports = router;
