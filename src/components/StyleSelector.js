import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StyleSelector.module.css';

// Define the tools that appear in the right sidebar
const toolbarItems = [
  { id: 1, icon: '📷', label: 'Camera' },
  { id: 2, icon: '🎨', label: 'Style' },
  { id: 3, icon: '📏', label: 'Grid' },
  { id: 4, icon: '📐', label: 'Layout' },
  { id: 5, icon: '💰', label: 'Price' },
  { id: 6, icon: '❌', label: 'Remove' }
];

// Define the profile images that appear in the bottom carousel
const profileImages = [
  { id: 1, image: '/assets1/man.png' },
  { id: 2, image: '/assets1/Group 1597881673.png' },
  { id: 3, image: '/assets1/Frame 1597881674.png' },
  { id: 4, image: '/assets1/Frame 1597881674 (1).png' },
  { id: 5, image: '/assets1/polo-style.png' }
];

// Define the category options that appear above the bottom toolbar
const categories = [
  'Basic jumpers',
  'Warm puffer',
  'Bomber',
  'Biker jacket'
];

// Define the tools that appear in the bottom toolbar
const bottomTools = [
  { icon: '👔', label: 'Collar' },
  { icon: '👕', label: 'Styles' },
  { icon: '👖', label: 'Pant' },
  { icon: '🧥', label: 'Coat' },
  { icon: '👜', label: 'Accessories' },
  { icon: '🔧', label: 'Tools' }
];

export default function StyleSelector() {
  // Initialize navigation function from React Router
  const navigate = useNavigate();

  // State management using React hooks
  const [selectedProfile, setSelectedProfile] = useState(0);  // Track selected profile image
  const [selectedCategory, setSelectedCategory] = useState(0);  // Track selected category
  const [isFavorite, setIsFavorite] = useState(false);  // Track favorite status

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
    navigate('/ai-processing');  // Navigate to AI processing page
  };

  // Handler for camera button click
  const handleCameraClick = () => {
    navigate('/ai-processing');  // Navigate to AI processing page
  };

  return (
    <div className={styles.container}>
      {/* Header section with close button, sparkle icon, and right icons */}
      <div className={styles.header}>
        <button className={styles.closeButton} onClick={handleClose}>
          ✕
        </button>
        <div className={styles.sparkle}>✨</div>
        <div className={styles.headerRight}>
          <button className={styles.iconButton}>🛒</button>
          <button 
            className={styles.iconButton}
            onClick={toggleFavorite}
          >
            {isFavorite ? '❤️' : '🤍'}  {/* Show filled heart if favorited */}
          </button>
        </div>
      </div>

      {/* Main content section */}
      <div className={styles.mainContent}>
        {/* Main image display */}
        <div className={styles.imageContainer}>
          <img 
            src={profileImages[selectedProfile].image}
            alt="Style preview"
            className={styles.mainImage}
          />
        </div>

        {/* Right toolbar with editing tools */}
        <div className={styles.rightToolbar}>
          <div className={styles.toolsLabel}>Tools</div>
          {toolbarItems.map((item) => (
            <button 
              key={item.id} 
              className={styles.toolButton}
            >
              <span className={styles.toolIcon}>{item.icon}</span>
            </button>
          ))}
        </div>

        {/* Profile image carousel at bottom */}
        <div className={styles.profilesContainer}>
          {profileImages.map((profile, index) => (
            <button
              key={profile.id}
              className={`${styles.profileButton} ${selectedProfile === index ? styles.selectedProfile : ''}`}
              onClick={() => handleProfileClick(index)}
            >
              <img 
                src={profile.image} 
                alt={`Profile ${index + 1}`}
                className={styles.profileImage}
              />
            </button>
          ))}
        </div>

        {/* Categories section above bottom toolbar */}
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
          <button className={styles.searchButton}>
            🔍
          </button>
        </div>

        {/* Bottom toolbar with main tools */}
        <div className={styles.bottomToolbar}>
          {bottomTools.map((tool, index) => (
            <button key={index} className={styles.toolbarButton}>
              <span className={styles.toolbarIcon}>{tool.icon}</span>
              <span className={styles.toolbarLabel}>{tool.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 