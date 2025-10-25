import React from 'react'

const GridBackground = ({ width, height }) => {
  const gridSize = 9 * 3.78 // 9 mm in pixels
  const strokeWidth = 0.5
  const maxColumns = 26 // Fixed to 24 columns
  const maxRows = 22 // Fixed to 22 rows

  const leftX = -gridSize / 2 + 20 // Shift inside the grid
  const rightX = width + gridSize / 2 - 20 // Shift inside the grid

  return (
    <g>
      {/* Top and Bottom Numbers (1-24) */}
      {Array.from({ length: maxColumns }).map((_, i) => {
        const x = i * gridSize + gridSize / 2 // Center in the grid cell
        return (
          <React.Fragment key={`col-${i}`}>
            {/* Top Numbers */}
            <text
              x={x}
              y={10}
              fontSize='12'
              textAnchor='middle'
              fill='gray'
              fontFamily='Segoe UI'
              fontWeight={600}
              style={{ userSelect: 'none', cursor: 'default' }}
            >
              {i + 1}
            </text>
            {/* Bottom Numbers */}
            <text
              x={x}
              y={height - 5}
              fontSize='12'
              textAnchor='middle'
              fill='gray'
              fontFamily='Segoe UI'
              fontWeight={600}
              style={{ userSelect: 'none', cursor: 'default' }}
            >
              {i + 1}
            </text>
          </React.Fragment>
        )
      })}

      {/* Left and Right Alphabets (A-V) */}
      {Array.from({ length: maxRows }).map((_, i) => {
        const y = i * gridSize + gridSize / 2 // Center in the grid cell
        const letter = String.fromCharCode(65 + i) // Convert to A-V
        return (
          <React.Fragment key={`row-${i}`}>
            {/* Left Alphabet */}
            <text
              x={leftX}
              y={y}
              fontSize='12'
              textAnchor='start'
              alignmentBaseline='middle'
              fill='gray'
              fontFamily="'Segoe UI', Arial, sans-serif"
              fontWeight={600}
              style={{ userSelect: 'none', cursor: 'default' }}
            >
              {letter}
            </text>
            {/* Right Alphabet */}
            <text
              x={rightX}
              y={y}
              fontSize='12'
              textAnchor='end'
              alignmentBaseline='middle'
              fill='gray'
              fontFamily="'Segoe UI', Arial, sans-serif"
              fontWeight={600}
              style={{ userSelect: 'none', cursor: 'default' }}
            >
              {letter}
            </text>
          </React.Fragment>
        )
      })}

      {/* Vertical Grid Lines */}
      {Array.from({ length: maxColumns + 1 }).map((_, i) => {
        const x = i * gridSize
        if (x === 0 || x === width) return null // Skip borders
        return <line key={`v-${i}`} x1={x} y1={0} x2={x} y2={height} stroke='#cccccc' strokeWidth={strokeWidth} />
      })}

      {/* Horizontal Grid Lines */}
      {Array.from({ length: maxRows + 1 }).map((_, i) => {
        const y = i * gridSize
        if (y === 0 || y === height) return null // Skip borders
        return <line key={`h-${i}`} x1={0} y1={y} x2={width} y2={y} stroke='#cccccc' strokeWidth={strokeWidth} />
      })}
    </g>
  )
}

export default GridBackground
