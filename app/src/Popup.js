import React from 'react';
import './Popup.css';

const Popup = ({ setIsVisible, children }) => {
  if (!setIsVisible) return null; // Don't render anything if it's not visible

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close-btn" onClick={() => setIsVisible(false)}>
          X
        </button>
        <div className="popup-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
