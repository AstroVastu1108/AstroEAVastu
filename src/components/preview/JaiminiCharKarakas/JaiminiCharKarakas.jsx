import { Box, Button, createTheme, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, ThemeProvider } from '@mui/material';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

function JaiminiCharKarakasPopUp({ open, handleClose, JaiminiCharKarakasData }) {
  const customTheme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            fontFamily: 'Segoe UI, Arial, sans-serif',
          },
          cell: {
            fontFamily: 'Segoe UI, Arial, sans-serif',
          },
          columnHeaders: {
            fontFamily: 'Segoe UI, Arial, sans-serif',
          },
          toolbar: {
            fontFamily: 'Segoe UI, Arial, sans-serif',
          },
        },
      },
    },
  });

  // Transforming Data: Making each 'Karak' a column
  const columns = [
    // {
    //   field: 'rowLabel', headerName: '', flex: 1, sortable: false,
    //   headerClassName: 'rowheader',
    // },
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
            <span className='text-primary text-2xl font-semibold !pl-3'>
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
          <Box
            width={"100%"}
            className=""
            sx={{
              '& .MuiDataGrid-root': {
                borderRadius: 0, // Remove border radius
                borderLeft: '0px',
                borderRight: '0px',
                borderTop: '0px !important'
              },
              '& .MuiDataGrid-row:nth-of-type(odd)': {
                backgroundColor: '#ffffff',
              },
              '& .MuiDataGrid-row:nth-of-type(even)': {
                backgroundColor: '#daffaf45',
              },
              '& .MuiDataGrid-row:hover': {
                color: 'var(--primary-color) !important',
                backgroundColor: 'var(--secondary-soft-color) !important',
              },
              '& .MuiDataGrid-columnHeader .MuiDataGrid-sortIcon': {
                color: 'white', // Change to your desired color
              },
              '& .MuiDataGrid-cell': {
                lineHeight: '30px !important'
              },
              // '& .MuiDataGrid-columnHeaderTitleContainerContent':{
              //   width: '100% !important'
              // },
              // '& .MuiDataGrid-columnHeaderTitle':{
              //   width: '100% !important'
              // },
              '& .MuiDataGrid-columnHeader--withRightBorder': {
                borderRightWidth: '0px !important'
              },
              '& .MuiDataGrid-columnSeparator': {
                display: 'none !important'
              },
              '& .MuiDataGrid-columnHeader': {
                cursor: 'default !important', // Change to your desired color
              },
              '& .MuiDataGrid-columnHeader:focus': {
                outline: 'none !important'
              },
            }}
          >
            <ThemeProvider theme={customTheme}>
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
            </ThemeProvider>
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
