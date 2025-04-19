// Test script to verify Hugging Face API connection
import { Client } from '@gradio/client';

// const HF_TOKEN = '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'; // Removed hardcoded token

async function testApiConnection() {
  try {
    console.log('Testing Hugging Face API connection...');
    
    // Connect to the Hugging Face model
    console.log('Connecting to zhengchong/CatVTON...');
    const client = await Client.connect("zhengchong/CatVTON", {
      token: HF_TOKEN
    });
    
    console.log('Connection successful!');
    
    // Test with sample images
    console.log('Fetching sample images...');
    const personResponse = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
    const personImage = await personResponse.blob();
    
    const garmentResponse = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
    const garmentImage = await garmentResponse.blob();
    
    console.log('Sample images fetched successfully!');
    
    // Test the API call
    console.log('Testing API call...');
    const result = await client.predict("/submit_function", {
      person_image: {
        background: personImage,
        layers: [],
        composite: null
      },
      cloth_image: garmentImage,
      cloth_type: "upper",
      num_inference_steps: 10,
      guidance_scale: 0,
      seed: -1,
      show_type: "result only"
    });
    
    console.log('API call successful!');
    console.log('Result:', result);
    
    return {
      success: true,
      message: 'API connection and call successful!',
      result: result
    };
  } catch (error) {
    console.error('Error testing API connection:', error);
    return {
      success: false,
      message: `API test failed: ${error.message}`,
      error: error
    };
  }
}

// Run the test
testApiConnection()
  .then(result => {
    if (result.success) {
      console.log('✅ API test passed!');
    } else {
      console.log('❌ API test failed!');
    }
  })
  .catch(error => {
    console.error('❌ API test failed with error:', error);
  });

module.exports = testApiConnection; 