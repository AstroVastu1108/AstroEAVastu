import { Box, Button, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, IconButton, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./Event.css";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { EventOptionsData } from '@/app/Server/API/kundliAPI';

function Event({ setEventValue, open, handleClose }) {


  const [EventData, setEventData] = useState([]);
  const [loading, setLoading] = useState([]);

  const [selectedRow, setSelectedRow] = useState(null);

  const customTheme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          // root: {
          //   fontFamily: 'Segoe UI, Arial, sans-serif',
          // },
          // cell: {
          //   fontFamily: 'Segoe UI, Arial, sans-serif',
          // },
          // columnHeaders: {
          //   fontFamily: 'Segoe UI, Arial, sans-serif',
          // },
          // toolbar: {
          //   fontFamily: 'Segoe UI, Arial, sans-serif',
          // },
        },
      },
    },
  });

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className='font-ea-sb text-[var(--green-color)]'>
          {part}
        </span>
      ) : (
        part
      )
    );
  };


  const columns = [
    {
      field: 'EventName',
      headerName: 'Event Name',
      minWidth: 150,
      align: "end",
      headerClassName: 'rowheader',
      flex: 1,
      renderCell: (params) => highlightText(params.value, quickFilterValue),
    },
    {
      field: 'Positive',
      headerName: 'Positive',
      minWidth: 150,
      align: "end",
      headerClassName: 'rowheader',
      flex: 1,
      renderCell: (params) => highlightText(params.value, quickFilterValue),
    },
    {
      field: 'Negative',
      headerName: 'Negative',
      minWidth: 150,
      align: "end",
      headerClassName: 'rowheader',
      flex: 1,
      renderCell: (params) => highlightText(params.value, quickFilterValue),
    },
  ];



  const handleSelect = () => {
    setEventValue(selectedRow);
    handleClose(); // Close the dialog after selecting an item
  };

  const getEventOpions = async () => {
    const response = await EventOptionsData();
    if (response.hasError) {
      setLoading(false);
      return toastDisplayer("error", response.error);
    } else {
      setEventData(response?.responseData?.Result?.Events);
      setLoading(false);
    }
  }

  useEffect(() => {
    getEventOpions();
  }, [])

  const [quickFilterValue, setQuickFilterValue] = useState('');

  // Capture filter change from the quick filter
  const handleFilterChange = (filterModel) => {
    if (filterModel.quickFilterValues.length) {
      const query = filterModel.quickFilterValues.join(' ');
      setQuickFilterValue(query);
    } else {
      setQuickFilterValue('');
    }
  };


  function CustomToolbar() {
    return (
      <GridToolbarContainer className="d-flex justify-content-between p-0 w-full align-items-center">
        <GridToolbarQuickFilter autoFocus className="SearchBar w-full md:w-full sm:w-8/12 m-2 " />
      </GridToolbarContainer>
    );
  }

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
              Select Life Event
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
          <Box width={"100%"}
            className=""
            sx={{

              // '& .MuiDataGrid-container--top': {
              //   background:'var(--primary-color)'
              // },
              '& .MuiDataGrid-columnHeaderTitleContainer': {
                background: 'var(--primary-color)'
              },
              '& .MuiDataGrid-root': {
                borderRadius: 0, // Remove border radius
                borderLeft: '0px',
                borderRight: '0px',
              },
              '& .MuiDataGrid-row:nth-of-type(odd)': {
                backgroundColor: '#ffffff', // Light color for odd rows
              },
              '& .MuiDataGrid-row:nth-of-type(even)': {
                backgroundColor: '#f5f5f5', // White color for even rows
              },
              '& .MuiDataGrid-row:hover': {
                color: 'var(--primary-color) !important',
                backgroundColor: 'var(--secondary-soft-color) !important',
              },
              '& .MuiDataGrid-columnHeader .MuiDataGrid-sortIcon': {
                color: 'white', // Change to your desired color
              },
              '& .MuiDataGrid-columnHeader--withRightBorder': {
                borderRightWidth: '0px !important'
              },
              '& .MuiDataGrid-columnSeparator': {
                display: 'none !important'
              },
              '& .Mui-selected': {
                backgroundColor: '#99e27b65 !important'
              },
              '& .MuiDataGrid-columnHeader': {
                cursor: 'default !important', // Change to your desired color
              },
              '& .MuiDataGrid-columnHeader:focus': {
                outline: 'none !important'
              }
            }}
          >
            <ThemeProvider theme={customTheme}>
              <DataGrid
                showCellVerticalBorder
                getRowId={(e) => e.Event}
                rows={EventData}
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
                  setSelectedRow(EventData.filter((e) => e.Event == newRowSelectionModel[0])[0])
                }}
                // checkboxSelection
                disableMultipleRowSelection
                selectionModel={EventData && selectedRow ? [selectedRow.Event] : []}
                slots={{ toolbar: CustomToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
                onFilterModelChange={handleFilterChange}
              />
            </ThemeProvider>
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

export default Event



// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Select } from '@mui/material'
// import React from 'react'
// import "./Event.css";

// function Event({eventValue,setEventValue,eventData,open,handleClose}) {
//   const handleSelect = (value) => {
//     setEventValue(value);
//     handleClose(); // Close the dialog after selecting an item
//   };
//   return (
//     <>
//       <Dialog open={open} onClose={handleClose} >
//         <DialogTitle className='ps-3 py-2 text-primary'>Select an Event</DialogTitle>
//         <Divider />
//         <DialogContent className='py-2 px-3 pt-0 max-h-80'
//         sx={{
//           // maxHeight: '400px',
//           overflow: 'auto',
//           '&::-webkit-scrollbar': {
//             width: '8px',
//           },
//           '&::-webkit-scrollbar-track': {
//             backgroundColor: '#fff',
//             borderRadius: '10px',
//           },
//           '&::-webkit-scrollbar-thumb': {
//             backgroundColor: '#999',
//             borderRadius: '10px',
//           },
//           '&::-webkit-scrollbar-thumb:hover': {
//             backgroundColor: '#555',
//           },
//         }}>
//           <List className='list-container'>
//             {eventData.map((event) => (
//               <ListItem key={event.id} disablePadding className='min-w-40 event-list-item'>
//                 <ListItemButton onClick={() => handleSelect(event.value)}
//                   sx={{
//                     '&:hover': {
//                       backgroundColor: 'var(--primary-soft-color)', // Set your custom hover color here
//                     },
//                   }}>
//                   <ListItemText primary={event.name} className='list-text' />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//         </DialogContent>
//         {/* <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//         </DialogActions> */}
//       </Dialog>
//     </>
//   )
// }

// export default Event

// {/* <FormControl className='w-[33%] mb-2'>
// <InputLabel id="event-label">Select Event</InputLabel>
// <Select
//   labelId="event-label"
//   id="event"
//   label="Select Event"
//   onChange={(e) => { setEventValue(e.target.value) }}
//   defaultValue={eventValue}
//   value={eventValue && eventValue}
//   sx={{ height: '2.9rem !important', minHeight: '1rem !important' }}
// >
//   <MenuItem value="E1">Event1</MenuItem>
//   <MenuItem value="E2">Event2</MenuItem>
//   <MenuItem value="E3">Event3</MenuItem>
//   <MenuItem value="E4">Event4</MenuItem>
// </Select>
// </FormControl> */}
