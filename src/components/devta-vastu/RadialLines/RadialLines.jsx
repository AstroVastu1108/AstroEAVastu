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

const RectangleWithRotatedLines = ({ degree = 0, numLines = 16 }) => {
  const width = 600;
  const height = 750;
  const centroid = { x: width / 2, y: height / 2 };

  // Function to calculate intersection points for a given angle
  const calculateIntersections = (angle) => {
    const rad = ((angle + degree) * Math.PI) / 180; // Apply rotation
    const dx = Math.cos(rad);
    const dy = Math.sin(rad);
    
    const intersections = [];

    // Function to find intersection with rectangle edges
    const checkIntersection = (boundaryX, boundaryY, isVertical) => {
      let t;
      if (isVertical) {
        t = (boundaryX - centroid.x) / dx;
      } else {
        t = (boundaryY - centroid.y) / dy;
      }

      const ix = centroid.x + t * dx;
      const iy = centroid.y + t * dy;

      if (ix >= 0 && ix <= width && iy >= 0 && iy <= height) {
        intersections.push({ x: ix, y: iy });
      }
    };

    // Check all four edges
    checkIntersection(0, null, true);     // Left
    checkIntersection(width, null, true); // Right
    checkIntersection(null, 0, false);    // Top
    checkIntersection(null, height, false); // Bottom

    return intersections;
  };

  // Generate lines dynamically based on the number of lines and degree
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
            strokeWidth="2"
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
