// src/components/ElementDetailCard.jsx
import React from 'react';
import './ElementDetailCard.css';
// Added FaAtom, FaThermometerEmpty, FaThermometerFull, FaEye
import {
    FaWeightHanging, FaRulerVertical, FaThermometerHalf, FaFlask,
    FaUserAstronaut, FaLink, FaAtom, FaThermometerEmpty, FaThermometerFull, FaEye
} from 'react-icons/fa';

// Helper function to get theme color
const getCategoryColor = (category) => {
    const categoryClass = category ? category.replace(/\s+/g, '-') : 'unknown';
    const colors = {
        'diatomic-nonmetal': '#7FFF00', 'noble-gas': '#800080',
        'alkali-metal': '#FFA500', 'alkaline-earth-metal': '#FFFF00',
        'metalloid': '#008080', 'polyatomic-nonmetal': '#3CB371',
        'post-transition-metal': '#778899', 'transition-metal': '#FFC0CB',
        'lanthanide': '#FFB6C1', 'actinide': '#DB7093', 'unknown': '#D3D3D3'
    };
    return colors[categoryClass] || colors['unknown'];
};

// Helper to format temperature (Kelvin to Celsius)
const formatTemp = (kelvin) => {
    if (kelvin === null || kelvin === undefined) return 'N/A';
    const celsius = kelvin - 273.15;
    // Handle very low precision numbers that might result in "-0.0"
    const formattedCelsius = celsius === 0 && Object.is(celsius, -0) ? '0.0' : celsius.toFixed(1);
    return `${formattedCelsius} °C`;
};


const ElementDetailCard = ({ element, onClose }) => {
  if (!element) {
    return null;
  }

  const themeColor = getCategoryColor(element.category);
  const categoryClass = element.category ? element.category.replace(/\s+/g, '-') : 'unknown';

  return (
    <div className="detail-card-overlay" onClick={onClose}>
      <div
        className={`detail-card-content ${categoryClass}`}
        onClick={(e) => e.stopPropagation()}
        style={{ '--element-theme-color': themeColor }}
      >
        <button className="close-button" onClick={onClose} aria-label="Close details">
          ×
        </button>

        {/* Card Header */}
        <div className="card-header-detailed">
           <span className="header-number">#{element.number}</span>
           <h2 className="header-symbol">{element.symbol}</h2>
           <h3 className="header-name">{element.name}</h3>
           <div className="header-category">{element.category || 'Unknown Category'}</div>
        </div>

        {/* Card Body (Grid Layout) */}
        <div className="card-body-detailed">

          {/* Visual Area (Revised Bohr Model Animation) */}
          <div className="visual-area-animated">
            <div className="bohr-model">
              <div className="nucleus">
                  <span className='proton-count'>{element.number}p</span>
                  {element.atomic_mass && <span className='neutron-count'>{~~(element.atomic_mass - element.number)}n</span>}
              </div>
              {/* Shell Paths and Electron Containers */}
              {element.shells?.map((electrons, index) => {
                 const shellRadius = 35 + index * 25;
                 const displayElectrons = Math.min(electrons, 12);
                 const animationDuration = 10 + index * 10;

                 return (
                    <div
                        key={`path-${index}`}
                        className="shell-path"
                        style={{
                            width: `${shellRadius * 2}px`,
                            height: `${shellRadius * 2}px`,
                        }}
                    >
                       <div
                           className="electron-container"
                           style={{
                               animation: `spin ${animationDuration}s linear infinite ${index % 2 === 0 ? '' : 'reverse'}`,
                           }}
                       >
                            {[...Array(displayElectrons)].map((_, eIndex) => {
                               const angle = (360 / displayElectrons) * eIndex;
                               return (
                                    <div
                                        key={`electron-${index}-${eIndex}`}
                                        className="electron"
                                        style={{
                                            transform: `rotate(${angle}deg) translateX(${shellRadius}px)`
                                        }}
                                    ></div>
                               );
                           })}
                       </div>
                    </div>
                 );
               })}
            </div>
          </div>

          {/* Info Area (More Blocks Added) */}
          <div className="info-area-blocks">
            {/* Key Stats Block */}
            <div className="info-block key-stats">
                <div className="stat">
                    <FaWeightHanging className="stat-icon" />
                    <span className="stat-label">Atomic Mass</span>
                    <span className="stat-value">{element.atomic_mass ? element.atomic_mass.toFixed(3) : 'N/A'} u</span>
                </div>
                <div className="stat">
                    <FaFlask className="stat-icon" />
                    <span className="stat-label">Density</span>
                    <span className="stat-value">{element.density ? `${element.density} g/L` : 'N/A'}</span>
                </div>
                 <div className="stat">
                    <FaThermometerEmpty className="stat-icon" />
                    <span className="stat-label">Melting Pt.</span>
                    <span className="stat-value">{formatTemp(element.melt)}</span>
                </div>
                 <div className="stat">
                    <FaThermometerFull className="stat-icon" />
                    <span className="stat-label">Boiling Pt.</span>
                    <span className="stat-value">{formatTemp(element.boil)}</span>
                </div>
                <div className="stat">
                    <FaThermometerHalf className="stat-icon" />
                    <span className="stat-label">Phase</span>
                    <span className="stat-value">{element.phase || 'N/A'}</span>
                </div>
                 {element.appearance && (
                     <div className="stat appearance-stat">
                         <FaEye className="stat-icon" />
                         <span className="stat-label">Appearance</span>
                         <span className="stat-value">{element.appearance}</span>
                     </div>
                 )}
            </div>

             {/* Atomic Structure Block */}
             <div className="info-block atomic-structure">
                 <h4><FaAtom /> Atomic Structure</h4>
                 <div className="detail-item">
                     <span className="detail-label">Electron Config:</span>
                     <span className="detail-value config">{element.electron_configuration_semantic || element.electron_configuration || 'N/A'}</span>
                 </div>
                 <div className="detail-item">
                     <span className="detail-label">Electrons per Shell:</span>
                     <span className="detail-value shells">{element.shells?.join(', ') || 'N/A'}</span>
                 </div>
             </div>


             {/* Discovery Info Block */}
            <div className="info-block discovery">
                 <h4><FaUserAstronaut /> Discovery & Source</h4>
                 <div className="detail-item">
                     <span className="detail-label">Discovered by:</span>
                     <span className="detail-value">{element.discovered_by || 'N/A'}</span>
                 </div>
                {element.source && (
                    <div className="detail-item source-link">
                        <FaLink className="detail-icon"/>
                        <a href={element.source} target="_blank" rel="noopener noreferrer">
                           Learn More (Source)
                        </a>
                    </div>
                 )}
            </div>

            {/* Summary Block */}
            <div className="info-block summary">
                <h4>Summary</h4>
                <p>{element.summary || 'No summary available.'}</p>
            </div>

          </div> {/* End info-area-blocks */}
        </div> {/* End card-body-detailed */}
      </div> {/* End detail-card-content */}
    </div> // End detail-card-overlay
  );
};

export default ElementDetailCard;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos