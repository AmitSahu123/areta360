const { ApiError } = require('../middlewares/errorHandler');
const nodeVtonService = require('../services/nodeVtonService');
const path = require('path');
const fs = require('fs').promises;

/**
 * Process VTON request using pure Node.js implementation
 */
const processVton = async (req, res, next) => {
  try {
    console.log('Processing VTON request with Node.js in controller');
    console.log('Request files:', req.files);

    if (!req.files || !req.files.person_image || !req.files.garment_image) {
      console.error('Missing required files:', {
        person_image: !!req.files?.person_image,
        garment_image: !!req.files?.garment_image
      });
      throw new ApiError(400, 'Both person_image and garment_image are required');
    }

    const personImage = req.files.person_image[0];
    const garmentImage = req.files.garment_image[0];

    console.log('Processing images with Node.js:', {
      person: personImage.originalname,
      garment: garmentImage.originalname
    });

    // Choose simple or advanced processing based on query parameter
    const useAdvanced = req.query.advanced === 'true';
    let result;
    
    if (useAdvanced) {
      const alpha = parseFloat(req.query.alpha) || 0.5; // Default alpha is 0.5
      result = await nodeVtonService.processImagesAdvanced(personImage.path, garmentImage.path, alpha);
    } else {
      result = await nodeVtonService.processImages(personImage.path, garmentImage.path);
    }
    
    console.log('Images processed successfully with Node.js, result:', result);

    // Clean up uploaded files
    try {
      await Promise.all([
        fs.unlink(personImage.path),
        fs.unlink(garmentImage.path)
      ]);
      console.log('Cleaned up uploaded files');
    } catch (cleanupError) {
      console.error('Error cleaning up files:', cleanupError);
      // Don't throw here, we still want to return the result
    }

    res.json({
      success: true,
      result_image: result
    });
  } catch (error) {
    console.error('Error in processVton controller:', error);
    next(error);
  }
};

module.exports = {
  processVton
}; 