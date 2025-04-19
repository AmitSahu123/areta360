const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { ApiError } = require('../middlewares/errorHandler');

class NodeVtonService {
  constructor() {
    // Define paths
    this.resultsDir = path.join(__dirname, '../../uploads/results');
    this.tempDir = path.join(__dirname, '../../uploads/temp');
    
    // Ensure directories exist
    this.ensureDirectories();
  }

  async ensureDirectories() {
    const dirs = [this.resultsDir, this.tempDir];
    
    for (const dir of dirs) {
      try {
        await fs.promises.access(dir);
      } catch (error) {
        await fs.promises.mkdir(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
      }
    }
  }

  /**
   * Process images directly in Node.js without spawning Python
   * @param {string} personImagePath - Path to the person image
   * @param {string} garmentImagePath - Path to the garment image
   * @returns {Promise<string>} - Filename of the result image
   */
  async processImages(personImagePath, garmentImagePath) {
    try {
      console.log('--- Executing NodeVtonService processImages ---');
      console.log('Person Image Path:', personImagePath);
      console.log('Garment Image Path:', garmentImagePath);

      // Validate input paths
      if (!fs.existsSync(personImagePath)) {
        throw new Error(`Person image not found at: ${personImagePath}`);
      }
      if (!fs.existsSync(garmentImagePath)) {
        throw new Error(`Garment image not found at: ${garmentImagePath}`);
      }

      // Generate result filename
      const resultFilename = `result-${Date.now()}.png`;
      const resultPath = path.join(this.resultsDir, resultFilename);

      // Load images
      console.log('Loading person image...');
      const personImage = sharp(personImagePath);
      const personMetadata = await personImage.metadata();
      
      console.log('Loading garment image...');
      const garmentImage = sharp(garmentImagePath);
      
      // Resize garment to match person image dimensions
      console.log('Resizing garment to match person dimensions...');
      const resizedGarment = await garmentImage
        .resize(personMetadata.width, personMetadata.height, {
          fit: 'fill',
          position: 'center'
        })
        .toBuffer();
      
      // Convert both images to PNG with alpha channel
      console.log('Processing images...');
      const personBuffer = await personImage
        .ensureAlpha()
        .png()
        .toBuffer();
      
      const garmentBuffer = await sharp(resizedGarment)
        .ensureAlpha()
        .png()
        .toBuffer();
      
      // Create a simple composite
      // For a real VTON system, you'd need more sophisticated image processing
      console.log('Creating composite image...');
      await sharp(personBuffer)
        .composite([
          { 
            input: garmentBuffer,
            blend: 'overlay' // Simpler blend mode to mimic the Python code's alpha blend
          }
        ])
        .toFile(resultPath);
      
      console.log('Result image saved to:', resultPath);
      
      // Return the filename that can be used in the frontend
      return resultFilename;
    } catch (error) {
      console.error('--- Error in NodeVtonService processImages ---');
      console.error(error);
      throw new ApiError(500, `Failed to process images: ${error.message}`);
    }
  }
  
  /**
   * More advanced version that implements a custom blending algorithm
   * similar to the Python PIL version
   */
  async processImagesAdvanced(personImagePath, garmentImagePath, alpha = 0.5) {
    try {
      console.log('--- Executing NodeVtonService processImagesAdvanced ---');
      console.log('Person Image Path:', personImagePath);
      console.log('Garment Image Path:', garmentImagePath);
      console.log('Alpha value:', alpha);

      // Validate input paths
      if (!fs.existsSync(personImagePath)) {
        throw new Error(`Person image not found at: ${personImagePath}`);
      }
      if (!fs.existsSync(garmentImagePath)) {
        throw new Error(`Garment image not found at: ${garmentImagePath}`);
      }

      // Generate result filename
      const resultFilename = `result-${Date.now()}.png`;
      const resultPath = path.join(this.resultsDir, resultFilename);

      // Get image metadata
      const personMetadata = await sharp(personImagePath).metadata();
      const { width, height } = personMetadata;
      
      // Create temporary files for intermediate steps
      const tempPerson = path.join(this.tempDir, `person-${Date.now()}.png`);
      const tempGarment = path.join(this.tempDir, `garment-${Date.now()}.png`);
      
      // Prepare both images: resize and convert to same format
      await sharp(personImagePath)
        .resize(width, height)
        .ensureAlpha()
        .png()
        .toFile(tempPerson);
        
      await sharp(garmentImagePath)
        .resize(width, height)
        .ensureAlpha()
        .png()
        .toFile(tempGarment);
      
      // Load raw pixel data for custom blending
      const personBuffer = await sharp(tempPerson).raw().toBuffer();
      const garmentBuffer = await sharp(tempGarment).raw().toBuffer();
      
      // Create output buffer for custom pixel manipulation
      const outputBuffer = Buffer.alloc(personBuffer.length);
      
      // Perform custom alpha blending (similar to PIL's Image.blend)
      for (let i = 0; i < personBuffer.length; i += 4) {
        // For each RGBA pixel, blend the person and garment values
        outputBuffer[i] = Math.round(personBuffer[i] * (1 - alpha) + garmentBuffer[i] * alpha); // R
        outputBuffer[i + 1] = Math.round(personBuffer[i + 1] * (1 - alpha) + garmentBuffer[i + 1] * alpha); // G
        outputBuffer[i + 2] = Math.round(personBuffer[i + 2] * (1 - alpha) + garmentBuffer[i + 2] * alpha); // B
        outputBuffer[i + 3] = Math.max(personBuffer[i + 3], garmentBuffer[i + 3]); // A (take maximum alpha)
      }
      
      // Save the result
      await sharp(outputBuffer, {
        raw: {
          width,
          height,
          channels: 4 // RGBA
        }
      })
      .png()
      .toFile(resultPath);
      
      // Clean up temporary files
      try {
        await fs.promises.unlink(tempPerson);
        await fs.promises.unlink(tempGarment);
      } catch (cleanupError) {
        console.warn('Error cleaning up temporary files:', cleanupError);
      }
      
      console.log('Result image saved to:', resultPath);
      
      // Return the filename that can be used in the frontend
      return resultFilename;
    } catch (error) {
      console.error('--- Error in NodeVtonService processImagesAdvanced ---');
      console.error(error);
      throw new ApiError(500, `Failed to process images: ${error.message}`);
    }
  }
}

module.exports = new NodeVtonService(); 