/**
 * Direct VTON Service
 * This service makes a direct request to the backend API for VTON processing.
 */

/**
 * Process VTON request with person and garment images
 * @param {File} personImage - The person image file
 * @param {File} garmentImage - The garment image file
 * @returns {Promise<Object>} - The VTON response with the generated image
 */
export const processDirectVTON = async (personImage, garmentImage) => {
  try {
    console.log('Starting direct VTON processing...');
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
    
    // Make API call to our backend
    const response = await fetch('http://localhost:5000/api/vton/process', {
      method: 'POST',
      body: formData
    });
    
    // Log the response status for debugging
    console.log('API Response Status:', response.status);
    
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
    
    // Return the result image URL
    return {
      success: true,
      result_image: result.result_image
    };
  } catch (error) {
    console.error('Error in processDirectVTON:', error);
    return {
      success: false,
      error: error.message
    };
  }
}; 