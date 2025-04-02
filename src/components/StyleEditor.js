import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StyleEditor.module.css';

const toolbarItems = [
  { id: 1, icon: '📷', label: 'Camera' },
  { id: 2, icon: '🎨', label: 'Style' },
  { id: 3, icon: '📏', label: 'Grid' },
  { id: 4, icon: '📐', label: 'Layout' },
  { id: 5, icon: '💰', label: 'Price' },
  { id: 6, icon: '❌', label: 'Remove' }
];

const profileImages = [
  { id: 1, image: '/assets1/man.png', label: 'Style 1' },
  { id: 2, image: '/assets1/Frame 1597881673.png', label: 'Style 2' },
  { id: 3, image: '/assets1/Frame 1597881674.png', label: 'Style 3' },
  { id: 4, image: '/assets1/Frame 1597881674 (1).png', label: 'Style 4' },
  { id: 5, image: '/assets1/polo-style.png', label: 'Style 5' }
];

const categories = [
  'Basic jumpers',
  'Warm puffer',
  'Bomber',
  'Biker jacket'
];

const bottomTools = [
  { icon: '👔', label: 'Collar' },
  { icon: '👕', label: 'Styles' },
  { icon: '👖', label: 'Pant' },
  { icon: '🧥', label: 'Coat' },
  { icon: '👜', label: 'Accessories' },
  { icon: '🔧', label: 'Tools' }
];

export default function StyleEditor() {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [imageError, setImageError] = useState(false);

  const handleClose = () => {
    navigate(-1);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleSearch = () => {
    navigate('/clothing-catalog');
  };

  const handleProfileSelect = (index) => {
    setSelectedProfile(index);
    setImageError(false);
  };

  const handleImageError = () => {
    console.error('Failed to load image:', profileImages[selectedProfile].image);
    setImageError(true);
  };

  return (
    <div className={styles.container}>
      {/* Status Bar */}
      <div className={styles.statusBar}>
        <span>12:30</span>
        <div className={styles.statusIcons}>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <button className={styles.closeButton} onClick={handleClose}>✕</button>
        <div className={styles.sparkle}>✨</div>
        <div className={styles.headerRight}>
          <button className={styles.iconButton}>🛒</button>
          <button className={styles.iconButton} onClick={toggleFavorite}>
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.imageContainer}>
          {!imageError ? (
            <img 
              src={profileImages[selectedProfile].image}
              alt={profileImages[selectedProfile].label}
              className={styles.mainImage}
              onError={handleImageError}
            />
          ) : (
            <div className={styles.errorMessage}>
              Image could not be loaded
            </div>
          )}
        </div>

        {/* Right Toolbar */}
        <div className={styles.rightToolbar}>
          <div className={styles.toolsLabel}>Tools</div>
          {toolbarItems.map((item) => (
            <button key={item.id} className={styles.toolButton}>
              {item.icon}
            </button>
          ))}
        </div>

        {/* Profile Circles */}
        <div className={styles.profilesContainer}>
          {profileImages.map((profile, index) => (
            <button
              key={profile.id}
              className={`${styles.profileButton} ${selectedProfile === index ? styles.selectedProfile : ''}`}
              onClick={() => handleProfileSelect(index)}
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
          <button className={styles.searchButton} onClick={handleSearch}>
            🔍
          </button>
        </div>

        {/* Bottom Navigation */}
        <div className={styles.bottomNav}>
          {bottomTools.map((tool, index) => (
            <button key={index} className={styles.navItem}>
              <span className={styles.navIcon}>{tool.icon}</span>
              <span className={styles.navLabel}>{tool.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 