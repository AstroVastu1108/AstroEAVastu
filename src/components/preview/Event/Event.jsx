import { Autocomplete, Box, Button, createTheme, debounce, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, TextField, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./Event.css";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { EventOptionsData } from '@/app/Server/API/kundliAPI';
import { DatePicker, DateTimePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { getCities, getCountries } from '@/app/Server/API/common';

function Event({ setEventValue, open, handleClose, JaiminiCharKarakasData }) {


  const [EventData, setEventData] = useState([]);
  const [loading, setLoading] = useState([]);

  const [selectedRow, setSelectedRow] = useState(null);

  const [cityData, setCityData] = useState([{
    "CityID": 1255364,
    "FormattedCity": "Surat, Gujarat"
  }])
  const [conutryData, setConutryData] = useState([]);

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

  const fetchData = async () => {
    try {
      const response = await getCountries()
      if (response.hasError) {
        // return toastDisplayer("error", response.error)
      }
      const result = response.responseData
      setConutryData(result.Result.Countries)
    } catch (error) {
      return toastDisplayer("error", `There was a problem with the fetch operation: ${error}`)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

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

  const fetchCities = async (query) => {
    // if (query.length > 1 && formData.Country) {
      try {
        const CountryCode = "IN";
        setCityData([]);
        const response = await getCities(CountryCode, query);
        if (response.hasError) {
          return toastDisplayer("error", response.error)
        }
        const result = await response.responseData
        setCityData(result.Result.Cities || [])
      } catch (error) {
        return toastDisplayer("error", `There was a problem with the fetch operation:${error}`)
      }
    // }
  }

  const fetchCityData = debounce(async (query) => {
    if (query.length > 0) {
      await fetchCities(query);
    } else {
      setCityData([]);
    }
  }, 300)

  const handleCityChange = (filterModel) => {
    if (filterModel) {
      fetchCityData(filterModel);
    } else {
      setCityData([]);
    }
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
              New Event
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}
                className='!pt-4'
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker
                      label="Event Date & Time"
                      name="startDate"
                      views={['year', 'month', 'day', 'hours', 'minutes', "seconds"]}
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
              </Grid><Grid item xs={12} sm={12}>
                <Autocomplete
                  id='country-select'
                  options={conutryData && conutryData}
                  // defaultValue={formData && formData.Country}
                  getOptionLabel={(option) => option?.Country}
                  getOptionKey={(option) => option?.CountryCode}
                  // onChange={(event, newValue) => handleInputChange('Country', newValue, 'Country', true)}
                  renderInput={(params) => (
                    <TextField {...params} label='Select Country' variant='outlined'
                    // {...(errors.Country && { error: true })}
                    />
                  )}
                // size={TextFeildSize}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  id='city-autocomplete'
                  options={cityData}
                  // value={formData.CityID || null}  // Ensure city is cleared when CityID is null
                  getOptionLabel={(option) => option?.FormattedCity || ''}
                  // onInputChange={(event, newQuery) => setQuery(newQuery)}
                  onInputChange={(event, newQuery) => handleCityChange(newQuery)}
                  // onChange={(event, newValue) => handleInputChange('CityID', newValue, 'CityID', true)}
                  renderInput={(params) => (
                    <TextField {...params} label='Select City' variant='outlined'
                    // {...(errors.CityID && { error: true })}
                    />
                  )}
                  filterOptions={(x) => x} // Disable frontend filtering
                // size={TextFeildSize}
                />

              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Remark"
                />
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <div className='p-4'>
            {/* <Button variant='contained' type='submit' disabled={false} onClick={handleSelect} >
              Transit
            </Button> */}
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
