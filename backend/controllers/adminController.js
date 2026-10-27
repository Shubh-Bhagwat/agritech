const jwt = require('jsonwebtoken');
const Admin = require('../db/Admin/Admin');
const User = require('../db/User/User');
const Farm = require('../db/Farm/Farm');
const Crop = require('../db/Crop/Crop');
const Booking = require('../db/Booking/Booking');
const Product = require('../db/Product/Product');

// Generate JWT for admin
const generateToken = (id) => {
  return jwt.sign({ id, isAdmin: true }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
};

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && admin.password === password) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid admin credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all registered users
// @route   GET /api/admin/users
// @access  Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json({ count: users.length, users });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Verify a user
// @route   PUT /api/admin/verify/:userId
// @access  Admin
const verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isVerified = true;
    await user.save();

    res.json({ message: `User ${user.name} has been verified`, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get system analytics
// @route   GET /api/admin/analytics
// @access  Admin
const getSystemAnalytics = async (req, res) => {
  try {
    const [totalUsers, verifiedUsers, totalFarms, totalCrops, totalBookings, totalProducts] =
      await Promise.all([
        User.countDocuments(),
        User.countDocuments({ isVerified: true }),
        Farm.countDocuments(),
        Crop.countDocuments(),
        Booking.countDocuments(),
        Product.countDocuments(),
      ]);

    const bookingsByStatus = await Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
    ]);

    res.json({
      totalUsers,
      verifiedUsers,
      unverifiedUsers: totalUsers - verifiedUsers,
      totalFarms,
      totalCrops,
      totalBookings,
      totalProducts,
      bookingsByStatus,
      usersByRole,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get reports
// @route   GET /api/admin/reports
// @access  Admin
const getReports = async (req, res) => {
  try {
    const recentBookings = await Booking.find({})
      .populate('user', 'name email')
      .populate('product', 'name category')
      .sort({ bookingDate: -1 })
      .limit(20);

    const cropDistribution = await Crop.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } },
    ]);

    const cropStages = await Crop.aggregate([
      { $group: { _id: '$stage', count: { $sum: 1 } } },
    ]);

    const productsByCategory = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 }, totalValue: { $sum: { $multiply: ['$price', '$quantity'] } } } },
    ]);

    res.json({
      recentBookings,
      cropDistribution,
      cropStages,
      productsByCategory,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  adminLogin,
  getAllUsers,
  verifyUser,
  getSystemAnalytics,
  getReports,
};
