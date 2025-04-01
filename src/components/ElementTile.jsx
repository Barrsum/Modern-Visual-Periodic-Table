// src/components/ElementTile.jsx
import React from 'react';
import './ElementTile.css'; // Import the CSS for this component

// Functional component receiving element data and onClick handler as props
const ElementTile = ({ element, onClick }) => {
  // Construct class names: base class, placeholder class, category class
  const categoryClass = element.category ? element.category.replace(/\s+/g, '-') : 'unknown'; // Handle potential missing category
  const tileClasses = `
    element-tile
    ${element.isPlaceholder ? 'placeholder-tile' : ''}
    ${categoryClass}
  `;

  return (
    <div
      className={tileClasses.trim()} // Use the constructed class names
      style={{
        // Position is still determined by App.jsx grid, passed via style prop
        gridColumnStart: element.xpos,
        gridRowStart: element.ypos,
      }}
      onClick={() => onClick(element)} // Call the passed onClick function when clicked
      title={element.name} // Add a tooltip showing the full name on hover
    >
      <strong>{element.symbol}</strong>
      <small>{element.number}</small>
      <span>{element.name}</span>
    </div>
  );
};

export default ElementTile;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos