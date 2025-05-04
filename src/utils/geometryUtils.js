// export const calculateCentroid = (points) => {
//   if (!points || points.length === 0) return null;

//   const sumX = points.reduce((sum, point) => sum + point.x, 0);
//   const sumY = points.reduce((sum, point) => sum + point.y, 0);

//   return {
//     x: sumX / points.length,
//     y: sumY / points.length
//   };
// };

export const calculateCentroid = (vertices) => {
  const n = vertices.length;
  if (n < 3) return null; // A polygon must have at least 3 vertices

  let A = 0; // Signed area
  let C_x = 0; // Centroid x-coordinate
  let C_y = 0; // Centroid y-coordinate

  for (let i = 0; i < n; i++) {
    const x_i = vertices[i].x;
    const y_i = vertices[i].y;
    const x_next = vertices[(i + 1) % n].x; // Next vertex (wrapping around)
    const y_next = vertices[(i + 1) % n].y;

    const partialArea = x_i * y_next - x_next * y_i;
    A += partialArea;

    C_x += (x_i + x_next) * partialArea;
    C_y += (y_i + y_next) * partialArea;
  }

  A *= 0.5; // Final area calculation
  if (A === 0) return null; // Degenerate polygon (area is zero)

  // Final centroid calculation
  C_x /= (6 * A);
  C_y /= (6 * A);

  return { x: C_x, y: C_y };

};


export const pointToLineDistance = (x, y, start, end) => {
  const A = x - start.x;
  const B = y - start.y;
  const C = end.x - start.x;
  const D = end.y - start.y;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let param = -1;

  if (lenSq !== 0) {
    param = dot / lenSq;
  }

  let xx, yy;

  if (param < 0) {
    xx = start.x;
    yy = start.y;
  } else if (param > 1) {
    xx = end.x;
    yy = end.y;
  } else {
    xx = start.x + param * C;
    yy = start.y + param * D;
  }

  const dx = x - xx;
  const dy = y - yy;

  return Math.sqrt(dx * dx + dy * dy);
};

const DIRECTION_DATA = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];


export const drawDirectionLetters = (ctx) => {
  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;
  const padding = 30;

  // Define fixed positions for direction letters
  // const positions = {
  //   // Top edge
  //   'N': { x: canvasWidth / 2 , y: padding, align: 'center' },
  //   'NNE': { x: canvasWidth * 0.75 - 85, y: padding, align: 'center' },
  //   'NE': { x: canvasWidth - padding - 85, y: padding, align: 'right' },

  //   // Right edge
  //   'ENE': { x: canvasWidth - padding, y: canvasHeight * 0.25, align: 'right' },
  //   'E': { x: canvasWidth - padding, y: canvasHeight / 2, align: 'right' },
  //   'ESE': { x: canvasWidth - padding, y: canvasHeight * 0.75, align: 'right' },

  //   // Bottom edge
  //   'SE': { x: canvasWidth - padding - 85 , y: canvasHeight - padding, align: 'right' },
  //   'SSE': { x: canvasWidth * 0.75 - 85, y: canvasHeight - padding, align: 'center' },
  //   'S': { x: canvasWidth / 2, y: canvasHeight - padding, align: 'center' },
  //   'SSW': { x: canvasWidth * 0.25 + 85, y: canvasHeight - padding, align: 'center' },
  //   'SW': { x: padding + 85 , y: canvasHeight - padding, align: 'left' },

  //   // Left edge
  //   'WSW': { x: padding, y: canvasHeight * 0.75, align: 'left' },
  //   'W': { x: padding, y: canvasHeight / 2, align: 'left' },
  //   'WNW': { x: padding, y: canvasHeight * 0.25, align: 'left' },
  //   'NW': { x: padding + 85 , y: padding , align: 'left' },
  //   'NNW': { x: canvasWidth * 0.25 + 85, y: padding, align: 'center' }
  // };

  const positions = {
    // Top edge
    'N': { x: canvasWidth / 2, y: padding, align: 'center' },
    'NNE': { x: canvasWidth * 0.75 - 35, y: padding, align: 'center' },
    'NE': { x: canvasWidth - padding, y: padding, align: 'center' },

    // Right edge
    'ENE': { x: canvasWidth - padding, y: canvasHeight * 0.25 + 35, align: 'right' },
    'E': { x: canvasWidth - padding, y: canvasHeight / 2, align: 'right' },
    'ESE': { x: canvasWidth - padding, y: canvasHeight * 0.75 - 35, align: 'right' },

    // Bottom edge
    'SE': { x: canvasWidth - padding, y: canvasHeight - padding, align: 'center' },
    'SSE': { x: canvasWidth * 0.75 - 35, y: canvasHeight - padding, align: 'center' },
    'S': { x: canvasWidth / 2, y: canvasHeight - padding, align: 'center' },
    'SSW': { x: canvasWidth * 0.25 + 35, y: canvasHeight - padding, align: 'center' },
    'SW': { x: padding, y: canvasHeight - padding, align: 'center' },

    // Left edge
    'WSW': { x: padding, y: canvasHeight * 0.75 - 35, align: 'left' },
    'W': { x: padding, y: canvasHeight / 2, align: 'left' },
    'WNW': { x: padding, y: canvasHeight * 0.25 + 35, align: 'left' },
    'NW': { x: padding, y: padding, align: 'center' },
    'NNW': { x: canvasWidth * 0.25 + 35, y: padding, align: 'center' },
  };


  ctx.font = '16px Arial';
  ctx.fillStyle = 'black';

  // DIRECTION_DATA.forEach(direction => {
  //   const pos = positions[direction];
  //   if (pos) {
  //     ctx.textAlign = pos.align;
  //     ctx.textBaseline = 'middle';
  //     // ctx.textBaseline = 'start';

  //     // Draw background
  //     const metrics = ctx.measureText(direction);
  //     const padding = 4;
  //     ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

  //     ctx.fillRect(
  //       pos.align === 'right' ? pos.x - metrics.width - padding * 2 : 
  //       pos.align === 'center' ? pos.x - metrics.width/2 - padding :
  //       pos.x,
  //       pos.y - metrics.actualBoundingBoxAscent/2 - padding,
  //       metrics.width + padding * 2,
  //       metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + padding * 2
  //     );

  //     // Draw text
  //     ctx.fillStyle = 'black';
  //     ctx.fillText(direction, pos.x, pos.y);

  //   }
  // });

  DIRECTION_DATA.forEach((direction) => {
    const pos = positions[direction];
    if (pos) {
      const textWidth = ctx.measureText(direction).width;
      const textHeight =
        ctx.measureText(direction).actualBoundingBoxAscent +
        ctx.measureText(direction).actualBoundingBoxDescent;
      const padding = 0;

      // Draw background rectangle
      if (pos.align === 'left' || pos.align === 'right') {
        // For vertical text (left and right)
        // ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        // ctx.fillRect(
        //   pos.x - textHeight / 2 - padding,
        //   pos.y - textWidth / 2 - padding,
        //   textHeight + padding * 2,
        //   textWidth + padding * 2
        // );

        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(pos.align === 'right' ? Math.PI / 2 : -Math.PI / 2); // Rotate vertically
        ctx.fillStyle = '#000000';
        // ctx.textAlign = 'center';
        // ctx.textBaseline = 'middle';
        ctx.fillText(direction, 0, 0);
        ctx.restore();
      } else {

        ctx.fillStyle = '#000000';
        ctx.textAlign = pos.align;
        // ctx.textBaseline = 'bottom';
        ctx.fillText(direction, pos.x, pos.y);
      }
    }
  });

};

export const isPointInPolygon = (point, polygon) => {
  const { x, y } = point
  let isInside = false

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x,
      yi = polygon[i].y
    const xj = polygon[j].x,
      yj = polygon[j].y

    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect) isInside = !isInside
  }

  return isInside
}

export function calculateIntersectionPoins(line1, line2) {
  const [A, B] = line1
  const [C, D] = line2
  if (!A || !B || !C || !D) {
    return null
  }
  const { x: x1, y: y1 } = A
  const { x: x2, y: y2 } = B
  const { x: x3, y: y3 } = C
  const { x: x4, y: y4 } = D

  // Calculate the denominator
  const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)

  // Check if lines are parallel (denom == 0)
  if (denom === 0) {
    return null // No intersection (lines are parallel)
  }

  // Calculate the intersection point
  const px = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denom
  const py = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denom

  // Check if the intersection point is within the line segments
  const isWithinLine1 =
    Math.min(x1, x2) <= px && px <= Math.max(x1, x2) && Math.min(y1, y2) <= py && py <= Math.max(y1, y2)
  const isWithinLine2 =
    Math.min(x3, x4) <= px && px <= Math.max(x3, x4) && Math.min(y3, y4) <= py && py <= Math.max(y3, y4)

  if (isWithinLine1 && isWithinLine2) {
    return { x: px, y: py } // Intersection point
  } else {
    return null // Intersection point is outside the line segments
  }
}

export const calculateArea = points => {
  const n = points.length
  let area = 0

  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n
    area += points[i].x * points[j].y
    area -= points[j].x * points[i].y
  }

  return Math.abs(area / 2)
}

export const calculateMidpoint = (pointA, pointB) => {
  return {
    x: (pointA.x + pointB.x) / 2,
    y: (pointA.y + pointB.y) / 2
  }
}

export const isPointNear = (x, y, point, threshold = 10) => {
  return Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2) < threshold
}


// Helper functions

export const convertPointsToCoordinates = area => {
  return [
    { x: area.point1.x, y: area.point1.y },
    { x: area.point2.x, y: area.point2.y },
    { x: area.point3.x, y: area.point3.y },
    { x: area.point4.x, y: area.point4.y }
  ]
}
export const convertPointsToCoordinates1 = area => {
  return [
    { x: area.point1.x, y: area.point1.y },
    { x: area.point2.x, y: area.point2.y },
    { x: area.point3.x, y: area.point3.y },
    { x: area.point4.x, y: area.point4.y },
    { x: area.point5.x, y: area.point5.y },
    { x: area.point6.x, y: area.point6.y },
    { x: area.point7.x, y: area.point7.y },
    { x: area.point8.x, y: area.point8.y }
  ]
}

export const filteredData = (label, object) => {
  return object.filter(item => label === item.label)
}


// Main calculation function
export const calculateAreas = (intersactMidIntermediatePoints,intermediatePoints1Test,intermediatePoints2Test, pointLookup) =>{
  const intermediatePoints = [
    { pointLookup: pointLookup['W4'], label: 'I15' },
    { pointLookup: pointLookup['W5'], label: 'I16' },
    { pointLookup: pointLookup['W6'], label: 'I17' },
    { pointLookup: pointLookup['W7'], label: 'I18', intersectLabel: 'A11' },
    { pointLookup: pointLookup['W8'], label: 'I19' },
    { pointLookup: pointLookup['N1'], label: 'I20', intersectLabel: 'A13', extraIntersect: 'X20' },
    { pointLookup: pointLookup['N2'], label: 'I21' },
    { pointLookup: pointLookup['N3'], label: 'I22', intersectLabel: 'A15' },
    // Another side
    { pointLookup: pointLookup['N4'], label: 'I23' },
    { pointLookup: pointLookup['N5'], label: 'I24' },
    { pointLookup: pointLookup['N6'], label: 'I25' },
    { pointLookup: pointLookup['N7'], label: 'I26', intersectLabel: 'A16' },
    { pointLookup: pointLookup['N8'], label: 'I27' },
    { pointLookup: pointLookup['E1'], label: 'I28', intersectLabel: 'A18', extraIntersect: 'X28' },
    { pointLookup: pointLookup['E2'], label: 'I29' },
    { pointLookup: pointLookup['E3'], label: 'I30', intersectLabel: 'A20' },
    // Another side
    { pointLookup: pointLookup['E4'], label: 'I31' },
    { pointLookup: pointLookup['E5'], label: 'I0' },
    { pointLookup: pointLookup['E6'], label: 'I1' },
    { pointLookup: pointLookup['E7'], label: 'I2', intersectLabel: 'A1' },
    { pointLookup: pointLookup['E8'], label: 'I3' },
    { pointLookup: pointLookup['S1'], label: 'I4', intersectLabel: 'A3', extraIntersect: 'X4' },
    { pointLookup: pointLookup['S2'], label: 'I5' },
    { pointLookup: pointLookup['S3'], label: 'I6', intersectLabel: 'A5' },
    // Another side
    { pointLookup: pointLookup['S4'], label: 'I7' },
    { pointLookup: pointLookup['S5'], label: 'I8' },
    { pointLookup: pointLookup['S6'], label: 'I9' },
    { pointLookup: pointLookup['S7'], label: 'I10', intersectLabel: 'A6' },
    { pointLookup: pointLookup['S8'], label: 'I11' },
    { pointLookup: pointLookup['W1'], label: 'I12', intersectLabel: 'A8', extraIntersect: 'X12' },
    { pointLookup: pointLookup['W2'], label: 'I13' },
    { pointLookup: pointLookup['W3'], label: 'I14', intersectLabel: 'A10' }
  ]

  const newDrawDevtaObject = intermediatePoints.reduce(
    (acc, { pointLookup, label, intersectLabel, extraIntersect }) => {
      const filteredPoint = filteredData(label, intermediatePoints1Test)
      const intersectPoint = intersectLabel ? filteredData(intersectLabel, intersactMidIntermediatePoints) : null
      const extraFilteredPoint = extraIntersect ? filteredData(extraIntersect, intermediatePoints2Test) : null

      const obj = {
        point1: pointLookup,
        point2: filteredPoint[0]?.point || null,
        midpoint: intersectPoint ? intersectPoint[0]?.midpoint || null : null,
        extrapoint: extraFilteredPoint ? extraFilteredPoint[0]?.point || null : null
      }

      // Check and push the main object if point1 is not null
      if (obj.point1 !== null) {
        // Push the main object
        if (obj.point2 !== null || obj.midpoint !== null) {
          acc.push({
            point1: obj.point1,
            point2: obj.midpoint || obj.point2
          })
        }

        // If extraIntersect is defined, push the extrapoint object as well
        if (extraIntersect && obj.extrapoint !== null) {
          acc.push({
            point1: obj.extrapoint,
            point2: obj.midpoint || obj.point2
          })
        }
      }

      return acc
    },
    []
  )

  const intermediatePointsTest = [
    { pointLookup: pointLookup['E1'], label: 'I28', pointLookup1: pointLookup['E2'], label1: 'I29' },
    { pointLookup: pointLookup['E2'], label: 'I29', pointLookup1: pointLookup['E3'], label1: 'I30' },
    { pointLookup: pointLookup['E3'], label: 'I30', pointLookup1: pointLookup['E4'], label1: 'I31' },
    { pointLookup: pointLookup['E4'], label: 'I31', pointLookup1: pointLookup['E5'], label1: 'I0' },
    { pointLookup: pointLookup['E5'], label: 'I0', pointLookup1: pointLookup['E6'], label1: 'I1' },
    { pointLookup: pointLookup['E6'], label: 'I1', pointLookup1: pointLookup['E7'], label1: 'I2' },
    { pointLookup: pointLookup['E7'], label: 'I2', pointLookup1: pointLookup['E8'], label1: 'I3' },
    { pointLookup: pointLookup['E8'], label: 'I3', pointLookup1: pointLookup['S1'], label1: 'I4' },
    { pointLookup: pointLookup['S1'], label: 'I4', pointLookup1: pointLookup['S2'], label1: 'I5' },
    { pointLookup: pointLookup['S2'], label: 'I5', pointLookup1: pointLookup['S3'], label1: 'I6' },
    { pointLookup: pointLookup['S3'], label: 'I6', pointLookup1: pointLookup['S4'], label1: 'I7' },
    { pointLookup: pointLookup['S4'], label: 'I7', pointLookup1: pointLookup['S5'], label1: 'I8' },
    { pointLookup: pointLookup['S5'], label: 'I8', pointLookup1: pointLookup['S6'], label1: 'I9' },
    { pointLookup: pointLookup['S6'], label: 'I9', pointLookup1: pointLookup['S7'], label1: 'I10' },
    { pointLookup: pointLookup['S7'], label: 'I10', pointLookup1: pointLookup['S8'], label1: 'I11' },
    { pointLookup: pointLookup['S8'], label: 'I11', pointLookup1: pointLookup['W1'], label1: 'I12' },
    { pointLookup: pointLookup['W1'], label: 'I12', pointLookup1: pointLookup['W2'], label1: 'I13' },
    { pointLookup: pointLookup['W2'], label: 'I13', pointLookup1: pointLookup['W3'], label1: 'I14' },
    { pointLookup: pointLookup['W3'], label: 'I14', pointLookup1: pointLookup['W4'], label1: 'I15' },
    { pointLookup: pointLookup['W4'], label: 'I15', pointLookup1: pointLookup['W5'], label1: 'I16' },
    { pointLookup: pointLookup['W5'], label: 'I16', pointLookup1: pointLookup['W6'], label1: 'I17' },
    { pointLookup: pointLookup['W6'], label: 'I17', pointLookup1: pointLookup['W7'], label1: 'I18' },
    { pointLookup: pointLookup['W7'], label: 'I18', pointLookup1: pointLookup['W8'], label1: 'I19' },
    { pointLookup: pointLookup['W8'], label: 'I19', pointLookup1: pointLookup['N1'], label1: 'I20' },
    { pointLookup: pointLookup['N1'], label: 'I20', pointLookup1: pointLookup['N2'], label1: 'I21' },
    { pointLookup: pointLookup['N2'], label: 'I21', pointLookup1: pointLookup['N3'], label1: 'I22' },
    { pointLookup: pointLookup['N3'], label: 'I22', pointLookup1: pointLookup['N4'], label1: 'I23' },
    { pointLookup: pointLookup['N4'], label: 'I23', pointLookup1: pointLookup['N5'], label1: 'I24' },
    { pointLookup: pointLookup['N5'], label: 'I24', pointLookup1: pointLookup['N6'], label1: 'I25' },
    { pointLookup: pointLookup['N6'], label: 'I25', pointLookup1: pointLookup['N7'], label1: 'I26' },
    { pointLookup: pointLookup['N7'], label: 'I26', pointLookup1: pointLookup['N8'], label1: 'I27' },
    { pointLookup: pointLookup['N8'], label: 'I27', pointLookup1: pointLookup['E1'], label1: 'I28' }
  ]

  const reversedIntermediatePointsTest = intermediatePointsTest.reverse()

  const newDrawDevtaObjectTest = reversedIntermediatePointsTest.reduce(
    (acc, { pointLookup, label, pointLookup1, label1 }) => {
      const filteredPoint = filteredData(label, intermediatePoints1Test)
      const filteredPoint2 = filteredData(label1, intermediatePoints1Test)

      const newObject = {
        point1: pointLookup,
        point2: pointLookup1,
        point3: filteredPoint2[0]?.point || null,
        point4: filteredPoint[0]?.point || null
      }

      // Check if all points are not null
      if (newObject.point1 && newObject.point2 && newObject.point3 && newObject.point4) {
        acc.push(newObject)
      }

      return acc
    },
    []
  )

  const areas1 = newDrawDevtaObjectTest.map((area, index) => ({
    id: index,
    coordinates: convertPointsToCoordinates(area),
    text: `Area ${index + 1}`
  }))

  const intermediatePointsTest1 = [
    { points: { p1: 'I20', p2: 'A13', p3: 'I22', p4: 'A15' } },
    { points: { p1: 'I18', p2: 'A11', p3: 'I20', p4: 'A13' } },
    { points: { p1: 'I12', p2: 'A8', p3: 'I14', p4: 'A10' } },
    { points: { p1: 'I10', p2: 'A6', p3: 'I12', p4: 'A8' } },
    { points: { p1: 'I4', p2: 'A3', p3: 'I6', p4: 'A5' } },
    { points: { p1: 'I2', p2: 'A1', p3: 'I4', p4: 'A3' } },
    { points: { p1: 'I28', p2: 'A18', p3: 'I30', p4: 'A20' } },
    { points: { p1: 'I26', p2: 'A16', p3: 'I28', p4: 'A18' } }
  ]

  const newDrawDevtaObjectTest1 = intermediatePointsTest1.reduce((acc, { points: { p1, p2, p3, p4 } }) => {
    const filteredPoint1 = filteredData(p1, intermediatePoints1Test)
    const filteredPoint2 = filteredData(p2, intersactMidIntermediatePoints)
    const filteredPoint3 = filteredData(p3, intermediatePoints1Test)
    const filteredPoint4 = filteredData(p4, intersactMidIntermediatePoints)

    const newObject = {
      point1: filteredPoint3[0]?.point || null,
      point2: filteredPoint1[0]?.point || null,
      point3: filteredPoint2[0]?.midpoint || null,
      point4: filteredPoint4[0]?.midpoint || null
    }

    // Check if all points are not null
    if (newObject.point1 && newObject.point2 && newObject.point3 && newObject.point4) {
      acc.push(newObject)
    }

    return acc
  }, [])

  const intermediatePointsTest2 = [
    { points: { p1: 'I14', p2: 'A10', p3: 'A8', p4: 'X12', p5: 'X20', p6: 'A13', p7: 'A11', p8: 'I20' } },
    { points: { p1: 'I6', p2: 'A5', p3: 'A3', p4: 'X4', p5: 'X12', p6: 'A8', p7: 'A6', p8: 'I10' } },
    { points: { p1: 'I30', p2: 'A20', p3: 'A18', p4: 'X28', p5: 'X4', p6: 'A3', p7: 'A1', p8: 'I2' } },
    { points: { p1: 'I22', p2: 'A15', p3: 'A13', p4: 'X20', p5: 'X28', p6: 'A18', p7: 'A16', p8: 'I26' } }
  ]

  const newDrawDevtaObjectTest2 = intermediatePointsTest2.reduce(
    (acc, { points: { p1, p2, p3, p4, p5, p6, p7, p8 } }) => {
      const filteredPoint1 = filteredData(p1, intermediatePoints1Test)
      const filteredPoint2 = filteredData(p2, intersactMidIntermediatePoints)
      const filteredPoint3 = filteredData(p3, intersactMidIntermediatePoints)
      const filteredPoint4 = filteredData(p4, intermediatePoints2Test)
      const filteredPoint5 = filteredData(p5, intermediatePoints2Test)
      const filteredPoint6 = filteredData(p6, intersactMidIntermediatePoints)
      const filteredPoint7 = filteredData(p7, intersactMidIntermediatePoints)
      const filteredPoint8 = filteredData(p8, intermediatePoints1Test)

      const newObject = {
        point1: filteredPoint1[0]?.point || null,
        point2: filteredPoint2[0]?.midpoint || null,
        point3: filteredPoint3[0]?.midpoint || null,
        point4: filteredPoint4[0]?.point || null,
        point5: filteredPoint5[0]?.point || null,
        point6: filteredPoint6[0]?.midpoint || null,
        point7: filteredPoint7[0]?.midpoint || null,
        point8: filteredPoint8[0]?.point || null
      }

      // Check if all points are not null
      if (
        newObject.point1 &&
        newObject.point2 &&
        newObject.point3 &&
        newObject.point4 &&
        newObject.point5 &&
        newObject.point6 &&
        newObject.point7 &&
        newObject.point8
      ) {
        acc.push(newObject)
      }

      return acc
    },
    []
  )

  const intermediatePointsTest3 = [{ points: { p1: 'X28', p2: 'X4', p3: 'X12', p4: 'X20' } }]

  const newDrawDevtaObjectTest3 = intermediatePointsTest3.reduce((acc, { points: { p1, p2, p3, p4 } }) => {
    const filteredPoint1 = filteredData(p1, intermediatePoints2Test)
    const filteredPoint2 = filteredData(p2, intermediatePoints2Test)
    const filteredPoint3 = filteredData(p3, intermediatePoints2Test)
    const filteredPoint4 = filteredData(p4, intermediatePoints2Test)

    const newObject = {
      point1: filteredPoint1[0]?.point || null,
      point2: filteredPoint2[0]?.point || null,
      point3: filteredPoint3[0]?.point || null,
      point4: filteredPoint4[0]?.point || null
    }

    // Check if all points are not null
    if (newObject.point1 && newObject.point2 && newObject.point3 && newObject.point4) {
      acc.push(newObject)
    }

    return acc
  }, [])

  const areas2 = newDrawDevtaObjectTest1.map((area, index) => ({
    id: index + 33,
    coordinates: convertPointsToCoordinates(area),
    text: `Area ${index + 32 + 1}`
  }))

  const areas3 = newDrawDevtaObjectTest2.map((area, index) => ({
    id: index + 40 + 1,
    coordinates: convertPointsToCoordinates1(area),
    text: `Area ${index + 40 + 1}`
  }))

  const areas4 = newDrawDevtaObjectTest3.map((area, index) => ({
    id: index + 45,
    coordinates: convertPointsToCoordinates(area),
    text: `Area ${index + 45}`
  }))

  // setAreas([...areas1, ...areas2, ...areas3, ...areas4].reverse())
  // setDrawDevtaObject(newDrawDevtaObject)
  return {
    areaData: [...areas1, ...areas2, ...areas3, ...areas4].reverse(),
    drawDevtaObject: newDrawDevtaObject
};
}
