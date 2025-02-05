import { Button, Checkbox, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, IconButton, ThemeProvider } from '@mui/material';
import React, { useState } from 'react'

function DownloadPopUp({ open, handleClose, TabData, handleSave }) {

  const theme = createTheme({
    shape: {
      borderRadius: 8, // Set the global border radius here
    },
  });

  const [checkedItems, setCheckedItems] = useState(TabData.reduce((acc, item) => ({ ...acc, [item]: false }), {}));
  const [checkAll, setCheckAll] = useState(false);

  const handleCheckAll = (event) => {
    const isChecked = event.target.checked;
    setCheckAll(isChecked);
    setCheckedItems(TabData.reduce((acc, item) => ({ ...acc, [item]: isChecked }), {}));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prev) => {
      const updatedItems = { ...prev, [name]: checked };
      setCheckAll(Object.values(updatedItems).every((val) => val));
      return updatedItems;
    });
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
              handleSave(checkedItems);
              handleClose();
            },
          }}
        >
          <DialogTitle className='text-primary text-2xl p-3 bg-[var(--secondary-color)] rounded-t-lg flex justify-between items-center'>
            <span className='text-primary text-2xl font-ea-sb !pl-3'>
              Select page to download
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
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={checkAll} onChange={handleCheckAll} />}
                label="Check All"
              />
              {TabData.map((e, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={checkedItems[e]}
                      onChange={handleCheckboxChange}
                      name={e}
                    />
                  }
                  label={e}
                />
              ))}
            </FormGroup>

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

export default DownloadPopUp
