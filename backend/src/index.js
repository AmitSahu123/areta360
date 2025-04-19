// Load environment variables from .env file first
// Specify the path relative to the current file (__dirname)
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { errorHandler } = require('./middlewares/errorHandler');
const vtonRoutes = require('./routes/vtonRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Static files
app.use('/static/results', express.static(path.join(__dirname, '../uploads/results')));

// Routes
console.log('Mounting VTON routes at /api/vton');
app.use('/api/vton', vtonRoutes);

// Log all registered routes
app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log('Route:', r.route.path);
  } else if (r.name === 'router') {
    r.handle.stack.forEach(function(h) {
      if (h.route && h.route.path) {
        console.log('Nested route:', r.regexp, h.route.path);
      }
    });
  }
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the server at http://localhost:${PORT}/test`);
}); 