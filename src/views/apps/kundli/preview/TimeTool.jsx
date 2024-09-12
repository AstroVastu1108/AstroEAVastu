import { Dialog, DialogTitle, IconButton } from '@mui/material';
import React from 'react'

function TimeTool() {
  return (
    <>
      <Dialog
        open={true}
        // onClose={handleAddClose}
        maxWidth="sm"   // 'xs', 'sm', 'md', 'lg', 'xl' or false for custom width
        fullWidth={true}  // Ensures the dialog takes up full width of the container
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            // event.preventDefault();
            // handleSubmit();
          },
        }}
      >
        <DialogTitle className="PopupHeader bg-primary text-white p-4">
          <div className='w-100' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>

              Add Kundli
            </span>
            <IconButton
              aria-label="close"
              // onClick={handleAddClose} // Replace with your close handler function
              sx={{
                color: 'white',
              }}
            >
              <i className='tabler-x'></i>
            </IconButton>
          </div>
        </DialogTitle>
      </Dialog>
    </>
  )
}

export default TimeTool
