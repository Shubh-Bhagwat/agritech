const express = require('express');
const router = express.Router();
const {
  createFarm,
  getUserFarms,
  getFarmById,
  updateFarm,
  deleteFarm,
} = require('../controllers/farmController');
const { protect } = require('../middleware/auth');

// All farm routes are protected
router.post('/', protect, createFarm);
router.get('/', protect, getUserFarms);
router.get('/:id', protect, getFarmById);
router.put('/:id', protect, updateFarm);
router.delete('/:id', protect, deleteFarm);

module.exports = router;
