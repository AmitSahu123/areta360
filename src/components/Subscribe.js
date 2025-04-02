import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Subscribe.module.css';

export default function Subscribe() {
  // Hook to handle navigation between pages
  const navigate = useNavigate();

  // Function that handles what happens when Subscribe or Skip is clicked
  const handleSubscribe = () => {
    navigate('/style-loading');  // Navigate to the loading page
  };

  return (
    // Main container with black background
    <div className={styles.container}>
      {/* Content wrapper with max width and centered alignment */}
      <div className={styles.content}>
        {/* Container for the main subscription image */}
        <div className={styles.imageContainer}>
          <img 
            src="/assets1/images/Subscribe Now!.png"  // Path to the subscription image
            alt="Subscribe" 
            className={styles.subscribeImage}
            // Handle image loading errors
            onError={(e) => {
              console.error('Failed to load subscribe image');
              e.target.src = '/images/placeholder.png';  // Show placeholder if image fails
              e.target.onerror = null;
            }}
          />
        </div>

        {/* Main heading with gradient text effect */}
        <h1 className={styles.title}>Subscribe Now</h1>

        {/* Description text */}
        <p className={styles.description}>
          Get access to all premium features and personalized style recommendations
        </p>
        
        {/* Container for subscription plans */}
        <div className={styles.planContainer}>
          {/* Monthly subscription plan card */}
          <div className={styles.plan}>
            <h2>Monthly</h2>
            <div className={styles.price}>$9.99</div>
            <button 
              className={styles.subscribeButton}
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
          </div>

          {/* Yearly subscription plan card with featured styling */}
          <div className={`${styles.plan} ${styles.featured}`}>
            <div className={styles.badge}>Best Value</div>
            <h2>Yearly</h2>
            <div className={styles.price}>$89.99</div>
            <div className={styles.savings}>Save 25%</div>
            <button 
              className={`${styles.subscribeButton} ${styles.featured}`}
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Skip subscription button */}
        <button 
          className={styles.skipButton}
          onClick={handleSubscribe}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
} 