import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ClothingCatalog.module.css';
import clothingImage from '../assets/images/clothing';

const clothingItems = [
  { id: 1, name: 'Coat', image: clothingImage.coat },
  { id: 2, name: 'Warm puffer', image: clothingImage.warmPuffer },
  { id: 3, name: 'Bomber', image: clothingImage.bomber },
  { id: 4, name: 'Biker jacket', image: clothingImage.bikerJacket },
  { id: 5, name: 'Denim jacket', image: clothingImage.denimJacket },
  { id: 6, name: 'Blazer (suit)', image: clothingImage.blazer },
  { id: 7, name: 'Printed/checked', image: clothingImage.printed },
  { id: 8, name: 'Basic tees', image: clothingImage.basicTees },
  { id: 9, name: 'Baseball tee', image: clothingImage.baseballTee },
  { id: 10, name: 'Crew neck sweat', image: clothingImage.crewNeck }
];

export default function ClothingCatalog() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = clothingItems.filter(item =>
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
                  src={item.image}
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