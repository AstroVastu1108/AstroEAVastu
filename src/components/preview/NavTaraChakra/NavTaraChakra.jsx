import { Box, Button, createTheme, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, ThemeProvider } from '@mui/material';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

function NavTaraChakra({ open, handleClose, NavTaraChakraData }) {
  // Transforming Data: Making each 'Karak' a column
  const columns = [
    {
      field: 'Sr', headerName: '# Tara', flex: 1, sortable: false, headerClassName: 'rowheader',
      renderCell: (e) => {
        return (<span>
          {e.value}. {e?.row?.TaraName}
        </span>)
      }
    },
    {
      field: 'N1Name', headerName: 'Nakshatra 1', flex: 1, sortable: false, headerClassName: 'rowheader',
      renderCell: (e) => {
        return (<span>
          ({e?.row?.N1No}) {e.value}
        </span>)
      }
    },
    {
      field: 'N2Name', headerName: 'Nakshatra 2', flex: 1, sortable: false, headerClassName: 'rowheader',
      renderCell: (e) => {
        return (<span>
          ({e?.row?.N2No}) {e.value}
        </span>)
      }
    },
    {
      field: 'N3Name', headerName: 'Nakshatra 3', flex: 1, sortable: false, headerClassName: 'rowheader',
      renderCell: (e) => {
        return (<span>
          ({e?.row?.N3No}) {e.value}
        </span>)
      }
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
              NavTara Chakra
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
          <Box width={"100%"} >
              <DataGrid
                rows={NavTaraChakraData}
                columns={columns}
                getRowId={(e) => e.Sr}
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

export default NavTaraChakra;
