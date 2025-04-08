import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Collections.module.css';

// Define the available style categories with their images and names
const styleCategories = [
  {
    id: 1,
    name: 'Casual',  // Name of the style category
    image: '/assets1/Frame 1597881673.png'  // Path to the style image
  },
  {
    id: 2,
    name: 'Trendy',
    image: '/assets1/Frame 1597881674.png'
  },
  {
    id: 3,
    name: 'Polo Style',
    image: '/assets1/polo-style.png'
  },
  {
    id: 4,
    name: 'Sunny look',
    image: '/assets1/Frame 1597881674 (1).png'
  }
];

const tabs = ['YOURS', 'TRENDING', 'ALL COLLECTIONS'];

export default function Collections() {
  // Hook to handle navigation between pages
  const navigate = useNavigate();
  // State to track how many times a style has been clicked
  const [totalClicks, setTotalClicks] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  // Function that handles what happens when a style is clicked
  const handleStyleClick = (styleId) => {
    setTotalClicks(prev => {
      const newCount = prev + 1;  // Increment the click counter
      
      if (newCount === 3) {  // If this is the third click
        // Navigate to the subscription page
        navigate('/subscribe');
        return 0;  // Reset the counter back to 0
      } else {
        // For first and second clicks, go to the style details page
        navigate(`/style/${styleId}`);
        return newCount;  // Keep track of the current click count
      }
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    // Main container with black background
    <div className={styles.container}>
      {/* Header section with title and menu */}
      <div className={styles.header}>
       
        <h1>Collections</h1>
        <div className={styles.headerIcons}>
          <button className={styles.iconButton}>
            <img src="/assets1/images/shopping-cart.png" alt="Cart" />
          </button>
          <button className={styles.iconButton}>
            <img src="/assets1/images/notification.png" alt="Notifications" />
          </button>
          <button className={styles.iconButton}>
            <img src="/assets1/images/setting.png" alt="Settings" />
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

      <button className={styles.floatingButton}>+</button>
    </div>
  );
} 