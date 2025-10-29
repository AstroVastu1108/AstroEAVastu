// import React, { useEffect, useRef, useState } from 'react'

// import {
//   Box,
//   Button,
//   Checkbox,
//   Divider,
//   FormControlLabel,
//   Paper,
//   Slider,
//   TextField,
//   Typography,
//   Tooltip,
//   IconButton,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Stack,
//   Select,
//   MenuItem
// } from '@mui/material'
// import RightPrintSection from '../RightPrintSection/RightPrintSection'
// import LineControls from '@/views/apps/devtaVastu/LineControls'
// import { toast } from 'react-toastify'
// import { Grid } from '@mui/material'

// function RightSidePanel({
//   savedGroups,
//   previewUrl,
//   tabName,
//   vastuLayoutData,
//   handleFileUpload,
//   selectedGroup,
//   setleftPrintRef,
//   setZoom,
//   zoom,
//   setRotation,
//   rotation,
//   lockChakra,
//   setLockChakra,
//   lockCentroid,
//   setLockCentroid,
//   snapToCentroid,
//   setSnapToCentroid,
//   inputDegree,
//   setInputDegree,
//   handleShowChakra,
//   activeChakra,
//   lineSets,
//   setLineSets,
//   setHideMarmaLines,
//   hideMarmaLines,
//   setHideMarmapoints,
//   hideMarmapoints,
//   setShowDevta,
//   showDevta,
//   setShowDevtaIntersaction,
//   showDevtaIntersaction,
//   setImageDragDone,
//   imageDragDone,
//   hideCircleIntersaction,
//   setHideCircleIntersaction,
//   disableDraw,
//   setDisableDraw,
//   graphDraw,
//   setGraphDraw,
//   setPageTitle,
//   handleAddPolygonToggle,
//   setCropImage,
//   cropImage,
//   updatePdfPages,
//   handleUndo,
//   handleRedo,
//   history,
//   redoStack
// }) {
//   const printRef1 = useRef(null)
//   const [tabNewName, setTabNewName] = useState(tabName)
//   const [isEditing, setIsEditing] = useState(false)
//   const [tempValue, setTempValue] = useState(tabNewName)
//   const chakras = [
//     {
//       id: 'hide32Circle',
//       label: '32 Zone',
//       checked: activeChakra === 32,
//       textLabel: 32
//     },
//     {
//       id: 'hide16Circle',
//       label: '16 Zone',
//       checked: activeChakra === 16,
//       textLabel: 16
//     },
//     {
//       id: 'hide8Circle',
//       label: '8 Directions',
//       checked: activeChakra === 8,
//       textLabel: 8
//     },
//     {
//       id: 'hide4Circle',
//       label: '4 Directions',
//       checked: activeChakra === 4,
//       textLabel: 4
//     }
//   ]

//   useEffect(() => {
//     if (setleftPrintRef) {
//       setleftPrintRef(printRef1.current)
//     }
//   }, [setleftPrintRef])

//   // Zoom in
//   const handleZoomIn = () => {
//     setZoom(Math.min(zoom * 1.1, 5))
//   }

//   const handleZoomOut = () => setZoom(Math.max(zoom / 1.1, -5)) // Limit min zoom to 1

//   //   // Reset Transformations
//   //   const handleReset = () => {
//   //     setZoom(1)
//   //     setRotation(0)
//   //     setTranslate({ x: 0, y: 0 })
//   //   }

//   const handleRotationChange = e => {
//     const angle = parseFloat(e.target.value)
//     setRotation(angle) // Update the rotation state immediately for visual feedback
//   }

//   const handleInputChange = e => {
//     let value = parseFloat(e.target.value) || 0
//     if (value < 0) value = 0
//     if (value > 360) value = 360
//     setInputDegree(value)
//   }

//   const handleLineSetUpdate = (index, updates) => {
//     const updatedLineSets = lineSets
//     updatedLineSets[index] = { ...updatedLineSets[index], ...updates }
//     setLineSets(updatedLineSets)
//   }

//   const handleSave = () => {
//     const isTitleUnique = !savedGroups.some(tab => tab === tempValue)
//     if (!isTitleUnique) {
//       return toast.error('Title already exists! Please choose a different title.')
//     }
//     setTabNewName(tempValue)
//     setPageTitle(tempValue) // Assuming setPageTitle is a function to update the page title
//     setIsEditing(false)
//   }

//   const [selectedPage, setSelectedPage] = useState(previewUrl?.selectedPage)

//   return (
//     <>
//       <div
//         className='flex flex-wrap lg:flex-col gap-3 p-4 pt-0 lg:gap-0 bg-white'
//         style={{
//           width: '400px',
//           height: '748px', // Full viewport height
//           display: 'flex',
//           flexDirection: 'column',
//           overflow: 'hidden', // Container doesn't scroll
//           flexWrap: 'nowrap'
//         }}
//       >
//         <Box
//           className='flex flex-col bg-gradient-to-r from-purple-100 to-purple-50 p-4 border-b border-purple-200 rounded-t'
//           sx={{
//             borderRadius: '8px',
//             // display: 'flex',
//             // justifyContent: 'space-between',
//             // alignItems: 'center',
//             flexShrink: 0, // Prevents header from shrinking
//             position: 'sticky',
//             top: 0,
//             zIndex: 10
//           }}
//         >

//           {/* <div className='flex items-center space-x-2'>
//             {isEditing ? (
//               <>
//                 <TextField
//                   variant='standard'
//                   value={tempValue}
//                   onChange={e => setTempValue(e.target.value)}
//                   autoFocus
//                 />
//                 <IconButton
//                   onClick={() => {
//                     setIsEditing(false)
//                     setTempValue(tabNewName)
//                   }}
//                   size='small'
//                 >
//                   <i className='tabler-x' width='16' height='16' />
//                 </IconButton>
//               </>
//             ) : (
//               <Typography variant='h6' className='font-bold text-purple-800'>
//                 {tabNewName}
//               </Typography>
//             )}

//             <IconButton onClick={isEditing ? handleSave : () => setIsEditing(true)} size='small'>
//               <i className={isEditing ? 'tabler-check' : 'tabler-pencil'} width='16' height='16' />
//             </IconButton>

//              <Box sx={{ display: 'flex', gap: 2 }}>
//                     <Button
//                       variant='contained'
//                       color='primary'
//                       startIcon={<i className='tabler-zoom-in' width='20' height='20' />}
//                       onClick={handleUndo} disabled={history.length === 0}
//                       fullWidth
//                     >
//                       Undo
//                     </Button>
//                     <Button
//                       variant='outlined'
//                       color='primary'
//                       startIcon={<i className='tabler-zoom-out' width='20' height='20' />}
//                       onClick={handleRedo} disabled={redoStack.length === 0}
//                       fullWidth
//                     >
//                       Redo
//                     </Button>
//                   </Box>
//           </div> */}
//           <div className="flex items-start justify-between w-full">
//             {/* LEFT — Editable Tab Title */}
//             <div className="flex flex-col gap-3">
//               {/* Top Group Name */}
//               <Typography variant="h6" className="flex flex-start font-bold text-purple-700 tracking-wide">
//                 {selectedGroup}
//               </Typography>

//               {/* Editable Tab Name Row */}
//               <div className="flex items-center justify-center gap-3">
//                 {isEditing ? (
//                   <>
//                     <TextField
//                       variant="standard"
//                       value={tempValue}
//                       onChange={e => setTempValue(e.target.value)}
//                       autoFocus
//                       sx={{
//                         width: 200,
//                         '& .MuiInputBase-input': { textAlign: 'center', fontWeight: 600, color: '#4B0082' }
//                       }}
//                     />
//                     <IconButton
//                       onClick={() => {
//                         setIsEditing(false)
//                         setTempValue(tabNewName)
//                       }}
//                       size="small"
//                       color="error"
//                     >
//                       <i className="tabler-x text-red-600" width="16" height="16" />
//                     </IconButton>
//                   </>
//                 ) : (
//                   <Typography variant="h6" className="font-semibold text-purple-800 text-center">
//                     {tabNewName}
//                   </Typography>
//                 )}

//                 <IconButton
//                   onClick={isEditing ? handleSave : () => setIsEditing(true)}
//                   size="small"
//                   color={isEditing ? 'success' : 'default'}
//                 >
//                   <i
//                     className={isEditing ? 'tabler-check text-green-600' : 'tabler-pencil text-gray-600'}
//                     width="16"
//                     height="16"
//                   />
//                 </IconButton>
//               </div>
//             </div>


//             {/* RIGHT — Undo / Redo in column */}
//             <div className="flex flex-col items-end gap-2">
//               <Button
//                 variant="contained"
//                 color="primary"
//                 startIcon={<i className="tabler-rotate-ccw" width="18" height="18" />}
//                 onClick={handleUndo}
//                 disabled={history?.length === 0}
//                 sx={{
//                   minWidth: 100,
//                   textTransform: 'none',
//                   boxShadow: 'none',
//                   fontWeight: 500,
//                 }}
//               >
//                 Undo
//               </Button>

//               <Button
//                 variant="outlined"
//                 color="primary"
//                 startIcon={<i className="tabler-rotate-cw" width="18" height="18" />}
//                 onClick={handleRedo}
//                 disabled={redoStack?.length === 0}
//                 sx={{
//                   minWidth: 100,
//                   textTransform: 'none',
//                   fontWeight: 500,
//                   borderWidth: 1.5,
//                 }}
//               >
//                 Redo
//               </Button>
//             </div>
//           </div>


//           {/* <Tooltip title='Save your changes'>
//             <Button
//               variant='contained'
//               color='primary'
//               startIcon={<i className='tabler-device-floppy' />}
//               onClick={() => updatePointsForAllTabs(selectedGroup, points)}
//               size='small'
//             >
//               Save
//             </Button>
//           </Tooltip> */}
//         </Box>

//         {/* Scrollable Content Area */}
//         <Box
//           sx={{
//             overflowY: 'auto',
//             flexGrow: 1, // Takes remaining height
//             msOverflowStyle: 'none', // Hide scrollbar in IE and Edge
//             scrollbarWidth: 'none', // Hide scrollbar in Firefox
//             '&::-webkit-scrollbar': {
//               display: 'none' // Hide scrollbar in Chrome, Safari, and Opera
//             }
//           }}
//         >
//           <Stack spacing={3}>
//             {/* Print Section */}
//             <Box>
//               <RightPrintSection printRef1={printRef1} vastuLayoutData={vastuLayoutData} />
//             </Box>

//             {/* Main Action Buttons */}
//             {selectedGroup && selectedGroup != '16 Zone Bar Chart' && selectedGroup != 'Devta bar chart' && (
//               <>
//                 <Box>


//                   {previewUrl?.OriginalFileName && (
//                     <div className='flex flex-col items-center gap-2 w-full mb-2'>
//                       <div className='bg-purple-100 w-full p-2 rounded-md flex items-center gap-2'>
//                         {/* File icon based on file type */}
//                         {previewUrl.OriginalFileName.toLowerCase().endsWith('.pdf') ? (
//                           <i className='tabler-file-type-pdf text-red-600' width='24' height='24' />
//                         ) : previewUrl.OriginalFileName.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/) ? (
//                           <i className='tabler-photo text-blue-600' width='24' height='24' />
//                         ) : (
//                           <i className='tabler-file text-purple-800' width='24' height='24' />
//                         )}

//                         {/* Filename with truncation */}
//                         <Typography
//                           variant='body2'
//                           className='font-medium text-purple-800 flex-1 truncate'
//                           title={previewUrl.OriginalFileName} // Show full name on hover
//                         >
//                           {previewUrl.OriginalFileName}
//                         </Typography>

//                         {/* File actions */}
//                         <div className='flex items-center gap-2'>
//                           {/* PDF Page Selector - Only visible for PDF files */}
//                           {previewUrl.OriginalFileName.toLowerCase().endsWith('.pdf') && (
//                             <div className='flex items-center gap-1'>
//                               <Typography variant='caption' className='text-gray-600 whitespace-nowrap'>
//                                 Page:
//                               </Typography>
//                               <Select
//                                 size='small'
//                                 value={previewUrl?.selectedPage + 1 || selectedPage}
//                                 onChange={(e) => {
//                                   const pageIndex = e.target.value - 1;
//                                   setSelectedPage(e.target.value + 1);
//                                   updatePdfPages(tempValue, pageIndex);
//                                 }}
//                                 className='min-w-[70px] bg-white'
//                                 sx={{
//                                   '.MuiSelect-select': {
//                                     padding: '4px 8px'
//                                   },
//                                   height: '32px'
//                                 }}
//                               >
//                                 {Array.from({ length: previewUrl?.pdfPages }, (_, i) => (
//                                   <MenuItem key={i} value={i + 1}>
//                                     {i + 1}
//                                   </MenuItem>
//                                 ))}
//                               </Select>
//                             </div>
//                           )}

//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   <Paper
//                     variant='outlined'
//                     className='border-2 border-dashed border-gray-300 hover:border-purple-500 transition-colors p-4 rounded-lg flex flex-col items-center justify-center'
//                     sx={{
//                       height: '120px',
//                       cursor: 'pointer',
//                       backgroundColor: 'rgba(250, 245, 255, 0.5)'
//                     }}
//                     onDragOver={e => e.preventDefault()}
//                     onDrop={handleFileUpload}
//                   >
//                     <label className='flex flex-col items-center gap-2 cursor-pointer w-full h-full justify-center'>
//                       <i className='tabler-upload text-purple-800' width='50' height='50' />
//                       <Typography variant='subtitle1' className='font-medium text-purple-700'>
//                         Upload File
//                       </Typography>
//                       <input type='file' className='hidden' accept='.jpg,.jpeg,.png,.pdf' onChange={handleFileUpload} />
//                       <Typography variant='caption' className='text-gray-500'>
//                         Drag & drop or clicked <br />
//                         <Typography variant='caption' className='font-semibold'>
//                           (.jpg, .jpeg, .png, .pdf)
//                         </Typography>
//                       </Typography>
//                     </label>
//                   </Paper>

//                   {/* Action Buttons */}
//                 </Box>
//                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                   {/* Overlay Button */}
//                   <Button
//                     variant='contained'
//                     color='secondary'
//                     fullWidth
//                     startIcon={<i className='tabler-plus' width='20' height='20' />}
//                     onClick={() => handleAddPolygonToggle(selectedGroup)}
//                     sx={{ height: '48px' }}
//                   >
//                     Add Overlay
//                   </Button>

//                   {/* Zoom Controls */}
//                   <Box sx={{ display: 'flex', gap: 2 }}>
//                     <Button
//                       variant='contained'
//                       color='primary'
//                       startIcon={<i className='tabler-zoom-in' width='20' height='20' />}
//                       onClick={handleZoomIn}
//                       fullWidth
//                     >
//                       Zoom In
//                     </Button>
//                     <Button
//                       variant='outlined'
//                       color='primary'
//                       startIcon={<i className='tabler-zoom-out' width='20' height='20' />}
//                       onClick={handleZoomOut}
//                       fullWidth
//                     >
//                       Zoom Out
//                     </Button>
//                   </Box>
//                 </Box>
//                 {/* Compact Rotation Controls */}
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: 2,
//                     mb: 1,
//                     py: 1,
//                     px: 2,
//                     border: '1px solid #e5e7eb',
//                     borderRadius: '8px',
//                     backgroundColor: 'rgba(250, 245, 255, 0.5)'
//                   }}
//                 >
//                   <i className='tabler-rotate text-purple-600' width='20' height='20' />
//                   <Typography variant='body2' sx={{ minWidth: '40px' }}>
//                     {rotation}°
//                   </Typography>
//                   <Slider
//                     id='rotation-slider'
//                     value={rotation}
//                     onChange={handleRotationChange}
//                     min={0}
//                     max={360}
//                     step={1}
//                     valueLabelDisplay='auto'
//                     sx={{ flexGrow: 1 }}
//                     size='small'
//                   />
//                   <TextField
//                     type='number'
//                     value={rotation}
//                     onChange={e => {
//                       let value = parseFloat(e.target.value) || 0
//                       if (value < 0) value = 0
//                       if (value > 360) value = 360
//                       setRotation(value)
//                     }}
//                     size='small'
//                     sx={{ width: '150px' }}
//                     inputProps={{ min: 0, max: 360 }}
//                     InputProps={{
//                       endAdornment: <Typography variant='caption'>°</Typography>
//                     }}
//                   />
//                   <Tooltip title='Reset rotation'>
//                     <IconButton onClick={() => setRotation(0)} size='small' color='primary' sx={{ p: 0.5 }}>
//                       <i className='tabler-refresh' width='16' height='16' />
//                     </IconButton>
//                   </Tooltip>
//                 </Box>
//               </>
//             )}

//             <Box>
//               {selectedGroup && (selectedGroup == '16 Zone Bar Chart' ||  selectedGroup == 'Devta bar chart') && (
//                 <></>
//               )}
//               {(selectedGroup && (selectedGroup !== '16 Zone Bar Chart' && selectedGroup !== 'Devta bar chart')) ? (
//                 <>
//                   <Accordion
//                     defaultExpanded
//                     sx={{
//                       border: '1px solid transparent',
//                       '&.Mui-expanded': {
//                         borderColor: 'var(--primary-color)'
//                       },
//                       backgroundColor: 'transparent !important',
//                       boxShadow: 'none'
//                     }}
//                   >
//                     <AccordionSummary
//                       className='bg-gradient-to-r from-purple-100 to-purple-2'
//                       sx={{ borderRadius: '6px' }}
//                     >
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <i className='tabler-settings' width='20' height='20' />
//                         <Typography fontWeight='medium'>Default Options</Typography>
//                       </Box>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                       <Stack spacing={1}>
//                         {[
//                           { id: 'lockChakra', label: 'Lock Chakra', checked: lockChakra, onChange: setLockChakra },
//                           {
//                             id: 'lockCentroid',
//                             label: 'Lock Center',
//                             checked: lockCentroid,
//                             onChange: setLockCentroid
//                           },
//                           {
//                             id: 'snapToCentroid',
//                             label: 'Reset Auto Center',
//                             checked: snapToCentroid,
//                             onChange: setSnapToCentroid
//                           },
//                           { id: 'cropImage', label: 'Crop Image', checked: cropImage, onChange: setCropImage }
//                         ].map(({ id, label, checked, onChange }) => (
//                           <FormControlLabel
//                             key={id}
//                             control={
//                               <Checkbox
//                                 checked={checked}
//                                 onChange={e => onChange(e.target.checked)}
//                                 color='secondary'
//                                 size='small'
//                               />
//                             }
//                             label={<Typography variant='body2'>{label}</Typography>}
//                           />
//                         ))}
//                       </Stack>
//                     </AccordionDetails>
//                   </Accordion>

//                   {/* Shakti Chakra Options */}
//                   <Accordion
//                     sx={{
//                       border: '1px solid transparent',
//                       '&.Mui-expanded': {
//                         borderColor: 'var(--primary-color)'
//                       },
//                       backgroundColor: 'transparent !important',
//                       boxShadow: 'none'
//                     }}
//                   >
//                     <AccordionSummary
//                       className='bg-gradient-to-r from-purple-100 to-purple-2'
//                       sx={{ borderRadius: '6px' }}
//                     >
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <i className='tabler-circle-dot' width='20' height='20' />
//                         <Typography fontWeight='medium'>Shakti Chakra Options</Typography>
//                       </Box>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                       <Box sx={{ mb: 2 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
//                           <Typography variant='body2'>Chakra Degree:</Typography>
//                           <TextField
//                             type='number'
//                             disabled={lockChakra}
//                             value={inputDegree}
//                             onChange={handleInputChange}
//                             size='small'
//                             InputProps={{
//                               endAdornment: <Typography variant='caption'>°</Typography>
//                             }}
//                           />
//                         </Box>
//                         <Divider sx={{ my: 2 }} />
//                         <Stack spacing={1}>
//                           {chakras.map(({ id, label, checked, textLabel }) => (
//                             <FormControlLabel
//                               key={id}
//                               control={
//                                 <Checkbox
//                                   checked={checked}
//                                   onChange={e => handleShowChakra(textLabel, e.target.checked)}
//                                   color='secondary'
//                                   size='small'
//                                 />
//                               }
//                               label={<Typography variant='body2'>{label}</Typography>}
//                             />
//                           ))}
//                         </Stack>
//                       </Box>
//                     </AccordionDetails>
//                   </Accordion>

//                   {/* Line Controls */}
//                   <Accordion
//                     sx={{
//                       border: '1px solid transparent',
//                       '&.Mui-expanded': {
//                         borderColor: 'var(--primary-color)'
//                       },
//                       backgroundColor: 'transparent !important',
//                       boxShadow: 'none'
//                     }}
//                   >
//                     <AccordionSummary
//                       className='bg-gradient-to-r from-purple-100 to-purple-2'
//                       sx={{ borderRadius: '6px' }}
//                     >
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <i className='tabler-line-dashed' width='20' height='20' />
//                         <Typography fontWeight='medium'>Zone Lines</Typography>
//                       </Box>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                       {/* <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 1, mt:2 }}>
//                         <LineControls lineSet={lineSets[0]} setIndex={0} onUpdate={handleLineSetUpdate} sx={{ flex: 1 }}  />
//                         <Divider />
//                         <LineControls lineSet={lineSets[1]} setIndex={1} onUpdate={handleLineSetUpdate} sx={{ flex: 1 }} />
//                       </Box> */}
//                       <Grid container alignItems="center" spacing={1} sx={{ mt: 2 }}>
//                         <Grid item xs={6}>
//                           <LineControls
//                             lineSet={lineSets[0]}
//                             setIndex={0}
//                             onUpdate={handleLineSetUpdate}
//                           />
//                         </Grid>

//                         <Grid item xs={6}>
//                           <LineControls
//                             lineSet={lineSets[1]}
//                             setIndex={1}
//                             onUpdate={handleLineSetUpdate}
//                           />
//                         </Grid>
//                       </Grid>

//                     </AccordionDetails> 
//                   </Accordion>

//                   {/* Marma Options */}
//                   <Accordion
//                     sx={{
//                       border: '1px solid transparent',
//                       '&.Mui-expanded': {
//                         borderColor: 'var(--primary-color)'
//                       },
//                       backgroundColor: 'transparent !important',
//                       boxShadow: 'none'
//                     }}
//                   >
//                     <AccordionSummary
//                       className='bg-gradient-to-r from-purple-100 to-purple-2'
//                       sx={{ borderRadius: '6px' }}
//                     >
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <i className='tabler-point' width='20' height='20' />
//                         <Typography fontWeight='medium'>Marma Options</Typography>
//                       </Box>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                       <Stack spacing={1}>
//                         {[
//                           {
//                             id: 'hideMarmaLines',
//                             label: 'Show Marma Lines',
//                             checked: hideMarmaLines,
//                             onChange: setHideMarmaLines
//                           },
//                           {
//                             id: 'hideMarmapoints',
//                             label: 'Show Marma Points',
//                             checked: hideMarmapoints,
//                             onChange: setHideMarmapoints
//                           }
//                         ].map(({ id, label, checked, onChange }) => (
//                           <FormControlLabel
//                             key={id}
//                             control={
//                               <Checkbox
//                                 checked={checked}
//                                 onChange={e => onChange(e.target.checked)}
//                                 color='secondary'
//                                 size='small'
//                               />
//                             }
//                             label={<Typography variant='body2'>{label}</Typography>}
//                           />
//                         ))}
//                       </Stack>
//                     </AccordionDetails>
//                   </Accordion>

//                   {/* Devta Options */}
//                   <Accordion
//                     sx={{
//                       border: '1px solid transparent',
//                       '&.Mui-expanded': {
//                         borderColor: 'var(--primary-color)'
//                       },
//                       backgroundColor: 'transparent !important',
//                       boxShadow: 'none'
//                     }}
//                   >
//                     <AccordionSummary
//                       className='bg-gradient-to-r from-purple-100 to-purple-2'
//                       sx={{ borderRadius: '6px' }}
//                     >
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <i className='tabler-hexagon' width='20' height='20' />
//                         <Typography fontWeight='medium'>Devta Options</Typography>
//                       </Box>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                       <Stack spacing={1}>
//                         {[
//                           { id: 'showDevta', label: 'Show Devta', checked: showDevta, onChange: setShowDevta },
//                           {
//                             id: 'showDevtaIntersaction',
//                             label: 'Show Devta Intersection Points',
//                             checked: showDevtaIntersaction,
//                             onChange: setShowDevtaIntersaction
//                           }
//                         ].map(({ id, label, checked, onChange }) => (
//                           <FormControlLabel
//                             key={id}
//                             control={
//                               <Checkbox
//                                 checked={checked}
//                                 onChange={e => onChange(e.target.checked)}
//                                 color='secondary'
//                                 size='small'
//                               />
//                             }
//                             label={<Typography variant='body2'>{label}</Typography>}
//                           />
//                         ))}
//                       </Stack>
//                     </AccordionDetails>
//                   </Accordion>

//                   {/* Other Options */}
//                   <Accordion
//                     sx={{
//                       border: '1px solid transparent',
//                       '&.Mui-expanded': {
//                         borderColor: 'var(--primary-color)'
//                       },
//                       backgroundColor: 'transparent !important',
//                       boxShadow: 'none'
//                     }}
//                   >
//                     <AccordionSummary
//                       className='bg-gradient-to-r from-purple-100 to-purple-2'
//                       sx={{ borderRadius: '6px' }}
//                     >
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <i className='tabler-adjustments' width='20' height='20' />
//                         <Typography fontWeight='medium'>Other Options</Typography>
//                       </Box>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                       <Stack spacing={1}>
//                         {[
//                           {
//                             id: 'imageDragDone',
//                             label: 'Lock Drag Image',
//                             checked: imageDragDone,
//                             onChange: setImageDragDone
//                           },
//                           {
//                             id: 'hideCircleIntersaction',
//                             label: 'Show Chakra Intersection Points',
//                             checked: hideCircleIntersaction,
//                             onChange: setHideCircleIntersaction
//                           },
//                           { id: 'disableDraw', label: 'Done Drawing', checked: disableDraw, onChange: setDisableDraw },
//                         ].map(({ id, label, checked, onChange }) => (
//                           <FormControlLabel
//                             key={id}
//                             control={
//                               <Checkbox
//                                 checked={checked}
//                                 onChange={e => onChange(e.target.checked)}
//                                 color='secondary'
//                                 size='small'
//                               />
//                             }
//                             label={<Typography variant='body2'>{label}</Typography>}
//                           />
//                         ))}
//                       </Stack>
//                     </AccordionDetails>
//                   </Accordion>
//                 </>
//               ) : <></>}
//             </Box>
//           </Stack>
//         </Box>
//       </div>
//     </>
//   )
// }

// export default RightSidePanel

// import React, { useEffect, useRef, useState } from 'react';
// import {
//   Box,
//   Button,
//   Checkbox,
//   Divider,
//   FormControlLabel,
//   Paper,
//   Slider,
//   TextField,
//   Typography,
//   Tooltip,
//   IconButton,
//   Stack,
//   Select,
//   MenuItem,
//   Drawer,
//   Fade,
//   Chip
// } from '@mui/material';
// import RightPrintSection from '../RightPrintSection/RightPrintSection';
// import LineControls from '@/views/apps/devtaVastu/LineControls';
// import { toast } from 'react-toastify';
// import { Grid } from '@mui/material';

// function RightSidePanel({
//   savedGroups,
//   previewUrl,
//   tabName,
//   vastuLayoutData,
//   handleFileUpload,
//   selectedGroup,
//   setleftPrintRef,
//   setZoom,
//   zoom,
//   setRotation,
//   rotation,
//   lockChakra,
//   setLockChakra,
//   lockCentroid,
//   setLockCentroid,
//   snapToCentroid,
//   setSnapToCentroid,
//   inputDegree,
//   setInputDegree,
//   handleShowChakra,
//   activeChakra,
//   lineSets,
//   setLineSets,
//   setHideMarmaLines,
//   hideMarmaLines,
//   setHideMarmapoints,
//   hideMarmapoints,
//   setShowDevta,
//   showDevta,
//   setShowDevtaIntersaction,
//   showDevtaIntersaction,
//   setImageDragDone,
//   imageDragDone,
//   hideCircleIntersaction,
//   setHideCircleIntersaction,
//   disableDraw,
//   setDisableDraw,
//   graphDraw,
//   setGraphDraw,
//   setPageTitle,
//   handleAddPolygonToggle,
//   setCropImage,
//   cropImage,
//   updatePdfPages,
//   handleUndo,
//   handleRedo,
//   history,
//   redoStack
// }) {
//   const printRef1 = useRef(null);
//   const [tabNewName, setTabNewName] = useState(tabName);
//   const [isEditing, setIsEditing] = useState(false);
//   const [tempValue, setTempValue] = useState(tabNewName);
//   const [selectedPage, setSelectedPage] = useState(previewUrl?.selectedPage);
//   const [activePanel, setActivePanel] = useState(null);

//   const chakras = [
//     { id: 'hide32Circle', label: '32 Zone', checked: activeChakra === 32, textLabel: 32 },
//     { id: 'hide16Circle', label: '16 Zone', checked: activeChakra === 16, textLabel: 16 },
//     { id: 'hide8Circle', label: '8 Directions', checked: activeChakra === 8, textLabel: 8 },
//     { id: 'hide4Circle', label: '4 Directions', checked: activeChakra === 4, textLabel: 4 }
//   ];

//   useEffect(() => {
//     if (setleftPrintRef) {
//       setleftPrintRef(printRef1.current);
//     }
//   }, [setleftPrintRef]);

//   const handleZoomIn = () => setZoom(Math.min(zoom * 1.1, 5));
//   const handleZoomOut = () => setZoom(Math.max(zoom / 1.1, -5));

//   const handleRotationChange = (e) => {
//     const angle = parseFloat(e.target.value);
//     setRotation(angle);
//   };

//   const handleInputChange = (e) => {
//     let value = parseFloat(e.target.value) || 0;
//     if (value < 0) value = 0;
//     if (value > 360) value = 360;
//     setInputDegree(value);
//   };

//   const handleLineSetUpdate = (index, updates) => {
//     const updatedLineSets = [...lineSets];
//     updatedLineSets[index] = { ...updatedLineSets[index], ...updates };
//     setLineSets(updatedLineSets);
//   };

//   const handleSave = () => {
//     const isTitleUnique = !savedGroups.some(tab => tab === tempValue);
//     if (!isTitleUnique) {
//       return toast.error('Title already exists! Please choose a different title.');
//     }
//     setTabNewName(tempValue);
//     setPageTitle(tempValue);
//     setIsEditing(false);
//   };

//   const togglePanel = (panelName) => {
//     setActivePanel(activePanel === panelName ? null : panelName);
//   };

//   // ...existing code...
//   const toolbarButtons = [
//     { id: 'file', icon: <i className="tabler-upload" />, label: 'File Upload', color: '#7C3AED' },
//     { id: 'transform', icon: <i className="tabler-transform" />, label: 'Transform', color: '#2563EB' },
//     { id: 'chakra', icon: <i className="tabler-circle-dot" />, label: 'Shakti Chakra', color: '#EC4899' },
//     { id: 'lines', icon: <i className="tabler-line-dashed" />, label: 'Zone Lines', color: '#10B981' },
//     { id: 'marma', icon: <i className="tabler-point" />, label: 'Marma', color: '#F59E0B' },
//     { id: 'devta', icon: <i className="tabler-hexagon" />, label: 'Devta', color: '#8B5CF6' },
//     { id: 'other', icon: <i className="tabler-adjustments" />, label: 'Other Options', color: '#6366F1' }
//   ];
//   // ...existing code...

//   const renderFilePanel = () => (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" fontWeight={600} sx={{ mb: 3, color: 'text.primary' }}>
//         File Management
//       </Typography>

//       {previewUrl?.OriginalFileName && (
//         <Paper elevation={0} sx={{ mb: 3, p: 2, bgcolor: '#F5F3FF', borderRadius: 2 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
//             <FileUpload sx={{ color: '#7C3AED', fontSize: 28 }} />
//             <Box sx={{ flex: 1, minWidth: 0 }}>
//               <Typography variant="body2" fontWeight={500} noWrap>
//                 {previewUrl.OriginalFileName}
//               </Typography>
//               <Typography variant="caption" color="text.secondary">
//                 {previewUrl.OriginalFileName.toLowerCase().endsWith('.pdf') ? 'PDF Document' : 'Image File'}
//               </Typography>
//             </Box>
//           </Box>

//           {previewUrl.OriginalFileName.toLowerCase().endsWith('.pdf') && (
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Typography variant="body2" fontWeight={500}>Page:</Typography>
//               <Select
//                 size="small"
//                 value={previewUrl?.selectedPage + 1 || selectedPage}
//                 onChange={(e) => {
//                   const pageIndex = e.target.value - 1;
//                   setSelectedPage(e.target.value);
//                   updatePdfPages(tempValue, pageIndex);
//                 }}
//                 sx={{ minWidth: 80, bgcolor: 'white' }}
//               >
//                 {Array.from({ length: previewUrl?.pdfPages }, (_, i) => (
//                   <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
//                 ))}
//               </Select>
//               <Typography variant="caption" color="text.secondary">
//                 of {previewUrl?.pdfPages}
//               </Typography>
//             </Box>
//           )}
//         </Paper>
//       )}

//       <Paper
//         variant="outlined"
//         sx={{
//           p: 4,
//           textAlign: 'center',
//           borderStyle: 'dashed',
//           borderWidth: 2,
//           borderColor: 'divider',
//           bgcolor: '#FAFAF9',
//           cursor: 'pointer',
//           transition: 'all 0.2s',
//           '&:hover': {
//             borderColor: 'primary.main',
//             bgcolor: '#F5F3FF'
//           }
//         }}
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={handleFileUpload}
//       >
//         <label style={{ cursor: 'pointer', display: 'block' }}>
//           <FileUpload sx={{ fontSize: 56, color: 'primary.main', mb: 2 }} />
//           <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5 }}>
//             Upload File
//           </Typography>
//           <Typography variant="caption" color="text.secondary" display="block">
//             Drag & drop or click to browse
//           </Typography>
//           <Typography variant="caption" fontWeight={600} color="primary.main" sx={{ mt: 1, display: 'block' }}>
//             .jpg, .jpeg, .png, .pdf
//           </Typography>
//           <input type="file" style={{ display: 'none' }} accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileUpload} />
//         </label>
//       </Paper>

//       <Button
//         variant="contained"
//         fullWidth
//         size="large"
//         startIcon={<Add />}
//         onClick={() => handleAddPolygonToggle(selectedGroup)}
//         sx={{
//           mt: 3,
//           py: 1.5,
//           textTransform: 'none',
//           fontWeight: 600,
//           boxShadow: 2,
//           '&:hover': {
//             boxShadow: 4
//           }
//         }}
//       >
//         Add Overlay
//       </Button>
//     </Box>
//   );

//   const renderTransformPanel = () => (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
//         Transform Controls
//       </Typography>

//       <Stack spacing={2} sx={{ mb: 3 }}>
//         <Box sx={{ display: 'flex', gap: 2 }}>
//           <Button
//             variant="contained"
//             fullWidth
//   startIcon={<i className="tabler-zoom-in" width="20" height="20" />}
//             onClick={handleZoomIn}
//             sx={{ textTransform: 'none', fontWeight: 600 }}
//           >
//             Zoom In
//           </Button>
//           <Button
//             variant="outlined"
//             fullWidth
//   startIcon={<i className="tabler-zoom-out" width="20" height="20" />}
//             onClick={handleZoomOut}
//             sx={{ textTransform: 'none', fontWeight: 600 }}
//           >
//             Zoom Out
//           </Button>
//         </Box>
//         <Chip label={`Zoom: ${(zoom * 100).toFixed(0)}%`} color="primary" variant="outlined" />
//       </Stack>

//       <Paper elevation={0} sx={{ p: 2.5, bgcolor: '#F9FAFB', borderRadius: 2, mb: 3 }}>
//         <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>
//           Rotation Control
//         </Typography>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
//           <Chip label={`${rotation}°`} color="primary" size="small" />
//           <Slider
//             value={rotation}
//             onChange={handleRotationChange}
//             min={0}
//             max={360}
//             sx={{ flex: 1 }}
//           />
//         </Box>
//         <Box sx={{ display: 'flex', gap: 1 }}>
//           <TextField
//             type="number"
//             value={rotation}
//             onChange={(e) => setRotation(parseFloat(e.target.value) || 0)}
//             size="small"
//             fullWidth
//             inputProps={{ min: 0, max: 360 }}
//           />
//           <Tooltip title="Reset rotation">
//             <IconButton onClick={() => setRotation(0)} color="primary">
//     <i className='tabler-refresh' width='16' height='16' />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </Paper>

//       <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5 }}>
//         Options
//       </Typography>
//       <Stack spacing={1}>
//         {[
//           { label: 'Lock Chakra', checked: lockChakra, onChange: setLockChakra },
//           { label: 'Lock Center', checked: lockCentroid, onChange: setLockCentroid },
//           { label: 'Reset Auto Center', checked: snapToCentroid, onChange: setSnapToCentroid },
//           { label: 'Crop Image', checked: cropImage, onChange: setCropImage }
//         ].map(({ label, checked, onChange }) => (
//           <FormControlLabel
//             key={label}
//             control={<Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)} />}
//             label={<Typography variant="body2">{label}</Typography>}
//           />
//         ))}
//       </Stack>
//     </Box>
//   );

//   const renderChakraPanel = () => (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
//         Shakti Chakra Options
//       </Typography>

//       <Paper elevation={0} sx={{ p: 2.5, bgcolor: '#F9FAFB', borderRadius: 2, mb: 3 }}>
//         <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5 }}>
//           Chakra Degree
//         </Typography>
//         <TextField
//           type="number"
//           disabled={lockChakra}
//           value={inputDegree}
//           onChange={handleInputChange}
//           size="small"
//           fullWidth
//           InputProps={{
//             endAdornment: <Typography variant="body2" color="text.secondary">°</Typography>
//           }}
//         />
//       </Paper>

//       <Divider sx={{ my: 2 }} />

//       <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5 }}>
//         Chakra Zones
//       </Typography>
//       <Stack spacing={1}>
//         {chakras.map(({ id, label, checked, textLabel }) => (
//           <FormControlLabel
//             key={id}
//             control={
//               <Checkbox
//                 checked={checked}
//                 onChange={(e) => handleShowChakra(textLabel, e.target.checked)}
//               />
//             }
//             label={<Typography variant="body2">{label}</Typography>}
//           />
//         ))}
//       </Stack>
//     </Box>
//   );

//   const renderLinesPanel = () => (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
//         Zone Lines
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={6}>
//           <LineControls
//             lineSet={lineSets[0]}
//             setIndex={0}
//             onUpdate={handleLineSetUpdate}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <LineControls
//             lineSet={lineSets[1]}
//             setIndex={1}
//             onUpdate={handleLineSetUpdate}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );

//   const renderMarmaPanel = () => (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
//         Marma Options
//       </Typography>
//       <Stack spacing={1}>
//         {[
//           { label: 'Show Marma Lines', checked: hideMarmaLines, onChange: setHideMarmaLines },
//           { label: 'Show Marma Points', checked: hideMarmapoints, onChange: setHideMarmapoints }
//         ].map(({ label, checked, onChange }) => (
//           <FormControlLabel
//             key={label}
//             control={<Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)} />}
//             label={<Typography variant="body2">{label}</Typography>}
//           />
//         ))}
//       </Stack>
//     </Box>
//   );

//   const renderDevtaPanel = () => (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
//         Devta Options
//       </Typography>
//       <Stack spacing={1}>
//         {[
//           { label: 'Show Devta', checked: showDevta, onChange: setShowDevta },
//           { label: 'Show Devta Intersection Points', checked: showDevtaIntersaction, onChange: setShowDevtaIntersaction }
//         ].map(({ label, checked, onChange }) => (
//           <FormControlLabel
//             key={label}
//             control={<Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)} />}
//             label={<Typography variant="body2">{label}</Typography>}
//           />
//         ))}
//       </Stack>
//     </Box>
//   );

//   const renderOtherPanel = () => (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
//         Other Options
//       </Typography>
//       <Stack spacing={1}>
//         {[
//           { label: 'Lock Drag Image', checked: imageDragDone, onChange: setImageDragDone },
//           { label: 'Show Chakra Intersection Points', checked: hideCircleIntersaction, onChange: setHideCircleIntersaction },
//           { label: 'Done Drawing', checked: disableDraw, onChange: setDisableDraw }
//         ].map(({ label, checked, onChange }) => (
//           <FormControlLabel
//             key={label}
//             control={<Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)} />}
//             label={<Typography variant="body2">{label}</Typography>}
//           />
//         ))}
//       </Stack>
//     </Box>
//   );

//   const renderPanelContent = () => {
//     switch (activePanel) {
//       case 'file': return renderFilePanel();
//       case 'transform': return renderTransformPanel();
//       case 'chakra': return renderChakraPanel();
//       case 'lines': return renderLinesPanel();
//       case 'marma': return renderMarmaPanel();
//       case 'devta': return renderDevtaPanel();
//       case 'other': return renderOtherPanel();
//       default: return null;
//     }
//   };

//   return (
//     <>
//       {/* Modern Vertical Toolbar */}
//       <Paper
//         elevation={8}
//         sx={{
//           position: 'fixed',
//           right: 16,
//           top: '50%',
//           transform: 'translateY(-50%)',
//           borderRadius: 3,
//           overflow: 'hidden',
//           zIndex: 1300,
//           width: 72
//         }}
//       >
//         <Box sx={{ py: 2, px: 1 }}>
//           <Stack spacing={0.5}>
//             {/* Header Section */}
//             <Box sx={{ px: 1, mb: 2, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
//               <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
//                 {selectedGroup || 'Layout'}
//               </Typography>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                 {isEditing ? (
//                   <>
//                     <TextField
//                       value={tempValue}
//                       onChange={(e) => setTempValue(e.target.value)}
//                       size="small"
//                       variant="standard"
//                       sx={{ width: 80 }}
//                       autoFocus
//                     />
//                     <IconButton onClick={handleSave} size="small" color="success">
//                       <Check fontSize="small" />
//                     </IconButton>
//                     <IconButton onClick={() => { setTempValue(tabNewName); setIsEditing(false); }} size="small" color="error">
//                       <Close fontSize="small" />
//                     </IconButton>
//                   </>
//                 ) : (
//                   <>
//                     <Typography variant="caption" fontWeight={600} noWrap sx={{ maxWidth: 70 }}>
//                       {tabNewName}
//                     </Typography>
//                     <IconButton onClick={() => setIsEditing(true)} size="small">
//                       <i className="tabler-pencil" width="16" height="16" />
//                     </IconButton>
//                   </>
//                 )}
//               </Box>
//             </Box>

//             {/* Undo/Redo */}
//             <Tooltip title="Undo" placement="left">
//               <span>
//                 <IconButton
//                   onClick={handleUndo}
//                   disabled={history?.length === 0}
//                   sx={{
//                     borderRadius: 2,
//                     '&:hover': { bgcolor: 'action.hover' }
//                   }}
//                 >
//                   <i className="tabler-rotate-ccw" width="20" height="20" />
//                 </IconButton>
//               </span>
//             </Tooltip>

//             <Tooltip title="Redo" placement="left">
//               <span>
//                 <IconButton
//                   onClick={handleRedo}
//                   disabled={redoStack?.length === 0}
//                   sx={{
//                     borderRadius: 2,
//                     '&:hover': { bgcolor: 'action.hover' }
//                   }}
//                 >
//                   <i className="tabler-rotate-cw" width="20" height="20" />
//                 </IconButton>
//               </span>
//             </Tooltip>

//             <Divider sx={{ my: 1.5 }} />

//             {/* Tool Buttons */}
//             {toolbarButtons.map((btn) => {
//               const isActive = activePanel === btn.id;
//               return (
//                 <Tooltip key={btn.id} title={btn.label} placement="left">
//                   <IconButton
//                     onClick={() => togglePanel(btn.id)}
//                     sx={{
//                       borderRadius: 2,
//                       bgcolor: isActive ? btn.color : 'transparent',
//                       color: isActive ? 'white' : 'text.secondary',
//                       transition: 'all 0.2s',
//                       '&:hover': {
//                         bgcolor: isActive ? btn.color : 'action.hover',
//                         transform: 'scale(1.05)'
//                       }
//                     }}
//                   >
//                     {btn.icon}
//                   </IconButton>
//                 </Tooltip>
//               );
//             })}
//           </Stack>
//         </Box>
//       </Paper>

//       {/* Slide-out Drawer */}
//       <Drawer
//         anchor="right"
//         open={activePanel !== null}
//         onClose={() => setActivePanel(null)}
//         sx={{
//           '& .MuiDrawer-paper': {
//             width: 420,
//             boxShadow: 24,
//             border: 'none'
//           }
//         }}
//       >
//         <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//           {/* Drawer Header */}
//           <Paper
//             elevation={0}
//             sx={{
//               p: 2.5,
//               borderBottom: 1,
//               borderColor: 'divider',
//               bgcolor: 'background.default',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between'
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//               <Box
//                 sx={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: 2,
//                   bgcolor: activePanel ? toolbarButtons.find(b => b.id === activePanel)?.color : 'primary.main',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   color: 'white'
//                 }}
//               >
//                 {activePanel && toolbarButtons.find(b => b.id === activePanel)?.icon}
//               </Box>
//               <Typography variant="h6" fontWeight={700}>
//                 {activePanel && toolbarButtons.find(b => b.id === activePanel)?.label}
//               </Typography>
//             </Box>
//             <IconButton onClick={() => setActivePanel(null)} size="large">
//   <i className="tabler-x" width="24" height="24" />
//             </IconButton>
//           </Paper>

//           {/* Drawer Content */}
//           <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
//             <Fade in={activePanel !== null}>
//               <div>{renderPanelContent()}</div>
//             </Fade>
//           </Box>

//           {/* Print Section */}
//           <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
//             <RightPrintSection printRef1={printRef1} vastuLayoutData={vastuLayoutData} />
//           </Box>
//         </Box>
//       </Drawer>
//     </>
//   );
// }

// export default RightSidePanel;

import React, { useEffect, useRef, useState } from 'react';
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
  Stack,
  Select,
  MenuItem,
  Drawer,
  Fade,
  Chip,
  Popover
} from '@mui/material';

import RightPrintSection from '../RightPrintSection/RightPrintSection';
import LineControls from '@/views/apps/devtaVastu/LineControls';
import { toast } from 'react-toastify';
import { Grid } from '@mui/material';

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
  const printRef1 = useRef(null);
  const [tabNewName, setTabNewName] = useState(tabName);
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(tabNewName);
  const [selectedPage, setSelectedPage] = useState(previewUrl?.selectedPage);
  const [activePanel, setActivePanel] = useState(null);

  const chakras = [
    { id: 'hide32Circle', label: '32 Zone', checked: activeChakra === 32, textLabel: 32 },
    { id: 'hide16Circle', label: '16 Zone', checked: activeChakra === 16, textLabel: 16 },
    { id: 'hide8Circle', label: '8 Directions', checked: activeChakra === 8, textLabel: 8 },
    { id: 'hide4Circle', label: '4 Directions', checked: activeChakra === 4, textLabel: 4 }
  ];

  useEffect(() => {
    if (setleftPrintRef) {
      setleftPrintRef(printRef1.current);
    }
  }, [setleftPrintRef]);

  const handleZoomIn = () => setZoom(Math.min(zoom * 1.1, 5));
  const handleZoomOut = () => setZoom(Math.max(zoom / 1.1, -5));

  const handleRotationChange = (e) => {
    const angle = parseFloat(e.target.value);
    setRotation(angle);
  };

  const handleInputChange = (e) => {
    let value = parseFloat(e.target.value) || 0;
    if (value < 0) value = 0;
    if (value > 360) value = 360;
    setInputDegree(value);
  };

  const handleLineSetUpdate = (index, updates) => {
    const updatedLineSets = [...lineSets];
    updatedLineSets[index] = { ...updatedLineSets[index], ...updates };
    setLineSets(updatedLineSets);
  };

  const handleSave = () => {
    const isTitleUnique = !savedGroups.some(tab => tab === tempValue);
    if (!isTitleUnique) {
      return toast.error('Title already exists! Please choose a different title.');
    }
    setTabNewName(tempValue);
    setPageTitle(tempValue);
    setIsEditing(false);
  };

  const togglePanel = (panelName) => {
    setActivePanel(activePanel === panelName ? null : panelName);
  };
  // ...existing code...
  const toolbarButtons = [
    { id: 'file', icon: <i className="tabler-upload" />, label: 'File Upload', color: '#7C3AED' },
    { id: 'transform', icon: <i className="tabler-transform" />, label: 'Transform', color: '#2563EB' },
    { id: 'chakra', icon: <i className="tabler-circle-dot" />, label: 'Shakti Chakra', color: '#EC4899' },
    { id: 'lines', icon: <i className="tabler-line-dashed" />, label: 'Zone Lines', color: '#10B981' },
    { id: 'marma', icon: <i className="tabler-point" />, label: 'Marma', color: '#F59E0B' },
    { id: 'devta', icon: <i className="tabler-hexagon" />, label: 'Devta', color: '#8B5CF6' },
    { id: 'other', icon: <i className="tabler-adjustments" />, label: 'Other Options', color: '#6366F1' }
  ];
  // ...existing code...

  const renderFilePanel = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 3, color: 'text.primary' }}>
        File Management
      </Typography>

      {previewUrl?.OriginalFileName && (
        <Paper elevation={0} sx={{ mb: 3, p: 2, bgcolor: '#F5F3FF', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <i className="tabler-file-upload" style={{ color: '#7C3AED', fontSize: 28 }} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" fontWeight={500} noWrap>
                {previewUrl.OriginalFileName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {previewUrl.OriginalFileName.toLowerCase().endsWith('.pdf') ? 'PDF Document' : 'Image File'}
              </Typography>
            </Box>
          </Box>

          {previewUrl.OriginalFileName.toLowerCase().endsWith('.pdf') && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" fontWeight={500}>Page:</Typography>
              <Select
                size="small"
                value={previewUrl?.selectedPage + 1 || selectedPage}
                onChange={(e) => {
                  const pageIndex = e.target.value - 1;
                  setSelectedPage(e.target.value);
                  updatePdfPages(tempValue, pageIndex);
                }}
                sx={{ minWidth: 80, bgcolor: 'white' }}
              >
                {Array.from({ length: previewUrl?.pdfPages }, (_, i) => (
                  <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                ))}
              </Select>
              <Typography variant="caption" color="text.secondary">
                of {previewUrl?.pdfPages}
              </Typography>
            </Box>
          )}
        </Paper>
      )}

      <Paper
        variant="outlined"
        sx={{
          p: 4,
          textAlign: 'center',
          borderStyle: 'dashed',
          borderWidth: 2,
          borderColor: 'divider',
          bgcolor: '#FAFAF9',
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: '#F5F3FF'
          }
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileUpload}
      >
        <label style={{ cursor: 'pointer', display: 'block' }}>
          <i className="tabler-upload" style={{ fontSize: 56, color: '#7C3AED', marginBottom: 16 }} />
          <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5 }}>
            Upload File
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            Drag & drop or click to browse
          </Typography>
          <Typography variant="caption" fontWeight={600} color="primary.main" sx={{ mt: 1, display: 'block' }}>
            .jpg, .jpeg, .png, .pdf
          </Typography>
          <input type="file" style={{ display: 'none' }} accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileUpload} />
        </label>
      </Paper>

      <Button
        variant="contained"
        fullWidth
        size="large"
        startIcon={<i className="tabler-plus" />}
        onClick={() => handleAddPolygonToggle(selectedGroup)}
        sx={{
          mt: 3,
          py: 1.5,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 2,
          '&:hover': {
            boxShadow: 4
          }
        }}
      >
        Add Overlay
      </Button>
    </Box>
  );

  const renderTransformPanel = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
        Transform Controls
      </Typography>

      <Stack spacing={2} sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<i className="tabler-zoom-in" width="20" height="20" />}
            onClick={handleZoomIn}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Zoom In
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<i className="tabler-zoom-out" width="20" height="20" />}
            onClick={handleZoomOut}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Zoom Out
          </Button>
        </Box>
        <Chip label={`Zoom: ${(zoom * 100).toFixed(0)}%`} color="primary" variant="outlined" />
      </Stack>

      <Paper elevation={0} sx={{ p: 2.5, bgcolor: '#F9FAFB', borderRadius: 2, mb: 3 }}>
        <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>
          Rotation Control
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Chip label={`${rotation}°`} color="primary" size="small" />
          <Slider
            value={rotation}
            onChange={handleRotationChange}
            min={0}
            max={360}
            sx={{ flex: 1 }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            type="number"
            value={rotation}
            onChange={(e) => setRotation(parseFloat(e.target.value) || 0)}
            size="small"
            fullWidth
            inputProps={{ min: 0, max: 360 }}
          />
          <Tooltip title="Reset rotation">
            <IconButton onClick={() => setRotation(0)} color="primary">
              <i className='tabler-refresh' width='16' height='16' />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5 }}>
        Options
      </Typography>
      <Stack spacing={1}>
        {[
          { label: 'Lock Chakra', checked: lockChakra, onChange: setLockChakra },
          { label: 'Lock Center', checked: lockCentroid, onChange: setLockCentroid },
          { label: 'Reset Auto Center', checked: snapToCentroid, onChange: setSnapToCentroid },
          { label: 'Crop Image', checked: cropImage, onChange: setCropImage }
        ].map(({ label, checked, onChange }) => (
          <FormControlLabel
            key={label}
            control={<Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)} />}
            label={<Typography variant="body2">{label}</Typography>}
          />
        ))}
      </Stack>
    </Box>
  );

  const renderChakraPanel = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
        Shakti Chakra Options
      </Typography>

      <Paper elevation={0} sx={{ p: 2.5, bgcolor: '#F9FAFB', borderRadius: 2, mb: 3 }}>
        <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5 }}>
          Chakra Degree
        </Typography>
        <TextField
          type="number"
          disabled={lockChakra}
          value={inputDegree}
          onChange={handleInputChange}
          size="small"
          fullWidth
          InputProps={{
            endAdornment: <Typography variant="body2" color="text.secondary">°</Typography>
          }}
        />
      </Paper>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5 }}>
        Chakra Zones
      </Typography>
      <Stack spacing={1}>
        {chakras.map(({ id, label, checked, textLabel }) => (
          <FormControlLabel
            key={id}
            control={
              <Checkbox
                checked={checked}
                onChange={(e) => handleShowChakra(textLabel, e.target.checked)}
              />
            }
            label={<Typography variant="body2">{label}</Typography>}
          />
        ))}
      </Stack>
    </Box>
  );

  const renderLinesPanel = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
        Zone Lines
      </Typography>
      <Grid container spacing={2}>
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
    </Box>
  );

  const renderMarmaPanel = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
        Marma Options
      </Typography>
      <Stack spacing={1}>
        {[
          { label: 'Show Marma Lines', checked: hideMarmaLines, onChange: setHideMarmaLines },
          { label: 'Show Marma Points', checked: hideMarmapoints, onChange: setHideMarmapoints }
        ].map(({ label, checked, onChange }) => (
          <FormControlLabel
            key={label}
            control={<Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)} />}
            label={<Typography variant="body2">{label}</Typography>}
          />
        ))}
      </Stack>
    </Box>
  );

  const renderDevtaPanel = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
        Devta Options
      </Typography>
      <Stack spacing={1}>
        {[
          { label: 'Show Devta', checked: showDevta, onChange: setShowDevta },
          { label: 'Show Devta Intersection Points', checked: showDevtaIntersaction, onChange: setShowDevtaIntersaction }
        ].map(({ label, checked, onChange }) => (
          <FormControlLabel
            key={label}
            control={<Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)} />}
            label={<Typography variant="body2">{label}</Typography>}
          />
        ))}
      </Stack>
    </Box>
  );

  const renderOtherPanel = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
        Other Options
      </Typography>
      <Stack spacing={1}>
        {[
          { label: 'Lock Drag Image', checked: imageDragDone, onChange: setImageDragDone },
          { label: 'Show Chakra Intersection Points', checked: hideCircleIntersaction, onChange: setHideCircleIntersaction },
          { label: 'Done Drawing', checked: disableDraw, onChange: setDisableDraw }
        ].map(({ label, checked, onChange }) => (
          <FormControlLabel
            key={label}
            control={<Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)} />}
            label={<Typography variant="body2">{label}</Typography>}
          />
        ))}
      </Stack>
    </Box>
  );

  const renderPanelContent = () => {
    switch (activePanel) {
      case 'file': return renderFilePanel();
      case 'transform': return renderTransformPanel();
      case 'chakra': return renderChakraPanel();
      case 'lines': return renderLinesPanel();
      case 'marma': return renderMarmaPanel();
      case 'devta': return renderDevtaPanel();
      case 'other': return renderOtherPanel();
      default: return null;
    }
  };
  const [editAnchorEl, setEditAnchorEl] = useState(null);

  return (
    <>
      {/* Modern Vertical Toolbar */}
      <Paper
        elevation={8}
        sx={{
          position: 'fixed',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          borderRadius: 3,
          overflow: 'hidden',
          zIndex: 100,
          width: 72
        }}
      >
        <Box sx={{ py: 2, px: 1 }}>
          <Stack spacing={0.5}>
            {/* Header Section */}
            <Box sx={{ px: 1, mb: 2, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                {selectedGroup || 'Layout'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <IconButton
                  onClick={(e) => {
                    setIsEditing(true);
                    setEditAnchorEl(e.currentTarget);
                  }}
                  size="small"
                >
                  <i className="tabler-pencil" width="16" height="16" />
                </IconButton>
              </Box>
            </Box>
            {/* Undo/Redo */}
            <Tooltip title="Undo" placement="left">
              <IconButton
                onClick={handleUndo}
                disabled={history?.length === 0}
                sx={{
                  borderRadius: 2,
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <i className="tabler-rotate-clockwise" width="20" height="20" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Redo" placement="left">
              <IconButton
                onClick={handleRedo}
                disabled={redoStack?.length === 0}
                sx={{
                  borderRadius: 2,
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <i className="tabler-rotate" width="20" height="20" />
              </IconButton>
            </Tooltip>

            <Divider sx={{ my: 1.5 }} />

            {/* Tool Buttons */}
            {toolbarButtons.map((btn) => {
              const isActive = activePanel === btn.id;
              return (
                <Tooltip key={btn.id} title={btn.label} placement="left">
                  <IconButton
                    onClick={() => togglePanel(btn.id)}
                    sx={{
                      borderRadius: 2,
                      bgcolor: isActive ? btn.color : 'transparent',
                      color: isActive ? 'white' : 'text.secondary',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: isActive ? btn.color : 'action.hover',
                        transform: 'scale(1.05)'
                      }
                    }}
                  >
                    {btn.icon}
                  </IconButton>
                </Tooltip>
              );
            })}
          </Stack>
        </Box>
      </Paper>

      {/* Slide-out Drawer */}
      <Drawer
        anchor="right"
        open={activePanel !== null}
        onClose={() => setActivePanel(null)}
        // hideBackdrop
        sx={{
          // pointerEvents: 'none', // Make Drawer root not block clicks
          '& .MuiDrawer-paper': {
            pointerEvents: 'auto', // Only Drawer content is interactive
            width: 420,
            boxShadow: 24,
            border: 'none',
            height: '100vh'
          }
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Drawer Header */}
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderBottom: 1,
              borderColor: 'divider',
              bgcolor: 'background.default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: activePanel ? toolbarButtons.find(b => b.id === activePanel)?.color : 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                {activePanel && toolbarButtons.find(b => b.id === activePanel)?.icon}
              </Box>
              <Typography variant="h6" fontWeight={700}>
                {activePanel && toolbarButtons.find(b => b.id === activePanel)?.label}
              </Typography>
            </Box>
            <IconButton onClick={() => setActivePanel(null)} size="large">
              <i className="tabler-x" width="24" height="24" />
            </IconButton>
          </Paper>

          {/* Drawer Content */}
          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            <Fade in={activePanel !== null}>
              <div>{renderPanelContent()}</div>
            </Fade>
          </Box>

          {/* Print Section */}
          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <RightPrintSection printRef1={printRef1} vastuLayoutData={vastuLayoutData} />
          </Box>
        </Box>
      </Drawer>

      <Popover
        open={isEditing}
        anchorEl={editAnchorEl}
        onClose={() => {
          setIsEditing(false);
          setEditAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            size="small"
            variant="standard"
            autoFocus
          />
          <IconButton onClick={handleSave} size="small" color="success">
            <i className="tabler-check" width="16" height="16" />
          </IconButton>
          <IconButton onClick={() => {
            setTempValue(tabNewName);
            setIsEditing(false);
            setEditAnchorEl(null);
          }} size="small" color="error">
            <i className="tabler-x" width="16" height="16" />
          </IconButton>
        </Box>
      </Popover>
    </>
  );
}

export default RightSidePanel;