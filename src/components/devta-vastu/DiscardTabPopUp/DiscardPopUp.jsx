import { Button, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ThemeProvider } from '@mui/material';
import React from 'react'

function DiscardPopUp({ open, handleClose, TabData, handleRemoveGroup}) {
  const theme = createTheme({
    shape: {
      borderRadius: 8, // Set the global border radius here
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Dialog
          open={open}
          onClose={handleClose}
          className='rounded-lg'
          // maxWidth={'md'}
          fullWidth={true}
          PaperProps={{
            component: 'form',
            // className:'rounded',
            onSubmit: (e) => {
              e.preventDefault();
              handleRemoveGroup();
              handleClose();
            },
          }}
        >
          <DialogTitle className='text-primary text-2xl p-3 bg-[var(--secondary-color)] rounded-t-lg flex justify-between items-center'>
            <span className='text-primary text-2xl font-ea-sb !pl-3'>
              Discard this page?
            </span>
            <IconButton
              aria-label="close"
              onClick={handleClose} // Replace with your close handler function
              sx={{
                color: 'white',
              }}
            >
              <i className='tabler-x text-primary'></i>
            </IconButton>
          </DialogTitle>
          <DialogContent className='px-4 pt-3'>
            <DialogContentText>
              <div>
                Are you sure want to discard
                <span className='font-ea-sb text-red-700 ms-1'>
                  {TabData} ?
                </span>
                {/* <div className='font-ea-n text-black'>
                  <span className='font-ea-sb'>{userData?.BirthDate} </span>{userData?.BirthTime.substring(0, 2)}:{userData?.BirthTime.substring(2, 4)}:{(userData?.BirthTime.substring(4, 6) ? userData?.BirthTime.substring(4, 6) : '00')}, {userData?.City}, {userData?.Country}
                </div> */}
              </div>
            </DialogContentText>

          </DialogContent>
          <DialogActions className='p-4 pt-0'>
            <Button variant='contained' className={'bg-primary'} type="submit">Yes</Button>
            <Button variant='contained' className='bg-secondary' onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  )
}

export default DiscardPopUp
