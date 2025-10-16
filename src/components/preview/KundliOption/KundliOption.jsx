import { Box, Button, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, IconButton, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';

function KundliOption({ setKundliValue, open, handleClose, KundliData }) {

  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    {
      field: 'OptionName',
      headerName: 'Name',
      minWidth: 170,
      align: "end",
      headerClassName: 'rowheader',
      renderCell: (params) => {
        return <div className=''>{params.value}</div>;
      },
    },
    {
      field: 'Desc',
      headerName: 'Description',
      minWidth: 150,
      align: "end",
      headerClassName: 'rowheader',
      flex: 1
    }
  ];


  const handleSelect = () => {
    setKundliValue(selectedRow);
    handleClose(); // Close the dialog after selecting an item
  };


  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"   // 'xs', 'sm', 'md', 'lg', 'xl' or false for custom width
        fullWidth={true}  // Ensures the dialog takes up full width of the container
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
          },
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
              Select Life Kundli
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
          </div>
          {/* <DialogContentText className="text-white">
            Enter the required information to create a new Kundli.
          </DialogContentText> */}
        </DialogTitle>
        <DialogContent className=' flex justify-center'>
          <Box width={"100%"} >
              <DataGrid
                showCellVerticalBorder
                getRowId={(e) => e.Option}
                rows={KundliData}
                columns={columns}
                pageSize={5}
                hideFooter={true}
                disableColumnSorting
                disableColumnMenu
                rowHeight={30}
                columnHeaderHeight={38}
                disableColumnResize
                hideFooterPagination={true}
                onRowClick={(params) => {
                  setSelectedRow(params.row)
                }}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                  setSelectedRow(KundliData.filter((e) => e.Option == newRowSelectionModel[0])[0])
                }}
                // checkboxSelection
                disableMultipleRowSelection
              // selectionModel={KundliData && selectedRow ? [selectedRow.Kundli] : []}
              />
          </Box>
        </DialogContent>
        <DialogActions>
          <div className='p-4'>
            <Button variant='contained' type='submit' disabled={false} onClick={handleSelect} >
              Save
            </Button>
            <Button variant='contained' className='bg-secondary' onClick={handleClose}>Cancel</Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default KundliOption


