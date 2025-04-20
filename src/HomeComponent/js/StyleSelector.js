import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/StyleSelector.module.css';
import { processEnhancedVTON } from '../../services/enhancedVtonService';
import LoadingScreen from './LoadingScreen';

// Corrected Asset Paths
let g1, g2, g3, g4, g5, g6, g7, manImage, defaultGarmentImage, collarIcon, stylesIcon, pantIcon, coatIcon, accessoriesIcon, toolsIcon, starIcon, heartCircleIcon, threeDIcon, searchIcon, shoppingCartImage;

try {
  g1 = require('../../assets/g1.jpeg');
  g2 = require('../../assets/g2.jpeg');
  g3 = require('../../assets/g3.jpeg');
  g4 = require('../../assets/g4.jpeg');
  g5 = require('../../assets/g5.jpeg');
  g6 = require('../../assets/g6.jpeg');
  g7 = require('../../assets/g7.jpeg');
  manImage = require('../../assets/man.png');
  defaultGarmentImage = require('../../assets/1.png'); 
  collarIcon = require('../../assets/icons/collar.png');
  stylesIcon = require('../../assets/icons/styles.png');
  pantIcon = require('../../assets/icons/pant.png');
  coatIcon = require('../../assets/icons/coat.png');
  accessoriesIcon = require('../../assets/icons/accessories.png');
  toolsIcon = require('../../assets/icons/tools.png');
  starIcon = require('../../assets/icons/star.png');
  heartCircleIcon = require('../../assets/icons/heart-circle.png');
  threeDIcon = require('../../assets/icons/3d.png');
  searchIcon = require('../../assets/icons/search.png');
  shoppingCartImage = require('../../assets/images/shopping-cart.png');
  console.log('Successfully required assets for StyleSelector');
} catch (error) {
    console.error("CRITICAL ERROR: Failed to require essential assets for StyleSelector. Check paths and file existence in src/assets.", error);
    // Assign null to prevent crashes, but component will lack images
    [g1, g2, g3, g4, g5, g6, g7, manImage, defaultGarmentImage, collarIcon, stylesIcon, pantIcon, coatIcon, accessoriesIcon, toolsIcon, starIcon, heartCircleIcon, threeDIcon, searchIcon, shoppingCartImage] = Array(20).fill(null);
}

// Use imports/require results in data arrays
const initialProfiles = [
  { id: 1, image: g1, label: 'Style 1' },
  { id: 2, image: g2, label: 'Style 2' },
  { id: 3, image: g3, label: 'Style 3' },
  { id: 4, image: g4, label: 'Style 4' },
  { id: 5, image: g5, label: 'Style 5' },
  { id: 6, image: g6, label: 'Style 6' },
  { id: 7, image: g7, label: 'Style 7' }
];

// *** Add back the categories array ***
const categories = [
  'Basic jumpers',
  'Warm puffer',
  'Bomber',
  'Biker jacket'
];

const tools = [
  { id: 'collar', icon: collarIcon, label: 'Collar' },
  { id: 'styles', icon: stylesIcon, label: 'Styles' },
  { id: 'pant', icon: pantIcon, label: 'Pant' },
  { id: 'coat', icon: coatIcon, label: 'Coat' },
  { id: 'accessories', icon: accessoriesIcon, label: 'Accessories' },
  { id: 'tools', icon: toolsIcon, label: 'Tools' }
];

export default function StyleSelector() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Restore state relevant to Figma layout
  const [uploadedImage, setUploadedImage] = useState(null); // Blob URL for display
  const [uploadedImageFile, setUploadedImageFile] = useState(null); // File object for processing
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0); // Index for profile circles
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0); // Index for category text
  const [selectedToolId, setSelectedToolId] = useState('styles'); // Default selected tool ('Styles')
  const [isFavorite, setIsFavorite] = useState(false); // For heart icon
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  // Remove searchTerm state if search bar is just an icon/button in this view
  // const [searchTerm, setSearchTerm] = useState('');

  // Add useEffect for asset loading check (keep this)
  useEffect(() => {
      if (!manImage || !g1) { 
          console.error("StyleSelector mounted, but essential image assets (manImage, g1) are null. Imports/requires failed.");
      } else {
          console.log("StyleSelector mounted with image assets loaded.");
      }
  }, []);

  // Restore handlers relevant to Figma layout
  const handleClose = () => navigate(-1);
  const toggleFavorite = () => setIsFavorite(!isFavorite);
  
  const handleProfileClick = async (index) => {
      console.log('[handleProfileClick] Started for index:', index); // Log start
      setSelectedProfileIndex(index);
      console.log("Profile index selected (Garment Image):", index);

      // Get the clicked profile/garment data
      const garmentProfile = initialProfiles[index];
      if (!garmentProfile || !garmentProfile.image) {
          console.error('[handleProfileClick] Invalid garment profile or image for index:', index, garmentProfile); // Log error
          alert("Invalid garment selected.");
          return;
      }
      console.log('[handleProfileClick] Garment profile selected:', garmentProfile);

      // Get the uploaded person image file
      const personImageToProcess = uploadedImageFile;
      if (!personImageToProcess) {
          console.warn('[handleProfileClick] No person image uploaded yet.'); // Log warning
          alert('Please upload your image using the camera icon first.');
          return;
      }
      console.log('[handleProfileClick] Person image file exists:', personImageToProcess.name);

      // Convert selected garment image to File
      console.log('[handleProfileClick] Attempting to convert garment image to file:', garmentProfile.image);
      const garmentImageFile = await imageImportToFile(garmentProfile.image, `garment_${garmentProfile.id || index}.png`);
      if (!garmentImageFile) {
          console.error('[handleProfileClick] Failed to convert garment image to file.'); // Log error
          alert('Could not load selected garment image for processing.');
          return;
      }
      console.log('[handleProfileClick] Garment image converted to file:', garmentImageFile.name);

      // Start processing
      console.log('[handleProfileClick] Setting processing state to true.');
      setIsProcessing(true);
      setProcessingProgress(0);
      simulateAIProcessing(); // Start simulation

      try {
          console.log('[handleProfileClick] Calling VTON service via profile click with:', personImageToProcess?.name, garmentImageFile?.name);
          // Call VTON with person=uploadedImage, garment=clickedProfileImage
          const result = await processEnhancedVTON(personImageToProcess, garmentImageFile);
          console.log('[handleProfileClick] VTON Result:', result);

          if (result && result.success && result.result_image) {
              console.log('[handleProfileClick] VTON success, navigating to editor.');
              // Navigate to editor on success
              navigate('/style-editor', { 
                  state: { 
                      generatedImage: result.result_image, 
                      profileId: garmentProfile.id, // Pass garment profile ID
                      toolId: selectedToolId, // Pass selected tool if relevant
                      originalPersonImage: uploadedImage, // Pass blob URL of uploaded image
                      originalGarmentImage: garmentProfile.image // Pass imported garment image 
                  }
              });
          } else {
              console.warn('[handleProfileClick] VTON failed:', result?.error); // Log failure
              // Navigate on failure
              alert(`VTON processing failed: ${result?.error || 'Unknown error'}. Navigating with original images.`);
              navigate('/style-editor', { 
                  state: { 
                      originalPersonImage: uploadedImage, 
                      originalGarmentImage: garmentProfile.image, 
                      profileId: garmentProfile.id, 
                      toolId: selectedToolId, 
                      error: result?.error || 'VTON failed' 
                  }
              });
          }
      } catch (error) {
          console.error('[handleProfileClick] Error during VTON processing call:', error); // Log exception
          // Navigate on exception
          alert(`Error during VTON processing: ${error.message}. Navigating with original images.`);
          navigate('/style-editor', { 
              state: { 
                  originalPersonImage: uploadedImage, 
                  originalGarmentImage: garmentProfile.image, 
                  profileId: garmentProfile.id, 
                  toolId: selectedToolId, 
                  error: error.message 
              }
          });
      } finally {
          console.log('[handleProfileClick] Setting processing state to false.');
          setIsProcessing(false);
          setProcessingProgress(100);
      }
  };
  
  const handleCategoryClick = (index) => {
      setSelectedCategoryIndex(index);
      console.log("Category index selected:", index);
      // VTON is triggered by profile click
  };

  const handleSearchClick = () => {
      console.log("Search icon clicked, navigating to Clothing Catalog...");
      // Navigate to the Clothing Catalog page
      navigate('/clothing-catalog'); 
  };

  const handleToolClick = (tool) => {
      if (!tool) return;
      setSelectedToolId(tool.id);
      console.log('Tool clicked:', tool);
      // Logic to apply tool or navigate might go here, potentially to StyleEditor
      // Example navigation:
      // navigate('/style-editor', { state: { /* pass state */ } }); 
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Keep validation
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) { alert('Invalid file type...'); return; }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) { alert('File size exceeds 5MB limit.'); return; }
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl); 
      setUploadedImageFile(file); 
      console.log('Image uploaded:', file.name);
    }
  };

  // Keep blob URL cleanup
  useEffect(() => {
    const currentUploadedImage = uploadedImage;
    return () => { if (currentUploadedImage?.startsWith('blob:')) URL.revokeObjectURL(currentUploadedImage); };
  }, [uploadedImage]);

  const triggerFileInput = () => { if (fileInputRef.current) fileInputRef.current.click(); };

  // *** Add helper function to convert imported image src to File ***
  async function imageImportToFile(imageSrc, fileName) {
    if (!imageSrc) {
        console.error("imageImportToFile called with null imageSrc");
        return null; 
    }
    try {
      // Fetch needs the correct path relative to the public URL, 
      // or use the imported variable directly if the build process handles it.
      // Assuming the build process makes assets available relative to root or handles imports:
      const response = await fetch(imageSrc); // Use the variable resolved by require()
      if (!response.ok) {
          throw new Error(`Failed to fetch image for conversion: ${response.statusText} for src: ${imageSrc}`);
      }
      const blob = await response.blob();
      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      console.error(`Error converting image import ${fileName} to file:`, imageSrc, error);
      return null;
    }
  }

  // *** Add function to simulate AI processing progress ***
  // Declare intervalIdRef at the component scope to store the interval ID
  const intervalIdRef = useRef(null); 

  const simulateAIProcessing = () => {
    // Clear any existing interval before starting a new one
    if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
    }

    setProcessingProgress(0); // Reset progress
    let progress = 0;
    
    intervalIdRef.current = setInterval(() => {
      progress += 10;
      // Use functional update for state based on previous state
      setProcessingProgress(prev => {
          const newProgress = Math.min(prev + 10, 100);
          if (newProgress >= 100) {
              clearInterval(intervalIdRef.current); // Clear interval when done
              intervalIdRef.current = null;
          }
          return newProgress;
      }); 
      
    }, 300); // Adjust timing as needed
  };

  // Ensure interval is cleared on unmount
  useEffect(() => {
      return () => {
          if (intervalIdRef.current) {
              clearInterval(intervalIdRef.current);
          }
      };
  }, []);

  // Fallback rendering if assets failed to load (keep this)
  if (!manImage || !g1 || !starIcon || !searchIcon || !shoppingCartImage || !tools[0]?.icon) {
      return (
          <div className={styles.container}>
              <h1>Error Loading Assets</h1>
              <p>Essential images or icons could not be loaded. Please check console and ensure files exist in src/assets.</p>
          </div>
      );
  }

  // *** Rebuild JSX structure to match Figma ***
  return (
    <div className={styles.container}>
      {isProcessing && <LoadingScreen progress={processingProgress} />} {/* Optional: Keep loading screen */}
      
      {/* Header - Close, Cart, Heart */}
      <div className={styles.header}> {/* Use existing header styles if appropriate */}
         {/* Assuming headerTopRow structure or similar */}
         <div className={styles.headerTopRow}>
            <button className={styles.closeButton} onClick={handleClose}>✕</button>
            <button className={styles.cartButton} onClick={() => navigate('/cart')}>
               <img src={shoppingCartImage} alt="Cart" className={styles.cartIcon} />
            </button>
         </div>
         {/* Add the Star Container back to the bottom row of the header */}
         <div className={styles.headerBottomRow}> 
             <div className={styles.starContainer}> 
                 <img src={starIcon} alt="Rating" className={styles.starIcon} />
             </div>
             {/* You might need an empty div or similar on the right for spacing if required by layout */}
             <div></div> 
         </div>
         {/* Optional: Add heart icon if it was part of the header */} 
         <div className={styles.heartContainer}> {/* Use heartContainer style or similar */} 
            <button className={styles.heartButton} onClick={toggleFavorite}>
               <img src={heartCircleIcon} alt="Favorite" className={`${styles.heartIcon} ${isFavorite ? styles.active : ''}`} />
            </button>
          </div>
      </div>

      {/* Main Image - Remove onClick here */}
      <div className={styles.mainImageContainer}> 
        <img
          src={uploadedImage || manImage} // Use uploaded blob URL or imported manImage
          alt="Style preview"
          className={styles.mainImage}
          onError={(e) => { e.target.onerror = null; e.target.src = defaultGarmentImage; }}
        />
         <input 
           type="file" 
           accept="image/png, image/jpeg, image/jpg" 
           ref={fileInputRef} 
           onChange={handleFileChange} 
           style={{ display: 'none' }}
           id="imageUploadInput"
           name="imageUpload"
         />
      </div>

      {/* Camera Button - Keep onClick here */}
      <button 
        className={styles.cameraButton} 
        onClick={triggerFileInput}
        aria-label="Upload your image"
      > 
        <img 
          src={threeDIcon} // Use the imported icon
          alt="Upload Image" // Changed alt text slightly
          className={styles.cameraIcon} // Use the specific icon style
        />
      </button>

      {/* Profile Circles */} 
      <div className={styles.profilesContainer}> 
        {initialProfiles.map((profile, index) => (
           profile?.image ? (
              <button 
                key={profile.id}
                className={`${styles.profileButton} ${selectedProfileIndex === index ? styles.selectedProfile : ''}`} 
                onClick={() => handleProfileClick(index)}
              >
                <img
                  src={profile.image} 
                  alt={profile.label}
                  className={styles.profileImage}
                />
              </button>
          ) : null
        ))}
      </div>

      {/* Categories */} 
      <div className={styles.categoriesContainer}> 
        {categories.map((category, index) => (
          <button 
            key={index}
            className={`${styles.categoryButton} ${selectedCategoryIndex === index ? styles.selectedCategory : ''}`} 
            onClick={() => handleCategoryClick(index)}
          >
            {category}
          </button>
        ))}
        <button className={styles.searchButton} onClick={handleSearchClick}> 
           <img src={searchIcon} alt="Search" className={styles.searchIcon}/>
        </button>
      </div>

      {/* Bottom Toolbar */} 
      <div className={styles.bottomToolbar}> 
        {tools.map((tool) => (
           tool?.icon ? (
              <button 
                key={tool.id} 
                className={`${styles.toolbarButton} ${selectedToolId === tool.id ? styles.selectedTool : ''}`} // Add selected class maybe
                onClick={() => handleToolClick(tool)}
              >
                <img 
                  src={tool.icon} 
                  alt={tool.label}
                  className={styles.toolbarIcon}
                />
                <span className={styles.toolbarLabel}>{tool.label}</span>
              </button>
           ) : null
        ))}
      </div>
    </div>
  );
}