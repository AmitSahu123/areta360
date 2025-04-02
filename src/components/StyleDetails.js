import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StyleDetails.module.css';

const styleVariations = [
  { id: 1, image: '/assets1/man.png' },
  { id: 2, image: '/assets1/Frame 1597881673.png' },
  { id: 3, image: '/assets1/Frame 1597881674.png' },
  { id: 4, image: '/assets1/Frame 1597881674 (1).png' },
  { id: 5, image: '/assets1/polo-style.png' }
];

const tools = [
  { icon: '👔', label: 'Collar' },
  { icon: '👕', label: 'Styles' },
  { icon: '👖', label: 'Pant' },
  { icon: '🧥', label: 'Coat' },
  { icon: '👜', label: 'Accessories' },
  { icon: '🔧', label: 'Tools' }
];

export default function StyleDetails() {
  const navigate = useNavigate();
  const [selectedVariation, setSelectedVariation] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClose = () => {
    navigate(-1);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleToolClick = (toolLabel) => {
    if (toolLabel === 'Styles') {
      navigate('/style-selector');
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
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
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>

      {/* Main Image */}
      <div className={styles.mainImageContainer}>
        <img 
          src={styleVariations[selectedVariation].image}
          alt="Style preview"
          className={styles.mainImage}
        />
        <button className={styles.cameraButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15.2C13.7673 15.2 15.2 13.7673 15.2 12C15.2 10.2327 13.7673 8.8 12 8.8C10.2327 8.8 8.8 10.2327 8.8 12C8.8 13.7673 10.2327 15.2 12 15.2Z" fill="currentColor"/>
            <path d="M9 3L7.17 5H4C2.9 5 2 5.9 2 7V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V7C22 5.9 21.1 5 20 5H16.83L15 3H9Z" fill="currentColor"/>
          </svg>
        </button>
      </div>

      {/* Bottom Toolbar */}
      <div className={styles.toolbar}>
        {tools.map((tool, index) => (
          <React.Fragment key={index}>
            <button 
              className={styles.toolButton}
              onClick={() => handleToolClick(tool.label)}
            >
              <span className={styles.toolIcon}>{tool.icon}</span>
              <span className={styles.toolLabel}>{tool.label}</span>
            </button>
            {index < tools.length - 1 && <div className={styles.toolDivider} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
} 