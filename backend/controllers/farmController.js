const Farm = require('../db/Farm/Farm');
const Crop = require('../db/Crop/Crop');

// @desc    Create a new farm
// @route   POST /api/farms
// @access  Private
const createFarm = async (req, res) => {
  try {
    const { name, location, sizeInAcres, soilType, irrigationType } = req.body;

    const farm = await Farm.create({
      owner: req.user._id,
      name,
      location,
      sizeInAcres,
      soilType,
      irrigationType,
    });

    res.status(201).json(farm);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all farms for logged-in user
// @route   GET /api/farms
// @access  Private
const getUserFarms = async (req, res) => {
  try {
    const farms = await Farm.find({ owner: req.user._id }).populate('crops');
    res.json({ count: farms.length, farms });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get a single farm by ID
// @route   GET /api/farms/:id
// @access  Private
const getFarmById = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id).populate('crops');

    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    // Ensure user owns this farm
    if (farm.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this farm' });
    }

    res.json(farm);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a farm
// @route   PUT /api/farms/:id
// @access  Private
const updateFarm = async (req, res) => {
  try {
    let farm = await Farm.findById(req.params.id);

    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    // Ensure user owns this farm
    if (farm.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this farm' });
    }

    farm = await Farm.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(farm);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a farm
// @route   DELETE /api/farms/:id
// @access  Private
const deleteFarm = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);

    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    // Ensure user owns this farm
    if (farm.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this farm' });
    }

    // Delete all crops associated with this farm
    await Crop.deleteMany({ farm: farm._id });

    // Delete the farm
    await Farm.findByIdAndDelete(req.params.id);

    res.json({ message: 'Farm and associated crops removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createFarm,
  getUserFarms,
  getFarmById,
  updateFarm,
  deleteFarm,
};
