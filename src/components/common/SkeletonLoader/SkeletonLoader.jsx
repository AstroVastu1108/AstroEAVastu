// SkeletonLoader.jsx
import React from 'react';
import './SkeletonLoader.css'; // Import the CSS file for styling

const SkeletonLoader = ({ width, height }) => {
  return (
    <div
      className="skeleton-loader"
      style={{
        width: width || '100%',
        height: height || '20px',
        // zIndex: 1000,
        // position: 'relative'
      }}
    ></div>
  );
};

export default SkeletonLoader;