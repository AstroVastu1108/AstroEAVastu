import React from 'react';

const GridBackground = ({ width, height }) => {
  const gridSize = 9 * 3.78; // 9 mm in pixels
  const strokeWidth = 0.5;

  return (
    <g>
      {/* Vertical lines */}
      {/* {Array.from({ length: Math.floor(width / gridSize) + 1 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={i * gridSize}
          y1={0}
          x2={i * gridSize}
          y2={height}
          stroke="#000"
          strokeWidth={0.25}
        />
      ))} */}
      {/* Horizontal lines */}
      {/* {Array.from({ length: Math.floor(height / gridSize) + 1 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1={0}
          y1={i * gridSize}
          x2={width}
          y2={i * gridSize}
          stroke="black"
          strokeWidth={0.25}
        />
      ))} */}
      {/* Vertical lines */}
      {Array.from({ length: Math.floor(width / gridSize) + 1 }).map((_, i) => {
        const x = i * gridSize;
        // Skip the first and last vertical lines (borders)
        if (x === 0 || x === width) return null;
        return (
          <line
            key={`v-${i}`}
            x1={x}
            y1={0}
            x2={x}
            y2={height}
            stroke="#cccccc"
            strokeWidth={strokeWidth}
          />
        );
      })}

      {/* Horizontal lines */}
      {Array.from({ length: Math.floor(height / gridSize) + 1 }).map((_, i) => {
        const y = i * gridSize;
        // Skip the first and last horizontal lines (borders)
        if (y === 0 || y === height) return null;
        return (
          <line
            key={`h-${i}`}
            x1={0}
            y1={y}
            x2={width}
            y2={y}
            stroke="#cccccc"
            strokeWidth={strokeWidth}
          />
        );
      })}

    </g>
  );
};

export default GridBackground;
