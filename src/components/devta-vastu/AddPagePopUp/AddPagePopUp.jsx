import {
  Autocomplete,
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField,
  ThemeProvider
} from '@mui/material'
import React, { useState } from 'react'

function AddPagePopUp({ open, handleClose, handleSave, tabGroup, savedGroups }) {
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [selectedBaseGroup, setSelectedBaseGroup] = useState(null)
  const [groupError, setGroupError] = useState(false)
  const [baseGroupError, setBaseGroupError] = useState(false)

  const theme = createTheme({
    shape: {
      borderRadius: 8 // Set the global border radius here
    }
  })
  return (
    <>
      <ThemeProvider theme={theme}>
        <Dialog
          open={open}
          onClose={handleClose}
          className='rounded-lg'
          maxWidth={'sm'}
          fullWidth={true}
          PaperProps={{
            component: 'form',
            // className:'rounded',
            onSubmit: e => {
              e.preventDefault()
              if (!selectedGroup) setGroupError(true)
              if (!selectedBaseGroup) setBaseGroupError(true)
              if (selectedGroup && selectedBaseGroup) {
                handleSave(selectedGroup,selectedBaseGroup)
                handleClose()
              }
            }
          }}
        >
          <DialogTitle className='text-primary text-2xl p-3 bg-[var(--secondary-color)] rounded-t-lg flex justify-between items-center'>
            <span className='text-primary text-2xl font-ea-sb !pl-3'>Add New page</span>
            <IconButton
              aria-label='close'
              onClick={handleClose} // Replace with your close handler function
              sx={{
                color: 'white'
              }}
            >
              <i className='tabler-x text-primary'></i>
            </IconButton>
          </DialogTitle>
          <DialogContent className='px-4 pt-3'>
            <DialogContentText>
              <div className='flex flex-col gap-4'>
                <Autocomplete
                  autoFocus
                  options={tabGroup.filter(item => !savedGroups.includes(item.label))}
                  getOptionLabel={option => option.label} // Extracts label text
                  getOptionKey={option => option.label}
                  value={selectedGroup ? tabGroup.find(item => item.label === selectedGroup) : null}
                  onChange={(_, newValue) => {
                    setSelectedGroup(newValue ? newValue.label : null)
                    setGroupError(false)
                  }}
                  renderInput={params => <TextField {...params} label='Select Page' error={groupError} />}
                />
                <Autocomplete
                  options={tabGroup.filter(item => savedGroups.includes(item.label))}
                  getOptionLabel={option => option.label} // Extracts label text
                  getOptionKey={option => option.label}
                  value={selectedBaseGroup ? tabGroup.find(item => item.label === selectedBaseGroup) : null}
                  onChange={(_, newValue) => {
                    setSelectedBaseGroup(newValue ? newValue.label : null)
                    setBaseGroupError(false)
                  }}
                  renderInput={params => <TextField {...params} label='Select Base plan' error={baseGroupError} />}
                />
              </div>
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
    </>
  )
}

export default AddPagePopUp
