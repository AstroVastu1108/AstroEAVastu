import {
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  ThemeProvider
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

function NewPolygonPopUp({ open, handleClose, handleSave }) {
  const theme = createTheme({
    shape: {
      borderRadius: 8 // Set the global border radius here
    }
  })

  const inputRef = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      if (open && inputRef.current) {
        inputRef.current.focus()
      }
    }, 200)
  }, [open])

  const [formData, setFormData] = useState({
    title: '',
    color: '#007BFF', // Default polygon color
    x: 0,
    y: 0,
    width: 100,
    height: 100
  })

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 200)
    }
  }, [open])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    handleSave(formData) // Pass the polygon data back to the parent
    handleClose()
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={'sm'}
        fullWidth={true}
        PaperProps={{
          component: 'form',
          onSubmit: handleFormSubmit
        }}
      >
        <DialogTitle className='text-primary text-2xl p-3 bg-[var(--secondary-color)] rounded-t-lg flex justify-between items-center'>
          <span className='text-primary text-2xl font-ea-sb !pl-3'>Add New Polygon</span>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              color: 'white'
            }}
          >
            <i className='tabler-x text-primary'></i>
          </IconButton>
        </DialogTitle>
        <DialogContent className='px-4 pt-3'>
          <DialogContentText>
            <Grid className='mt-1' container columnSpacing={2} rowSpacing={3}>
              {/* Title Input */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label='Title'
                  inputRef={inputRef}
                  value={formData.title}
                  onChange={e => handleInputChange('title', e.target.value)}
                />
              </Grid>

              {/* Color Picker */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Color'
                  type='color'
                  value={formData.color}
                  onChange={e => handleInputChange('color', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='X Position'
                  type='number'
                  onChange={e => setFormData({ ...formData, x: parseInt(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Y Position'
                  type='number'
                  onChange={e => setFormData({ ...formData, y: parseInt(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Width'
                  type='number'
                  onChange={e => setFormData({ ...formData, width: parseInt(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Height'
                  type='number'
                  onChange={e => setFormData({ ...formData, height: parseInt(e.target.value) })}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions className='p-4 pt-0'>
          <Button variant='contained' className={'bg-primary'} type='submit'>
            Save
          </Button>
          <Button variant='contained' className='bg-secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}

export default NewPolygonPopUp
