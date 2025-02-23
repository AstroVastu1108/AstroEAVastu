import React from 'react'

const GridBackground = ({ width, height }) => {
  const gridSize = 9 * 3.78 // 9 mm in pixels
  const strokeWidth = 0.5
  // const columns = Math.floor(width / gridSize);
  const maxColumns = 24 // Limit to 24 columns for numbering
  const maxRows = 26 // Limit to 26 rows (A-Z)
  const columns = Math.min(Math.ceil(width / gridSize), maxColumns)
  const rows = Math.min(Math.ceil(height / gridSize), maxColumns)
  const leftX = -gridSize / 2 + 30 // Shift inside the grid
  const rightX = width + gridSize / 2 - 30 // Shift inside the grid

  return (
    <g>
      {/* Top and Bottom Numbers (1-24) */}
      {Array.from({ length: Math.min(columns, maxColumns) }).map((_, i) => {
        const x = i * gridSize + gridSize / 2 // Center in the grid cell
        return (
          <>
            {/* Top Numbers */}
            <text
              key={`top-${i}`}
              x={x}
              y={10} // Position above the grid
              fontSize='12'
              textAnchor='middle'
              fill='var(--primary-color)'
              fontFamily="'Segoe UI', Arial, sans-serif"
              fontWeight={600}
            >
              {i + 1}
            </text>
            {/* Bottom Numbers */}
            <text
              key={`bottom-${i}`}
              x={x}
              y={height - 5} // Position below the grid
              fontSize='12'
              textAnchor='middle'
              fill='var(--primary-color)'
              fontFamily="'Segoe UI', Arial, sans-serif"
              fontWeight={600}
            >
              {i + 1}
            </text>
          </>
        )
      })}

      {Array.from({ length: Math.min(rows, maxRows) }).map((_, i) => {
        const y = i * gridSize + gridSize / 2 // Center in the grid cell
        const letter = String.fromCharCode(65 + i) // Convert to A-Z
        return (
          <>
            {/* Left Alphabet */}
            <text
              key={`left-${i}`}
              x={leftX}
              y={y}
              fontSize='12'
              textAnchor='end'
              alignmentBaseline='middle'
              fill='var(--primary-color)'
              fontFamily="'Segoe UI', Arial, sans-serif"
              fontWeight={600}
            >
              {letter}
            </text>
            {/* Right Alphabet */}
            <text
              key={`right-${i}`}
              x={rightX}
              y={y}
              fontSize='12'
              textAnchor='start'
              alignmentBaseline='middle'
              fill='var(--primary-color)'
              fontFamily="'Segoe UI', Arial, sans-serif"
              fontWeight={600}
            >
              {letter}
            </text>
          </>
        )
      })}

      {/* Vertical Grid Lines */}
      {Array.from({ length: columns + 1 }).map((_, i) => {
        const x = i * gridSize
        if (x === 0 || x === width) return null // Skip borders
        return <line key={`v-${i}`} x1={x} y1={0} x2={x} y2={height} stroke='#cccccc' strokeWidth={strokeWidth} />
      })}

      {/* Horizontal Grid Lines */}
      {Array.from({ length: rows + 1 }).map((_, i) => {
        const y = i * gridSize
        if (y === 0 || y === height) return null // Skip borders
        return <line key={`h-${i}`} x1={0} y1={y} x2={width} y2={y} stroke='#cccccc' strokeWidth={strokeWidth} />
      })}
    </g>
  )
}

export default GridBackground
