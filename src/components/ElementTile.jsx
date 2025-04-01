// src/components/ElementTile.jsx
import React from 'react';
import './ElementTile.css'; // Import the CSS for this component

// Functional component receiving element data and onClick handler as props
const ElementTile = ({ element, onClick }) => {
  // Construct class names: base class, placeholder class, category class
  const categoryClass = element.category ? element.category.replace(/\s+/g, '-').toLowerCase() : 'unknown'; // Normalize class name
  const tileClasses = `
    element-tile
    ${element.isPlaceholder ? 'placeholder-tile' : ''}
    ${categoryClass}
  `;

  // Decide whether the tile should be clickable
  const handleClick = () => {
      if (!element.isPlaceholder && onClick) {
          onClick(element);
      }
      // If it's a placeholder, do nothing onClick
  };

  // Tooltip: Show full name for normal elements, series name for placeholders
  const title = element.isPlaceholder ? `${element.name} (${element.number})` : `${element.name} (#${element.number})`;

  return (
    <div
      className={tileClasses.trim()} // Use the constructed class names
      style={{
        // Position is still determined by App.jsx grid logic via data
        gridColumnStart: element.xpos,
        gridRowStart: element.ypos,
      }}
      onClick={handleClick} // Call the conditional click handler
      title={title} // Add a tooltip
    >
      <strong>{element.symbol}</strong>
      {/* Display atomic number unless it's a placeholder string like '57-71' */}
      {typeof element.number === 'number' && <small>{element.number}</small>}
      {/* Display name, maybe shorter for placeholder if needed */}
      <span>{element.isPlaceholder ? element.symbol : element.name}</span>
    </div>
  );
};

export default ElementTile;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos
