// src/App.jsx

import React, { useState } from 'react'; // Import useState hook
import data from './elements.json';
import './App.css'; // Global App styles
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Social icons
import ElementTile from './components/ElementTile'; // The tile component
import ElementDetailCard from './components/ElementDetailCard'; // The detail card component

function App() {
  // --- Data Preparation (Processing elements, adding placeholders) ---
  const originalElements = data.elements;

  const lanthanum = originalElements.find(el => el.number === 57);
  const actinium = originalElements.find(el => el.number === 89);

  const placeholderLa = lanthanum ? {
    ...lanthanum,
    xpos: 3,
    ypos: 6,
    isPlaceholder: true
  } : null;

  const placeholderAc = actinium ? {
    ...actinium,
    xpos: 3,
    ypos: 7,
    isPlaceholder: true
  } : null;

  const allDisplayElements = [
    ...originalElements,
    placeholderLa,
    placeholderAc
  ].filter(Boolean); // Combine and remove nulls

  // --- State Management ---
  // State variable to keep track of the currently selected element
  // Starts as null (no element selected, card is hidden)
  const [selectedElement, setSelectedElement] = useState(null);

  // --- Event Handlers ---

  // Function to run when an element tile is clicked
  const handleTileClick = (element) => {
    if (element.isPlaceholder) {
      // Optional: You might want different behavior for placeholders.
      // For now, we'll let them open the card too.
      console.log("Clicked Placeholder for:", element.name, "Series");
      // If you want to PREVENT placeholders from opening a card, uncomment the next line:
      // return;
    }
    console.log("Selecting element:", element);
    setSelectedElement(element); // Update the state with the data of the clicked element
  };

  // Function to run when the detail card should be closed
  const handleCloseCard = () => {
    console.log("Closing card");
    setSelectedElement(null); // Reset the state to null, hiding the card
  };

  // --- Render Logic ---
  return (
    <div className="App">
      <h1>Modern Periodic Table</h1>
      <h2>Click any element to see more details</h2>
      <h5>Created by Ram Bapat</h5>

      {/* The Grid of Element Tiles */}
      <div className="periodic-table-grid">
        {allDisplayElements.map(element => (
          <ElementTile
            // Unique key is important for React's rendering
            key={`${element.number}-${element.xpos}-${element.ypos}`}
            element={element} // Pass element data down to the tile
            onClick={handleTileClick} // Pass the click handler down to the tile
          />
        ))}
      </div>

      {/* Conditionally Render the Element Detail Card */}
      {/* This part only renders if 'selectedElement' is not null */}
      {selectedElement && (
        <ElementDetailCard
          element={selectedElement} // Pass the data of the selected element
          onClose={handleCloseCard} // Pass the function to close the card
        />
      )}

      {/* Footer Section */}
      <footer>
        <p>Created by Ram Bapat</p>
        <div className="social-links">
          {/* --- !!! REMEMBER TO UPDATE THESE URLs !!! --- */}
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

// Export the App component to be used in main.jsx
export default App;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos