// src/App.jsx

import React, { useState } from 'react';
import data from './elements.json';
import './App.css'; // Global App styles
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Social icons
import ElementTile from './components/ElementTile'; // The tile component
import ElementDetailCard from './components/ElementDetailCard'; // The detail card component

function App() {
  // --- Data Preparation ---
  const originalElements = data.elements;

  // Create placeholders for Lanthanide/Actinide series triggers in the main grid
  const lanthanum = originalElements.find(el => el.number === 57);
  const actinium = originalElements.find(el => el.number === 89);

  // Placeholders use base element data but override position and add a flag
  const placeholderLa = lanthanum ? {
    ...lanthanum, // Copy properties from Lanthanum
    name: "Lanthanides", // Change name for the placeholder
    symbol: "La-Lu", // Indicate range
    category: "lanthanide", // Keep category for color
    xpos: 3,
    ypos: 6,
    isPlaceholder: true, // Custom flag
    number: '57-71' // Indicate range in number field too
  } : null;

  const placeholderAc = actinium ? {
    ...actinium, // Copy properties from Actinium
    name: "Actinides", // Change name for the placeholder
    symbol: "Ac-Lr", // Indicate range
    category: "actinide", // Keep category for color
    xpos: 3,
    ypos: 7,
    isPlaceholder: true, // Custom flag
    number: '89-103' // Indicate range in number field too
  } : null;

  // Filter out the actual Lanthanides/Actinides from the main grid display positions
  // They will be placed in rows 9 and 10 based on their ypos in elements.json
  const mainGridElements = originalElements.filter(el =>
    !(el.ypos === 9 || el.ypos === 10) // Keep elements NOT in rows 9 or 10
  );

  const allDisplayElements = [
    ...mainGridElements,
    placeholderLa, // Add the Lanthanide placeholder
    placeholderAc, // Add the Actinide placeholder
    // Add the actual Lanthanides and Actinides (they have correct ypos: 9/10)
    ...originalElements.filter(el => el.ypos === 9 || el.ypos === 10)
  ].filter(Boolean); // Combine and remove nulls if La/Ac weren't found

  // --- State Management ---
  const [selectedElement, setSelectedElement] = useState(null);

  // --- Event Handlers ---
  const handleTileClick = (element) => {
    // Don't open detail card for the range placeholders
    if (element.isPlaceholder) {
       console.log("Clicked Placeholder for:", element.name);
       // Potentially scroll to the Lanthanide/Actinide rows in the future
       return; // Prevent opening card for placeholders
    }
    console.log("Selecting element:", element);
    setSelectedElement(element);
  };

  const handleCloseCard = () => {
    console.log("Closing card");
    setSelectedElement(null);
  };

  // --- Render Logic ---
  return (
    <div className="App">
      <h1>Modern Visual Periodic Table</h1>
      <h2>Click an element tile to see details</h2>
      <h5>Created by Ram Bapat</h5>

      {/* Add a container to manage scrolling on mobile */}
      <div className="periodic-table-container">
        {/* The Grid of Element Tiles */}
        <div className="periodic-table-grid">
          {allDisplayElements.map(element => (
            <ElementTile
              // Use atomic number and name as key for stability if data changes slightly
              key={`${element.number}-${element.name}`}
              element={element}
              onClick={handleTileClick}
            />
          ))}
        </div>
      </div>

      {/* Conditionally Render the Element Detail Card */}
      {selectedElement && (
        <ElementDetailCard
          element={selectedElement}
          onClose={handleCloseCard}
        />
      )}

      {/* Footer Section */}
      <footer>
        <p>Created by Ram Bapat</p>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/ram-bapat-barrsum-diamos" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
            <FaLinkedin />
          </a>
          <a href="https://github.com/Barrsum/Modern-Visual-Periodic-Table" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
            <FaGithub />
          </a>
        </div>
        <h7>Connect above</h7>
      </footer>
    </div>
  );
}

export default App;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos
