import { Autocomplete, Box, Button, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, TextField, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./Event.css";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { EventOptionsData } from '@/app/Server/API/kundliAPI';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

function Event({ setEventValue, open, handleClose, JaiminiCharKarakasData }) {


  const [EventData, setEventData] = useState([]);
  const [loading, setLoading] = useState([]);

  const [selectedRow, setSelectedRow] = useState(null);

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

  const handleSelect = () => {
    // setEventValue(selectedRow);
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


  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"   // 'xs', 'sm', 'md', 'lg', 'xl' or false for custom width
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
              Event
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
        </DialogTitle>
        <DialogContent className=' flex flex-col justify-center'>
          <div className='p-4 flex'>
            <Grid className='' container spacing={5}>
              <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker
                      label="Birth Date & Time"
                      name="startDate"
                      views={['year', 'month', 'day', 'hours', 'minutes']}
                      format="DD-MM-YYYY HH:mm:ss"
                      ampm={false}
                      onChange={(date) => {
                        // Handle date and time changes
                        // handleInputChange('date', date, 'BirthDate');
                      }}
                      slots={{
                        actionBar: () => null, // Hide the action bar, including the OK button
                      }}
                    // Uncomment and use the value if necessary
                    // value={userData.date}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  id='event-select'
                  options={EventData && EventData}

                  // defaultValue={userData && userData.Country}
                  getOptionLabel={(option) => option?.EventName}
                  getOptionKey={(option) => option?.Event}
                  // onChange={(event, newValue) => handleInputChange('Country', newValue, 'Country', true)}
                  // sx={{
                  //   '& .MuiOutlinedInput-root': {
                  //     height: '56px', // Adjust height as needed
                  //   },
                  // }}
                  renderInput={(params) => (
                    <TextField {...params} label='Select Event' variant='outlined'
                    // {...(errors.Country && { error: true })}

                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Remark"
                // value={userData?.FirstName}
                // onChange={e => {
                //   const inputValue = e.target.value;
                //   const capitalizedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
                //   handleInputChange('FirstName', capitalizedValue, 'FirstName');
                // }}
                />
              </Grid>
            </Grid>
          </div>
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
        <DialogActions>
          <div className='p-4'>
            <Button variant='contained' type='submit' disabled={false} onClick={handleSelect} >
              Transit
            </Button>
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
