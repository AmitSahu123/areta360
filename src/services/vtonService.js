/**
 * VTON (Virtual Try-On) Service
 * This service handles the processing of person and garment images to create a virtual try-on effect.
 */

/**
 * Helper function to convert a File object to base64 string
 * @param {File} file - The file to convert
 * @returns {Promise<string>} - A promise that resolves to the base64 string
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    // Create a FileReader to read the file
    const reader = new FileReader();
    // Read the file as a data URL (which includes the base64 encoding)
    reader.readAsDataURL(file);
    // When the file is loaded, resolve the promise with the result
    reader.onload = () => resolve(reader.result);
    // If there's an error, reject the promise
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Helper function to convert a File object to a Blob
 * @param {File} file - The file to convert
 * @returns {Promise<Blob>} - A promise that resolves to the Blob
 */
const fileToBlob = async (file) => {
  return new Promise((resolve, reject) => {
    // Create a FileReader to read the file
    const reader = new FileReader();
    // When the file is loaded, create a Blob from the array buffer
    reader.onload = () => {
      const arrayBuffer = reader.result;
      const blob = new Blob([arrayBuffer], { type: file.type });
      resolve(blob);
    };
    // If there's an error, reject the promise
    reader.onerror = reject;
    // Read the file as an array buffer
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Helper function to handle file for Gradio client
 * This is a simple pass-through function that returns the file as is
 * @param {File|string} file - The file to handle
 * @returns {File|string} - The same file
 */
const handle_file = (file) => {
  return file;
};

/**
 * Process VTON request with person and garment images
 * This is the main function that handles the virtual try-on process
 * @param {Object} request - The VTON request containing person and garment images
 * @param {File} request.personImage - The person image file
 * @param {File} request.garmentImage - The garment image file
 * @returns {Promise<Object>} - The VTON response with the generated image
 */
export const processVTON = async (personImage, garmentImage) => {
  try {
    console.log('Starting VTON processing...');
    console.log('Person image:', personImage?.name);
    console.log('Garment image:', garmentImage?.name);
    
    // Validate input
    if (!personImage || !garmentImage) {
      throw new Error('Both person and garment images are required');
    }
    
    // Create FormData for the backend API
    const formData = new FormData();
    formData.append('person_image', personImage);
    formData.append('garment_image', garmentImage);
    
    console.log('Sending request to backend API...');
    
    // Make API call to our backend with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    try {
      // Log the exact URL being used
      const apiUrl = 'http://localhost:5000/api/vton/process';
      console.log('API URL:', apiUrl);
      console.log('API URL length:', apiUrl.length);
      console.log('API URL characters:', Array.from(apiUrl).map(c => c.charCodeAt(0)));
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      clearTimeout(timeoutId);
      
      // Log the response status and headers for debugging
      console.log('API Response Status:', response.status);
      console.log('API Response Headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }
      
      const result = await response.json();
      console.log('API response received:', result);
      
      if (!result || !result.success) {
        console.error('Invalid API response:', result);
        throw new Error('Failed to process images with VTON service');
      }
      
      return {
        success: true,
        result_image: result.result_image
      };
    } catch (fetchError) {
      if (fetchError.name === 'AbortError') {
        throw new Error('Request timed out after 30 seconds');
      }
      throw fetchError;
    }
  } catch (error) {
    console.error('Error in processVTON:', error);
    return {
      success: false,
      error: error.message,
      details: error.stack
    };
  }
};

/**
 * Process VTON request with person and garment images (compatibility function)
 * This function is provided for backward compatibility
 * @param {File} personImage - The person image file
 * @param {File} garmentImage - The garment image file
 * @returns {Promise<Object>} - The VTON response with the generated image
 */
export const processEnhancedVTON = async (personImage, garmentImage) => {
  // Call the main processVTON function with the correct parameter format
  return processVTON(personImage, garmentImage);
};

/**
 * Get the result image URL
 * This function constructs the URL for the result image based on the filename
 * @param {string} filename - The filename of the result image
 * @returns {string} - The URL of the result image
 */
export const getResultImage = (filename) => {
  return `/assets1/${filename}`;
}; 