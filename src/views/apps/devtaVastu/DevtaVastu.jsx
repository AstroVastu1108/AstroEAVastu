import React, { useState, useRef, useEffect } from 'react'
import {
  calculateArea,
  calculateAreas,
  calculateCentroid,
  calculateIntersectionPoins,
  calculateMidpoint,
  isPointInPolygon,
  isPointNear,
  pointToLineDistance
} from '../../../utils/geometryUtils'
import GridBackground from './GridBackground'
import jsPDF from 'jspdf'
import './DevtaVastu.css'
import html2canvas from 'html2canvas'
import { Box, Upload } from 'lucide-react'
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf'
import { LoadingButton } from '@mui/lab'
// import { Checkbox, FormControlLabel, TextField, Paper, Box, Typography, Tooltip,Button } from '@mui/material'

import NewPolygonPopUp from '@/components/devta-vastu/NewPolygonPopUp/NewPolygonPopUp'
import RectangleWithRotatedLines from '@/components/devta-vastu/RadialLines/RadialLines'
import {
  data,
  devta,
  devtaColors,
  intersectionCriteria,
  labelsToExtract,
  labelsToExtract1,
  leftintersectionCriteria,
  linemarmaDevta_1,
  linemarmaDevta_2,
  linemarmaDevta_3,
  marmaDevta,
  Marmalines,
  specificLeftLines,
  specificLines,
  targetLeftLines,
  targetLines
} from '@/utils/directions'
import CustomBarChart from '@/components/Charts/CustomBarChart'
import RightSidePanel from '@/components/devta-vastu/RightSidePanel/RightSidePanel'
import CropImageWithSVG from '@/components/devta-vastu/CropImage/CropImage'
import { description } from 'valibot'
import VastuPurushSVG from '@/components/devta-vastu/VastuPurushSVG/VastuPurushSVG'
import { Button } from '@mui/material'
import RightPrintSection from '@/components/devta-vastu/RightPrintSection/RightPrintSection'

GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.js'

const DevtaVastu = ({
  setPrintRef,
  tabTitle,
  setleftPrintRef,
  width = 815,
  height = 748,
  gridSize = 26,
  drawingMode = 'drawing',
  downloadPDFLoading,
  saveLoading,
  setDownloadPDFLoading,
  setSaveLoading,
  selectedGroup,
  fileUploaded,
  setFileUploaded,
  handleFileUpload,
  previewUrl,
  setPreviewUrl,
  points,
  setPoints,
  centroid,
  setCentroid,
  snapToCentroid,
  setSnapToCentroid,
  lockCentroid,
  setLockCentroid,
  lockChakra,
  setLockChakra,
  inputDegree,
  setInputDegree,
  updatePointsForAllTabs,
  translate,
  setTranslate,
  zoom,
  setZoom,
  polygons,
  setPolygons,
  vastuLayoutData,
  hide32Circle,
  setHide32Circle,
  hide16Circle,
  setHide16Circle,
  hide8Circle,
  setHide8Circle,
  hide4Circle,
  setHide4Circle,
  hideCircle,
  setHideCircle,
  lineSets,
  setLineSets,
  loading,
  setLoading,
  IsDownloading,
  isLayoutChange,
  setPageTitle,
  updatePdfPages,
  cropImage,
  setCropImage,
  rotation,
  setRotation,
}) => {
  const [hideMarmaLines, setHideMarmaLines] = useState(false)
  const [hideMarmapoints, setHideMarmapoints] = useState(false)
  const [imageDragDone, setImageDragDone] = useState(false)
  const [hideCircleIntersaction, setHideCircleIntersaction] = useState(false)
  const [showDevta, setShowDevta] = useState(false)
  const [showDevtaIntersaction, setShowDevtaIntersaction] = useState(false)
  const [disableDraw, setDisableDraw] = useState(false)
  const [graphDraw, setGraphDraw] = useState(false)
  // const [cropImage, setCropImage] = useState(false)
  const [openNewPolygon, setOpenNewPolygon] = useState(false)
  const [draggingState, setDraggingState] = useState(null)
  const [OverlayPolyClick, setOverlayPolyClick] = useState(false)
  const [show32Charts, setShow32Charts] = useState(false)
  const [show45Charts, setShow45Charts] = useState(false)
  const [show8Charts, setShow8Charts] = useState(false)
  const [show4Charts, setShow4Charts] = useState(false)
  const [showCharts, setShowCharts] = useState(false)
  const [NewOverlayPoly, setNewOverlayPoly] = useState({
    title: '',
    color: '#007BFF',
    x: 10,
    y: 10,
    width: 100,
    height: 100
  })
  // const [rotation, setRotation] = useState(0)

  useEffect(() => {
    setLoading(false)
  }, [])

  const svgRef = useRef(null)
  const printRef = useRef(null)
  const selectedPointRef = useRef(null)
  const movingCentroidRef = useRef(false)

  useEffect(() => {
    if (setPrintRef) {
      setPrintRef(printRef.current)
    }
  }, [setPrintRef])

  useEffect(() => {
    if (snapToCentroid) {
      if (!lockCentroid) {
        setCentroid(calculateCentroid(points))
      }
    }
  }, [points, snapToCentroid])

  useEffect(() => {
    if (!lockCentroid) {
      if (centroid) setCentroid(centroid)
      else setCentroid(calculateCentroid(points))
    }
  }, [])

  useEffect(() => {
    if (downloadPDFLoading) {
      downloadPDF()
    }
  }, [downloadPDFLoading])

  useEffect(() => {
    if (saveLoading) {
      handleSave()
    }
  }, [saveLoading])

  const [isReadyToCapture, setIsReadyToCapture] = useState(false)

  useEffect(() => {
    if (isReadyToCapture) {
      capturePDF()
    }
  }, [isReadyToCapture])

  const capturePDF = async () => {
    setLoading(true)
    const scale = 2 // Better performance
    const leftDivRef = document.getElementById('hiddenDiv')
    const rightDivRef = printRef.current // First page

    // Capture the first page
    const firstPageCanvas = await Promise.all([html2canvas(leftDivRef, { scale }), html2canvas(rightDivRef, { scale })])

    // Convert first page to image
    const firstLeftImg = firstPageCanvas[0].toDataURL('image/jpeg', 1.0)
    const firstRightImg = firstPageCanvas[1].toDataURL('image/jpeg', 1.0)
    setHide16Circle(false)
    setHideCircle(false)
    setShowDevta(true)

    // Wait for state update and re-render before capturing second page
    await new Promise(resolve => setTimeout(resolve, 200))

    const secondRightDivRef = printRef.current

    // Capture the second page
    const secondPageCanvas = await Promise.all([
      html2canvas(leftDivRef, { scale }), // Left div remains the same
      html2canvas(secondRightDivRef, { scale })
    ])

    // Convert second page to image
    const secondLeftImg = secondPageCanvas[0].toDataURL('image/jpeg', 1.0)
    const secondRightImg = secondPageCanvas[1].toDataURL('image/jpeg', 1.0)

    // Create PDF in A3 size
    const pdf = new jsPDF('l', 'pt', 'a4') // 'a4' for A3 size
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    const leftImgWidth = pageWidth * 0.3
    const leftImgHeight = pageHeight * 0.9
    const rightImgWidth = pageWidth * 0.6
    const rightImgHeight = pageHeight * 0.9

    // First page
    pdf.addImage(firstLeftImg, 'JPEG', 20, 20, leftImgWidth, leftImgHeight)
    pdf.addImage(firstRightImg, 'JPEG', leftImgWidth + 40, 20, rightImgWidth, rightImgHeight)

    // Second page
    pdf.addPage()
    pdf.addImage(secondLeftImg, 'JPEG', 20, 20, leftImgWidth, leftImgHeight)
    pdf.addImage(secondRightImg, 'JPEG', leftImgWidth + 40, 20, rightImgWidth, rightImgHeight)
    setShowDevta(false)
    setDownloadPDFLoading(false)
    // Reset state after generating PDF
    pdf.save('artwork.pdf')

    setIsReadyToCapture(false) // Reset the flag
    setLoading(false)
  }

  const downloadPDF = () => {
    setHide16Circle(true)
    setHideCircle(true)
    setIsReadyToCapture(true)
    // setLoading(false);
  }

  const getMousePosition = e => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }

    const CTM = svg.getScreenCTM()
    const point = svg.createSVGPoint()
    point.x = e.clientX
    point.y = e.clientY
    const transformed = point.matrixTransform(CTM.inverse())
    return { x: transformed.x, y: transformed.y }
  }

  const findNearestPoint = (x, y, threshold = 10) => {
    return points.findIndex(point => isPointNear(x, y, point, threshold))
  }

  const findClosestLine = (x, y, threshold = 500) => {
    let closestLine = -1
    let minDistance = Infinity
    for (let i = 0; i < points.length; i++) {
      const start = points[i]
      const end = points[(i + 1) % points.length]
      const distance = pointToLineDistance(x, y, start, end)
      if (distance < minDistance) {
        minDistance = distance
        closestLine = i
      }
    }

    return minDistance < threshold ? closestLine : -1
  }

  const handleMouseDown = (e, polygonIndex = '', overlay = '', pointIndex = '') => {
    const svgRect = svgRef.current.getBoundingClientRect()
    const mouseX = e.clientX - svgRect.left
    const mouseY = e.clientY - svgRect.top

    if (overlay == 'overlay' && (polygonIndex == 0 || polygonIndex != '')) {
      polygons.forEach((polygon, polygonIndex) => {
        const isInsidePolygon = isPointInPolygon({ x: mouseX, y: mouseY }, polygon.points)

        if (isInsidePolygon) {
          setDraggingState({
            polygonIndex,
            offsetX: mouseX,
            offsetY: mouseY,
            initialPoints: [...polygon.points],
            isDraggingPolygon: true,
            isDraggingPoint: false
          })

          return // Stop checking further polygons
        }
      })
    }

    if (overlay == 'PointOverlay' && (pointIndex == 0 || pointIndex != '')) {
      setDraggingState({
        polygonIndex,
        pointIndex,
        offsetX: mouseX,
        offsetY: mouseY,
        initialPoints: [...polygons[polygonIndex].points],
        isDraggingPolygon: false,
        isDraggingPoint: true // Indicate point dragging
      })
    }

    const position = getMousePosition(e)
    // Check if the centroid is clicked
    if (centroid && isPointNear(position.x, position.y, centroid)) {
      movingCentroidRef.current = true
    } else {
      const pointIndex = findNearestPoint(position.x, position.y)
      if (pointIndex !== -1) {
        selectedPointRef.current = pointIndex
      }
    }
  }

  const handleMouseMove = e => {
    const position = getMousePosition(e)
    // const canvasBounds = { xMin: 220, xMax: 560, yMin: 220, yMax: 560 }
    const canvasBounds = { xMin: 35, xMax: 780, yMin: 35, yMax: 780 }
    const gridSize = 9 // Define the grid size for snapping

    // Clamp the mouse position within the SVG boundaries
    const clampedX = Math.max(canvasBounds.xMin, Math.min(canvasBounds.xMax, position.x))
    const clampedY = Math.max(canvasBounds.yMin, Math.min(canvasBounds.yMax, position.y))

    // Function to snap the position to the nearest grid point
    const snapToGrid = value => Math.round(value / gridSize) * gridSize

    // Use snapped position only if Shift key is pressed, otherwise use clamped position
    const snappedX = e.shiftKey ? snapToGrid(clampedX) : clampedX
    const snappedY = e.shiftKey ? snapToGrid(clampedY) : clampedY

    if (draggingState && draggingState?.isDraggingPolygon) {
      const { polygonIndex, offsetX, offsetY, initialPoints } = draggingState

      // Calculate the offset from the initial drag position
      const dx = snappedX - offsetX
      const dy = snappedY - offsetY

      // Update the polygon's points
      const updatedPolygons = [...polygons]
      updatedPolygons[polygonIndex].points = initialPoints.map(point => ({
        x: point.x + dx,
        y: point.y + dy
      }))

      setPolygons(updatedPolygons)
      return
    }

    if (draggingState || draggingState?.isDraggingPoint) {
      const { polygonIndex, pointIndex, offsetX, offsetY } = draggingState

      const dx = snappedX - offsetX
      const dy = snappedY - offsetY

      // Update the specific point's position
      const updatedPolygons = [...polygons]
      if (updatedPolygons[polygonIndex]?.points) {
        updatedPolygons[polygonIndex].points[pointIndex] = {
          x: draggingState.initialPoints[pointIndex].x + dx,
          y: draggingState.initialPoints[pointIndex].y + dy
        }
      }
      setPolygons(updatedPolygons)
      return
    }

    if (movingCentroidRef.current) {
      // Move the centroid freely if snapping is disabled
      if (!snapToCentroid) {
        if (!lockCentroid) {
          setCentroid({ x: snappedX, y: snappedY }) // Use snapped position if Shift is pressed
        }
      }
    } else if (selectedPointRef.current !== null) {
      // Move a specific point
      if (!disableDraw) {
        const newPoints = [...points]
        newPoints[selectedPointRef.current] = { x: snappedX, y: snappedY } // Use snapped position if Shift is pressed
        setPoints(newPoints)
        // Recalculate centroid after point modification
        if (!lockCentroid) {
          // if (isLayoutChange) {
          setCentroid(calculateCentroid(newPoints))
          // }
        }
      }
    }
  }

  const handleMouseUp = () => {
    if (draggingState && (draggingState.isDraggingPolygon || draggingState.isDraggingPoint)) {
      setDraggingState(null)
      return
    }
    movingCentroidRef.current = false
    selectedPointRef.current = null
  }

  const handleDoubleClick = (e, overlay = '', polygon = '', pointIndex = '', polygonIndex = '') => {
    const isPointInPolygon = (x, y, polygonPoints) => {
      let inside = false
      for (let i = 0, j = polygonPoints.length - 1; i < polygonPoints.length; j = i++) {
        const xi = polygonPoints[i].x,
          yi = polygonPoints[i].y
        const xj = polygonPoints[j].x,
          yj = polygonPoints[j].y

        const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
        if (intersect) inside = !inside
      }
      return inside
    }

    if (overlay == 'overlay') {
      setOverlayPolyClick(true)
      if (polygon.points.length > 3) {
        const updatedPolygons = polygons.map((poly, idx) => {
          if (idx === polygonIndex) {
            return {
              ...poly,
              points: poly.points.filter((_, idx) => idx !== pointIndex)
            }
          }
          return poly
        })
        setPolygons(updatedPolygons)
      }
      return
    }

    if (overlay == 'polyOverlay') {
      setOverlayPolyClick(true)
      const svg = e.target.ownerSVGElement
      const point = svg.createSVGPoint()
      point.x = e.clientX
      point.y = e.clientY
      const svgCoords = point.matrixTransform(svg.getScreenCTM().inverse())

      // Find the closest edge
      const { x, y } = svgCoords
      const points = polygon.points
      let closestEdgeIndex = -1
      let minDistance = Infinity

      for (let i = 0; i < points.length; i++) {
        const p1 = points[i]
        const p2 = points[(i + 1) % points.length] // Wrap around to form a closed shape

        // Calculate distance from the click to the edge
        const distance = Math.abs(
          ((p2.y - p1.y) * x - (p2.x - p1.x) * y + p2.x * p1.y - p2.y * p1.x) / Math.hypot(p2.y - p1.y, p2.x - p1.x)
        )

        if (distance < minDistance) {
          minDistance = distance
          closestEdgeIndex = i
        }
      }

      // Calculate the midpoint of the closest edge
      if (closestEdgeIndex !== -1) {
        const p1 = points[closestEdgeIndex]
        const p2 = points[(closestEdgeIndex + 1) % points.length]
        const newPoint = {
          x: (p1.x + p2.x) / 2,
          y: (p1.y + p2.y) / 2
        }

        // Insert the new point into the points array
        const updatedPolygons = polygons.map((poly, idx) => {
          if (idx === polygonIndex) {
            const updatedPoints = [...poly.points]
            updatedPoints.splice(closestEdgeIndex + 1, 0, newPoint) // Insert after the closest edge
            return { ...poly, points: updatedPoints }
          }
          return poly
        })

        setPolygons(updatedPolygons) // Update state
      }
      return null
    }

    // Check if mouse is inside any other polygon
    const svg = e.target.ownerSVGElement
    if (!svg) return
    const point = svg.createSVGPoint()
    point.x = e.clientX
    point.y = e.clientY
    const svgCoords = point.matrixTransform(svg.getScreenCTM().inverse())

    const { x, y } = svgCoords
    const isInsideOtherPolygon = polygons.some(
      (poly, idx) => idx !== polygonIndex && isPointInPolygon(x, y, poly.points)
    )

    if (isInsideOtherPolygon) {
      return // Skip the disableDraw logic
    } else {
      setOverlayPolyClick(false)
    }

    if (!disableDraw && !OverlayPolyClick) {
      if (drawingMode !== 'drawing') return

      const position = getMousePosition(e)
      const clickedPointIndex = findNearestPoint(position.x, position.y)
      if (clickedPointIndex !== -1) {
        if (points.length > 3) {
          const newPoints = points.filter((_, i) => i !== clickedPointIndex)
          setPoints(newPoints)
          if (!lockCentroid) {
            setCentroid(calculateCentroid(newPoints))
          }
        }
      } else {
        const closestLineIndex = findClosestLine(position.x, position.y)
        if (closestLineIndex !== -1) {
          const newPoints = [...points]
          newPoints.splice(closestLineIndex + 1, 0, position)
          setPoints(newPoints)
          if (!lockCentroid) {
            setCentroid(calculateCentroid(newPoints))
          }
        }
      }
    }
  }

  const totalLines = 32
  const angleIncrement = 360 / totalLines

  const calculateLineIntersection = (x1, y1, x2, y2, x3, y3, x4, y4) => {
    const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1)

    if (denominator === 0) return null

    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return null

    const x = x1 + ua * (x2 - x1)
    const y = y1 + ua * (y2 - y1)

    return { x, y }
  }

  const edges = []

  // Create line segments from points
  points.forEach((point, i) => {
    const nextPoint = points[(i + 1) % points.length] // Loop back to the start for the last edge
    edges.push({
      x1: point.x,
      y1: point.y,
      x2: nextPoint.x,
      y2: nextPoint.y
    })
  })

  const [intersectionsState, setIntersectionsState] = useState([])

  const pointLookup = intersectionsState.reduce((acc, item) => {
    acc[item.label] = item.point
    return acc
  }, {})

  const drawLines = (label1, label2, stroke, strokeWidth) => {
    const point1 = pointLookup[label1]
    const point2 = pointLookup[label2]

    if (!point1 || !point2) return null

    return (
      <line
        // key={index}
        x1={point1.x}
        y1={point1.y}
        x2={point2.x}
        y2={point2.y}
        //  stroke="blue"
        //         strokeWidth="2"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    )
  }

  const [intersectionPoints, setIntersectionPoints] = useState([])
  const [newLeftintersectionPoints, setNewLeftIntersectionPoints] = useState([])
  const [leftIntersectionPoints, setLeftIntersectionPoints] = useState([])
  const [MarmaintersectionPoints, setMarmaIntersectionPoints] = useState([])

  useEffect(() => {
    if (intersectionsState.length > 0) {
      let line = 1
      const numberedPoints = []
      const linePointLimits1 = [15, 17, 15]

      for (let i = 0; i < specificLines.length; i++) {
        try {
          const specificLine = specificLines[i]
          let globalPointCounter = 1
          const lineData = line++
          const maxPoints = linePointLimits1[i] // Maximum points allowed for this line

          const start = pointLookup[specificLine[0]]
          const end = pointLookup[specificLine[1]]

          const linePoints = []

          linePoints.push({
            x: start.x,
            y: start.y,
            line: specificLine,
            newNumber: globalPointCounter++,
            lineNo: lineData,
            name:
              specificLine.join('_') == 'N8_W2'
                ? '2L'
                : specificLine.join('_') == 'E1_W1'
                  ? '1'
                  : specificLine.join('_') == 'E2_S8'
                    ? '2R'
                    : '',
            color:
              specificLine.join('_') == 'N8_W2'
                ? 'gray'
                : specificLine.join('_') == 'E1_W1'
                  ? 'red'
                  : specificLine.join('_') == 'E2_S8'
                    ? 'gray'
                    : 'gray'
          })

          const line1 = [start, end]

          for (const targetLine of targetLines) {
            const line2 = [pointLookup[targetLine[0]], pointLookup[targetLine[1]]]

            const intersection = calculateIntersectionPoins(line1, line2)

            if (intersection) {
              const isDuplicatePoint = (intersection, start, end) => {
                return (
                  (intersection.x.toFixed(8) === start.x.toFixed(8) &&
                    intersection.y.toFixed(8) === start.y.toFixed(8)) ||
                  (intersection.x.toFixed(8) === end.x.toFixed(8) && intersection.y.toFixed(8) === end.y.toFixed(8))
                )
              }

              if (!isDuplicatePoint(intersection, start, end)) {
                const specificLineKey = specificLine.join('_')
                const targetLineKey = targetLine.join('_')

                const criteria = intersectionCriteria[specificLineKey]?.[targetLineKey] || {}

                linePoints.push({
                  x: intersection.x,
                  y: intersection.y,
                  line: specificLine,
                  newNumber: globalPointCounter++,
                  lineNo: lineData,
                  specificLineKey: specificLineKey,
                  targetLineKey: targetLineKey,
                  criteria: criteria,
                  name: criteria.name,
                  color: criteria.color // Default color if not specified
                })
              }
            }
          }

          linePoints.push({
            x: end.x,
            y: end.y,
            line: specificLine,
            newNumber: globalPointCounter++,
            lineNo: lineData,
            name:
              specificLine.join('_') == 'N8_W2'
                ? ''
                : specificLine.join('_') == 'E1_W1'
                  ? '17'
                  : specificLine.join('_') == 'E2_S8'
                    ? ''
                    : '',
            color:
              specificLine.join('_') == 'N8_W2'
                ? 'gray'
                : specificLine.join('_') == 'E1_W1'
                  ? 'gray'
                  : specificLine.join('_') == 'E2_S8'
                    ? 'gray'
                    : 'gray'
          })

          const selectedPoints = []

          let index = 0
          while (selectedPoints.length < maxPoints) {
            selectedPoints.push({
              ...linePoints[index % linePoints.length],
              newNumber: selectedPoints.length + 1
            })
            index++
          }

          numberedPoints.push(...selectedPoints)
        } catch (error) {}
      }

      setIntersectionPoints(numberedPoints)

      let leftline = 1
      const leftnumberedPoints = []

      for (let i = 0; i < specificLeftLines.length; i++) {
        try {
          const specificLine = specificLeftLines[i]
          let globalPointCounter = 1
          const lineData = leftline++
          const maxPoints = linePointLimits1[i]

          const start = pointLookup[specificLine[0]]
          const end = pointLookup[specificLine[1]]

          const linePoints = []

          linePoints.push({
            x: start.x,
            y: start.y,
            line: specificLine,
            newNumber: globalPointCounter++,
            lineNo: lineData,
            name:
              specificLine.join('_') == 'W8_S2'
                ? '10LN'
                : specificLine.join('_') == 'N1_S1'
                  ? ''
                  : specificLine.join('_') == 'N2_E8'
                    ? ''
                    : '',
            color:
              specificLine.join('_') == 'W8_S2'
                ? 'gray'
                : specificLine.join('_') == 'N1_S1'
                  ? 'red'
                  : specificLine.join('_') == 'N2_E8'
                    ? 'gray'
                    : 'gray'
          })

          const line1 = [start, end]

          for (const targetLine of targetLeftLines) {
            const line2 = [pointLookup[targetLine[0]], pointLookup[targetLine[1]]]

            const intersection = calculateIntersectionPoins(line1, line2)

            if (intersection) {
              const isDuplicatePoint = (intersection, start, end) => {
                return (
                  (intersection.x.toFixed(8) === start.x.toFixed(8) &&
                    intersection.y.toFixed(8) === start.y.toFixed(8)) ||
                  (intersection.x.toFixed(8) === end.x.toFixed(8) && intersection.y.toFixed(8) === end.y.toFixed(8))
                )
              }

              if (!isDuplicatePoint(intersection, start, end)) {
                const specificLineKey = specificLine.join('_')
                const targetLineKey = targetLine.join('_')

                const criteria = leftintersectionCriteria[specificLineKey]?.[targetLineKey] || {}

                linePoints.push({
                  x: intersection.x,
                  y: intersection.y,
                  line: specificLine,
                  newNumber: globalPointCounter++,
                  lineNo: lineData,
                  specificLineKey: specificLineKey,
                  targetLineKey: targetLineKey,
                  criteria: criteria,
                  name: criteria.name,
                  color: criteria.color
                })
              }
            }
          }

          linePoints.push({
            x: end.x,
            y: end.y,
            line: specificLine,
            newNumber: globalPointCounter++,
            lineNo: lineData,
            name:
              specificLine.join('_') == 'W8_S2'
                ? '10RN'
                : specificLine.join('_') == 'N1_S1'
                  ? '17'
                  : specificLine.join('_') == 'N2_E8'
                    ? ''
                    : '',
            color:
              specificLine.join('_') == 'W8_S2'
                ? 'gray'
                : specificLine.join('_') == 'N1_S1'
                  ? 'gray'
                  : specificLine.join('_') == 'N2_E8'
                    ? 'gray'
                    : 'gray'
          })

          const selectedPoints = []

          let index = 0
          while (selectedPoints.length < maxPoints) {
            selectedPoints.push({
              ...linePoints[index % linePoints.length],
              newNumber: selectedPoints.length + 1
            })
            index++
          }

          // Add to the global numberedPoints array
          leftnumberedPoints.push(...selectedPoints)
        } catch (error) {}
      }

      setNewLeftIntersectionPoints(leftnumberedPoints)
      // end of temp code

      // Custom marma points for left of 5L
      const newIntersectionPoints = []
      const line5L1 = [pointLookup['N5'], pointLookup['E5']]
      const line5L2 = [pointLookup['N7'], pointLookup['W3']]
      const line5R2 = [pointLookup['E3'], pointLookup['S7']]

      const intersection_5LL = calculateIntersectionPoins(line5L1, line5L2)
      if (intersection_5LL) {
        newIntersectionPoints.push({
          x: intersection_5LL.x,
          y: intersection_5LL.y,
          name: '',
          color: 'blue'
        })
      }
      const intersection_5RR = calculateIntersectionPoins(line5L1, line5R2)
      if (intersection_5RR) {
        newIntersectionPoints.push({
          x: intersection_5RR.x,
          y: intersection_5RR.y,
          name: '',
          color: 'blue'
        })
      }
      setLeftIntersectionPoints(newIntersectionPoints)
    }
  }, [intersectionsState, points])

  useEffect(() => {
    if (intersectionsState.length > 0) {
      const newMarmaIntersectionPoints = []
      for (let i = 0; i < Marmalines.length; i++) {
        const line1 = [pointLookup[Marmalines[i][0]], pointLookup[Marmalines[i][1]]]

        for (let j = i + 1; j < Marmalines.length; j++) {
          const line2 = [pointLookup[Marmalines[j][0]], pointLookup[Marmalines[j][1]]]

          const intersection = calculateIntersectionPoins(line1, line2)

          if (intersection) {
            newMarmaIntersectionPoints.push(intersection)
          }
        }
      }

      setMarmaIntersectionPoints(newMarmaIntersectionPoints)
    }
  }, [intersectionsState, points])

  useEffect(() => {
    const newIntersections = []

    Array.from({ length: totalLines }).forEach((_, index) => {
      const rotationIndex = index % totalLines
      const angle = rotationIndex * angleIncrement + (360 - inputDegree)
      const radian = (angle * Math.PI) / 180

      const squareSize = 783 // Define your square size
      const halfSize = squareSize / 2 // Calculate half size
      const margin = 26 // Define your margin

      // Check if centroid is defined and has valid x, y properties
      if (centroid && typeof centroid.x === 'number' && typeof centroid.y === 'number') {
        let endX, endY
        const slope = Math.tan(radian)
        const rightBoundary = centroid.x + halfSize - margin
        const leftBoundary = centroid.x - halfSize + margin
        const topBoundary = centroid.y - halfSize + margin
        const bottomBoundary = centroid.y + halfSize - margin

        // Determine line endpoint based on slope
        if (Math.abs(slope) <= 1) {
          if (Math.cos(radian) > 0) {
            endX = rightBoundary
            endY = centroid.y + slope * (rightBoundary - centroid.x)
          } else {
            endX = leftBoundary
            endY = centroid.y - slope * (centroid.x - leftBoundary)
          }
        } else {
          if (Math.sin(radian) > 0) {
            endX = centroid.x + (1 / slope) * (bottomBoundary - centroid.y)
            endY = bottomBoundary
          } else {
            endX = centroid.x - (1 / slope) * (centroid.y - topBoundary)
            endY = topBoundary
          }
        }

        let labelPrefix
        let labelIndex

        // Assign labels based on rotation index
        if (rotationIndex >= 20 && rotationIndex <= 27) {
          labelPrefix = 'N'
          labelIndex = rotationIndex - 19 // N1-N8
        } else if (rotationIndex >= 28 || rotationIndex <= 3) {
          labelPrefix = 'E'
          labelIndex = rotationIndex >= 28 ? rotationIndex - 27 : rotationIndex + 5 // E1-E8
        } else if (rotationIndex >= 4 && rotationIndex <= 11) {
          labelPrefix = 'S'
          labelIndex = rotationIndex - 3 // S1-S8
        } else if (rotationIndex >= 12 && rotationIndex <= 19) {
          labelPrefix = 'W'
          labelIndex = rotationIndex - 11 // W1-W8
        }

        // Calculate intersections if points are valid
        if (points.length > 1) {
          for (let i = 0; i < points.length; i++) {
            const nextIndex = (i + 1) % points.length
            const intersection = calculateLineIntersection(
              centroid.x,
              centroid.y,
              endX,
              endY,
              points[i].x,
              points[i].y,
              points[nextIndex].x,
              points[nextIndex].y
            )

            // Only push valid intersections
            if (intersection) {
              newIntersections.push({
                point: intersection,
                label: `${labelPrefix}${labelIndex}`
              })
            }
          }
        }
      }
    })

    const uniqueIntersections = {}
    newIntersections.forEach(intersection => {
      const { label, point } = intersection
      const distance = Math.sqrt(Math.pow(point.x - centroid.x, 2) + Math.pow(point.y - centroid.y, 2))

      // Update if label is not in uniqueIntersections or if this point is closer
      if (!uniqueIntersections[label] || uniqueIntersections[label].distance > distance) {
        uniqueIntersections[label] = { ...intersection, distance }
      }
    })

    // Convert the uniqueIntersections object to an array
    const filteredIntersections = Object.values(uniqueIntersections).map(({ distance, ...rest }) => rest)
    // Update the state or use the filtered data as needed
    setIntersectionsState(filteredIntersections)
  }, [hideCircle, totalLines, angleIncrement, inputDegree, centroid, points])

  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: '' })
  const handleMouseEnter = (event, point, text, type, line, name) => {
    var typeData =
      line == 1 ? linemarmaDevta_1 : line == 2 ? linemarmaDevta_2 : line == 3 ? linemarmaDevta_3 : marmaDevta
    var visibility = name ? true : false
    setTooltip({
      visible: visibility,
      x: point.x,
      y: point.y,
      text: name
    })
  }

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false })
  }

  const intermediatePoints1 = []
  const intermediatePoints1Test = []
  const intermediatePoints2 = []
  const intermediatePoints2Test = []
  const [intersactMidIntermediatePoints, setIntersactMidIntermediatePoints] = useState([])

  useEffect(() => {
    // Filtered data
    const filteredData = intermediatePoints1Test.filter(item => labelsToExtract.includes(item.label))

    const filteredData1 = intermediatePoints2Test.filter(item => labelsToExtract1.includes(item.label))

    const midpoints = filteredData.map((item1, index) => {
      const item2 = filteredData1[index]
      const midpoint = calculateMidpoint(item1.point, item2.point)
      return {
        label: `A${index + 1}`,
        midpoint
      }
    })
    setIntersactMidIntermediatePoints(midpoints)
  }, [showDevta, points, intersectionPoints])

  const drawLinesForDevta = (label1, label2, stroke, strokeWidth) => {
    const point1filteredData = intersactMidIntermediatePoints.filter(item => label1 == item.label)
    const point2filteredData = intersactMidIntermediatePoints.filter(item => label2 == item.label)

    const point1 = point1filteredData[0]?.midpoint
    const point2 = point2filteredData[0]?.midpoint
    if (!point1 || !point2) return null

    return (
      <line
        // key={index}
        x1={point1.x}
        y1={point1.y}
        x2={point2.x}
        y2={point2.y}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    )
  }

  const drawDevtaLineData = (point1, point2) => {
    return <line x1={point1?.x} y1={point1?.y} x2={point2?.x} y2={point2?.y} stroke={'red'} strokeWidth={2} />
  }

  const [drawDevtaObject, setDrawDevtaObject] = useState([])
  const [areas, setAreas] = useState([])
  const convertPointsToCoordinates = area => {
    return [
      { x: area.point1.x, y: area.point1.y },
      { x: area.point2.x, y: area.point2.y },
      { x: area.point3.x, y: area.point3.y },
      { x: area.point4.x, y: area.point4.y }
    ]
  }
  const convertPointsToCoordinates1 = area => {
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

  const filteredData = (label, object) => {
    return object.filter(item => label === item.label)
  }

  useEffect(() => {
    var { areaData, drawDevtaObject } = calculateAreas(
      intersactMidIntermediatePoints,
      intermediatePoints1Test,
      intermediatePoints2Test,
      pointLookup
    )

    setAreas(areaData)
    setDrawDevtaObject(drawDevtaObject)
  }, [intersactMidIntermediatePoints, showCharts])

  const checkgetPointsBetween = (p1, p2) => {
    try {
      // Helper function to calculate angle between two points relative to centroid
      const getAngle = point => {
        const dx = point.x - centroid.x
        const dy = point.y - centroid.y
        let angle = Math.atan2(dy, dx)
        if (angle < 0) angle += 2 * Math.PI
        return angle
      }

      // Get angles for current points
      const angle1 = getAngle(p1)
      const angle2 = getAngle(p2)

      // Find all points that belong to this section
      const sectionPoints = points.filter(point => {
        const pointAngle = getAngle(point)

        // Handle the case where the section crosses 0
        if (angle1 > angle2) {
          return pointAngle >= angle1 || pointAngle <= angle2
        }
        // Normal case
        return pointAngle >= angle1 && pointAngle <= angle2
      })
      return sectionPoints
    } catch (error) {
      // console.error(`Error in section ${returnParameterName}:`, error)
      return null
    }
  }

  let Area32Data = [];
  let Area4Data = [];
  let Area8Data = [];


  const AreaCalculation = () => {
    const Areas_32 = Area32Data?.map((area) => {
      const ara = calculateArea(area.coordinates)
      return {
        result: area.coordinates,
        area: ara,
        label: area.text,
        color: area.color
      }
    })
    const Areas_8 = Area8Data?.map((area) => {
      const ara = calculateArea(area.coordinates)
      return {
        result: area.coordinates,
        area: ara,
        label: area.text,
        color: area.color
      }
    })
    const Areas_4 = Area4Data?.map((area) => {
      const ara = calculateArea(area.coordinates)
      return {
        result: area.coordinates,
        area: ara,
        label: area.text,
        color: area.color
      }
    })
    return {
      Area_32_Data: Areas_32,
      Area_8_Data: Areas_8,
      Area_4_Data: Areas_4
    }
  }


  const HoverArea = ({ coordinates, hoverText, currentIndex, devta }) => {
    const [isHovered, setIsHovered] = useState(false)
    const centerX = (coordinates[0].x + coordinates[2].x) / 2 + 15
    const centerY = (coordinates[0].y + coordinates[2].y) / 2 + 15
    if (currentIndex >= 13 && currentIndex <= 44) {
      const p1 = coordinates[0]
      const p2 = coordinates[1]

      const betweenPoints = checkgetPointsBetween(p1, p2) || []

      // Round function for comparison
      const roundTo2 = num => Math.round(num * 100) / 100

      // Function to check if two points are the same
      const isSamePoint = (a, b) => roundTo2(a.x) === roundTo2(b.x) && roundTo2(a.y) === roundTo2(b.y)

      // Filter out points that are the same as p1 or p2
      const filteredPoints = betweenPoints.filter(bp => !isSamePoint(bp, p1) && !isSamePoint(bp, p2))
      if (filteredPoints.length > 0) {
        coordinates = [
          p1,
          ...filteredPoints,
          ...coordinates.slice(1) // Add the rest of coordinates starting from index 1
        ]
      }
    }
   
    if (currentIndex == 0) {
      coordinates = intermediatePoints2
    }

    if (currentIndex > 0 && currentIndex < 13) {
      // Define a function to convert configurations to a standardized format
      const getPoints = config => {
        return config.map(item => {
          const [id, source, property] = item
          return filteredData(id, source)[0][property]
        })
      }

      // Map source names to variables
      const sources = {
        X: intermediatePoints2Test,
        A: intersactMidIntermediatePoints,
        I: intermediatePoints1Test
      }

      // Define point patterns (id, source type, property type)
      const configs = {
        // Indices 1-4 use the 20-point pattern
        1: [
          ['X20', 'X', 'point'],
          ['A13', 'A', 'midpoint'],
          ['A14', 'A', 'midpoint'],
          ['A15', 'A', 'midpoint'],
          ['I22', 'I', 'point'],
          ['I23', 'I', 'point'],
          ['I24', 'I', 'point'],
          ['I25', 'I', 'point'],
          ['I26', 'I', 'point'],
          ['A16', 'A', 'midpoint'],
          ['A17', 'A', 'midpoint'],
          ['A18', 'A', 'midpoint'],
          ['X28', 'X', 'point'],
          ['X27', 'X', 'point'],
          ['X26', 'X', 'point'],
          ['X25', 'X', 'point'],
          ['X24', 'X', 'point'],
          ['X23', 'X', 'point'],
          ['X22', 'X', 'point'],
          ['X21', 'X', 'point']
        ],
        2: [
          ['X28', 'X', 'point'],
          ['A18', 'A', 'midpoint'],
          ['A19', 'A', 'midpoint'],
          ['A20', 'A', 'midpoint'],
          ['I30', 'I', 'point'],
          ['I31', 'I', 'point'],
          ['I0', 'I', 'point'],
          ['I1', 'I', 'point'],
          ['I2', 'I', 'point'],
          ['A1', 'A', 'midpoint'],
          ['A2', 'A', 'midpoint'],
          ['A3', 'A', 'midpoint'],
          ['X4', 'X', 'point'],
          ['X3', 'X', 'point'],
          ['X2', 'X', 'point'],
          ['X1', 'X', 'point'],
          ['X0', 'X', 'point'],
          ['X31', 'X', 'point'],
          ['X30', 'X', 'point'],
          ['X29', 'X', 'point']
        ],
        3: [
          ['X4', 'X', 'point'],
          ['A3', 'A', 'midpoint'],
          ['A4', 'A', 'midpoint'],
          ['A5', 'A', 'midpoint'],
          ['I6', 'I', 'point'],
          ['I7', 'I', 'point'],
          ['I8', 'I', 'point'],
          ['I9', 'I', 'point'],
          ['I10', 'I', 'point'],
          ['A6', 'A', 'midpoint'],
          ['A7', 'A', 'midpoint'],
          ['A8', 'A', 'midpoint'],
          ['X12', 'X', 'point'],
          ['X11', 'X', 'point'],
          ['X10', 'X', 'point'],
          ['X9', 'X', 'point'],
          ['X8', 'X', 'point'],
          ['X7', 'X', 'point'],
          ['X6', 'X', 'point'],
          ['X5', 'X', 'point']
        ],
        4: [
          ['X12', 'X', 'point'],
          ['A8', 'A', 'midpoint'],
          ['A9', 'A', 'midpoint'],
          ['A10', 'A', 'midpoint'],
          ['I14', 'I', 'point'],
          ['I15', 'I', 'point'],
          ['I16', 'I', 'point'],
          ['I17', 'I', 'point'],
          ['I18', 'I', 'point'],
          ['A11', 'A', 'midpoint'],
          ['A12', 'A', 'midpoint'],
          ['A13', 'A', 'midpoint'],
          ['X20', 'X', 'point'],
          ['X19', 'X', 'point'],
          ['X18', 'X', 'point'],
          ['X17', 'X', 'point'],
          ['X16', 'X', 'point'],
          ['X15', 'X', 'point'],
          ['X14', 'X', 'point'],
          ['X13', 'X', 'point']
        ],
        // Indices 5-12 use the 6-point pattern
        5: [
          ['A16', 'A', 'midpoint'],
          ['I26', 'I', 'point'],
          ['I27', 'I', 'point'],
          ['I28', 'I', 'point'],
          ['A18', 'A', 'midpoint'],
          ['A17', 'A', 'midpoint']
        ],
        6: [
          ['A18', 'A', 'midpoint'],
          ['I28', 'I', 'point'],
          ['I29', 'I', 'point'],
          ['I30', 'I', 'point'],
          ['A20', 'A', 'midpoint'],
          ['A19', 'A', 'midpoint']
        ],
        7: [
          ['A1', 'A', 'midpoint'],
          ['I2', 'I', 'point'],
          ['I3', 'I', 'point'],
          ['I4', 'I', 'point'],
          ['A3', 'A', 'midpoint'],
          ['A2', 'A', 'midpoint']
        ],
        8: [
          ['A3', 'A', 'midpoint'],
          ['I4', 'I', 'point'],
          ['I5', 'I', 'point'],
          ['I6', 'I', 'point'],
          ['A5', 'A', 'midpoint'],
          ['A4', 'A', 'midpoint']
        ],
        9: [
          ['A6', 'A', 'midpoint'],
          ['I10', 'I', 'point'],
          ['I11', 'I', 'point'],
          ['I12', 'I', 'point'],
          ['A8', 'A', 'midpoint'],
          ['A7', 'A', 'midpoint']
        ],
        10: [
          ['A8', 'A', 'midpoint'],
          ['I12', 'I', 'point'],
          ['I13', 'I', 'point'],
          ['I14', 'I', 'point'],
          ['A10', 'A', 'midpoint'],
          ['A9', 'A', 'midpoint']
        ],
        11: [
          ['A11', 'A', 'midpoint'],
          ['I18', 'I', 'point'],
          ['I19', 'I', 'point'],
          ['I20', 'I', 'point'],
          ['A13', 'A', 'midpoint'],
          ['A12', 'A', 'midpoint']
        ],
        12: [
          ['A13', 'A', 'midpoint'],
          ['I20', 'I', 'point'],
          ['I21', 'I', 'point'],
          ['I22', 'I', 'point'],
          ['A15', 'A', 'midpoint'],
          ['A14', 'A', 'midpoint']
        ]
      }

      try {
        if (configs[currentIndex]) {
          // Process the configuration for the current index
          coordinates = configs[currentIndex].map(([id, sourceType, property]) => {
            const result = filteredData(id, sources[sourceType])
            return result[0][property]
          })
        }
      } catch (error) {
        console.error(`Error processing points for index ${currentIndex}:`, error)
      }
    }

    const textWidth = hoverText.length * 8 // Estimate based on character count
    const textHeight = 20 // Adjust based on your font size and padding
    return (
      <>
        <polygon
          points={coordinates.map(point => `${point.x},${point.y}`).join(' ')}
          fill={isHovered ? devtaColors[devta] : 'transparent'}
          opacity={0.5}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />

        {isHovered && (
          <>
            {/* Background Rectangle */}
            <rect
              x={centerX - textWidth / 2} // Center the rectangle
              y={centerY - textHeight / 2} // Center the rectangle
              width={textWidth} // Set the width according to your text length
              height={textHeight} // Set the height for the rectangle
              fill='white' // Background color
              rx='4' // Rounded corners
              ry='4' // Rounded corners
              style={{ cursor: 'none' }}
            />
            {/* Text with purple color and semi-bold */}
            <text
              x={centerX}
              y={centerY}
              fill='purple'
              fontSize='14'
              fontWeight='600' // Semi-bold weight
              alignmentBaseline='central'
              textAnchor='middle' // Center the text
              z={999}
              style={{
                userSelect: 'none', // Prevent text selection
                cursor: 'default' // Optional: Make the cursor non-interactive
              }}
            >
              {hoverText}
            </text>
          </>
        )}
      </>
    )
  }

  const handleSave = () => {
    const payload = {
      centroid: centroid,
      points: points,
      rotation: rotation,
      zoom: zoom
    }
    setSaveLoading(false)
  }

  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 })

  const handleMouseDown1 = e => {
    e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
    setInitialPosition({ x: translate.x, y: translate.y })
  }

  const handleMouseMove1 = e => {
    if (!isDragging) return

    if (imageDragDone) return
    // Calculate the new position
    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y

    setTranslate({
      x: initialPosition.x + dx,
      y: initialPosition.y + dy
    })
  }

  const handleMouseUp1 = () => {
    setIsDragging(false)
  }

  const getPointsBetween = (point1Key, point2Key, returnParameterName, color) => {
    try {
      const p1 = pointLookup[point1Key]
      const p2 = pointLookup[point2Key]

      if (!p1 || !p2) {
        return null
      }

      const getAngle = point => {
        const dx = point.x - centroid.x
        const dy = point.y - centroid.y
        let angle = Math.atan2(dy, dx)
        if (angle < 0) angle += 2 * Math.PI
        return angle
      }

      const angle1 = getAngle(p1)
      const angle2 = getAngle(p2)

      const sectionPoints = points.filter(point => {
        if (point === p1 || point === p2 || point === centroid) return false
        const pointAngle = getAngle(point)
        if (angle1 > angle2) {
          return pointAngle >= angle1 || pointAngle <= angle2
        }
        return pointAngle >= angle1 && pointAngle <= angle2
      })

      const sectionPolygon = [p1, ...sectionPoints, p2, centroid]
      const area = calculateArea(sectionPolygon)

      return {
        result: sectionPolygon,
        area: area,
        label: returnParameterName,
        color: color
      }
    } catch (error) {
      return null
    }
  }

  const processData = (polygon, data) => {
    try {
      const results = data
        .map(([point1Key, point2Key, returnParameterName, color]) => {
          return getPointsBetween(point1Key, point2Key, returnParameterName, color)
        })
        .filter(result => result !== null)

      return results
    } catch (error) {
      return []
    }
  }

  const allResults = processData(points, data)
  const maxValue = Math.max(...allResults.map(item => item.area))

  const [activeChakra, setActiveChakra] = useState(null)

  const handleShowChakra = (chakraValue, isChecked) => {
    if (isChecked) {
      setHideCircle(true)
      setActiveChakra(chakraValue)
      setHide32Circle(chakraValue === 32)
      setHide16Circle(chakraValue === 16)
      setHide8Circle(chakraValue === 8)
      setHide4Circle(chakraValue === 4)
    } else if (activeChakra === chakraValue) {
      setHideCircle(false)
      if (chakraValue === 32) setHide32Circle(false)
      if (chakraValue === 16) setHide16Circle(false)
      if (chakraValue === 8) setHide8Circle(false)
      if (chakraValue === 4) setHide4Circle(false)
      setActiveChakra(null)
    }
  }

  const handleAddPolygonToggle = () => {
    setNewOverlayPoly({
      title: '',
      color: '#007BFF',
      x: 10,
      y: 10,
      width: 100,
      height: 100
    })
    setOpenNewPolygon(!openNewPolygon)
  }

  const handleAddPolygon = formData => {
    if (formData?.isUpdate) {
      const updatedPolygons = polygons.map(polygon => {
        if (polygon.id === formData.id) {
          return {
            ...polygon,
            title: formData.title || polygon.title,
            color: formData.color || polygon.color,
            description: formData.description || polygon.description
          }
        }
        return polygon
      })
      setPolygons(updatedPolygons)
    } else {
      const newPolygon = {
        points: [
          { x: formData.x, y: formData.y },
          { x: formData.x + formData.width, y: formData.y },
          { x: formData.x + formData.width, y: formData.y + formData.height },
          { x: formData.x, y: formData.y + formData.height }
        ],
        id: polygons.length + 1,
        color: formData.color || 'rgba(0, 123, 255, 0.2)',
        title: formData.title,
        description: formData.description || polygons.description
      }
      setPolygons([...polygons, newPolygon])
    }
    handleAddPolygonToggle()
  }

  const handleOverlayDelete = index => {
    const updatedPolygons = polygons.filter((_, i) => i !== index)
    setPolygons(updatedPolygons)
  }

  const handleOverlayEdit = polygon => {
    polygon.isUpdate = true
    setNewOverlayPoly(polygon)
    setOpenNewPolygon(true)
  }

  const handleShowCharts = (chartValue, isChecked) => {
    if (isChecked) {
      // When checking a checkbox
      setShowCharts(true);
      setShowDevta(true);
      setShow45Charts(chartValue === 45);
      setShow32Charts(chartValue === 32);
      setShow8Charts(chartValue === 8);
      setShow4Charts(chartValue === 4);
      setHideCircle(true);  // If you need to show the circle when checked
    } else {
      setHideCircle(false);
      switch (chartValue) {
        case 45:
          setShow45Charts(false);
          break;
        case 32:
          setShow32Charts(false);
          break;
        case 8:
          setShow8Charts(false);
          break;
        case 4:
          setShow4Charts(false);
          break;
        default:
          break;
      }

      // Check if all charts are unchecked
      const isAllUnchecked = () => {
        return !show45Charts && !show32Charts && !show8Charts && !show4Charts
      }

      // Only hide Devta and Charts if all are unchecked
      if (isAllUnchecked()) {
        setShowDevta(false)
        setShowCharts(false)
      }
    }
  }

  const [Area_45_Data, setArea_45_Data] = useState([])
  const [Area_32_Data, setArea_32_Data] = useState([])
  const [Area_8_Data, setArea_8_Data] = useState([])
  const [Area_4_Data, setArea_4_Data] = useState([])

  useEffect(() => {
    if (selectedGroup && selectedGroup == '16 Zone Bar Chart') {
      if (intersectionsState.length > 0) {
        {
          intersectionsState.map((intersection, i) => {
            const dx = (centroid.x - intersection.point.x) / 3
            const dy = (centroid.y - intersection.point.y) / 3
            const point1 = { x: intersection.point.x + dx, y: intersection.point.y + dy }
            intermediatePoints1.push(point1) // Add P1 to the array
            intermediatePoints1Test.push({
              point: point1,
              label: `I${i}`
            })
            // Calculate the second intermediate point (P2)
            const point2 = { x: intersection.point.x + 2 * dx, y: intersection.point.y + 2 * dy }
            intermediatePoints2.push(point2) // Add P2 to the array
            intermediatePoints2Test.push({
              point: point2,
              label: `X${i}`
            })
          })
        }
        const filteredData = intermediatePoints1Test.filter(item => labelsToExtract.includes(item.label))

        const filteredData1 = intermediatePoints2Test.filter(item => labelsToExtract1.includes(item.label))

        const midpoints = filteredData.map((item1, index) => {
          const item2 = filteredData1[index]
          const midpoint = calculateMidpoint(item1.point, item2.point)
          return {
            label: `A${index + 1}`,
            midpoint
          }
        })

        var { areaData } = calculateAreas(midpoints, intermediatePoints1Test, intermediatePoints2Test, pointLookup)
        const filteredData123 = (label, object) => {
          return object.filter(item => label === item.label)
        }
        {
          areaData.map((area, index) => {
            var currentIndex = index
            var coordinates = area.coordinates
            var hoverText = index + 1 + ' ' + devta[index]
            if (currentIndex >= 13 && currentIndex <= 44) {
              const p1 = coordinates[0]
              const p2 = coordinates[1]

              const betweenPoints = checkgetPointsBetween(p1, p2) || []

              // Round function for comparison
              const roundTo2 = num => Math.round(num * 100) / 100

              // Function to check if two points are the same
              const isSamePoint = (a, b) => roundTo2(a.x) === roundTo2(b.x) && roundTo2(a.y) === roundTo2(b.y)

              // Filter out points that are the same as p1 or p2
              const filteredPoints = betweenPoints.filter(bp => !isSamePoint(bp, p1) && !isSamePoint(bp, p2))
              if (filteredPoints.length > 0) {
                coordinates = [
                  p1,
                  ...filteredPoints,
                  ...coordinates.slice(1) // Add the rest of coordinates starting from index 1
                ]
              }
              if (!Area32Data.some(area => area.id === currentIndex)) {
                Area32Data.push({
                  coordinates: coordinates,
                  text: hoverText.split(" ")[1],
                  id: currentIndex,
                  color: devtaColors[devta[index]]
                })
              }
            }
            // outer32AreaCalculation();
            if (currentIndex == 0) {
              coordinates = intermediatePoints2
            }

            if (currentIndex > 0 && currentIndex < 13) {
              const sources = {
                X: intermediatePoints2Test,
                A: midpoints,
                I: intermediatePoints1Test
              }

              const configs = {
                // Indices 1-4 use the 20-point pattern
                1: [
                  ['X20', 'X', 'point'],
                  ['A13', 'A', 'midpoint'],
                  ['A14', 'A', 'midpoint'],
                  ['A15', 'A', 'midpoint'],
                  ['I22', 'I', 'point'],
                  ['I23', 'I', 'point'],
                  ['I24', 'I', 'point'],
                  ['I25', 'I', 'point'],
                  ['I26', 'I', 'point'],
                  ['A16', 'A', 'midpoint'],
                  ['A17', 'A', 'midpoint'],
                  ['A18', 'A', 'midpoint'],
                  ['X28', 'X', 'point'],
                  ['X27', 'X', 'point'],
                  ['X26', 'X', 'point'],
                  ['X25', 'X', 'point'],
                  ['X24', 'X', 'point'],
                  ['X23', 'X', 'point'],
                  ['X22', 'X', 'point'],
                  ['X21', 'X', 'point']
                ],
                2: [
                  ['X28', 'X', 'point'],
                  ['A18', 'A', 'midpoint'],
                  ['A19', 'A', 'midpoint'],
                  ['A20', 'A', 'midpoint'],
                  ['I30', 'I', 'point'],
                  ['I31', 'I', 'point'],
                  ['I0', 'I', 'point'],
                  ['I1', 'I', 'point'],
                  ['I2', 'I', 'point'],
                  ['A1', 'A', 'midpoint'],
                  ['A2', 'A', 'midpoint'],
                  ['A3', 'A', 'midpoint'],
                  ['X4', 'X', 'point'],
                  ['X3', 'X', 'point'],
                  ['X2', 'X', 'point'],
                  ['X1', 'X', 'point'],
                  ['X0', 'X', 'point'],
                  ['X31', 'X', 'point'],
                  ['X30', 'X', 'point'],
                  ['X29', 'X', 'point']
                ],
                3: [
                  ['X4', 'X', 'point'],
                  ['A3', 'A', 'midpoint'],
                  ['A4', 'A', 'midpoint'],
                  ['A5', 'A', 'midpoint'],
                  ['I6', 'I', 'point'],
                  ['I7', 'I', 'point'],
                  ['I8', 'I', 'point'],
                  ['I9', 'I', 'point'],
                  ['I10', 'I', 'point'],
                  ['A6', 'A', 'midpoint'],
                  ['A7', 'A', 'midpoint'],
                  ['A8', 'A', 'midpoint'],
                  ['X12', 'X', 'point'],
                  ['X11', 'X', 'point'],
                  ['X10', 'X', 'point'],
                  ['X9', 'X', 'point'],
                  ['X8', 'X', 'point'],
                  ['X7', 'X', 'point'],
                  ['X6', 'X', 'point'],
                  ['X5', 'X', 'point']
                ],
                4: [
                  ['X12', 'X', 'point'],
                  ['A8', 'A', 'midpoint'],
                  ['A9', 'A', 'midpoint'],
                  ['A10', 'A', 'midpoint'],
                  ['I14', 'I', 'point'],
                  ['I15', 'I', 'point'],
                  ['I16', 'I', 'point'],
                  ['I17', 'I', 'point'],
                  ['I18', 'I', 'point'],
                  ['A11', 'A', 'midpoint'],
                  ['A12', 'A', 'midpoint'],
                  ['A13', 'A', 'midpoint'],
                  ['X20', 'X', 'point'],
                  ['X19', 'X', 'point'],
                  ['X18', 'X', 'point'],
                  ['X17', 'X', 'point'],
                  ['X16', 'X', 'point'],
                  ['X15', 'X', 'point'],
                  ['X14', 'X', 'point'],
                  ['X13', 'X', 'point']
                ],
                // Indices 5-12 use the 6-point pattern
                5: [
                  ['A16', 'A', 'midpoint'],
                  ['I26', 'I', 'point'],
                  ['I27', 'I', 'point'],
                  ['I28', 'I', 'point'],
                  ['A18', 'A', 'midpoint'],
                  ['A17', 'A', 'midpoint']
                ],
                6: [
                  ['A18', 'A', 'midpoint'],
                  ['I28', 'I', 'point'],
                  ['I29', 'I', 'point'],
                  ['I30', 'I', 'point'],
                  ['A20', 'A', 'midpoint'],
                  ['A19', 'A', 'midpoint']
                ],
                7: [
                  ['A1', 'A', 'midpoint'],
                  ['I2', 'I', 'point'],
                  ['I3', 'I', 'point'],
                  ['I4', 'I', 'point'],
                  ['A3', 'A', 'midpoint'],
                  ['A2', 'A', 'midpoint']
                ],
                8: [
                  ['A3', 'A', 'midpoint'],
                  ['I4', 'I', 'point'],
                  ['I5', 'I', 'point'],
                  ['I6', 'I', 'point'],
                  ['A5', 'A', 'midpoint'],
                  ['A4', 'A', 'midpoint']
                ],
                9: [
                  ['A6', 'A', 'midpoint'],
                  ['I10', 'I', 'point'],
                  ['I11', 'I', 'point'],
                  ['I12', 'I', 'point'],
                  ['A8', 'A', 'midpoint'],
                  ['A7', 'A', 'midpoint']
                ],
                10: [
                  ['A8', 'A', 'midpoint'],
                  ['I12', 'I', 'point'],
                  ['I13', 'I', 'point'],
                  ['I14', 'I', 'point'],
                  ['A10', 'A', 'midpoint'],
                  ['A9', 'A', 'midpoint']
                ],
                11: [
                  ['A11', 'A', 'midpoint'],
                  ['I18', 'I', 'point'],
                  ['I19', 'I', 'point'],
                  ['I20', 'I', 'point'],
                  ['A13', 'A', 'midpoint'],
                  ['A12', 'A', 'midpoint']
                ],
                12: [
                  ['A13', 'A', 'midpoint'],
                  ['I20', 'I', 'point'],
                  ['I21', 'I', 'point'],
                  ['I22', 'I', 'point'],
                  ['A15', 'A', 'midpoint'],
                  ['A14', 'A', 'midpoint']
                ]
              }

              try {
                if (configs[currentIndex]) {
                  coordinates = configs[currentIndex].map(([id, sourceType, property]) => {
                    const result = filteredData123(id, sources[sourceType])
                    return result[0][property]
                  })
                  if (currentIndex > 0 && currentIndex < 5) {
                    if (!Area4Data.some(area => area.id === currentIndex)) {
                      Area4Data.push({
                        coordinates: coordinates,
                        text: hoverText.split(" ")[1],
                        id: currentIndex,
                        color: devtaColors[devta[index]]
                      })
                    }
                  }
                  if (currentIndex > 4 && currentIndex < 13) {
                    if (!Area8Data.some(area => area.id === currentIndex)) {
                      Area8Data.push({
                        coordinates: coordinates,
                        text: hoverText.split(" ")[1],
                        id: currentIndex,
                        color: devtaColors[devta[index]]
                      })
                    }
                  }
                }
              } catch (error) {
                console.error(`Error processing points for index ${currentIndex}:`, error)
              }
            }
          })
        }
        var dataArea = AreaCalculation()
        setArea_32_Data(dataArea.Area_32_Data)
        setArea_8_Data(dataArea.Area_8_Data)
        setArea_4_Data(dataArea.Area_4_Data)
        if (dataArea?.Area_32_Data && dataArea?.Area_8_Data && dataArea?.Area_4_Data) {
          const combinedData = [
            ...(dataArea.Area_32_Data || []),
            ...(dataArea.Area_8_Data || []),
            ...(dataArea.Area_4_Data || [])
          ]
          setArea_45_Data(combinedData)
        }
      }
    }
  }, [intersectionsState, show32Charts])

  // const printHandler = () => {
  //   if (!printRef.current) {
  //     console.error('Print container ref is null')
  //     return
  //   }

  //   try {
  //     // Clone the content to avoid modifying the original
  //     const content = printRef.current.cloneNode(true)

  //     // Create a hidden iframe to handle the PDF generation
  //     const iframe = document.createElement('iframe')
  //     iframe.style.display = 'none'
  //     document.body.appendChild(iframe)

  //     // Format the current date in YYYY-MM-DD HH:MM:SS format
  //     const currentDate = new Date()
  //     const formattedDate = currentDate.toISOString().split('T')[0]
  //     const formattedTime = currentDate.toTimeString().split(' ')[0]
  //     const fullDateTime = `${formattedDate} ${formattedTime}`

  //     // User information
  //     const username = 'DhruviRana4' // Using the username you provided

  //     // Add necessary styles for printing with landscape orientation
  //     iframe.contentDocument.write(`
  //       <!DOCTYPE html>
  //       <html>
  //       <head>
  //         <title>Print Document</title>
  //         <style>
  //           @page {
  //             size: landscape;
  //             margin: 0;
  //           }

  //           @media print {
  //             body {
  //               margin: 0;
  //               background-color: white;
  //               color: black;
  //             }

  //             h1 {
  //               font-size: 24px;
  //               color: black;
  //               margin-bottom: 16px;
  //             }

  //             p {
  //               font-size: 16px;
  //               line-height: 1.5;
  //               color: black;
  //             }

  //             .red-box {
  //               width: 100px;
  //               height: 100px;
  //               background-color: red;
  //               border: 2px solid black;
  //             }

  //             /* Force color printing */
  //             * {
  //               -webkit-print-color-adjust: exact !important;
  //               print-color-adjust: exact !important;
  //               color-adjust: exact !important;
  //             }

  //             /* Page break styling */
  //             .page-break {
  //               page-break-after: always;
  //               break-after: page;
  //             }

  //             /* Make sure last page doesn't have a break */
  //             .new-page:last-of-type {
  //               page-break-after: avoid;
  //               break-after: avoid;
  //             }
  //           }

  //           /* Non-print styles */
  //           body {
  //             margin: 0;
  //             padding: 20px;
  //             background-color: white;
  //             color: black;
  //             font-family: Arial, sans-serif;
  //           }

  //           h1 {
  //             font-size: 24px;
  //             color: black;
  //             margin-bottom: 16px;
  //           }

  //           p {
  //             font-size: 16px;
  //             line-height: 1.5;
  //             color: black;
  //           }

  //           .red-box {
  //             width: 100px;
  //             height: 100px;
  //             background-color: red;
  //             border: 2px solid black;
  //             margin: 20px 0;
  //           }

  //           /* Page break styling for preview */
  //           .page-break {
  //             margin-bottom: 30px;
  //             border-bottom: 1px dashed #ccc;
  //             padding-bottom: 30px;
  //           }

  //           .new-page {
  //             padding-top: 20px;
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         <div id="print-content">
  //           ${content.innerHTML}
  //         </div>
  //       </body>
  //       </html>
  //     `)

  //     iframe.contentDocument.close()

  //     // Trigger print dialog and wait for it to complete
  //     iframe.contentWindow.focus()

  //     // Use a timeout to ensure the content is fully loaded
  //     setTimeout(() => {
  //       // Generate a dynamic filename with user and date
  //       const simpleDate = formattedDate.replace(/-/g, '')
  //       const dynamicFileName = `report_${username}_${simpleDate}.pdf`

  //       // Store the original title
  //       const originalTitle = document.title

  //       // Set the new title (filename)
  //       document.title = dynamicFileName

  //       // Print the document
  //       iframe.contentWindow.print()

  //       // Listen for the afterprint event to clean up
  //       iframe.contentWindow.addEventListener(
  //         'afterprint',
  //         () => {
  //           // Restore the original document title
  //           document.title = originalTitle

  //           // Remove the iframe after printing is done
  //           document.body.removeChild(iframe)
  //         },
  //         { once: true }
  //       )
  //     }, 500)
  //   } catch (err) {
  //     console.error('Print error:', err)
  //     alert('There was an error preparing the print view. Please try again.')
  //   }
  // }

  return (
    <>
      <div className='flex lg:flex-row gap-5 py-4 justify-start '>
        <div className='bg-white'>
          <div id={selectedGroup} ref={printRef} className='flex-grow main-print-div'>
            {selectedGroup && selectedGroup == '16 Zone Bar Chart' ? (
              <div style={{ width: width, height: height }}>
                <CustomBarChart
                  data={
                    show45Charts
                      ? Area_45_Data
                      : show32Charts
                        ? Area_32_Data
                        : show8Charts
                          ? Area_8_Data
                          : show4Charts
                            ? Area_4_Data
                            : allResults // This will show all combined data
                  }
                  vertical={show32Charts || show45Charts ? true : false}
                  barSize={show32Charts || show45Charts ? 10 : 20}
                  showLines={show32Charts || show45Charts || show4Charts || show8Charts? false : true}
                />
              </div>
            ) : (
              <div className='relative flex'>
                <svg
                  ref={svgRef}
                  width={width}
                  height={height}
                  className='cursor-pointer border border-gray-200 bg-white'
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onDoubleClick={e => handleDoubleClick(e, 'svg')}
                  style={{
                    touchAction: 'none',
                    border: '0',
                    shapeRendering: 'auto' // Enables antialiasing
                  }}
                >
                  {!fileUploaded && (
                    <>
                      <GridBackground width={width} height={height} gridSize={gridSize} />
                    </>
                  )}

                  {fileUploaded && (
                    <>
                      <defs>
                        <clipPath id='svgViewBox'>
                          <rect width={width} height={height} />
                        </clipPath>
                      </defs>

                      <g clipPath='url(#svgViewBox)' vectorEffect='non-scaling-stroke'>
                        {cropImage ? (
                          <CropImageWithSVG
                            height={height}
                            width={width}
                            previewUrl={previewUrl?.Base64File}
                            points={points}
                            zoom={zoom}
                            rotation={rotation}
                            translate={translate}
                          />
                        ) : (
                          <g
                            className='file-layer'
                            transform={`translate(${translate.x + (width - width * zoom) / 2}, ${translate.y + (height - height * zoom) / 2}) rotate(${rotation}, ${width / 2}, ${height / 2}) scale(${zoom})`}
                          >
                            {previewUrl ? (
                              <>
                                <image
                                  href={previewUrl?.isPdf ? previewUrl?.pdfImages[previewUrl?.selectedPage] : previewUrl?.Base64File}
                                  style={{ maxWidth: '100%', maxHeight: '500px', imageRendering: 'auto' }}
                                  width={width}
                                  height={height}
                                  onMouseDown={handleMouseDown1}
                                  onMouseMove={handleMouseMove1}
                                  onMouseUp={handleMouseUp1}
                                  onMouseLeave={handleMouseUp1}
                                />
                              </>
                            ) : null}
                          </g>
                        )}

                        <GridBackground width={width} height={height} />

                        <g className='drawing-layer' style={{ pointerEvents: 'all' }}>
                          {points.length > 1 && (
                            <polygon
                              points={points.map(p => `${p.x},${p.y}`).join(' ')}
                              fill='none'
                              stroke='blue'
                              strokeWidth='1'
                            />
                          )}

                          {/* Draw points */}
                          {!disableDraw &&
                            points.map((point, i) => (
                              <circle
                                key={i}
                                cx={point.x}
                                cy={point.y}
                                r='5'
                                fill='red'
                                stroke='white'
                                strokeWidth='2'
                              />
                            ))}

                          {centroid && (
                            <>
                              <circle
                                cx={centroid.x}
                                cy={centroid.y}
                                r='5'
                                fill='green'
                                stroke='white'
                                strokeWidth='2'
                              />

                              {hideCircle &&
                                Array.from({ length: totalLines }).map((_, index) => {
                                  const rotationIndex = index % totalLines
                                  const angle = rotationIndex * angleIncrement + (270 - inputDegree)
                                  const radian = (angle * Math.PI) / 180

                                  const squareSize = 783
                                  const halfSize = squareSize
                                  const margin = 26

                                  let endX, endY
                                  const slope = Math.tan(radian)
                                  const rightBoundary = centroid.x + halfSize - margin
                                  const leftBoundary = centroid.x - halfSize + margin
                                  const topBoundary = centroid.y - halfSize + margin
                                  const bottomBoundary = centroid.y + halfSize - margin

                                  if (Math.abs(slope) <= 1) {
                                    if (Math.cos(radian) > 0) {
                                      endX = rightBoundary
                                      endY = centroid.y + slope * (rightBoundary - centroid.x)
                                    } else {
                                      endX = leftBoundary
                                      endY = centroid.y - slope * (centroid.x - leftBoundary)
                                    }
                                  } else {
                                    if (Math.sin(radian) > 0) {
                                      endX = centroid.x + (1 / slope) * (bottomBoundary - centroid.y)
                                      endY = bottomBoundary
                                    } else {
                                      endX = centroid.x - (1 / slope) * (centroid.y - topBoundary)
                                      endY = topBoundary
                                    }
                                  }

                                  const style = lineSets[index % lineSets.length]
                                  return (
                                    <>
                                      <g key={index}>
                                        {index % (hide16Circle ? 2 : hide8Circle ? 4 : hide4Circle ? 8 : 2) == 0 && (
                                          <line
                                            x1={centroid.x}
                                            y1={centroid.y}
                                            x2={endX}
                                            y2={endY}
                                            stroke={style.stroke}
                                            strokeWidth={style.strokeWidth}
                                            strokeDasharray={style.strokeDasharray}
                                          />
                                        )}
                                      </g>
                                    </>
                                  )
                                })}

                              {showDevta ? (
                                <>
                                  {intersectionsState.map((intersection, i) => {
                                    const dx = (centroid.x - intersection.point.x) / 3
                                    const dy = (centroid.y - intersection.point.y) / 3
                                    const point1 = { x: intersection.point.x + dx, y: intersection.point.y + dy }
                                    intermediatePoints1.push(point1) // Add P1 to the array
                                    intermediatePoints1Test.push({
                                      point: point1,
                                      label: `I${i}`
                                    })
                                    // Calculate the second intermediate point (P2)
                                    const point2 = {
                                      x: intersection.point.x + 2 * dx,
                                      y: intersection.point.y + 2 * dy
                                    }
                                    intermediatePoints2.push(point2) // Add P2 to the array
                                    intermediatePoints2Test.push({
                                      point: point2,
                                      label: `X${i}`
                                    })
                                    return (
                                      <g key={i}>
                                        {/* Draw the intersection point */}
                                        {hideCircle && (
                                          <>
                                            {hideCircleIntersaction && (
                                              <circle
                                                cx={intersection.point.x}
                                                cy={intersection.point.y}
                                                r='3'
                                                fill='red'
                                              />
                                            )}

                                            {/* <text
                                          x={intersection.point.x + 5}
                                          y={intersection.point.y - 5}
                                          fontSize='10'
                                          fill='black'
                                          style={{
                                            userSelect: 'none',
                                            cursor: 'default'
                                          }}
                                        >
                                          {intersection.label}
                                        </text> */}
                                          </>
                                        )}

                                        {/* Draw the first intermediate point (P1) */}
                                        {showDevtaIntersaction && (
                                          <circle cx={point1.x} cy={point1.y} r='3' fill='blue' />
                                        )}
                                        {/* <text
                                      x={point1.x + 5}
                                      y={point1.y - 5}
                                      fontSize="10"
                                      fill="black"
                                      style={{ userSelect: 'none', cursor: 'default' }}
                                    >
                                      I-{i}
                                    </text> */}

                                        {/* Draw the second intermediate point (P2) */}
                                        {showDevtaIntersaction && (
                                          <circle cx={point2.x} cy={point2.y} r='3' fill='blue' />
                                        )}
                                        {/* <text
                                  x={point2.x + 5}
                                  y={point2.y - 5}
                                  fontSize="10"
                                  fill="black"
                                  style={{ userSelect: 'none', cursor: 'default' }}
                                >
                                  X-{i}
                                </text> */}
                                      </g>
                                    )
                                  })}

                                  {/* uncomment this */}
                                  {intersactMidIntermediatePoints.map((item, i) => {
                                    return (
                                      <>
                                        {showDevtaIntersaction && (
                                          <circle
                                            key={i}
                                            cx={item.midpoint.x}
                                            cy={item.midpoint.y}
                                            r='5'
                                            fill='black'
                                            stroke='white'
                                            strokeWidth='2'
                                          />
                                        )}
                                        {/* <text
                                    x={item.midpoint.x + 5}
                                    y={item.midpoint.y - 5}
                                    fontSize="10"
                                    fill="black"
                                    style={{ userSelect: 'none', cursor: 'default' }}
                                  >
                                    {item.label}
                                  </text> */}
                                      </>
                                    )
                                  })}
                                  {/* uncomment this */}
                                  {drawDevtaObject &&
                                    drawDevtaObject.map(item => {
                                      return drawDevtaLineData(item.point1, item.point2)
                                    })}

                                  {/* {drawDevtaLineData()} */}

                                  {/* uncomment this */}
                                  {drawLinesForDevta('A1', 'A2', 'red', 2)}
                                  {drawLinesForDevta('A2', 'A3', 'red', 2)}
                                  {drawLinesForDevta('A3', 'A4', 'red', 2)}
                                  {drawLinesForDevta('A4', 'A5', 'red', 2)}

                                  {drawLinesForDevta('A6', 'A7', 'red', 2)}
                                  {drawLinesForDevta('A7', 'A8', 'red', 2)}
                                  {drawLinesForDevta('A8', 'A9', 'red', 2)}
                                  {drawLinesForDevta('A9', 'A10', 'red', 2)}
                                  {drawLinesForDevta('A11', 'A12', 'red', 2)}
                                  {drawLinesForDevta('A12', 'A13', 'red', 2)}
                                  {drawLinesForDevta('A13', 'A14', 'red', 2)}
                                  {drawLinesForDevta('A14', 'A15', 'red', 2)}
                                  {drawLinesForDevta('A16', 'A17', 'red', 2)}
                                  {drawLinesForDevta('A17', 'A18', 'red', 2)}
                                  {drawLinesForDevta('A18', 'A19', 'red', 2)}
                                  {drawLinesForDevta('A19', 'A20', 'red', 2)}

                                  {intermediatePoints1.length > 1 && (
                                    <polyline
                                      points={
                                        intermediatePoints1.map(p => `${p.x},${p.y}`).join(' ') +
                                        ` ${intermediatePoints1[0].x},${intermediatePoints1[0].y}`
                                      } // Connect back to the start point
                                      fill='none'
                                      stroke='purple'
                                      strokeWidth='2'
                                    />
                                  )}

                                  {intermediatePoints2.length > 1 && (
                                    <polyline
                                      points={
                                        intermediatePoints2.map(p => `${p.x},${p.y}`).join(' ') +
                                        ` ${intermediatePoints2[0].x},${intermediatePoints2[0].y}`
                                      }
                                      fill='none'
                                      stroke='orange' // Different color for distinction
                                      strokeWidth='2'
                                    />
                                  )}
                                </>
                              ) : (
                                <>
                                  {hideCircle && (
                                    <>
                                      {intersectionsState.map((intersection, i) => (
                                        <g key={i}>
                                          {hideCircleIntersaction && (
                                            <circle
                                              cx={intersection.point.x}
                                              cy={intersection.point.y}
                                              r='3'
                                              fill='red'
                                            />
                                          )}

                                          {/* <text
                                  x={intersection.point.x}
                                  y={intersection.point.y}
                                  fontSize="16"
                                  fontWeight="500"
                                  fill="black"
                                  textAnchor="middle"
                                  alignmentBaseline="middle"
                                  style={{
                                    userSelect: 'none',
                                    cursor: 'default'
                                  }}>
                                  {intersection.label}
                                </text> */}
                                        </g>
                                      ))}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}

                          {areas.map((area, index) => {
                            return (
                              <HoverArea
                                key={area.id}
                                currentIndex={index}
                                coordinates={area.coordinates}
                                hoverText={index + 1 + ' ' + devta[index]}
                                devta={devta[index]}
                              />
                            )
                          })}

                          {hideMarmaLines && (
                            <>
                              {/* Direction fixed lines */}
                              <g key='fixed-line-n8-w2'>{drawLines('N8', 'W2', 'orange', 1)}</g>
                              <g key='fixed-line-e1-w1'>{drawLines('E1', 'W1', 'orange', 1)}</g>
                              <g key='fixed-line-e2-s8'>{drawLines('E2', 'S8', 'orange', 1)}</g>
                              <g key='fixed-line-w8-s2'>{drawLines('W8', 'S2', 'orange', 1)}</g>
                              <g key='fixed-line-n1-s1'>{drawLines('N1', 'S1', 'orange', 1)}</g>
                              <g key='fixed-line-n2-e8'>{drawLines('N2', 'E8', 'orange', 1)}</g>
                            </>
                          )}

                          {hideMarmapoints && (
                            <>
                              {intersectionPoints.map((point, idx) => (
                                <circle
                                  key={idx}
                                  cx={point.x}
                                  cy={point.y}
                                  r={4}
                                  fill={point.color}
                                  stroke='black'
                                  onMouseEnter={e =>
                                    handleMouseEnter(e, point, point.newNumber, marmaDevta, point.lineNo, point.name)
                                  }
                                  onMouseLeave={handleMouseLeave}
                                />
                              ))}

                              {leftIntersectionPoints.map((point, idx) => (
                                <circle
                                  key={idx}
                                  cx={point.x}
                                  cy={point.y}
                                  r={4}
                                  fill={point.color}
                                  stroke='black'
                                  onMouseEnter={e =>
                                    handleMouseEnter(e, point, point.newNumber, marmaDevta, point.lineNo, point.name)
                                  }
                                  onMouseLeave={handleMouseLeave}
                                />
                              ))}

                              {/* uncomment this */}
                              {newLeftintersectionPoints.map((point, idx) => (
                                <circle
                                  key={idx}
                                  cx={point.x}
                                  cy={point.y}
                                  r={4}
                                  fill={point.color}
                                  stroke='black'
                                  onMouseEnter={e =>
                                    handleMouseEnter(e, point, point.newNumber, marmaDevta, point.lineNo, point.name)
                                  }
                                  onMouseLeave={handleMouseLeave}
                                />
                              ))}
                              {/* uncomment this  till this*/}
                            </>
                          )}
                        </g>
                      </g>
                      <RectangleWithRotatedLines
                        totalLines={32}
                        width={width}
                        height={height}
                        degree={inputDegree}
                        cx={centroid?.x}
                        cy={centroid?.y}
                      />

                      {/* <RadialLines width={width} height={height} cx={centroid?.x} cy={centroid?.y} rotation={inputDegree} /> */}

                      {hideCircle &&
                        !hide16Circle &&
                        !hide4Circle &&
                        !hide8Circle &&
                        Array.from({ length: totalLines }).map((_, index) => {
                          const rotationIndex = index % totalLines
                          const angle = rotationIndex * angleIncrement + (270 - inputDegree)
                          const radian = (angle * Math.PI) / 180

                          const squareSize = 783
                          const halfSize = squareSize
                          const margin = 26

                          let endX, endY
                          const slope = Math.tan(radian)
                          const rightBoundary = centroid.x + halfSize - margin
                          const leftBoundary = centroid.x - halfSize + margin
                          const topBoundary = centroid.y - halfSize + margin
                          const bottomBoundary = centroid.y + halfSize - margin

                          if (Math.abs(slope) <= 1) {
                            if (Math.cos(radian) > 0) {
                              endX = rightBoundary
                              endY = centroid.y + slope * (rightBoundary - centroid.x)
                            } else {
                              endX = leftBoundary
                              endY = centroid.y - slope * (centroid.x - leftBoundary)
                            }
                          } else {
                            if (Math.sin(radian) > 0) {
                              endX = centroid.x + (1 / slope) * (bottomBoundary - centroid.y)
                              endY = bottomBoundary
                            } else {
                              endX = centroid.x - (1 / slope) * (centroid.y - topBoundary)
                              endY = topBoundary
                            }
                          }

                          const style = lineSets[index % lineSets.length]

                          return (
                            <g key={index}>
                              {index % lineSets.length && (
                                <line
                                  x1={centroid.x}
                                  y1={centroid.y}
                                  x2={endX}
                                  y2={endY}
                                  stroke={style.stroke}
                                  strokeWidth={style.strokeWidth}
                                  strokeDasharray={style.strokeDasharray}
                                />
                              )}
                            </g>
                          )
                        })}
                      {polygons.map((polygon, polygonIndex) => (
                        <g key={polygon.id}>
                          {/* Polygon Shape */}
                          <polygon
                            points={polygon.points.map(point => `${point.x},${point.y}`).join(' ')}
                            fill={polygon.color}
                            fillOpacity='0.2' // Default opacity for all polygons
                            stroke={'#000'}
                            strokeWidth='1'
                            onMouseDown={e => {
                              handleMouseDown(e, polygonIndex, 'overlay')
                            }}
                            onDoubleClick={e => {
                              handleDoubleClick(e, 'polyOverlay', polygon, '', polygonIndex)
                            }}
                          />
                          {/* Display Title */}
                          <text
                            x={calculateCentroid(polygon.points).x} // Horizontal center of the polygon} // Horizontal center of the polygon
                            y={calculateCentroid(polygon.points).y} // 10px above the top edge
                            fill={'#000'} // Title color matches the polygon's color
                            fontSize='12'
                            fontWeight='bold'
                            textAnchor='middle' // Center the text horizontally
                            style={{ userSelect: 'none', pointerEvents: 'none' }} // Make text non-selectable and ignore pointer events
                          >
                            {polygonIndex + 1}. {polygon.title || `Polygon ${polygon.id}`}{' '}
                            {/* Default title if none is provided */}
                          </text>

                          {!disableDraw && (
                            <>
                              <foreignObject
                                x={
                                  (Math.min(...polygon.points.map(point => point.x)) +
                                    Math.max(...polygon.points.map(point => point.x))) /
                                    2 +
                                  15
                                } // Positioned to the right of the title
                                y={Math.min(...polygon.points.map(point => point.y)) - 25} // Aligned vertically with the title
                                width='24'
                                height='24'
                              >
                                <i
                                  className='tabler-pencil'
                                  style={{
                                    fontSize: '16px',
                                    color: 'blue',
                                    cursor: 'pointer'
                                  }}
                                  onClick={() => handleOverlayEdit(polygon)} // Call the edit handler
                                />
                              </foreignObject>
                              <foreignObject
                                x={
                                  (Math.min(...polygon.points.map(point => point.x)) +
                                    Math.max(...polygon.points.map(point => point.x))) /
                                    2 +
                                  30
                                } // Positioned to the right of the Edit button
                                y={Math.min(...polygon.points.map(point => point.y)) - 25} // Aligned vertically with the title
                                width='24'
                                height='24'
                              >
                                <i
                                  className='tabler-x'
                                  style={{
                                    fontSize: '16px',
                                    color: 'red',
                                    cursor: 'pointer'
                                  }}
                                  onClick={() => handleOverlayDelete(polygonIndex)} // Call the delete handler
                                />
                              </foreignObject>
                              <g style={{ visibility: IsDownloading ? 'hidden' : 'visible' }}>
                                {polygon.points.map((point, pointIndex) => (
                                  <circle
                                    key={pointIndex}
                                    cx={point.x}
                                    cy={point.y}
                                    r={3}
                                    fill={polygon.color}
                                    stroke='#fff'
                                    strokeWidth='0.5'
                                    onMouseDown={e => {
                                      handleMouseDown(e, polygonIndex, 'PointOverlay', pointIndex)
                                    }}
                                    onDoubleClick={e => {
                                      handleDoubleClick(e, 'overlay', polygon, pointIndex, polygonIndex)
                                    }}
                                  />
                                ))}
                              </g>
                            </>
                          )}
                        </g>
                      ))}

                      {graphDraw &&
                        allResults.map((item, index) => {
                          const width = 200 // Width of the SVG container
                          const height = 150
                          const barWidth = 20 // Width of each bar
                          const barPadding = 20
                          const barHeight = (item.area / maxValue) * (height - 20) // Scale the bar height
                          const x = index * (barWidth + barPadding) + 20 // Calculate x position
                          const y = height - barHeight // Calculate y position
                          let additionalText = ''
                          if (item.label === 'ESE') additionalText = 'Fire'
                          if (item.label === 'W') additionalText = 'Air'
                          if (item.label === 'NNE') additionalText = 'Water'

                          return (
                            <g key={index}>
                              <rect
                                x={x}
                                y={y + 450}
                                width={barWidth}
                                height={barHeight}
                                fill={item.color}
                                onMouseEnter={e => handleMouseEnter(e, item.area)}
                                onMouseLeave={handleMouseLeave}
                              />
                              <text
                                x={x + barWidth / 2}
                                y={height - 5 + 480}
                                textAnchor='middle'
                                fontSize='14'
                                fontWeight='500'
                                fill='purple'
                                alignmentBaseline='middle'
                                style={{
                                  userSelect: 'none',
                                  cursor: 'default'
                                }}
                              >
                                {item.label}
                              </text>
                              {additionalText && (
                                <text
                                  x={x + barWidth / 2 + 20}
                                  y={height + 10 + 480}
                                  textAnchor='middle'
                                  fontSize='15'
                                  fontWeight='500'
                                  fill='purple'
                                  alignmentBaseline='middle'
                                  style={{
                                    userSelect: 'none', // Prevent text selection
                                    cursor: 'default' // Optional: Make the cursor non-interactive
                                  }}
                                >
                                  {additionalText}
                                </text>
                              )}
                            </g>
                          )
                        })}

                      {tooltip.visible && (
                        <text
                          x={tooltip.x}
                          y={tooltip.y - 10}
                          fill='black'
                          fontSize='14'
                          textAnchor='middle'
                          style={{ pointerEvents: 'none' }}
                        >
                          {tooltip.value}
                        </text>
                      )}
                    </>
                  )}
                </svg>

                {tooltip.visible && (
                  <div
                    style={{
                      position: 'absolute',
                      left: tooltip.x + 20,
                      top: tooltip.y - 30,
                      backgroundColor: 'white',
                      border: '1px solid black',
                      padding: '5px',
                      borderRadius: '5px',
                      pointerEvents: 'none',
                      fontSize: '12px'
                    }}
                  >
                    {tooltip.text}
                  </div>
                )}
              </div>
            )}
            <RightPrintSection vastuLayoutData={vastuLayoutData} />
          </div>
        </div>
        {/* <div className='flex flex-wrap lg:flex-col gap-3 p-4 lg:gap-0 bg-white' style={{ width: '550px' }}> */}
        <RightSidePanel
          previewUrl={previewUrl}
          selectedGroup={selectedGroup}
          handleFileUpload={handleFileUpload}
          tabName={tabTitle}
          vastuLayoutData={vastuLayoutData}
          setleftPrintRef={setleftPrintRef}
          setZoom={setZoom}
          setRotation={setRotation}
          rotation={rotation}
          lockChakra={lockChakra}
          setLockChakra={setLockChakra}
          lockCentroid={lockCentroid}
          setLockCentroid={setLockCentroid}
          snapToCentroid={snapToCentroid}
          setSnapToCentroid={setSnapToCentroid}
          inputDegree={inputDegree}
          setInputDegree={setInputDegree}
          lineSets={lineSets}
          setLineSets={setLineSets}
          hideMarmaLines={hideMarmaLines}
          setHideMarmaLines={setHideMarmaLines}
          setHideMarmapoints={setHideMarmapoints}
          hideMarmapoints={hideMarmapoints}
          setShowDevta={setShowDevta}
          showDevta={showDevta}
          showDevtaIntersaction={showDevtaIntersaction}
          setShowDevtaIntersaction={setShowDevtaIntersaction}
          imageDragDone={imageDragDone}
          setImageDragDone={setImageDragDone}
          hideCircleIntersaction={hideCircleIntersaction}
          setHideCircleIntersaction={setHideCircleIntersaction}
          disableDraw={disableDraw}
          setDisableDraw={setDisableDraw}
          graphDraw={graphDraw}
          setGraphDraw={setGraphDraw}
          handleShowChakra={handleShowChakra}
          activeChakra={activeChakra}
          setPageTitle={setPageTitle}
          handleAddPolygonToggle={handleAddPolygonToggle}
          setCropImage={setCropImage}
          cropImage={cropImage}
          handleShowCharts={handleShowCharts}
          show45Charts={show45Charts}
          show32Charts={show32Charts}
          show8Charts={show8Charts}
          show4Charts={show4Charts}
          updatePdfPages={updatePdfPages}
        />
      </div>
      {openNewPolygon && (
        <>
          <NewPolygonPopUp
            open={openNewPolygon}
            handleClose={handleAddPolygonToggle}
            handleSave={handleAddPolygon}
            newPolygonData={NewOverlayPoly}
          />
        </>
      )}
    </>
  )
}

export default DevtaVastu
