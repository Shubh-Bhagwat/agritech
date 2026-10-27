const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/config');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// ---------------------
// Middleware
// ---------------------

// Enable CORS for cross-origin requests
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Ensure DB connection for Serverless / Vercel invocations
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error('DB middleware connection error:', err.message);
  }
  next();
});

// ---------------------
// Routes
// ---------------------

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Agriculture Management API is running',
    version: '1.0.0',
    status: 'online',
    endpoints: {
      users: '/api/users',
      admin: '/api/admin',
      farms: '/api/farms',
      crops: '/api/crops',
      products: '/api/products',
      bookings: '/api/bookings',
    },
  });
});

// Mount all API routes
const routes = require('./routes');
app.use('/api', routes);

// ---------------------
// Global Error Handler
// ---------------------
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err.message,
  });
});

// Handle 404 - Route not found
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// ---------------------
// Start Server (Standalone / Local dev)
// ---------------------
if (require.main === module && !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`\n🌾 Agriculture Management Server running on port ${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`   API Base URL: http://localhost:${PORT}/api\n`);
  });
}

// Export app for Vercel Serverless
module.exports = app;
