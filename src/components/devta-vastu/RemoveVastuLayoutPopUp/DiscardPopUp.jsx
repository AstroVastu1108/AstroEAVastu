// import { Button, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ThemeProvider } from '@mui/material';
// import React from 'react'

// function RemoveVastuLayoutPopUp({ open, handleClose, TabData, handleRemoveGroup}) {
//   const theme = createTheme({
//     shape: {
//       borderRadius: 8, // Set the global border radius here
//     },
//   });
//   return (
//     <>
//       <ThemeProvider theme={theme}>
//         <Dialog
//           open={open}
//           onClose={handleClose}
//           className='rounded-lg'
//           // maxWidth={'md'}
//           fullWidth={true}
//           PaperProps={{
//             component: 'form',
//             // className:'rounded',
//             onSubmit: (e) => {
//               e.preventDefault();
//               handleRemoveGroup();
//               handleClose();
//             },
//           }}
//         >
//           <DialogTitle className='text-primary text-2xl p-3 bg-[var(--secondary-color)] rounded-t-lg flex justify-between items-center'>
//             <span className='text-primary text-2xl font-ea-sb !pl-3'>
//               Delete this Vastu Layout?
//             </span>
//             <IconButton
//               aria-label="close"
//               onClick={handleClose} // Replace with your close handler function
//               sx={{
//                 color: 'white',
//               }}
//             >
//               <i className='tabler-x text-primary'></i>
//             </IconButton>
//           </DialogTitle>
//           <DialogContent className='px-4 pt-3'>
//             <DialogContentText>
//               <div>
//                 Are you sure want to delete
//                 <span className='font-ea-sb text-red-700 ms-1'>
//                   {TabData} ?
//                 </span>
//                 {/* <div className='font-ea-n text-black'>
//                   <span className='font-ea-sb'>{TabData?.BirthDate} </span>{TabData?.BirthTime.substring(0, 2)}:{TabData?.BirthTime.substring(2, 4)}:{(TabData?.BirthTime.substring(4, 6) ? TabData?.BirthTime.substring(4, 6) : '00')}, {TabData?.City}, {TabData?.Country}
//                 </div> */}
//               </div>
//             </DialogContentText>

//           </DialogContent>
//           <DialogActions className='p-4 pt-0'>
//             <Button variant='contained' className={'bg-primary'} type="submit">Yes</Button>
//             <Button variant='contained' className='bg-secondary' onClick={handleClose}>Cancel</Button>
//           </DialogActions>
//         </Dialog>
//       </ThemeProvider>
//     </>
//   )
// }

// export default RemoveVastuLayoutPopUp


import { Autocomplete, Button, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, ThemeProvider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'

function RemoveVastuLayoutPopUp({ open, handleClose, TabData, handleDeleteClick }) {

  const [isNameValid, setIsNameValid] = useState(false);

  const theme = createTheme({
    shape: {
      borderRadius: 8, // Set the global border radius here
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

  const handleCopy = () => {
    navigator.clipboard.writeText(TabData?.ProjectName);
  };

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
              handleDeleteClick();
              handleClose();
            },
          }}
        >
          <DialogTitle className='text-primary text-2xl p-3 bg-[var(--secondary-color)] rounded-t-lg flex justify-between items-center'>
            <span className='text-primary text-2xl font-ea-sb !pl-3'>
              Delete Vastu Griding ?
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
                  # {TabData?.VPID}
                </div>
                <div className='font-ea-sb text-red-700 text-xl mt-2 mb-2'>
                  {TabData?.ProjectName}
                    <Button className='p-1 min-w-6 w-6 ml-2 ' onClick={handleCopy}><i className='tabler-copy text-secondary text-[18px]'></i></Button>

                </div>

                  <div className='mt-5 font-ea-n text-black'>
                    To confirm, enter the <span className='font-ea-sb underline text-red-700 mt-2 mb-2'>
                      {TabData?.ProjectName}
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
                  var prevData = `${TabData?.ProjectName}`;
                  if (data && prevData && data.trim() == prevData.trim()) {
                    setIsNameValid(true);
                  } else {
                    setIsNameValid(false);
                  }
                }}
              />

          </DialogContent>
          <DialogActions className='p-4 pt-0'>
            <Button variant='contained' className={`${!isNameValid ? 'bg-secondary text-white' : 'bg-primary'}`} type="submit" disabled={!isNameValid}>Delete</Button>
            {/* <Button variant='contained' className='bg-primary text-white' type="submit" disabled={!isNameValid}>Remove</Button> */}
            <Button variant='contained' className='bg-secondary' onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  )
}

export default RemoveVastuLayoutPopUp
