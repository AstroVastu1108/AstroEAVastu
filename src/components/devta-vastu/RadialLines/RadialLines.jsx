// import React from "react";

// const DIRECTION_DATA = [
//   "N", "", "NE", "", "E", "", "SE", "",
//   "S", "", "SW", "", "W", "", "NW", "",
//   "N", "", "NE", "", "E", "", "SE", "",
//    "SSW", "", "WSW", "", "WNW", "", "NNW"
// ];

// const RadialLines = ({ width, height, cx, cy, margin = 30, rotation = 0 }) => {
//   const numLines = 32; // Divide into 32 parts
//   const halfWidth = (width - margin * 2) / 2;
//   const halfHeight = (height - margin * 2) / 2;

//   const calculateIntersection = (angle) => {
//     const radian = (angle * Math.PI) / 180;
//     const tanAngle = Math.tan(radian);

//     // Determine which edge the line intersects
//     if (Math.abs(tanAngle) <= halfHeight / halfWidth) {
//       // Intersects with left or right edge
//       const x = angle <= 90 || angle > 270 ? width / 2 + halfWidth : width / 2 - halfWidth;
//       const y = cy + (x - cx) * tanAngle;
//       return { x, y };
//     } else {
//       // Intersects with top or bottom edge
//       const y = angle <= 180 ? height / 2 - halfHeight : height / 2 + halfHeight;
//       const x = cx + (y - cy) / tanAngle;
//       return { x, y };
//     }
//   };

//   const clampToRectangle = (x, y) => {
//     const rectLeft = (width - halfWidth * 2) / 2;
//     const rectRight = rectLeft + halfWidth * 2;
//     const rectTop = (height - halfHeight * 2) / 2;
//     const rectBottom = rectTop + halfHeight * 2;

//     return {
//       x: Math.min(Math.max(x, rectLeft), rectRight),
//       y: Math.min(Math.max(y, rectTop), rectBottom),
//     };
//   };

//   const rotatePoint = (x, y, cx, cy, angle) => {
//     const radian = (angle * Math.PI) / 180;
//     const cos = Math.cos(radian);
//     const sin = Math.sin(radian);

//     // Translate point to origin
//     const dx = x - cx;
//     const dy = y - cy;

//     // Rotate point
//     const rotatedX = dx * cos - dy * sin + cx;
//     const rotatedY = dx * sin + dy * cos + cy;

//     return { x: rotatedX, y: rotatedY };
//   };

//   const rotatePoint2 = (x, y, cx, cy, angle, scale = 1) => {
//     const radian = (angle * Math.PI) / 180;
//     const cos = Math.cos(radian);
//     const sin = Math.sin(radian);
  
//     // Translate point to origin
//     const dx = x - cx;
//     const dy = y - cy;
  
//     // Scale the distance from the centroid
//     const scaledDx = dx * scale;
//     const scaledDy = dy * scale;
  
//     // Rotate point
//     const rotatedX = scaledDx * cos - scaledDy * sin + cx;
//     const rotatedY = scaledDx * sin + scaledDy * cos + cy;
  
//     return { x: rotatedX, y: rotatedY };
//   };

//   const lines = Array.from({ length: numLines }).map((_, i) => {
//     const angle = (i * 360) / numLines;
//     const { x, y } = calculateIntersection(angle);

//     // Rotate line end point
//     const rotatedEnd = rotatePoint(x, y, cx, cy, -rotation);
//     const rotatedEnd2 = rotatePoint2(x, y, cx, cy, -rotation,100);

//     // Calculate text position
//     let textX = rotatedEnd.x;
//     let textY = rotatedEnd.y;

//     let x2 = rotatedEnd2.x;
//     let y2 = rotatedEnd2.y;

//     let color = "black";

//     console.warn("angle==>",angle,DIRECTION_DATA[i]);

//     // Adjust text position relative to the centroid
//     if (angle > 0 && angle < 90) {
//       // Top and bottom: move horizontally
//       textX = rotatedEnd.x;
//       textY = cy;
//     } 
//     // else if (angle === 90 || angle === 270) {
//     //   // Left and right: move vertically
//     //   textX = cx;
//     //   textY = rotatedEnd.y;
//     // }

//     // Clamp text position to rectangle boundaries
//     const clampedPosition = clampToRectangle(textX, textY);
//     textX = clampedPosition.x;
//     textY = clampedPosition.y;

//     return (
//       <g key={i}>
//         <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={color} strokeWidth="1" />
//         <text
//           x={textX}
//           y={textY}
//           fontSize="12"
//           fill="red"
//           textAnchor="middle"
//           alignmentBaseline="middle"
//           fontFamily="Segoe UI"
//           fontWeight={600}
//           style={{ userSelect: "none" }}
//         >
//           {DIRECTION_DATA[i]}
//         </text>
//       </g>
//     );
//   });

//   return (
//     <svg width={width} height={height}>
//       <rect
//         x={(width - halfWidth * 2) / 2}
//         y={(height - halfHeight * 2) / 2}
//         width={halfWidth * 2}
//         height={halfHeight * 2}
//         stroke="black"
//         fill="none"
//       />
//       {lines}
//     </svg>
//   );
// };

// export default RadialLines;

import React from "react";

const RectangleWithRotatedLines = ({ height, width, degree = 0, numLines = 16, cx = 300, cy = 375 }) => {
  const centroid = { x: cx, y: cy };

  // Function to calculate intersection points for a given angle
  const calculateIntersections = (angle) => {
    const rad = ((angle + degree) * Math.PI) / 180; // Convert angle to radians
    let dx = Math.cos(rad);
    let dy = Math.sin(rad);

    // Prevent division by zero issues
    if (Math.abs(dx) < 1e-10) dx = 1e-10;
    if (Math.abs(dy) < 1e-10) dy = 1e-10;

    const intersections = [];

    // Compute intersection with rectangle edges using parametric equations
    const edges = [
      { x: 0, y: null, vertical: true },     // Left edge
      { x: width, y: null, vertical: true }, // Right edge
      { x: null, y: 0, vertical: false },    // Top edge
      { x: null, y: height, vertical: false } // Bottom edge
    ];

    edges.forEach(({ x, y, vertical }) => {
      let t;
      if (vertical) {
        t = (x - centroid.x) / dx;
      } else {
        t = (y - centroid.y) / dy;
      }

      const ix = centroid.x + t * dx;
      const iy = centroid.y + t * dy;

      // Only keep valid points inside rectangle boundaries
      if (ix >= 0 && ix <= width && iy >= 0 && iy <= height) {
        intersections.push({ x: ix, y: iy });
      }
    });

    // Ensure we always return exactly two points
    return intersections.length === 2 ? intersections : [];
  };

  // Generate lines dynamically
  const allPoints = [];
  const lines = [...Array(numLines)].map((_, i) => {
    const angle = i * (360 / numLines);
    const points = calculateIntersections(angle);
    allPoints.push(...points);
    return points;
  });

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ border: "1px solid black" }}>
      {/* Rectangle */}
      <rect x="0" y="0" width={width} height={height} fill="lightblue" stroke="black" strokeWidth="2" />

      {/* Centroid */}
      <circle cx={cx} cy={cy} r="5" fill="red" />

      {/* Draw lines */}
      {lines.map((points, i) =>
        points.length === 2 ? (
          <line
            key={i}
            x1={points[0].x}
            y1={points[0].y}
            x2={points[1].x}
            y2={points[1].y}
            stroke="black"
            strokeWidth="1"
          />
        ) : null
      )}

      {/* Intersection points with labels */}
      {allPoints.map((point, index) => (
        <text
          key={index}
          x={point.x - 10}
          y={point.y < 20 ? point.y + 15 : point.y > height - 20 ? point.y - 5 : point.y}
          fontSize="14"
          fill="red"
          fontWeight="bold"
        >
          {index + 1}
        </text>
      ))}
    </svg>
  );
};

export default RectangleWithRotatedLines;
