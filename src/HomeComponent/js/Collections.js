import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Collections.module.css';

// Corrected Asset Paths
import frame1Image from '../../assets/Frame 1597881673.png';
import frame2Image from '../../assets/Frame 1597881674.png';
import poloStyleImage from '../../assets/polo-style.png';
import frame3Image from '../../assets/Frame 1597881674 (1).png';
import shoppingCartImage from '../../assets/images/shopping-cart.png';
import notificationImage from '../../assets/images/notification.png';
import settingImage from '../../assets/images/setting.png';

// Define the available style categories with their images and names
const styleCategories = [
  {
    id: 1,
    name: 'Casual',  // Name of the style category
    image: frame1Image  // Use imported image
  },
  {
    id: 2,
    name: 'Trendy',
    image: frame2Image // Use imported image
  },
  {
    id: 3,
    name: 'Polo Style',
    image: poloStyleImage // Use imported image
  },
  {
    id: 4,
    name: 'Sunny look',
    image: frame3Image // Use imported image
  }
];

const tabs = ['YOURS', 'TRENDING', 'ALL COLLECTIONS'];

export default function Collections() {
  // Hook to handle navigation between pages
  const navigate = useNavigate();
  // State to track how many times a style has been clicked
  const [activeTab, setActiveTab] = useState(0);

  // Function that handles what happens when a style is clicked
  const handleStyleClick = (styleId) => {
    // Simply navigate to the style details page on any click
    console.log(`Navigating to /style/${styleId}`)
    navigate(`/style/${styleId}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleExploreMore = () => {
    // Navigate to a page showing all styles or categories
    navigate('/clothing-catalog'); // Example: Navigate to a catalog page
  };

  return (
    // Main container with black background
    <div className={styles.container}>
      {/* Header section with title and menu */}
      <div className={styles.header}>
       
        <h1>Collections</h1>
        <div className={styles.headerIcons}>
          <button className={styles.iconButton}>
            <img src={shoppingCartImage} alt="Cart" />
          </button>
          <button className={styles.iconButton}>
            <img src={notificationImage} alt="Notifications" />
          </button>
          <button className={styles.iconButton}>
            <img src={settingImage} alt="Settings" />
          </button>
        </div>
      </div>

      <div className={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`${styles.tab} ${index === activeTab ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.customizeText}>
        Start Customise
      </div>

      {/* Grid of style cards */}
      <div className={styles.grid}>
        {styleCategories.map((category) => (
          // Individual style card that can be clicked
          <div 
            key={category.id} 
            className={styles.card}
            onClick={() => handleStyleClick(category.id)}
          >
            {/* Container for the style image */}
            <div className={styles.imageContainer}>
              <img
                src={category.image}
                alt={category.name}
                className={styles.image}
                // Handle image loading errors
                onError={(e) => {
                  console.error(`Failed to load image for ${category.name}`);
                  e.target.src = '/images/placeholder.png';
                  e.target.onerror = null;
                }}
              />
              {/* Overlay with style name */}
              <div className={styles.overlay}>
                <h3>{category.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <button className={styles.exploreButton} onClick={handleExploreMore}>
          Explore More
        </button>
      </div>

      <button className={styles.floatingButton}>+</button>
    </div>
  );
} 