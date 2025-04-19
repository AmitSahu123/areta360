// Enhanced VTON Service for realistic garment fitting

/**
 * Converts a File or Blob to base64
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

/**
 * Safely load an image from a File object
 */
const loadImageFromFile = (file) => {
  return new Promise((resolve, reject) => {
    try {
      // Create a new image object
      const img = new Image();
      
      // Set up event handlers
      img.onload = () => resolve(img);
      img.onerror = (err) => {
        console.error('Error loading image:', err);
        reject(new Error('Failed to load image'));
      };
      
      // Set crossOrigin to anonymous to avoid CORS issues
      img.crossOrigin = 'anonymous';
      
      // Create object URL and set as source
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;
      
      // Clean up the object URL after the image loads or errors
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(img);
      };
      
      img.onerror = (err) => {
        URL.revokeObjectURL(objectUrl);
        console.error('Error loading image:', err);
        reject(new Error('Failed to load image'));
      };
    } catch (error) {
      console.error('Error in loadImageFromFile:', error);
      reject(error);
    }
  });
};

/**
 * Creates a realistic fitted garment effect by combining person and garment images
 */
export const processEnhancedVTON = async (personImage, garmentImage) => {
  try {
    console.log('Using enhanced VTON implementation');
    
    // Create a canvas to combine the person and garment images
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = 512;
    canvas.height = 768;
    
    // Load the person image
    let personImg;
    try {
      personImg = await loadImageFromFile(personImage);
      console.log('Person image loaded successfully');
    } catch (error) {
      console.error('Failed to load person image:', error);
      throw new Error('Failed to load person image');
    }
    
    // Draw the person image on the canvas
    ctx.drawImage(personImg, 0, 0, canvas.width, canvas.height);
    
    // Load the garment image
    let garmentImg;
    try {
      garmentImg = await loadImageFromFile(garmentImage);
      console.log('Garment image loaded successfully');
    } catch (error) {
      console.error('Failed to load garment image:', error);
      throw new Error('Failed to load garment image');
    }
    
    // Create a mask for the garment to follow the person's body shape
    const maskCanvas = document.createElement('canvas');
    const maskCtx = maskCanvas.getContext('2d');
    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;
    
    // Draw a more detailed body shape mask
    maskCtx.fillStyle = 'white';
    maskCtx.beginPath();
    
    // Left shoulder
    maskCtx.moveTo(canvas.width * 0.3, canvas.height * 0.15);
    
    // Left shoulder curve
    maskCtx.bezierCurveTo(
      canvas.width * 0.25, canvas.height * 0.18,
      canvas.width * 0.22, canvas.height * 0.22,
      canvas.width * 0.2, canvas.height * 0.25
    );
    
    // Left side
    maskCtx.lineTo(canvas.width * 0.2, canvas.height * 0.6);
    
    // Left hip curve
    maskCtx.bezierCurveTo(
      canvas.width * 0.2, canvas.height * 0.65,
      canvas.width * 0.25, canvas.height * 0.7,
      canvas.width * 0.3, canvas.height * 0.7
    );
    
    // Bottom
    maskCtx.lineTo(canvas.width * 0.7, canvas.height * 0.7);
    
    // Right hip curve
    maskCtx.bezierCurveTo(
      canvas.width * 0.75, canvas.height * 0.7,
      canvas.width * 0.8, canvas.height * 0.65,
      canvas.width * 0.8, canvas.height * 0.6
    );
    
    // Right side
    maskCtx.lineTo(canvas.width * 0.8, canvas.height * 0.25);
    
    // Right shoulder curve
    maskCtx.bezierCurveTo(
      canvas.width * 0.78, canvas.height * 0.22,
      canvas.width * 0.75, canvas.height * 0.18,
      canvas.width * 0.7, canvas.height * 0.15
    );
    
    maskCtx.closePath();
    maskCtx.fill();
    
    // Add a subtle inner shadow to the mask for depth
    maskCtx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    maskCtx.shadowBlur = 10;
    maskCtx.shadowOffsetX = 5;
    maskCtx.shadowOffsetY = 5;
    maskCtx.fill();
    
    // Reset shadow
    maskCtx.shadowColor = 'transparent';
    maskCtx.shadowBlur = 0;
    maskCtx.shadowOffsetX = 0;
    maskCtx.shadowOffsetY = 0;
    
    // Calculate the position and size for the garment
    const garmentWidth = canvas.width * 0.8; // Slightly smaller than canvas width
    const garmentHeight = canvas.height * 0.45; // Cover upper body
    const garmentX = (canvas.width - garmentWidth) / 2; // Center horizontally
    const garmentY = canvas.height * 0.15; // Position from top
    
    // Apply the mask to the garment
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(maskCanvas, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    
    // Draw the garment image with proper positioning and sizing
    ctx.drawImage(garmentImg, garmentX, garmentY, garmentWidth, garmentHeight);
    
    // Add fabric texture effect
    const textureCanvas = document.createElement('canvas');
    const textureCtx = textureCanvas.getContext('2d');
    textureCanvas.width = canvas.width;
    textureCanvas.height = canvas.height;
    
    // Create a subtle noise texture
    for (let i = 0; i < textureCanvas.width; i += 2) {
      for (let j = 0; j < textureCanvas.height; j += 2) {
        const noise = Math.random() * 10 - 5;
        textureCtx.fillStyle = `rgba(255, 255, 255, ${noise / 100})`;
        textureCtx.fillRect(i, j, 2, 2);
      }
    }
    
    // Apply the texture with overlay blend mode
    ctx.globalCompositeOperation = 'overlay';
    ctx.globalAlpha = 0.1;
    ctx.drawImage(textureCanvas, 0, 0);
    ctx.globalAlpha = 1.0;
    
    // Add shading to make it look more realistic
    const gradient = ctx.createLinearGradient(0, garmentY, 0, garmentY + garmentHeight);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, garmentY, canvas.width, garmentHeight);
    
    // Add highlights
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, garmentY, canvas.width, garmentHeight * 0.3);
    
    // Add fabric folds effect
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    
    // Draw some curved lines to simulate fabric folds
    for (let i = 0; i < 5; i++) {
      const foldX = garmentX + (garmentWidth / 5) * i;
      const foldWidth = garmentWidth / 10;
      
      ctx.beginPath();
      ctx.moveTo(foldX, garmentY);
      ctx.bezierCurveTo(
        foldX + foldWidth, garmentY + garmentHeight * 0.3,
        foldX - foldWidth, garmentY + garmentHeight * 0.6,
        foldX, garmentY + garmentHeight
      );
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
    
    // Convert the canvas to a blob
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 1.0));
    
    // Create a URL for the image
    const imageUrl = URL.createObjectURL(blob);
    
    console.log('Generated enhanced VTON image:', imageUrl);
    
    // Ensure the blob URL is valid
    if (!imageUrl || !imageUrl.startsWith('blob:')) {
      console.error('Failed to create valid blob URL');
      throw new Error('Failed to create valid blob URL');
    }
    
    return {
      success: true,
      result_image: imageUrl
    };
  } catch (error) {
    console.error('Error in enhanced VTON processing:', error);
    throw error;
  }
};

/**
 * Gets the URL for a result image
 */
export const getResultImage = (filename) => {
  // If filename is already a URL, return it
  if (filename.startsWith('http') || filename.startsWith('blob:')) {
    return filename;
  }
  return `/static/results/${filename}`;
}; 