import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StyleLoading.module.css';

export default function StyleLoading() {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to style-selector after 2 seconds
    const timer = setTimeout(() => {
      navigate('/style-selector', { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.loadingCircle}>
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle
              className={styles.circle}
              cx="100"
              cy="100"
              r="80"
              fill="none"
              strokeWidth="4"
            />
            <circle
              className={styles.pulseCircle}
              cx="100"
              cy="100"
              r="60"
              fill="#007FFF"
              opacity="0.2"
            />
          </svg>
        </div>
        <p className={styles.text}>Relax while our AI takes care of everything...</p>
      </div>
    </div>
  );
} 