import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/AILoading.module.css';

const AILoading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to style-selector after 2 seconds
    const timer = setTimeout(() => {
      navigate('/style-selector');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.loadingCircle}>
        <div></div>
      </div>
      <p className={styles.loadingText}>
        Relax while our AI takes care of everything......
      </p>
    </div>
  );
};

export default AILoading; 