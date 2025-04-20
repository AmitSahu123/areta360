import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/AIProcessing.module.css';

export default function AIProcessing() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate AI processing time - reduced to 2 seconds
    const timer = setTimeout(() => {
      navigate('/style-editor');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleSubscribe = () => {
    // Handle subscribe action here
    console.log('Subscribe clicked');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.loadingCircle}></div>
        <p className={styles.loadingText}>Relax while our AI takes care of everything......</p>
        <button className={styles.subscribeButton} onClick={handleSubscribe}>
          Subscribe Now
        </button>
      </div>
    </div>
  );
} 