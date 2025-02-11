import {
  Autocomplete,
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

function SaveLayoutPopUp({ open, handleClose, handleSave }) {
  const theme = createTheme({
    shape: {
      borderRadius: 8 // Set the global border radius here
    }
  })
  const [formData, setFormData] = useState(null)
  const [ClientData, setClientData] = useState([
    { clientId: 'CLT001', clientName: 'Alpha Corp' },
    { clientId: 'CLT002', clientName: 'Beta Enterprises' },
    { clientId: 'CLT003', clientName: 'Gamma Solutions' },
    { clientId: 'CLT004', clientName: 'Delta Innovations' },
    { clientId: 'CLT005', clientName: 'Epsilon Systems' }
  ])
  const [errors, setErrors] = useState({
    ProjectName: false,
    clientId: false,
    Address: false,
    OAU: false,
    CAU: false,
    TAU: false,
    Reference: false,
    Remark: false,
    Rivision: false
  })
  const inputRef = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      if (open && inputRef.current) {
        inputRef.current.focus()
      }
    }, 200)
  }, [open])

  const handleInputChange = (field, value, key, isRequired = false) => {
    if (isRequired) {
      if (!value) {
        setErrors(prev => ({
          ...prev,
          [key]: true
        }))
      } else {
        setErrors(prev => ({
          ...prev,
          [key]: false
        }))
      }
    }

    if (field === 'ProjectName') {
      const newVal = value.replace(/^\w/, char => char.toUpperCase())
      setFormData(prev => ({
        ...prev,
        [field]: newVal
      }))
    }

    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={handleClose}
        // className='rounded-lg'
        // maxWidth={'md'}
        fullWidth={true}
        PaperProps={{
          component: 'form',
          // className:'rounded',
          onSubmit: e => {
            e.preventDefault()
            //   if (!selectedGroup) setGroupError(true)
            //   if (!selectedBaseGroup) setBaseGroupError(true)
            //   if (selectedGroup && selectedBaseGroup) {
            //     handleSave(selectedGroup)
            //     handleClose()
            //   }
          },
          sx: {
            width: '700px', // Set your custom width here
            maxWidth: '100%' // Optional: prevent exceeding container width
          }
        }}
      >
        <DialogTitle className='PopupHeader text-white p-3 py-2'>
          <div className='w-100' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className='text-primary text-2xl font-ea-sb !pl-3'>
              {!formData?.isUpdate ? 'Save Layout' : 'Update Layout'}
            </span>
            <IconButton
              aria-label='close'
              onClick={handleClose} // Replace with your close handler function
              sx={{
                color: 'white'
              }}
            >
              <i className='tabler-x text-primary'></i>
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent className='px-6 pt-3'>
          <DialogContentText>
            <Grid className='mt-1' container columnSpacing={3} rowSpacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Project Name'
                  autoFocus
                  inputRef={inputRef}
                  value={formData?.ProjectName}
                  //   size={TextFeildSize}
                  onChange={e => {
                    handleInputChange('ProjectName', e.target.value, 'ProjectName')
                  }}
                  error={errors.ProjectName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={ClientData}
                  getOptionLabel={option => option.clientName} // Extracts label text
                  getOptionKey={option => option.clientId}
                  value={formData?.clientId}
                  onChange={(e, newValue) => {
                    handleInputChange('clientId', newValue, 'clientId')
                    // setSelectedGroup(newValue ? newValue.label : null)
                    // setGroupError(false)
                  }}
                  renderInput={params => <TextField {...params} label='Select Client' error={errors?.clientId} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Address'
                  value={formData?.Address}
                  onChange={e => {
                    handleInputChange('Address', e.target.value, 'Address')
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Open Area & Unit'
                  value={formData?.OAU}
                  onChange={e => {
                    handleInputChange('OAU', e.target.value, 'OAU')
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Covered Area & Unit'
                  value={formData?.CAU}
                  onChange={e => {
                    handleInputChange('CAU', e.target.value, 'CAU')
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Total Area & Unit'
                  value={formData?.TAU}
                  onChange={e => {
                    handleInputChange('TAU', e.target.value, 'TAU')
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Reference'
                  value={formData?.Reference}
                  onChange={e => {
                    handleInputChange('Reference', e.target.value, 'Reference')
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Remark'
                  value={formData?.Remark}
                  onChange={e => {
                    handleInputChange('Remark', e.target.value, 'Remark')
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Rivision'
                  value={formData?.Rivision}
                  onChange={e => {
                    handleInputChange('Rivision', e.target.value, 'Rivision')
                  }}
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

export default SaveLayoutPopUp
