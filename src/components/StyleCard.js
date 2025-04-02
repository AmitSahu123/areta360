import React from 'react';
import styles from './StyleCard.module.css';

const StyleCard = ({ name, image }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={image} 
          alt={name} 
          className={styles.image}
        />
        <div className={styles.label}>
          {name}
        </div>
      </div>
    </div>
  );
};

export default StyleCard; 