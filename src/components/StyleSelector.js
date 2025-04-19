import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StyleSelector.module.css';
import LoadingScreen from './LoadingScreen';
import { processDirectVTON } from '../services/directVtonService';

const profileImages = [
  { id: 1, image: '/assets1/g1.jpeg', label: 'Style 1' },
  { id: 2, image: '/assets1/g2.jpeg', label: 'Style 2' },
  { id: 3, image: '/assets1/g3.jpeg', label: 'Style 3' },
  { id: 4, image: '/assets1/g4.jpeg', label: 'Style 4' },
  { id: 5, image: '/assets1/g5.jpeg', label: 'Style 5' },
  { id: 6, image: '/assets1/g6.jpeg', label: 'Style 6' },
  { id: 7, image: '/assets1/g7.jpeg', label: 'Style 7' }
];

// Define the category options that appear above the bottom toolbar
const categories = [
  'Basic jumpers',
  'Warm puffer',
  'Bomber',
  'Biker jacket'
];

// Define the tools that appear in the bottom toolbar
const toolbarItems = [
  { id: 'collar', icon: '/assets1/icons/collar.png', label: 'Collar' },
  { id: 'styles', icon: '/assets1/icons/styles.png', label: 'Styles' },
  { id: 'pant', icon: '/assets1/icons/pant.png', label: 'Pant' },
  { id: 'coat', icon: '/assets1/icons/coat.png', label: 'Coat' },
  { id: 'accessories', icon: '/assets1/icons/accessories.png', label: 'Accessories' },
  { id: 'tools', icon: '/assets1/icons/tools.png', label: 'Tools' }
];

export default function StyleSelector() {
  // Initialize navigation function from React Router
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // State management using React hooks
  const [selectedProfile, setSelectedProfile] = useState(0);  // Track selected profile image
  const [selectedCategory, setSelectedCategory] = useState(0);  // Track selected category
  const [isFavorite, setIsFavorite] = useState(false);  // Track favorite status
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageFile, setUploadedImageFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [error, setError] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);

  // Handler for close button click
  const handleClose = () => {
    navigate(-1);  // Go back to previous page
  };

  // Handler for favorite button click
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);  // Toggle favorite status
  };

  // Handler for profile image selection
  const handleProfileClick = async (index) => {
    setSelectedProfile(index);
    setIsProcessing(true);
    setProcessingProgress(0);
    setError(null); // Reset any previous errors

    try {
      // Get the garment image
      const garmentImagePath = profileImages[index].image;
      const garmentResponse = await fetch(garmentImagePath);
      if (!garmentResponse.ok) {
        throw new Error('Failed to load garment image');
      }
      const garmentBlob = await garmentResponse.blob();
      const garmentFile = new File([garmentBlob], `garment_${index}.png`, { type: 'image/png' });

      console.log('Processing images with VTON service...');
      console.log('Using garment image:', garmentImagePath);
      
      // Use the uploaded image if available, otherwise use the default man.png
      let personImageFile;
      if (uploadedImageFile) {
        console.log('Using uploaded image for VTON processing');
        personImageFile = uploadedImageFile;
      } else {
        console.log('Using default man.png for VTON processing');
        const mainImageResponse = await fetch('/assets1/man.png');
        if (!mainImageResponse.ok) {
          throw new Error('Failed to load main image');
        }
        const mainImageBlob = await mainImageResponse.blob();
        personImageFile = new File([mainImageBlob], 'man.png', { type: 'image/png' });
      }
      
      try {
        // Process with VTON service
        console.log('Sending to VTON service - Person image:', personImageFile.name, 'Garment image:', garmentFile.name);
        
        // Log the files being sent
        console.log('Person image file:', personImageFile);
        console.log('Garment image file:', garmentFile);
        
        const result = await processDirectVTON(personImageFile, garmentFile);
        console.log('VTON service response:', result);
        
        if (result && result.success) {
          // Display the generated image directly on the StyleSelector page
          console.log('Displaying generated image:', result.result_image);
          setUploadedImage(result.result_image);
          setSelectedStyle({
            name: `Style ${index + 1}`,
            category: categories[selectedCategory],
            garmentImage: garmentImagePath
          });
        } else {
          // If API fails, show the default image
          console.warn('VTON service did not return success, using default image');
          setUploadedImage('/assets1/man.png');
          setError('Failed to process image. Using default image.');
        }
      } catch (apiError) {
        // If API fails, show the default image
        console.warn('VTON service error, using default image:', apiError);
        setUploadedImage('/assets1/man.png');
        setError('Failed to process image. Using default image.');
      }
    } catch (error) {
      console.error('Error in handleProfileClick:', error);
      setError(error.message || 'An error occurred while processing the images');
      setUploadedImage('/assets1/man.png');
    } finally {
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  };

  const startAIProcessing = (onComplete) => {
    setIsProcessing(true);
    setProcessingProgress(0);
    
    // Simulate AI processing
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          onComplete();
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleToolClick = (toolIndex) => {
    startAIProcessing(() => {
      navigate('/style-editor', { 
        state: { 
          selectedProfile: selectedProfile,
          selectedCategory: selectedCategory,
          isFavorite: isFavorite,
          selectedTool: toolIndex
        }
      });
    });
  };

  const handleSearch = () => {
    // Implement search functionality
  };

  const handleStyleClick = () => {
    navigate('/loading'); // Navigate to loading screen first
  };

  const handle3DClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError(null); // Reset any previous errors

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, JPG, or PNG)');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }

    try {
      setIsProcessing(true);
      setProcessingProgress(30);
      
      // Create a URL for the uploaded file
      const uploadedImageUrl = URL.createObjectURL(file);
      
      // Save the uploaded image and file for later use
      setUploadedImage(uploadedImageUrl);
      setUploadedImageFile(file);
      
      setProcessingProgress(100);
      setIsProcessing(false);
      
      // Show success message
      console.log('Image uploaded successfully:', uploadedImageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.container}>
      {isProcessing && <LoadingScreen progress={processingProgress} />}
      
      {/* Status Bar */}
  

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTopRow}>
          <button className={styles.closeButton} onClick={handleClose}>✕</button>
          <button className={styles.cartButton}>
            <img 
              src="/assets1/images/shopping-cart.png" 
              alt="Cart"
              className={styles.cartIcon}
            />
          </button>
        </div>
        <div className={styles.headerBottomRow}>
          <div className={styles.starContainer}>
            <img 
              src="/assets1/icons/star.png" 
              alt="Star"
              className={styles.starIcon}
              onError={(e) => {
                console.error('Star icon load error:', e);
              }}
            />
          </div>
          <button className={styles.heartButton} onClick={toggleFavorite}>
            <img 
              src="/assets1/icons/heart-circle.png"
              alt="Favorite"
              className={styles.heartIcon}
              onError={(e) => {
                console.error('Heart icon load error:', e);
              }}
            />
          </button>
        </div>
      </div>

      {/* Main Image */}
      <div className={styles.mainImageContainer}>
        <img
          src={uploadedImage || "/assets1/man.png"}
          alt="Style preview"
          className={styles.mainImage}
          onError={(e) => {
            console.error('Image load error:', e);
            e.target.src = '/assets1/1.png';
          }}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png"
          style={{ display: 'none' }}
          aria-label="Upload profile image"
        />
        {uploadError && (
          <div 
            className={styles.errorMessage}
            role="alert"
            aria-live="polite"
          >
            {uploadError}
          </div>
        )}
      </div>

      {/* 3D View Button */}
      <button className={styles.cameraButton} onClick={handle3DClick}>
        <img 
          src="/assets1/icons/3d.png" 
          alt="3D View"
          className={styles.cameraIcon}
        />
      </button>

      {/* Profile Circles */}
      <div className={styles.profilesContainer}>
        {profileImages.map((profile, index) => (
          <button 
            key={profile.id}
            className={`${styles.profileButton} ${selectedProfile === index ? styles.selectedProfile : ''}`}
            onClick={() => handleProfileClick(index)}
          >
            <img
              src={profile.image} 
              alt={profile.label}
              className={styles.profileImage}
              onError={(e) => {
                e.target.src = '/assets1/1.png';
              }}
            />
          </button>
        ))}
      </div>

      {/* Categories */}
      <div className={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <button 
            key={index}
            className={`${styles.categoryButton} ${selectedCategory === index ? styles.selectedCategory : ''}`}
            onClick={() => setSelectedCategory(index)}
          >
            {category}
          </button>
        ))}
        <button 
          className={styles.searchButton}
          onClick={handleSearch}
        >
          <img 
            src="/assets1/icons/search.png" 
            alt="Search" 
            className={styles.searchIcon}
          />
        </button>
      </div>

      {/* Bottom Toolbar */}
      <div className={styles.bottomToolbar}>
        {toolbarItems.map((tool, index) => (
          <button 
            key={index} 
            className={styles.toolbarButton}
            onClick={() => handleToolClick(index)}
          >
            <img 
              src={tool.icon} 
              alt={tool.label}
              className={styles.toolbarIcon}
            />
            <span className={styles.toolbarLabel}>{tool.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}