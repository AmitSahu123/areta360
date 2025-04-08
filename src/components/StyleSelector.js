import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StyleSelector.module.css';

const profileImages = [
  { id: 1, image: '/assets1/1.png', label: 'Style 1' },
  { id: 2, image: '/assets1/2.png', label: 'Style 2' },
  { id: 3, image: '/assets1/3.png', label: 'Style 3' },
  { id: 4, image: '/assets1/4.png', label: 'Style 4' },
  { id: 5, image: '/assets1/5.png', label: 'Style 5' },
  { id: 6, image: '/assets1/6.png', label: 'Style 6' },
  { id: 7, image: '/assets1/7.png', label: 'Style 7' }
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

  // State management using React hooks
  const [selectedProfile, setSelectedProfile] = useState(0);  // Track selected profile image
  const [selectedCategory, setSelectedCategory] = useState(0);  // Track selected category
  const [isFavorite, setIsFavorite] = useState(false);  // Track favorite status
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  // Handler for close button click
  const handleClose = () => {
    navigate(-1);  // Go back to previous page
  };

  // Handler for favorite button click
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);  // Toggle favorite status
  };

  // Handler for profile image selection
  const handleProfileClick = (index) => {
    setSelectedProfile(index);  // Update selected profile
    startAIProcessing(() => {
      navigate('/style-editor', { 
        state: { 
          selectedProfile: index,
          selectedCategory: selectedCategory,
          isFavorite: isFavorite
        }
      });
    });
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

  return (
    <div className={styles.container}>
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
          src="/assets1/man.png"
          alt="Style preview"
          className={styles.mainImage}
          onError={(e) => {
            console.error('Image load error:', e);
            e.target.src = '/assets1/1.png';
          }}
        />
        {isProcessing && (
          <div className={styles.processingOverlay}>
            <div className={styles.processingSpinner}>
              <div></div>
            </div>
          </div>
        )}
      </div>

      {/* 3D View Button */}
      <button className={styles.cameraButton}>
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