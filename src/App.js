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
import styles from './App.module.css';
import { images } from './assets/images/clothing';

const clothingItems = [
  { 
    id: 1, 
    name: 'Coat', 
    image: images.coat
  },
  { 
    id: 2, 
    name: 'Warm puffer', 
    image: images.warmPuffer
  },
  { 
    id: 3, 
    name: 'Bomber', 
    image: images.bomber
  },
  { 
    id: 4, 
    name: 'Biker jacket', 
    image: images.bikerJacket
  },
  { 
    id: 5, 
    name: 'Denim jacket', 
    image: images.denimJacket
  },
  { 
    id: 6, 
    name: 'Blazer (suit)', 
    image: images.blazer
  },
  { 
    id: 7, 
    name: 'Printed/checked', 
    image: images.printed
  },
  { 
    id: 8, 
    name: 'Basic tees', 
    image: images.basicTees
  },
  { 
    id: 9, 
    name: 'Baseball tee', 
    image: images.baseballTee
  },
  { 
    id: 10, 
    name: 'Crew neck sweat', 
    image: images.crewNeck
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
      </Routes>
    </Router>
  );
}

export default App; 