import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import the necessary components from the correct path
import Collections from './HomeComponent/js/Collections';
import StyleDetails from './HomeComponent/js/StyleDetails';
import StyleSelector from './HomeComponent/js/StyleSelector';
import StyleLoading from './HomeComponent/js/StyleLoading';
import AIProcessing from './HomeComponent/js/AIProcessing';
import StyleEditor from './HomeComponent/js/StyleEditor';
import ClothingCatalog from './HomeComponent/js/ClothingCatalog';
import AILoading from './HomeComponent/js/AILoading';

// Import App styles if needed
import styles from './App.module.css';

function App() {
  return (
    // Router is wrapping this component in src/index.js
    <Routes>
      <Route path="/" element={<Collections />} />
      <Route path="/style/:styleId" element={<StyleDetails />} />
      <Route path="/style-selector" element={<StyleSelector />} />
      <Route path="/style-loading" element={<StyleLoading />} />
      <Route path="/ai-processing" element={<AIProcessing />} />
      <Route path="/style-editor" element={<StyleEditor />} />
      <Route path="/clothing-catalog" element={<ClothingCatalog />} />
      <Route path="/loading" element={<AILoading />} />
      <Route path="*" element={<div className={styles.notFound}>Page not found</div>} />
    </Routes>
  );
}

export default App; 