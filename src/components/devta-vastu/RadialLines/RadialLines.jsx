import React from 'react'

const DIRECTION_DATA = [
  'E',
  '',
  'ESE',
  '',
  'SE',
  '',
  'SSE',
  '',
  'S',
  '',
  'SSW',
  '',
  'SW',
  '',
  'WSW',
  '',
  'W',
  '',
  'WNW',
  '',
  'NW',
  '',
  'NNW',
  '',
  'N',
  '',
  'NNE',
  '',
  'NE',
  '',
  'ENE'
]

const RectangleWithRotatedLines = ({ height, width, degree = 0, cx = 300, cy = 375 }) => {
  const totalLines = 32
  const angleIncrement = 360 / totalLines

  // Define rectangle bounds
  const rectX1 = 20,
    rectY1 = 20
  const rectX2 = rectX1 + (width - 40)
  const rectY2 = rectY1 + (height - 40)

  // Inner rectangle bounds
  const innerPadding = 40
  const innerRectX1 = rectX1 + innerPadding
  const innerRectY1 = rectY1 + innerPadding
  const innerRectX2 = rectX2 - innerPadding
  const innerRectY2 = rectY2 - innerPadding

  // Function to find intersection of a line with the rectangle
  const getIntersection = (angle, bounds) => {
    const radian = (angle * Math.PI) / 180
    const dx = Math.cos(radian)
    const dy = Math.sin(radian)

    let tMin = Infinity
    let intersectX = cx,
      intersectY = cy

    // Check intersection with each side of the given rectangle bounds
    const edges = [
      { x: bounds.x1, y1: bounds.y1, y2: bounds.y2 }, // Left
      { x: bounds.x2, y1: bounds.y1, y2: bounds.y2 }, // Right
      { y: bounds.y1, x1: bounds.x1, x2: bounds.x2 }, // Top
      { y: bounds.y2, x1: bounds.x1, x2: bounds.x2 } // Bottom
    ]

    edges.forEach(edge => {
      let t, x, y
      if (edge.x !== undefined) {
        // Vertical edge
        t = (edge.x - cx) / dx
        y = cy + t * dy
        x = edge.x
        if (y >= edge.y1 && y <= edge.y2 && t > 0 && t < tMin) {
          tMin = t
          intersectX = x
          intersectY = y
        }
      } else {
        // Horizontal edge
        t = (edge.y - cy) / dy
        x = cx + t * dx
        y = edge.y
        if (x >= edge.x1 && x <= edge.x2 && t > 0 && t < tMin) {
          tMin = t
          intersectX = x
          intersectY = y
        }
      }
    })

    // Ensure cross-corner cases take correct axis
    if (intersectX === bounds.x1 || intersectX === bounds.x2) {
      intersectY = Math.round(intersectY)
    } else if (intersectY === bounds.y1 || intersectY === bounds.y2) {
      intersectX = Math.round(intersectX)
    }

    return { x: Math.round(intersectX), y: Math.round(intersectY) }
  }

  const intersections = Array.from({ length: totalLines }).map((_, index) => {
    const angle = index * angleIncrement - degree
    return getIntersection(angle, { x1: innerRectX1, y1: innerRectY1, x2: innerRectX2, y2: innerRectY2 })
  })

  return (
    <svg width='1000' height='800' className="surroundings-svg">
      {/* Outer rectangle */}
      {/* <rect x={rectX1} y={rectY1} width={width - 40} height={height - 40} fill="none" stroke="black" strokeWidth="2" /> */}

      {/* Inner rectangle */}
      {/* <rect x={innerRectX1} y={innerRectY1} width={innerRectX2 - innerRectX1} height={innerRectY2 - innerRectY1} fill="none" stroke="gray" strokeWidth="2" /> */}

      {Array.from({ length: totalLines }).map((_, index) => {
        const angle = index * angleIncrement - degree
        const { x: endX, y: endY } = getIntersection(angle, { x1: rectX1, y1: rectY1, x2: rectX2, y2: rectY2 })

        let adjustedY = endY
        let adjustedX = endX
        // const adjustedY = endY + (endY === rectY2 ? 5 : 10)
        // const adjustedYX = endX + (endX === rectX2 ? -5 : 10)
        let rotation = 0

        if (endX === rectX1) {
          // Left side
          rotation = -90
          adjustedX = endX + 10
        } else if (endX === rectX2) {
          // Right side
          rotation = 90
          adjustedX = endX - 10
        }

        if (endY === rectY1) {
          // Top side
          adjustedY = endY + 10
        } else if (endY === rectY2) {
          // Bottom side
          adjustedY = endY - 10
        }

        return (
          <g key={index}>
            {/* Line from (cx, cy) to the intersection */}
            {/* <line x1={cx} y1={cy} x2={endX} y2={endY} stroke="black" strokeWidth="1" /> */}

            {/* Label each intersection point on the rectangle boundary */}
            <text
              x={adjustedX}
              y={adjustedY}
              transform={`rotate(${rotation}, ${adjustedX}, ${adjustedY})`}
              fontSize='22'
              fontWeight={700}
              fill='#590a73'
              textAnchor='middle'
              alignmentBaseline='middle'
              style={{
                userSelect: 'none',
                cursor: 'default',
                fontWeight: '700',
                fontFamily: 'Segoe UI'
              }}
            >
              {DIRECTION_DATA[index]}
            </text>
          </g>
        )
      })}

      {Array.from({ length: totalLines }).map((_, index) => {
        let label = ''

        if (index < 4) {
          // North (Top, Moves Left to Right)
          label = `E${index + 5}`
        } else if (index < 12) {
          // East (Right, Moves Top to Bottom)
          label = `S${index - 3}`
        } else if (index < 20) {
          // South (Bottom, Moves Right to Left)
          label = `W${index - 11}`
        } else if (index < 28) {
          // West (Left, Moves Bottom to Top)
          label = `N${index - 19}`
        } else {
          label = `E${index - 27}`
        }

        let midX = 0;
        let midY = 0;
        if (index === totalLines - 1) {
          midX = Math.round((intersections[index].x + intersections[0].x) / 2)
          midY = Math.round((intersections[index].y + intersections[0].y) / 2)
        }else{
          midX = Math.round((intersections[index].x + intersections[index + 1].x) / 2)
          midY = Math.round((intersections[index].y + intersections[index + 1].y) / 2)
        }
        return (
          <text
            key={index}
            x={midX}
            y={midY}
            fontSize='18'
            fill='#00a75a'
            fontWeight={700}
            fontFamily='Segoe UI'
            textAnchor='middle'
            alignmentBaseline='middle'
            style={{
              userSelect: 'none',
              cursor: 'default'
            }}
          >
            {label}
          </text>
        )
      })}
    </svg>
  )
}

export default RectangleWithRotatedLines
