import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClothingCard from './ClothingCard';
import styles from '../css/ClothingCatalog.module.css';
// import clothingImage from '../assets/images/clothing'; // Original broken import, keep commented

// Import the actual images from src/assets/profiles using CORRECT filenames
import coatImage from '../../assets/profiles/coat.png';
import warmPufferImage from '../../assets/profiles/warm-puffer.png'; // Corrected filename
import bomberImage from '../../assets/profiles/bomber.png';
import bikerJacketImage from '../../assets/profiles/biker-jacket.png'; // Corrected filename
import denimJacketImage from '../../assets/profiles/denim-jacket.png'; // Corrected filename
import blazerImage from '../../assets/profiles/blazer.png';
import printedImage from '../../assets/profiles/printed.png'; // Corrected filename (was checked?)
import basicTeesImage from '../../assets/profiles/basic-tees.png';
import baseballTeeImage from '../../assets/profiles/baseball-tee.png';
import crewNeckImage from '../../assets/profiles/crew-neck.png';

// Uncomment and update the array with new imports
const clothingItems = [
  { id: 1, name: 'Coat', image: coatImage },
  { id: 2, name: 'Warm Puffer', image: warmPufferImage }, // Use corrected import
  { id: 3, name: 'Bomber', image: bomberImage },
  { id: 4, name: 'Biker Jacket', image: bikerJacketImage }, // Use corrected import
  { id: 5, name: 'Denim Jacket', image: denimJacketImage }, // Use corrected import
  { id: 6, name: 'Blazer', image: blazerImage },
  { id: 7, name: 'Printed', image: printedImage }, // Use corrected import
  { id: 8, name: 'Basic Tees', image: basicTeesImage },
  { id: 9, name: 'Baseball Tee', image: baseballTeeImage },
  { id: 10, name: 'Crew Neck', image: crewNeckImage },
];

export default function ClothingCatalog() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter out items with null images before mapping
  const validItems = clothingItems.filter(item => item.image !== null);

  const filteredItems = validItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.topBar}></div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search here"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.gridContainer}>
        <div className={styles.grid}>
          {filteredItems.map((item) => (
            <div key={item.id} className={styles.card} onClick={() => navigate('/style-editor')}>
              <div className={styles.imageContainer}>
                <img
                  src={item.image} // This will now be the imported image object or null
                  alt={item.name}
                  className={styles.itemImage}
                />
              </div>
              <div className={styles.itemName}>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 