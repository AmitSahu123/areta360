import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Collection.module.css';

const Collection = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          ← Back
        </button>
        <h1 className={styles.title}>My Collection</h1>
      </header>
      
      <div className={styles.grid}>
        {/* Collection items will go here */}
      </div>
    </div>
  );
};

export default Collection; 