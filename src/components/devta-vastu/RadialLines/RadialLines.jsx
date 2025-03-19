import React from "react";

const DIRECTION_DATA = [
  "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
  "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
];

const RadialLines = ({ width, height, cx, cy, margin = 30, rotation = 0 }) => {
  const numLines = DIRECTION_DATA.length;
  const squareSize = Math.min(width, height) - margin * 2;
  const halfSquare = squareSize / 2;

  const getLineEnd = (angle) => {
    const radian = ((angle - rotation) * Math.PI) / 180;
    let x2 = cx + Math.cos(radian) * halfSquare;
    let y2 = cy + Math.sin(radian) * halfSquare;

    if (Math.abs(Math.cos(radian)) > Math.abs(Math.sin(radian))) {
      x2 = cx + Math.sign(Math.cos(radian)) * halfSquare;
      y2 = cy + Math.tan(radian) * (x2 - cx);
    } else {
      y2 = cy + Math.sign(Math.sin(radian)) * halfSquare;
      x2 = cx + (y2 - cy) / Math.tan(radian);
    }

    return { x2, y2 };
  };

  const lines = Array.from({ length: numLines }).map((_, i) => {
    const angle = (i * 360) / numLines;
    const { x2, y2 } = getLineEnd(angle);

    let textX = x2;
    let textY = y2;

    if (Math.abs(x2 - cx) > Math.abs(y2 - cy)) {
      // Left or Right Side → Adjust Y-axis only
      textY = y2 + (y2 > cy ? -10 : 10);
    } else {
      // Top or Bottom Side → Adjust X-axis only
      textX = x2 + (x2 > cx ? -10 : 10);
    }

    return (
      <g key={i}>
        <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="black" strokeWidth="1" />
        <text
          x={textX}
          y={textY}
          fontSize="12"
          fill="red"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontFamily="Segoe UI"
          fontWeight={600}
          style={{ userSelect: "none" }}
        >
          {DIRECTION_DATA[i]}
        </text>
      </g>
    );
  });

  return (
    <svg width={width} height={height}>
      <rect
        x={cx - halfSquare}
        y={cy - halfSquare}
        width={squareSize}
        height={squareSize}
        stroke="black"
        fill="none"
      />
      {lines}
    </svg>
  );
};

export default RadialLines;
