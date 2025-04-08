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
  { 
    icon: '/assets1/icons/collar.png', 
    label: 'Collar' 
  },
  { 
    icon: '/assets1/icons/styles.png', 
    label: 'Styles' 
  },
  { 
    icon: '/assets1/icons/pant.png', 
    label: 'Pant' 
  },
  { 
    icon: '/assets1/icons/coat.png', 
    label: 'Coat' 
  },
  { 
    divider: true 
  },
  { 
    icon: '/assets1/icons/accessories.png', 
    label: 'Accessories' 
  },
  { 
    icon: '/assets1/icons/tools.png', 
    label: 'Tools' 
  }
];

export default function StyleDetails() {
  const navigate = useNavigate();
  const [selectedVariation, setSelectedVariation] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [iconErrors, setIconErrors] = useState({});

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

  const handleIconError = (iconPath) => {
    console.error(`Failed to load icon: ${iconPath}`);
    setIconErrors(prev => ({
      ...prev,
      [iconPath]: true
    }));
  };

  return (
    <div className={styles.container}>
      {/* Status Bar */}
    

      {/* Header */}
      <div className={styles.header}>
        {/* Top Row */}
        <div className={styles.headerTopRow}>
          <button className={styles.closeButton} onClick={handleClose}>✕</button>
          <button className={styles.iconButton}>
            <img 
              src="/assets1/images/shopping-cart.png" 
              alt="Cart"
              className={styles.headerIcon}
            />
          </button>
        </div>

        {/* Bottom Row */}
        <div className={styles.headerBottomRow}>
          <div className={styles.sparkleContainer}>
            <img 
              src="/assets1/icons/star.png" 
              alt="Star" 
              className={styles.sparkleIcon}
            />
          </div>
          <button className={styles.iconButton} onClick={toggleFavorite}>
            <img 
              src="/assets1/icons/heart-circle.png" 
              alt="Favorite"
              className={`${styles.headerIcon} ${isFavorite ? styles.active : ''}`}
            />
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
      </div>

      {/* Bottom Toolbar */}
      <div className={styles.toolbar}>
        {tools.map((tool, index) => (
          <React.Fragment key={index}>
            {tool.divider ? (
              <div className={styles.verticalDivider} />
            ) : (
              <button 
                className={styles.toolButton}
                onClick={() => handleToolClick(tool.label)}
              >
                <span className={styles.toolIcon}>
                  {!iconErrors[tool.icon] ? (
                    <img 
                      src={tool.icon} 
                      alt={tool.label}
                      className={styles.toolIconImage}
                      onError={() => handleIconError(tool.icon)}
                    />
                  ) : (
                    <span className={styles.fallbackIcon}>{tool.label[0]}</span>
                  )}
                </span>
                <span className={styles.toolLabel}>{tool.label}</span>
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
} 