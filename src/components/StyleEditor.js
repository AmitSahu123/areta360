import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './StyleEditor.module.css';

const rightTools = [
  { id: 'enhance', icon: '/assets1/icons/enhance.png', label: 'Enhance' },
  { id: 'adjust', icon: '/assets1/icons/adjust.png', label: 'Adjust' },
  { id: 'grid', icon: '/assets1/icons/grid.png', label: 'Grid' },
  { id: 'crop', icon: '/assets1/icons/crop.png', label: 'Crop' },
  { id: 'effects', icon: '/assets1/icons/effects.png', label: 'Effects' },
  { id: 'remove', icon: '/assets1/icons/remove.png', label: 'Remove' }
];

const profileImages = [
  { id: 1, image: '/assets1/g1.jpeg', label: 'Style 1' },
  { id: 2, image: '/assets1/g2.jpeg', label: 'Style 2' },
  { id: 3, image: '/assets1/g3.jpeg', label: 'Style 3' },
  { id: 4, image: '/assets1/g4.jpeg', label: 'Style 4' },
  { id: 5, image: '/assets1/g5.jpeg', label: 'Style 5' },
  { id: 6, image: '/assets1/g6.jpeg', label: 'Style 6' },
  { id: 7, image: '/assets1/g7.jpeg', label: 'Style 7' }
];

const categories = [
  'Basic jumpers',
  'Warm puffer',
  'Bomber',
  'Biker jacket'
];

const toolbarItems = [
  { id: 'collar', icon: '/assets1/icons/collar.png', label: 'Collar' },
  { id: 'styles', icon: '/assets1/icons/styles.png', label: 'Styles' },
  { id: 'pant', icon: '/assets1/icons/pant.png', label: 'Pant' },
  { id: 'coat', icon: '/assets1/icons/coat.png', label: 'Coat' },
  { id: 'accessories', icon: '/assets1/icons/accessories.png', label: 'Accessories' },
  { id: 'tools', icon: '/assets1/icons/tools.png', label: 'Tools' }
];

const StyleEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedProfile, setSelectedProfile] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);

  const { generatedImage, garmentImage, styleName, category } = location.state || {};

  useEffect(() => {
    if (!generatedImage) {
      console.log('No generated image provided, redirecting to style selector');
      navigate('/style-selector');
      return;
    }

    console.log('Loading generated image:', generatedImage);
    setIsLoading(true);
    
    const preloadImage = new Image();
    preloadImage.crossOrigin = 'anonymous';
    
    preloadImage.onload = () => {
      console.log('Generated image loaded successfully:', generatedImage);
      setGeneratedImageUrl(generatedImage);
      setIsLoading(false);
    };
    
    preloadImage.onerror = (error) => {
      console.error('Failed to load the generated image:', error);
      setError('Failed to load the generated image');
      setIsLoading(false);
    };
    
    preloadImage.src = generatedImage;
    
    // Cleanup function to revoke blob URL when component unmounts
    return () => {
      if (generatedImageUrl && generatedImageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(generatedImageUrl);
      }
    };
  }, [generatedImage, navigate]);

  const handleClose = () => {
    navigate('/style-selector');
  };

  const handleProfileClick = (index) => {
    setSelectedProfile(index);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
        <p>Loading your style...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Oops!</h2>
        <p>{error}</p>
        <button onClick={handleClose}>Go Back</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.statusBar}>
        <span>9:41</span>
        <span>100%</span>
      </div>
      
      <div className={styles.header}>
        <button className={styles.closeButton} onClick={handleClose}>×</button>
        <div className={styles.title}>
          <h2>{styleName || 'Generated Style'}</h2>
          <p>{category || 'Custom Style'}</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.iconButton}>
            <img src="/assets1/icons/heart-circle.png" alt="Save" className={styles.heartIcon} />
          </button>
          <button className={styles.iconButton}>
            <img src="/assets1/images/shopping-cart.png" alt="Cart" className={styles.cartIcon} />
          </button>
        </div>
      </div>

      <div className={styles.mainImageContainer}>
        {generatedImageUrl ? (
          <img
            src={generatedImageUrl}
            alt="Generated Style"
            className={styles.mainImage}
            crossOrigin="anonymous"
            onError={(e) => {
              console.error('Error displaying generated image:', e);
              setError('Failed to display the generated image');
            }}
          />
        ) : (
          <div className={styles.noImageContainer}>
            <p>No image available</p>
          </div>
        )}
        {garmentImage && (
          <div className={styles.garmentPreview}>
            <img
              src={garmentImage}
              alt="Original Garment"
              className={styles.garmentImage}
              crossOrigin="anonymous"
              onError={(e) => {
                console.error('Error displaying garment image:', e);
              }}
            />
          </div>
        )}
      </div>

      {/* Right Toolbar */}
      <div className={styles.rightToolbar}>
        <div className={styles.toolsLabel}>Tools</div>
        {rightTools.map((tool, index) => (
          <button key={tool.id} className={styles.toolButton}>
            <img src={tool.icon} alt={tool.label} className={styles.toolIcon} />
          </button>
        ))}
      </div>

      {/* Profile Circles */}
      <div className={styles.profilesContainer}>
        {profileImages.map((profile, index) => (
          <button 
            key={profile.id}
            className={`${styles.profileButton} ${selectedProfile === index ? styles.selectedProfile : ''}`}
            onClick={() => handleProfileClick(index)}
          >
            <img
              src={profile.image}
              alt={profile.label}
              className={styles.profileImage}
            />
          </button>
        ))}
      </div>

      {/* Categories */}
      <div className={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <button 
            key={index}
            className={`${styles.categoryButton} ${selectedCategory === index ? styles.selectedCategory : ''}`}
            onClick={() => setSelectedCategory(index)}
          >
            {category}
          </button>
        ))}
        <button className={styles.searchButton}>
          <img src="/assets1/icons/search.png" alt="Search" className={styles.searchIcon} />
        </button>
      </div>

      {/* Bottom Toolbar */}
      <div className={styles.bottomToolbar}>
        {toolbarItems.map((item, index) => (
          <button key={item.id} className={styles.toolbarButton}>
            <img src={item.icon} alt={item.label} className={styles.toolbarIcon} />
            <span className={styles.toolbarLabel}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleEditor;