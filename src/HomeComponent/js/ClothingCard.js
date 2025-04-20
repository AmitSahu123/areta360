import React, { useState } from 'react';
import styles from '../css/ClothingCard.module.css';

const ClothingCard = ({ name, image }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {!imageError ? (
          <img
            className={styles.image}
            src={image}
            alt={name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: isLoading ? 'none' : 'block' }}
          />
        ) : (
          <div className={styles.placeholder}>{name}</div>
        )}
        {isLoading && <div className={styles.placeholder}>Loading...</div>}
      </div>
      <div className={styles.label}>{name}</div>
    </div>
  );
};

export default ClothingCard; 