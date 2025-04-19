import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import ClothingCard from './components/ClothingCard';
import Collections from './components/Collections';
import StyleDetails from './components/StyleDetails';
import StyleSelector from './components/StyleSelector';
import StyleLoading from './components/StyleLoading';
import Subscribe from './components/Subscribe';
import AIProcessing from './components/AIProcessing';
import StyleEditor from './components/StyleEditor';
import ClothingCatalog from './components/ClothingCatalog';
import AILoading from './components/AILoading';
import styles from './App.module.css';
import clothingImage from './assets/images/clothing';

const clothingItems = [
  { 
    id: 1, 
    name: 'Coat', 
    image: clothingImage.coat
  },
  { 
    id: 2, 
    name: 'Warm puffer', 
    image: clothingImage.warmPuffer
  },
  { 
    id: 3, 
    name: 'Bomber', 
    image: clothingImage.bomber
  },
  { 
    id: 4, 
    name: 'Biker jacket', 
    image: clothingImage.bikerJacket
  },
  { 
    id: 5, 
    name: 'Denim jacket', 
    image: clothingImage.denimJacket
  },
  { 
    id: 6, 
    name: 'Blazer (suit)', 
    image: clothingImage.blazer
  },
  { 
    id: 7, 
    name: 'Printed/checked', 
    image: clothingImage.printed
  },
  { 
    id: 8, 
    name: 'Basic tees', 
    image: clothingImage.basicTees
  },
  { 
    id: 9, 
    name: 'Baseball tee', 
    image: clothingImage.baseballTee
  },
  { 
    id: 10, 
    name: 'Crew neck sweat', 
    image: clothingImage.crewNeck
  }
];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Collections />} />
        <Route path="/style/:styleId" element={<StyleDetails />} />
        <Route path="/style-selector" element={<StyleSelector />} />
        <Route path="/style-loading" element={<StyleLoading />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/ai-processing" element={<AIProcessing />} />
        <Route path="/style-editor" element={<StyleEditor />} />
        <Route path="/clothing-catalog" element={<ClothingCatalog />} />
        <Route path="/loading" element={<AILoading />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App; 