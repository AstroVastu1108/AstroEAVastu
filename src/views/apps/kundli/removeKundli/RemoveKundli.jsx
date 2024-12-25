import { Button, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, ThemeProvider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'

function RemoveKundli({ open, handleClose, userData, handleDeleteClick }) {

  const [isNameValid, setIsNameValid] = useState(false);

  const theme = createTheme({
    typography: {
      // fontFamily: 'Segoe UI, Arial, sans-serif',
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
          // maxWidth={'md'}
          fullWidth={true}
          PaperProps={{
            component: 'form',
            // className:'rounded',
            onSubmit: (e) => {
              e.preventDefault();
              // const newData = inputRef?.current?.value;
              // const prevData = `${userData?.FirstName} ${userData?.MiddleName} ${userData?.LastName}`;
              // if (newData && prevData && newData.trim() == prevData.trim()) {
                handleDeleteClick(userData?.KundaliID);
                handleClose();
              // }
            },
          }}
        >
          <DialogTitle className='text-primary text-2xl p-3 bg-[var(--secondary-color)] rounded-t-lg flex justify-between items-center'>
            <span className='text-primary text-2xl font-ea-sb !pl-3'>
              Delete Kundali?
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
          <DialogContent className='px-4 pt-4'>
            <DialogContentText>
              <div>
                <div className='text-primary font-ea-n'>
                  # {userData?.KundaliID}
                </div>
                <div className='font-ea-sb text-red-700 text-xl mt-2 mb-2'>
                  {userData?.FirstName} {userData?.MiddleName} {userData?.LastName}
                </div>
                <div className='font-ea-n text-black'>
                  <span className='font-ea-sb'>{userData?.BirthDate} </span>{userData?.BirthTime.substring(0, 2)}:{userData?.BirthTime.substring(2, 4)}:{(userData?.BirthTime.substring(4, 6) ? userData?.BirthTime.substring(4, 6) : '00')}
                </div>
                <div className='font-ea-n text-black'>
                  {userData?.City}, {userData?.Country}
                </div>
                <div className='mt-5 font-ea-n text-black'>
                  To confirm, enter the <span className='font-ea-sb underline text-red-700 mt-2 mb-2'>
                    {userData?.FirstName} {userData?.MiddleName} {userData?.LastName}
                  </span> and click Delete.
                </div>
              </div>
            </DialogContentText>
            <TextField
              inputRef={inputRef}
              className='mt-2'
              autoFocus={true}
              margin="dense"
              id="name"
              name="Full Name"
              label="Full Name"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) => {
                const data = e.target.value;
                var prevData = `${userData?.FirstName} ${userData?.LastName}`;
                if (userData?.MiddleName != "") {
                  prevData = `${userData?.FirstName} ${userData?.MiddleName} ${userData?.LastName}`;
                }
                if (data && prevData && data.trim() == prevData.trim()) {
                  setIsNameValid(true);
                } else {
                  setIsNameValid(false);
                }
              }}
            />
          </DialogContent>
          <DialogActions className='p-4 pt-0'>
            <Button variant='contained' className={`${!isNameValid ? 'bg-secondary text-white' : 'bg-primary'}`} type="submit" disabled={!isNameValid}>Remove</Button>
            {/* <Button variant='contained' className='bg-primary text-white' type="submit" disabled={!isNameValid}>Remove</Button> */}
            <Button variant='contained' className='bg-secondary' onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  )
}

export default RemoveKundli
