import React from 'react';
import styles from './LoadingScreen.module.css';

const LoadingScreen = ({ progress }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.spinner}></div>
        <h2>Generating Your Style</h2>
        <p>Please wait while we process your image...</p>
        <div className={styles.progressBar}>
          <div 
            className={styles.progress} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className={styles.percentage}>{progress}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen; 