import React, { useEffect, useRef, useState } from 'react'

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  Slider,
  TextField,
  Typography,
  Tooltip,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Select,
  MenuItem
} from '@mui/material'
import RightPrintSection from '../RightPrintSection/RightPrintSection'
import LineControls from '@/views/apps/devtaVastu/LineControls'
import { toast } from 'react-toastify'
import { Grid } from '@mui/material'

function RightSidePanel({
  savedGroups,
  previewUrl,
  tabName,
  vastuLayoutData,
  handleFileUpload,
  selectedGroup,
  setleftPrintRef,
  setZoom,
  zoom,
  setRotation,
  rotation,
  lockChakra,
  setLockChakra,
  lockCentroid,
  setLockCentroid,
  snapToCentroid,
  setSnapToCentroid,
  inputDegree,
  setInputDegree,
  handleShowChakra,
  activeChakra,
  lineSets,
  setLineSets,
  setHideMarmaLines,
  hideMarmaLines,
  setHideMarmapoints,
  hideMarmapoints,
  setShowDevta,
  showDevta,
  setShowDevtaIntersaction,
  showDevtaIntersaction,
  setImageDragDone,
  imageDragDone,
  hideCircleIntersaction,
  setHideCircleIntersaction,
  disableDraw,
  setDisableDraw,
  graphDraw,
  setGraphDraw,
  setPageTitle,
  handleAddPolygonToggle,
  setCropImage,
  cropImage,
  updatePdfPages,
  handleUndo,
  handleRedo,
  history,
  redoStack
}) {
  const printRef1 = useRef(null)
  const [tabNewName, setTabNewName] = useState(tabName)
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(tabNewName)
  const chakras = [
    {
      id: 'hide32Circle',
      label: 'Show Chakra - 32 Entrance',
      checked: activeChakra === 32,
      textLabel: 32
    },
    {
      id: 'hide16Circle',
      label: 'Show Chakra - 16 Entrance',
      checked: activeChakra === 16,
      textLabel: 16
    },
    {
      id: 'hide8Circle',
      label: 'Show Chakra - 8 Entrance',
      checked: activeChakra === 8,
      textLabel: 8
    },
    {
      id: 'hide4Circle',
      label: 'Show Chakra - 4 Entrance',
      checked: activeChakra === 4,
      textLabel: 4
    }
  ]

  useEffect(() => {
    if (setleftPrintRef) {
      setleftPrintRef(printRef1.current)
    }
  }, [setleftPrintRef])

  // Zoom in
  const handleZoomIn = () => {
    setZoom(Math.min(zoom * 1.1, 5))
  }

  const handleZoomOut = () => setZoom(Math.max(zoom / 1.1, -5)) // Limit min zoom to 1

  //   // Reset Transformations
  //   const handleReset = () => {
  //     setZoom(1)
  //     setRotation(0)
  //     setTranslate({ x: 0, y: 0 })
  //   }

  const handleRotationChange = e => {
    const angle = parseFloat(e.target.value)
    setRotation(angle) // Update the rotation state immediately for visual feedback
  }

  const handleInputChange = e => {
    let value = parseFloat(e.target.value) || 0
    if (value < 0) value = 0
    if (value > 360) value = 360
    setInputDegree(value)
  }

  const handleLineSetUpdate = (index, updates) => {
    const updatedLineSets = lineSets
    updatedLineSets[index] = { ...updatedLineSets[index], ...updates }
    setLineSets(updatedLineSets)
  }

  const handleSave = () => {
    const isTitleUnique = !savedGroups.some(tab => tab === tempValue)
    if (!isTitleUnique) {
      return toast.error('Title already exists! Please choose a different title.')
    }
    setTabNewName(tempValue)
    setPageTitle(tempValue) // Assuming setPageTitle is a function to update the page title
    setIsEditing(false)
  }

  const [selectedPage, setSelectedPage] = useState(previewUrl?.selectedPage)
  
  return (
    <>
      <div
        className='flex flex-wrap lg:flex-col gap-3 p-4 pt-0 lg:gap-0 bg-white'
        style={{
          width: '550px',
          height: '748px', // Full viewport height
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden', // Container doesn't scroll
          flexWrap: 'nowrap'
        }}
      >
        <Box
          className='flex flex-col bg-gradient-to-r from-purple-100 to-purple-50 p-4 border-b border-purple-200 rounded-t'
          sx={{
            borderRadius: '8px',
            // display: 'flex',
            // justifyContent: 'space-between',
            // alignItems: 'center',
            flexShrink: 0, // Prevents header from shrinking
            position: 'sticky',
            top: 0,
            zIndex: 10
          }}
        >

          {/* <div className='flex items-center space-x-2'>
            {isEditing ? (
              <>
                <TextField
                  variant='standard'
                  value={tempValue}
                  onChange={e => setTempValue(e.target.value)}
                  autoFocus
                />
                <IconButton
                  onClick={() => {
                    setIsEditing(false)
                    setTempValue(tabNewName)
                  }}
                  size='small'
                >
                  <i className='tabler-x' width='16' height='16' />
                </IconButton>
              </>
            ) : (
              <Typography variant='h6' className='font-bold text-purple-800'>
                {tabNewName}
              </Typography>
            )}

            <IconButton onClick={isEditing ? handleSave : () => setIsEditing(true)} size='small'>
              <i className={isEditing ? 'tabler-check' : 'tabler-pencil'} width='16' height='16' />
            </IconButton>

             <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant='contained'
                      color='primary'
                      startIcon={<i className='tabler-zoom-in' width='20' height='20' />}
                      onClick={handleUndo} disabled={history.length === 0}
                      fullWidth
                    >
                      Undo
                    </Button>
                    <Button
                      variant='outlined'
                      color='primary'
                      startIcon={<i className='tabler-zoom-out' width='20' height='20' />}
                      onClick={handleRedo} disabled={redoStack.length === 0}
                      fullWidth
                    >
                      Redo
                    </Button>
                  </Box>
          </div> */}
          <div className="flex items-start justify-between w-full">
            {/* LEFT — Editable Tab Title */}
            <div className="flex flex-col gap-3">
              {/* Top Group Name */}
              <Typography variant="h6" className="flex flex-start font-bold text-purple-700 tracking-wide">
                {selectedGroup}
              </Typography>

              {/* Editable Tab Name Row */}
              <div className="flex items-center justify-center gap-3">
                {isEditing ? (
                  <>
                    <TextField
                      variant="standard"
                      value={tempValue}
                      onChange={e => setTempValue(e.target.value)}
                      autoFocus
                      sx={{
                        width: 200,
                        '& .MuiInputBase-input': { textAlign: 'center', fontWeight: 600, color: '#4B0082' }
                      }}
                    />
                    <IconButton
                      onClick={() => {
                        setIsEditing(false)
                        setTempValue(tabNewName)
                      }}
                      size="small"
                      color="error"
                    >
                      <i className="tabler-x text-red-600" width="16" height="16" />
                    </IconButton>
                  </>
                ) : (
                  <Typography variant="h6" className="font-semibold text-purple-800 text-center">
                    {tabNewName}
                  </Typography>
                )}

                <IconButton
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  size="small"
                  color={isEditing ? 'success' : 'default'}
                >
                  <i
                    className={isEditing ? 'tabler-check text-green-600' : 'tabler-pencil text-gray-600'}
                    width="16"
                    height="16"
                  />
                </IconButton>
              </div>
            </div>


            {/* RIGHT — Undo / Redo in column */}
            <div className="flex flex-col items-end gap-2">
              <Button
                variant="contained"
                color="primary"
                startIcon={<i className="tabler-rotate-ccw" width="18" height="18" />}
                onClick={handleUndo}
                disabled={history?.length === 0}
                sx={{
                  minWidth: 100,
                  textTransform: 'none',
                  boxShadow: 'none',
                  fontWeight: 500,
                }}
              >
                Undo
              </Button>

              <Button
                variant="outlined"
                color="primary"
                startIcon={<i className="tabler-rotate-cw" width="18" height="18" />}
                onClick={handleRedo}
                disabled={redoStack?.length === 0}
                sx={{
                  minWidth: 100,
                  textTransform: 'none',
                  fontWeight: 500,
                  borderWidth: 1.5,
                }}
              >
                Redo
              </Button>
            </div>
          </div>


          {/* <Tooltip title='Save your changes'>
            <Button
              variant='contained'
              color='primary'
              startIcon={<i className='tabler-device-floppy' />}
              onClick={() => updatePointsForAllTabs(selectedGroup, points)}
              size='small'
            >
              Save
            </Button>
          </Tooltip> */}
        </Box>

        {/* Scrollable Content Area */}
        <Box
          sx={{
            overflowY: 'auto',
            flexGrow: 1, // Takes remaining height
            msOverflowStyle: 'none', // Hide scrollbar in IE and Edge
            scrollbarWidth: 'none', // Hide scrollbar in Firefox
            '&::-webkit-scrollbar': {
              display: 'none' // Hide scrollbar in Chrome, Safari, and Opera
            }
          }}
        >
          <Stack spacing={3}>
            {/* Print Section */}
            <Box>
              <RightPrintSection printRef1={printRef1} vastuLayoutData={vastuLayoutData} />
            </Box>

            {/* Main Action Buttons */}
            {selectedGroup && selectedGroup != '16 Zone Bar Chart' && selectedGroup != 'Devta bar chart' && (
              <>
                <Box>


                  {previewUrl?.OriginalFileName && (
                    <div className='flex flex-col items-center gap-2 w-full mb-2'>
                      <div className='bg-purple-100 w-full p-2 rounded-md flex items-center gap-2'>
                        {/* File icon based on file type */}
                        {previewUrl.OriginalFileName.toLowerCase().endsWith('.pdf') ? (
                          <i className='tabler-file-type-pdf text-red-600' width='24' height='24' />
                        ) : previewUrl.OriginalFileName.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/) ? (
                          <i className='tabler-photo text-blue-600' width='24' height='24' />
                        ) : (
                          <i className='tabler-file text-purple-800' width='24' height='24' />
                        )}

                        {/* Filename with truncation */}
                        <Typography
                          variant='body2'
                          className='font-medium text-purple-800 flex-1 truncate'
                          title={previewUrl.OriginalFileName} // Show full name on hover
                        >
                          {previewUrl.OriginalFileName}
                        </Typography>

                        {/* File actions */}
                        <div className='flex items-center gap-2'>
                          {/* PDF Page Selector - Only visible for PDF files */}
                          {previewUrl.OriginalFileName.toLowerCase().endsWith('.pdf') && (
                            <div className='flex items-center gap-1'>
                              <Typography variant='caption' className='text-gray-600 whitespace-nowrap'>
                                Page:
                              </Typography>
                              <Select
                                size='small'
                                value={previewUrl?.selectedPage + 1 || selectedPage}
                                onChange={(e) => {
                                  const pageIndex = e.target.value - 1;
                                  setSelectedPage(e.target.value + 1);
                                  updatePdfPages(tempValue, pageIndex);
                                }}
                                className='min-w-[70px] bg-white'
                                sx={{
                                  '.MuiSelect-select': {
                                    padding: '4px 8px'
                                  },
                                  height: '32px'
                                }}
                              >
                                {Array.from({ length: previewUrl?.pdfPages }, (_, i) => (
                                  <MenuItem key={i} value={i + 1}>
                                    {i + 1}
                                  </MenuItem>
                                ))}
                              </Select>
                            </div>
                          )}

                        </div>
                      </div>
                    </div>
                  )}

                  <Paper
                    variant='outlined'
                    className='border-2 border-dashed border-gray-300 hover:border-purple-500 transition-colors p-4 rounded-lg flex flex-col items-center justify-center'
                    sx={{
                      height: '120px',
                      cursor: 'pointer',
                      backgroundColor: 'rgba(250, 245, 255, 0.5)'
                    }}
                    onDragOver={e => e.preventDefault()}
                    onDrop={handleFileUpload}
                  >
                    <label className='flex flex-col items-center gap-2 cursor-pointer w-full h-full justify-center'>
                      <i className='tabler-upload text-purple-800' width='50' height='50' />
                      <Typography variant='subtitle1' className='font-medium text-purple-700'>
                        Upload File
                      </Typography>
                      <input type='file' className='hidden' accept='.jpg,.jpeg,.png,.pdf' onChange={handleFileUpload} />
                      <Typography variant='caption' className='text-gray-500'>
                        Drag & drop or clicked <br />
                        <Typography variant='caption' className='font-semibold'>
                          (.jpg, .jpeg, .png, .pdf)
                        </Typography>
                      </Typography>
                    </label>
                  </Paper>

                  {/* Action Buttons */}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Overlay Button */}
                  <Button
                    variant='contained'
                    color='secondary'
                    fullWidth
                    startIcon={<i className='tabler-plus' width='20' height='20' />}
                    onClick={() => handleAddPolygonToggle(selectedGroup)}
                    sx={{ height: '48px' }}
                  >
                    Add Overlay
                  </Button>

                  {/* Zoom Controls */}
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant='contained'
                      color='primary'
                      startIcon={<i className='tabler-zoom-in' width='20' height='20' />}
                      onClick={handleZoomIn}
                      fullWidth
                    >
                      Zoom In
                    </Button>
                    <Button
                      variant='outlined'
                      color='primary'
                      startIcon={<i className='tabler-zoom-out' width='20' height='20' />}
                      onClick={handleZoomOut}
                      fullWidth
                    >
                      Zoom Out
                    </Button>
                  </Box>
                </Box>
                {/* Compact Rotation Controls */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 1,
                    py: 1,
                    px: 2,
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(250, 245, 255, 0.5)'
                  }}
                >
                  <i className='tabler-rotate text-purple-600' width='20' height='20' />
                  <Typography variant='body2' sx={{ minWidth: '40px' }}>
                    {rotation}°
                  </Typography>
                  <Slider
                    id='rotation-slider'
                    value={rotation}
                    onChange={handleRotationChange}
                    min={0}
                    max={360}
                    step={1}
                    valueLabelDisplay='auto'
                    sx={{ flexGrow: 1 }}
                    size='small'
                  />
                  <TextField
                    type='number'
                    value={rotation}
                    onChange={e => {
                      let value = parseFloat(e.target.value) || 0
                      if (value < 0) value = 0
                      if (value > 360) value = 360
                      setRotation(value)
                    }}
                    size='small'
                    sx={{ width: '150px' }}
                    inputProps={{ min: 0, max: 360 }}
                    InputProps={{
                      endAdornment: <Typography variant='caption'>°</Typography>
                    }}
                  />
                  <Tooltip title='Reset rotation'>
                    <IconButton onClick={() => setRotation(0)} size='small' color='primary' sx={{ p: 0.5 }}>
                      <i className='tabler-refresh' width='16' height='16' />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            )}

            <Box>
              {selectedGroup && (selectedGroup == '16 Zone Bar Chart' ||  selectedGroup == 'Devta bar chart') && (
                <></>
              )}
              {(selectedGroup && (selectedGroup !== '16 Zone Bar Chart' && selectedGroup !== 'Devta bar chart')) ? (
                <>
                  <Accordion
                    defaultExpanded
                    sx={{
                      border: '1px solid transparent',
                      '&.Mui-expanded': {
                        borderColor: 'var(--primary-color)'
                      },
                      backgroundColor: 'transparent !important',
                      boxShadow: 'none'
                    }}
                  >
                    <AccordionSummary
                      className='bg-gradient-to-r from-purple-100 to-purple-2'
                      sx={{ borderRadius: '6px' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <i className='tabler-settings' width='20' height='20' />
                        <Typography fontWeight='medium'>Default Options</Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack spacing={1}>
                        {[
                          { id: 'lockChakra', label: 'Lock Chakra', checked: lockChakra, onChange: setLockChakra },
                          {
                            id: 'lockCentroid',
                            label: 'Lock Center',
                            checked: lockCentroid,
                            onChange: setLockCentroid
                          },
                          {
                            id: 'snapToCentroid',
                            label: 'Reset Auto Center',
                            checked: snapToCentroid,
                            onChange: setSnapToCentroid
                          },
                          { id: 'cropImage', label: 'Crop Image', checked: cropImage, onChange: setCropImage }
                        ].map(({ id, label, checked, onChange }) => (
                          <FormControlLabel
                            key={id}
                            control={
                              <Checkbox
                                checked={checked}
                                onChange={e => onChange(e.target.checked)}
                                color='secondary'
                                size='small'
                              />
                            }
                            label={<Typography variant='body2'>{label}</Typography>}
                          />
                        ))}
                      </Stack>
                    </AccordionDetails>
                  </Accordion>

                  {/* Shakti Chakra Options */}
                  <Accordion
                    sx={{
                      border: '1px solid transparent',
                      '&.Mui-expanded': {
                        borderColor: 'var(--primary-color)'
                      },
                      backgroundColor: 'transparent !important',
                      boxShadow: 'none'
                    }}
                  >
                    <AccordionSummary
                      className='bg-gradient-to-r from-purple-100 to-purple-2'
                      sx={{ borderRadius: '6px' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <i className='tabler-circle-dot' width='20' height='20' />
                        <Typography fontWeight='medium'>Shakti Chakra Options</Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Typography variant='body2'>Chakra Degree:</Typography>
                          <TextField
                            type='number'
                            disabled={lockChakra}
                            value={inputDegree}
                            onChange={handleInputChange}
                            size='small'
                            InputProps={{
                              endAdornment: <Typography variant='caption'>°</Typography>
                            }}
                          />
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Stack spacing={1}>
                          {chakras.map(({ id, label, checked, textLabel }) => (
                            <FormControlLabel
                              key={id}
                              control={
                                <Checkbox
                                  checked={checked}
                                  onChange={e => handleShowChakra(textLabel, e.target.checked)}
                                  color='secondary'
                                  size='small'
                                />
                              }
                              label={<Typography variant='body2'>{label}</Typography>}
                            />
                          ))}
                        </Stack>
                      </Box>
                    </AccordionDetails>
                  </Accordion>

                  {/* Line Controls */}
                  <Accordion
                    sx={{
                      border: '1px solid transparent',
                      '&.Mui-expanded': {
                        borderColor: 'var(--primary-color)'
                      },
                      backgroundColor: 'transparent !important',
                      boxShadow: 'none'
                    }}
                  >
                    <AccordionSummary
                      className='bg-gradient-to-r from-purple-100 to-purple-2'
                      sx={{ borderRadius: '6px' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <i className='tabler-line-dashed' width='20' height='20' />
                        <Typography fontWeight='medium'>Zone Lines</Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 1, mt:2 }}>
                        <LineControls lineSet={lineSets[0]} setIndex={0} onUpdate={handleLineSetUpdate} sx={{ flex: 1 }}  />
                        <Divider />
                        <LineControls lineSet={lineSets[1]} setIndex={1} onUpdate={handleLineSetUpdate} sx={{ flex: 1 }} />
                      </Box> */}
                      <Grid container alignItems="center" spacing={1} sx={{ mt: 2 }}>
                        <Grid item xs={6}>
                          <LineControls
                            lineSet={lineSets[0]}
                            setIndex={0}
                            onUpdate={handleLineSetUpdate}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <LineControls
                            lineSet={lineSets[1]}
                            setIndex={1}
                            onUpdate={handleLineSetUpdate}
                          />
                        </Grid>
                      </Grid>

                    </AccordionDetails>
                  </Accordion>

                  {/* Marma Options */}
                  <Accordion
                    sx={{
                      border: '1px solid transparent',
                      '&.Mui-expanded': {
                        borderColor: 'var(--primary-color)'
                      },
                      backgroundColor: 'transparent !important',
                      boxShadow: 'none'
                    }}
                  >
                    <AccordionSummary
                      className='bg-gradient-to-r from-purple-100 to-purple-2'
                      sx={{ borderRadius: '6px' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <i className='tabler-point' width='20' height='20' />
                        <Typography fontWeight='medium'>Marma Options</Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack spacing={1}>
                        {[
                          {
                            id: 'hideMarmaLines',
                            label: 'Show Marma Lines',
                            checked: hideMarmaLines,
                            onChange: setHideMarmaLines
                          },
                          {
                            id: 'hideMarmapoints',
                            label: 'Show Marma Points',
                            checked: hideMarmapoints,
                            onChange: setHideMarmapoints
                          }
                        ].map(({ id, label, checked, onChange }) => (
                          <FormControlLabel
                            key={id}
                            control={
                              <Checkbox
                                checked={checked}
                                onChange={e => onChange(e.target.checked)}
                                color='secondary'
                                size='small'
                              />
                            }
                            label={<Typography variant='body2'>{label}</Typography>}
                          />
                        ))}
                      </Stack>
                    </AccordionDetails>
                  </Accordion>

                  {/* Devta Options */}
                  <Accordion
                    sx={{
                      border: '1px solid transparent',
                      '&.Mui-expanded': {
                        borderColor: 'var(--primary-color)'
                      },
                      backgroundColor: 'transparent !important',
                      boxShadow: 'none'
                    }}
                  >
                    <AccordionSummary
                      className='bg-gradient-to-r from-purple-100 to-purple-2'
                      sx={{ borderRadius: '6px' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <i className='tabler-hexagon' width='20' height='20' />
                        <Typography fontWeight='medium'>Devta Options</Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack spacing={1}>
                        {[
                          { id: 'showDevta', label: 'Show Devta', checked: showDevta, onChange: setShowDevta },
                          {
                            id: 'showDevtaIntersaction',
                            label: 'Show Devta Intersection Points',
                            checked: showDevtaIntersaction,
                            onChange: setShowDevtaIntersaction
                          }
                        ].map(({ id, label, checked, onChange }) => (
                          <FormControlLabel
                            key={id}
                            control={
                              <Checkbox
                                checked={checked}
                                onChange={e => onChange(e.target.checked)}
                                color='secondary'
                                size='small'
                              />
                            }
                            label={<Typography variant='body2'>{label}</Typography>}
                          />
                        ))}
                      </Stack>
                    </AccordionDetails>
                  </Accordion>

                  {/* Other Options */}
                  <Accordion
                    sx={{
                      border: '1px solid transparent',
                      '&.Mui-expanded': {
                        borderColor: 'var(--primary-color)'
                      },
                      backgroundColor: 'transparent !important',
                      boxShadow: 'none'
                    }}
                  >
                    <AccordionSummary
                      className='bg-gradient-to-r from-purple-100 to-purple-2'
                      sx={{ borderRadius: '6px' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <i className='tabler-adjustments' width='20' height='20' />
                        <Typography fontWeight='medium'>Other Options</Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack spacing={1}>
                        {[
                          {
                            id: 'imageDragDone',
                            label: 'Lock Drag Image',
                            checked: imageDragDone,
                            onChange: setImageDragDone
                          },
                          {
                            id: 'hideCircleIntersaction',
                            label: 'Show Chakra Intersection Points',
                            checked: hideCircleIntersaction,
                            onChange: setHideCircleIntersaction
                          },
                          { id: 'disableDraw', label: 'Done Drawing', checked: disableDraw, onChange: setDisableDraw },
                          { id: 'graphDraw', label: 'Graph Drawing', checked: graphDraw, onChange: setGraphDraw }
                        ].map(({ id, label, checked, onChange }) => (
                          <FormControlLabel
                            key={id}
                            control={
                              <Checkbox
                                checked={checked}
                                onChange={e => onChange(e.target.checked)}
                                color='secondary'
                                size='small'
                              />
                            }
                            label={<Typography variant='body2'>{label}</Typography>}
                          />
                        ))}
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                </>
              ) : <></>}
            </Box>
          </Stack>
        </Box>
      </div>
    </>
  )
}

export default RightSidePanel
