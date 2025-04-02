import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AIProcessing.module.css';

export default function AIProcessing() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate AI processing time
    const timer = setTimeout(() => {
      navigate('/style-editor');
    }, 2000); // Navigate after 2 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
        </div>
        <p className={styles.message}>
          Relax while our AI takes care of everything......
        </p>
      </div>
    </div>
  );
} 