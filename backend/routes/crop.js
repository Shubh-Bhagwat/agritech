const express = require('express');
const router = express.Router();
const {
  addCrop,
  getCropsByFarm,
  getCropById,
  updateCropStage,
  addTreatment,
  deleteCrop,
  getStaticCropData,
} = require('../controllers/cropController');
const { protect } = require('../middleware/auth');

// Public route - static crop reference data
router.get('/static', getStaticCropData);

// Protected routes
router.post('/:farmId', protect, addCrop);
router.get('/farm/:farmId', protect, getCropsByFarm);
router.get('/:id', protect, getCropById);
router.put('/:id/stage', protect, updateCropStage);
router.put('/:id/treatment', protect, addTreatment);
router.delete('/:id', protect, deleteCrop);

module.exports = router;
