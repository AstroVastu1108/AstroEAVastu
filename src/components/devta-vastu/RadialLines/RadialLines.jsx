import React from "react";

const DIRECTION_DATA = [
  "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
  "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
];

const RadialLines = ({ width, height, cx, cy, margin = 30, rotation = 0 }) => {
  const numLines = 32; // Total radial lines

  const getLineEnd = (angle) => {
    const radian = ((angle + rotation) * Math.PI) / 180;
    let x2 = cx + Math.cos(radian) * width;
    let y2 = cy + Math.sin(radian) * height;

    const slope = Math.tan(radian);
    if (Math.abs(slope) <= height / width) {
      x2 = angle < 90 || angle > 270 ? width - margin : margin;
      y2 = cy + (x2 - cx) * slope;
    } else {
      y2 = angle < 180 ? margin : height - margin;
      x2 = cx + (y2 - cy) / slope;
    }

    return { x2, y2 };
  };

  const lines = Array.from({ length: numLines }).map((_, i) => {
    const angle = (i * 360) / numLines;
    const { x2, y2 } = getLineEnd(angle);

    const labelIndex = Math.floor(i / 2);
    const showLabel = i % 2 === 0 && labelIndex < DIRECTION_DATA.length;
    const text = showLabel ? DIRECTION_DATA[labelIndex] : null;

    const textOffset = 15;
    const textX = x2 + textOffset * Math.cos(((angle + rotation) * Math.PI) / 180);
    const textY = y2 + textOffset * Math.sin(((angle + rotation) * Math.PI) / 180);

    const numOffset = 10;
    const numX = x2 - numOffset * Math.cos(((angle + rotation) * Math.PI) / 180);
    const numY = y2 - numOffset * Math.sin(((angle + rotation) * Math.PI) / 180);

    return (
      <g key={i}>
        <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="black" strokeWidth="1" />
        {text && (
          <text
            x={textX}
            y={textY}
            fontSize="12"
            fill="red"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontFamily="Segoe UI"
            fontWeight={600}
          >
            {text}
          </text>
        )}
        <text
          x={numX}
          y={numY}
          fontSize="10"
          fill="blue"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontFamily="Arial"
        >
          {i + 1}
        </text>
      </g>
    );
  });

  return <g>{lines}</g>;
};

export default RadialLines;