import React, { useEffect, useState } from 'react'

const CropImageWithSVG = ({
  previewUrl,
  points,
  width,
  height,
  zoom = 1,
  translate = { x: 0, y: 0 },
  rotation = 0
}) => {
  const [polygonPoints, setPolygonPoints] = useState('')

  useEffect(() => {
    if (points && points.length > 0) {
      // Adjust points for zoom, translation, and rotation
      const transformedPoints = points.map(({ x, y }) => {
        const zoomedX = x / zoom
        const zoomedY = y / zoom

        const translatedX = zoomedX - translate.x
        const translatedY = zoomedY - translate.y

        // Apply rotation
        const radians = (rotation * Math.PI) / 180
        const rotatedX =
          Math.cos(radians) * (translatedX - width / 2) - Math.sin(radians) * (translatedY - height / 2) + width / 2
        const rotatedY =
          Math.sin(radians) * (translatedX - width / 2) + Math.cos(radians) * (translatedY - height / 2) + height / 2

        return { x, y }
      })

      const updatedPolygonPoints = transformedPoints.map(({ x, y }) => `${x},${y}`).join(' ')
      setPolygonPoints(updatedPolygonPoints)
    }
  }, [points, zoom, translate, rotation, width, height])

  return (
    <>
      <defs>
        <clipPath id='clipPolygon'>
          <polygon points={polygonPoints} />
        </clipPath>
      </defs>

      <g clipPath='url(#clipPolygon)' vectorEffect='non-scaling-stroke'>
        <g
          className='file-layer'
          transform={`translate(${translate.x + (width - width * zoom) / 2}, ${translate.y + (height - height * zoom) / 2}) rotate(${rotation}, ${width / 2}, ${height / 2}) scale(${zoom})`}
        >
          <image
            href={previewUrl}
            style={{ maxWidth: '100%', maxHeight: '500px', imageRendering: 'auto' }}
            width={width}
            height={height}
            // onMouseDown={handleMouseDown1}
            // onMouseMove={handleMouseMove1}
            // onMouseUp={handleMouseUp1}
            // onMouseLeave={handleMouseUp1}
          />
        </g>
      </g>
    </>
  )
}

export default CropImageWithSVG
