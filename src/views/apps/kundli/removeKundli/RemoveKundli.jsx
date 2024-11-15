import { Button, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, ThemeProvider } from '@mui/material';
import React, { useEffect, useRef } from 'react'

function RemoveKundli({ open, handleClose, userData }) {

  const theme = createTheme({
    typography: {
      fontFamily: 'Segoe UI, Arial, sans-serif',
    },
    shape: {
      borderRadius: 12, // Set the global border radius here
    },
  });
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (open && inputRef.current) {
        inputRef.current.focus();
      }
    }, 500);
  }, [open]);


  return (
    <>
      <ThemeProvider theme={theme}>
        <Dialog
          open={open}
          onClose={handleClose}
          className='rounded-lg'
          PaperProps={{
            component: 'form',
            // className:'rounded',
            onSubmit: (e) => {
              e.preventDefault();
              const newData = inputRef?.current?.value;
              const prevData = `${userData?.FirstName} ${userData?.MiddleName} ${userData?.LastName}`;
              if(newData && prevData && newData == prevData){
              }

              // handleClose();
            },
          }}
        >
          <DialogTitle className='text-primary text-2xl p-3 bg-[var(--secondary-color)] rounded-t-lg flex justify-between items-center'>
            <span className='ms-3'>
              Remove Kundli
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
          <DialogContent className='px-4 pt-6'>
            <DialogContentText>
              To remove this kundli, please enter FullName here.
            </DialogContentText>
            <TextField
              inputRef={inputRef}
              className='mt-4'
              autoFocus={true}
              margin="dense"
              id="name"
              name="Full Name"
              label="Full Name"
              type="text"
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions className='p-4 pt-0'>
            <Button variant='contained' className='bg-primary' type="submit">Remove</Button>
            <Button variant='contained' className='bg-secondary' onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  )
}

export default RemoveKundli
