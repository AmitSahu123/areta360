import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StyleEditor.module.css';

const toolbarItems = [
  { id: 'collar', icon: '/assets1/icons/collar.png', label: 'Collar' },
  { id: 'styles', icon: '/assets1/icons/styles.png', label: 'Styles' },
  { id: 'pant', icon: '/assets1/icons/pant.png', label: 'Pant' },
  { id: 'coat', icon: '/assets1/icons/coat.png', label: 'Coat' },
  { id: 'accessories', icon: '/assets1/icons/accessories.png', label: 'Accessories' },
  { id: 'tools', icon: '/assets1/icons/tools.png', label: 'Tools' }
];

const rightTools = [
  { id: 't1', icon: '/assets1/icons/t1.png' },
  { id: 't2', icon: '/assets1/icons/t2.png' },
  { id: 't3', icon: '/assets1/icons/t3.png' },
  { id: 't4', icon: '/assets1/icons/t4.png' },
  { id: 't5', icon: '/assets1/icons/t5.png' },
  { id: 't6', icon: '/assets1/icons/t6.png' }
];

const profileImages = [
  { id: 1, image: '/assets1/1.png', label: 'Style 1' },
  { id: 2, image: '/assets1/2.png', label: 'Style 2' },
  { id: 3, image: '/assets1/3.png', label: 'Style 3' },
  { id: 4, image: '/assets1/4.png', label: 'Style 4' },
  { id: 5, image: '/assets1/5.png', label: 'Style 5' },
  { id: 6, image: '/assets1/6.png', label: 'Style 6' },
  { id: 7, image: '/assets1/7.png', label: 'Style 7' }
];

const categories = [
  'All Styles',
  'Formal',
  'Casual',
  'Party Wear',
  'Business'
];

export default function StyleEditor() {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All Styles');
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClose = () => {
    navigate(-1);
  };

  const handleSearch = () => {
    navigate('/clothing-catalog');
  };

  return (
    <div className={styles.container}>
      {/* Status Bar */}
     

      {/* Header */}
      <div className={styles.header}>
        <button className={styles.closeButton} onClick={handleClose}>×</button>
        <div className={styles.sparkle}>
          <img 
            src="/assets1/icons/star.png" 
            alt="Star"
            className={styles.starIcon}
          />
        </div>
        <div className={styles.headerRight}>
          <button className={styles.iconButton}>
            <img 
              src="/assets1/icons/shopping-cart.png" 
              alt="Cart" 
              className={styles.cartIcon}
            />
          </button>
          <button 
            className={styles.iconButton} 
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <img 
              src={isFavorite ? "/assets1/icons/heart-circle-filled.png" : "/assets1/icons/heart-circle.png"} 
              alt="Favorite" 
              className={styles.heartIcon}
            />
          </button>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.mainImageContainer}>
          <img 
            src="/assets1/model1.png" 
            alt="Main Style" 
            className={styles.mainImage}
          />
        </div>

        {/* Camera Button */}
        <button className={styles.cameraButton}>
          <img 
            src="/assets1/icons/3d.png" 
            alt="3D View" 
            className={styles.cameraIcon}
          />
        </button>

        <div className={styles.rightToolbar}>
          <div className={styles.toolsLabel}>Tools</div>
          {rightTools.map((tool) => (
            <button key={tool.id} className={styles.toolButton}>
              <img 
                src={tool.icon} 
                alt={tool.id} 
                className={styles.toolIcon}
                onError={(e) => {
                  console.error('Tool icon load error:', e);
                  e.target.src = '/assets1/icons/tools.png';
                }}
              />
            </button>
          ))}
        </div>

        <div className={styles.profilesContainer}>
          {profileImages.map((profile) => (
            <button
              key={profile.id}
              className={`${styles.profileButton} ${
                selectedProfile === profile.id ? styles.selectedProfile : ''
              }`}
              onClick={() => setSelectedProfile(profile.id)}
            >
              <img
                src={profile.image}
                alt={profile.label}
                className={styles.profileImage}
              />
            </button>
          ))}
        </div>

        <div className={styles.categoriesContainer}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                selectedCategory === category ? styles.selectedCategory : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
          <button 
            className={styles.searchButton}
            onClick={handleSearch}
          >
            <img 
              src="/assets1/icons/search.png" 
              alt="Search" 
              className={styles.searchIcon}
            />
          </button>
        </div>

        <div className={styles.bottomToolbar}>
          {toolbarItems.map((item) => (
            <button key={item.id} className={styles.toolbarButton}>
              <img 
                src={item.icon} 
                alt={item.label} 
                className={styles.toolbarIcon}
              />
              <span className={styles.toolbarLabel}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}