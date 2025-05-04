import VastuPurush from '@/components/common/VastuPurush/VastuPurush'
import React, { useEffect, useRef, useState } from 'react'

function VastuPurushSVG({ height = '100%', width = '100%', points, centroid }) {
  const vastuPurushRef = useRef(null)
  const [center, setCenter] = useState({ x: 0, y: 0 })
  const [translation, setTranslation] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (vastuPurushRef.current) {
      const boundingBox = vastuPurushRef.current.getBBox() // Get bounding box of the SVG element
      const centerX = boundingBox.x + boundingBox.width / 2 // Calculate center X
      const centerY = boundingBox.y + boundingBox.height / 2 // Calculate center Y
      setCenter({ x: centerX, y: centerY })

      // Calculate translation required to align center with centroid
      const translateX = centroid.x - centerX
      const translateY = centroid.y - centerY
      setTranslation({ x: translateX, y: translateY })
    }
  }, [centroid]) // Re-run effect if centroid changes

  return (
    <>
        <g
          ref={vastuPurushRef}
          transform={`translate(${translation.x}, ${translation.y})`}
        >
          <VastuPurush />
        </g>
    </>
  )
}

export default VastuPurushSVG