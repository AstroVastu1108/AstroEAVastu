import { Box, Button, createTheme, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, ThemeProvider } from '@mui/material';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

function JaiminiCharKarakasPopUp({ open, handleClose, JaiminiCharKarakasData }) {

  // Transforming Data: Making each 'Karak' a column
  const columns = [
    ...JaiminiCharKarakasData.map(item => ({
      field: item.Karak,
      headerName: `${item.Karak} Karaka`,
      flex: 1,
      sortable: false,
      headerClassName: 'rowheader',
    })),
  ];

  // Creating rows for 'Planet' and 'Degree'
  const rows = [
    {
      id: 1,
      rowLabel: 'Planet',
      ...JaiminiCharKarakasData.reduce((acc, item) => {
        acc[item.Karak] = item.Planet;
        return acc;
      }, {}),
    },
    {
      id: 2,
      rowLabel: 'Degree',
      ...JaiminiCharKarakasData.reduce((acc, item) => {
        acc[item.Karak] = item.Degree;
        return acc;
      }, {}),
    },
  ];

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth={true}
        PaperProps={{
          sx: {
            '& .MuiDialogActions-root': {
              padding: '0px'
            },
            '& .MuiDialogContent-root': {
              padding: '0px'
            }
          }
        }}
      >
        <DialogTitle className="PopupHeader text-white p-3">
          <div className='w-100' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className='text-primary text-2xl font-ea-sb !pl-3'>
              Jaimini Char Karakas
            </span>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                color: 'white',
              }}
            >
              <i className='tabler-x text-primary'></i>
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent className=' flex justify-center'>
          <Box width={"100%"}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                hideFooter={true}
                disableColumnSorting
                disableColumnMenu
                rowHeight={40}
                columnHeaderHeight={38}
                disableColumnResize
                hideFooterPagination={true}
                showColumnVerticalBorder
              />
          </Box>
        </DialogContent>
        {/* <DialogActions>
          <div className='p-4'>
            <Button variant='contained' className='bg-secondary' onClick={handleClose}>Cancel</Button>
          </div>
        </DialogActions> */}
      </Dialog>
    </>
  );
}

export default JaiminiCharKarakasPopUp;
