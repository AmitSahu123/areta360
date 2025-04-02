import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search for clothing items..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar; 