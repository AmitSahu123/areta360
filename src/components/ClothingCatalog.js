import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ClothingCatalog.module.css';
import { images } from '../assets/images/clothing';

const clothingItems = [
  { id: 1, name: 'Coat', image: images.coat },
  { id: 2, name: 'Warm puffer', image: images.warmPuffer },
  { id: 3, name: 'Bomber', image: images.bomber },
  { id: 4, name: 'Biker jacket', image: images.bikerJacket },
  { id: 5, name: 'Denim jacket', image: images.denimJacket },
  { id: 6, name: 'Blazer (suit)', image: images.blazer },
  { id: 7, name: 'Printed/checked', image: images.printed },
  { id: 8, name: 'Basic tees', image: images.basicTees },
  { id: 9, name: 'Baseball tee', image: images.baseballTee },
  { id: 10, name: 'Crew neck sweat', image: images.crewNeck }
];

export default function ClothingCatalog() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = clothingItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Clothing Catalog</h1>
      
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for clothing items..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.gridContainer}>
        <div className={styles.grid}>
          {filteredItems.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.imageContainer}>
                <img src={item.image} alt={item.name} className={styles.itemImage} />
              </div>
              <div className={styles.itemName}>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 