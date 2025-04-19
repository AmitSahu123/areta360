const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { processVton, processVtonNode } = require('../controllers/vtonController');
const { ApiError } = require('../middlewares/errorHandler');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../uploads');
(async () => {
  try {
    await fs.access(uploadDir);
    console.log('Upload directory exists:', uploadDir);
  } catch (error) {
    await fs.mkdir(uploadDir, { recursive: true });
    console.log('Created upload directory:', uploadDir);
  }
})();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  console.log('Processing file:', file.originalname, 'Type:', file.mimetype);
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Invalid file type. Only JPEG, JPG, and PNG files are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error('Multer error:', err);
    return res.status(400).json({
      success: false,
      error: {
        message: `File upload error: ${err.message}`
      }
    });
  }
  next(err);
};

// Routes
router.post('/process', (req, res, next) => {
  console.log('Received VTON process request');
  console.log('Request URL:', req.originalUrl);
  console.log('Request method:', req.method);
  console.log('Request content type:', req.headers['content-type']);
  console.log('Request body keys:', Object.keys(req.body || {}));
  
  // Check if files are already in the request
  if (req.files) {
    console.log('Files already uploaded:', req.files);
    return processVton(req, res, next);
  }
  
  upload.fields([
    { name: 'person_image', maxCount: 1 },
    { name: 'garment_image', maxCount: 1 }
  ])(req, res, (err) => {
    if (err) {
      console.error('Upload error:', err);
      return handleMulterError(err, req, res, next);
    }
    
    console.log('Files uploaded successfully. Request files:', req.files);
    
    if (!req.files || Object.keys(req.files).length === 0) {
      console.error('No files were uploaded');
      return res.status(400).json({
        success: false,
        error: {
          message: 'No files were uploaded'
        }
      });
    }
    
    processVton(req, res, next);
  });
});

// Add direct VTON processing route without URL encoding issues
router.post('/process-direct', (req, res, next) => {
  console.log('Received direct VTON process request');
  
  upload.fields([
    { name: 'person_image', maxCount: 1 },
    { name: 'garment_image', maxCount: 1 }
  ])(req, res, (err) => {
    if (err) {
      console.error('Upload error in direct route:', err);
      return handleMulterError(err, req, res, next);
    }
    console.log('Files uploaded successfully in direct route:', req.files);
    processVton(req, res, next);
  });
});

// Add Node.js pure implementation route (no Python dependency)
router.post('/process-node', (req, res, next) => {
  console.log('Received Node.js VTON process request');
  console.log('Request URL:', req.originalUrl);
  console.log('Request query params:', req.query);
  
  // Check if files are already in the request
  if (req.files) {
    console.log('Files already uploaded:', req.files);
    return processVtonNode(req, res, next);
  }
  
  upload.fields([
    { name: 'person_image', maxCount: 1 },
    { name: 'garment_image', maxCount: 1 }
  ])(req, res, (err) => {
    if (err) {
      console.error('Upload error in Node.js route:', err);
      return handleMulterError(err, req, res, next);
    }
    
    console.log('Files uploaded successfully. Request files:', req.files);
    
    if (!req.files || Object.keys(req.files).length === 0) {
      console.error('No files were uploaded');
      return res.status(400).json({
        success: false,
        error: {
          message: 'No files were uploaded'
        }
      });
    }
    
    processVtonNode(req, res, next);
  });
});

module.exports = router;