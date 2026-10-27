const Crop = require('../db/Crop/Crop');
const Farm = require('../db/Farm/Farm');
const path = require('path');

// @desc    Add a crop to a farm
// @route   POST /api/crops/:farmId
// @access  Private
const addCrop = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.farmId);

    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    // Ensure user owns this farm
    if (farm.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to add crops to this farm' });
    }

    const { name, type, stage, sowingDate, expectedHarvestDate } = req.body;

    const crop = await Crop.create({
      farm: farm._id,
      name,
      type,
      stage,
      sowingDate,
      expectedHarvestDate,
    });

    // Add crop reference to the farm
    farm.crops.push(crop._id);
    await farm.save();

    res.status(201).json(crop);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all crops for a specific farm
// @route   GET /api/crops/farm/:farmId
// @access  Private
const getCropsByFarm = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.farmId);

    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    if (farm.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const crops = await Crop.find({ farm: req.params.farmId });
    res.json({ count: crops.length, crops });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get a single crop by ID
// @route   GET /api/crops/:id
// @access  Private
const getCropById = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id).populate('farm', 'name owner');

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    res.json(crop);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update crop stage
// @route   PUT /api/crops/:id/stage
// @access  Private
const updateCropStage = async (req, res) => {
  try {
    const { stage } = req.body;

    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    crop.stage = stage;
    await crop.save();

    res.json(crop);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Add a treatment to a crop
// @route   PUT /api/crops/:id/treatment
// @access  Private
const addTreatment = async (req, res) => {
  try {
    const { name, date, description } = req.body;

    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    crop.treatments.push({ name, date, description });
    await crop.save();

    res.json(crop);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a crop
// @route   DELETE /api/crops/:id
// @access  Private
const deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    // Remove crop reference from the farm
    await Farm.findByIdAndUpdate(crop.farm, {
      $pull: { crops: crop._id },
    });

    await Crop.findByIdAndDelete(req.params.id);

    res.json({ message: 'Crop removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get static crop reference data from crops.json
// @route   GET /api/crops/static
// @access  Public
const getStaticCropData = async (req, res) => {
  try {
    const cropsData = require('../db/crops.json');
    res.json(cropsData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  addCrop,
  getCropsByFarm,
  getCropById,
  updateCropStage,
  addTreatment,
  deleteCrop,
  getStaticCropData,
};
