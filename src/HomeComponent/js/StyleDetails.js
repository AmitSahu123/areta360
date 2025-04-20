import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../css/StyleDetails.module.css';

// Import images from src/assets
import manImage from '../../assets/man.png';
import frame1Image from '../../assets/Frame 1597881673.png';
import frame2Image from '../../assets/Frame 1597881674.png';
import frame3Image from '../../assets/Frame 1597881674 (1).png';
import poloStyleImage from '../../assets/polo-style.png';
import collarIcon from '../../assets/icons/collar.png';
import stylesIcon from '../../assets/icons/styles.png';
import pantIcon from '../../assets/icons/pant.png';
import coatIcon from '../../assets/icons/coat.png';
import accessoriesIcon from '../../assets/icons/accessories.png';
import toolsIcon from '../../assets/icons/tools.png';
import starIcon from '../../assets/icons/star.png';
import heartCircleIcon from '../../assets/icons/heart-circle.png';
import shoppingCartImage from '../../assets/images/shopping-cart.png';

// Restore original data structure names and update image paths
const styleVariations = [
  { id: 1, image: manImage },
  { id: 2, image: frame1Image },
  { id: 3, image: frame2Image },
  { id: 4, image: frame3Image },
  { id: 5, image: poloStyleImage }
];

const tools = [
  { icon: collarIcon, label: 'Collar' },
  { icon: stylesIcon, label: 'Styles' },
  { icon: pantIcon, label: 'Pant' },
  { icon: coatIcon, label: 'Coat' },
  { divider: true },
  { icon: accessoriesIcon, label: 'Accessories' },
  { icon: toolsIcon, label: 'Tools' }
];

export default function StyleDetails() {
  const { styleId } = useParams();
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
    setIconErrors(prev => ({ ...prev, [iconPath]: true }));
  };

  const handleImageSelect = (index) => {
    setSelectedVariation(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTopRow}>
          <button className={styles.closeButton} onClick={handleClose}>✕</button>
          <button className={styles.iconButton}>
            <img 
              src={shoppingCartImage}
              alt="Cart"
              className={styles.headerIcon}
            />
          </button>
        </div>
        <div className={styles.headerBottomRow}>
          <div className={styles.sparkleContainer}>
            <img 
              src={starIcon}
              alt="Star" 
              className={styles.sparkleIcon}
            />
          </div>
          <button className={styles.iconButton} onClick={toggleFavorite}>
            <img 
              src={heartCircleIcon}
              alt="Favorite"
              className={`${styles.headerIcon} ${isFavorite ? styles.active : ''}`}
            />
          </button>
        </div>
      </div>

      <div className={styles.mainImageContainer}>
        <img 
          src={styleVariations[selectedVariation].image}
          alt="Style preview"
          className={styles.mainImage}
        />
      </div>

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