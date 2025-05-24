import { Autocomplete, Box, Button, createTheme, debounce, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, TextField, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./Event.css";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { EventOptionsData, UpdateKundli } from '@/app/Server/API/kundliAPI';
import { DatePicker, DateTimePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { getCities, getCountries } from '@/app/Server/API/common';
import dayjs from 'dayjs';
import { CreateEvent } from '@/app/Server/API/EventAPI';
import Loader from '@/components/common/Loader/Loader';
import { toast } from 'react-toastify';

function AddEvent({ AddEventData,setAddEventData, open, handleClose, getAllEvent, EventOptionData }) {


  // const [EventOptionData, setEventOptionData] = useState([]);
  const [RequiredFields] = useState(["Event", "EventDate", "EventTime", "City"]);
  // const [AddEventData, setAddEventData] = useState(NewEventData);
  const [loading, setLoading] = useState([]);
  const [errors, setErrors] = useState({
    "Client": false,
    "KundaliID": false,
    "EventID": false,
    "Event": false,
    "EventDate": false,
    "EventTime": false,
    "CityID": false,
    "Remark": false
  });
  const [cityData, setCityData] = useState([{
    "CityID": 1255364,
    "FormattedCity": "Surat, Gujarat"
  }])
  const [conutryData, setConutryData] = useState([]);

  const fetchData = async () => {
    try {
      // setLoading(true);
      const response = await getCountries();
      setLoading(false);
      if (response.hasError) {
        // return toastDisplayer("error", response.error)
      }
      const result = response.responseData
      setConutryData(result.Result.Countries)
    } catch (error) {
      // return toastDisplayer("error", `There was a problem with the fetch operation: ${error}`)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  // const getEventOpions = async () => {
  //   // setLoading(true);
  //   const response = await EventOptionsData();
  //   if (response.hasError) {
  //     setLoading(false);
  //     // return toastDisplayer("error", response.error);
  //   } else {
  //     setEventOptionData(response?.responseData?.Result?.Events);
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   getEventOpions();
  // }, [])

  const fetchCities = async (query) => {
    if (query.length > 1 && AddEventData.Country) {
      try {
        const CountryCode = AddEventData.Country.CountryCode;
        setCityData([]);
        const response = await getCities(CountryCode, query);
        if (response.hasError) {
          // return toastDisplayer("error", response.error)
        }
        const result = await response.responseData;
        setCityData(result.Result.Cities || []);
      } catch (error) {
        // return toastDisplayer("error", `There was a problem with the fetch operation:${error}`);
      }
    }
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

  const handleSaveEvent = async () => {
    var flag = 0;
    RequiredFields.map((e) => {
      if (AddEventData[e] == "") {
        setErrors((prev) => ({
          ...prev,
          [`${e}`]: true
        }))
        flag = 1;
      }
    })

    if (flag == 1) {
      return;
    }

    const hasErrors = Object.values(errors).some(error => error === true);
    if (hasErrors) {
      return;
    }
    const eventDateTime = AddEventData?.EventDate;
    if (!eventDateTime.isValid()) {
      return;
    }
    const EventDate = eventDateTime.format("DD-MM-YYYY");

    const EventTime = eventDateTime.format("HHmmss")

    const payload = {
      "ClientID": "",
      "KundaliID": AddEventData?.KundaliID,
      "EventID": AddEventData?.EventID,
      "Event": AddEventData?.Event,
      "EventDate": EventDate,
      "EventTime": EventTime,
      "CityID": AddEventData?.City?.CityID,
      "Remark": AddEventData?.Remark
    }
    if (!AddEventData.isUpdate) {
      // setIsDisable(false);
      setLoading(true);
      const response = await CreateEvent(payload)
      setLoading(false);
      if (response.errorMessage) {
        Object.keys(response.errorMessage).forEach((key) => {
          response.errorMessage[key].forEach((message) => {
            toast.error(`${key}: ${message}`);
          });
        });
        return;
      }
      // if (response.hasError) {

      //   // setIsDisable(false)
      //   // return toastDisplayer("error", response.error)
      // }
      // var kId = response?.responseData?.Result?.KundaliID;
      // setIsDisable(false)
      // getAllKundli(1, "");
      getAllEvent(AddEventData?.KundaliID);
      handleClose();
      toast.success("Event saved successfully.");
      // toastDisplayer("success", `kundli data is saved successfully.`)
      // return kId;
    } else {
      // setIsDisable(false)
      const response = await UpdateKundli(payload)

      if (response.hasError) {
        setIsDisable(false)
        return toastDisplayer("error", response.error)
      }
      var kId = response?.responseData?.Result?.KundaliID;
      // setIsDisable(false)
      getAllEvent(AddEventData?.KundaliID);
      handleClose();
      // // toastDisplayer("success", `Kundli data is updated successfully.`)
      // return kId;
    }
  }

  const handleInputChange = (field, value, key, isRequired = false) => {
    if (isRequired) {
      if (!value) {
        setErrors(prev => ({
          ...prev,
          [key]: true
        }))
      } else {
        setErrors(prev => ({
          ...prev,
          [key]: false
        }))
      }
    }

    if (field === "Remark") {
      const newVal = value.replace(/^\w/, char => char.toUpperCase());
      setAddEventData(prev => ({
        ...prev,
        [field]: newVal
      }))
      return;
    }
    if (field === "Event") {
      setAddEventData(prev => ({
        ...prev,
        [field]: value.EventName
      }))
      return;
    }


    if (field === "Country") {
      // Clear the city data and reset selected city when the country changes
      setCityData([]); // Clear city options
      setAddEventData(prev => ({
        ...prev,
        CityID: null, // Reset the selected city
        [field]: value
      }));
      setErrors(prev => ({
        ...prev,
        ["City"]: true
      }))
      return; // Ensure that city is reset before proceeding
    }


    setAddEventData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <>
      {loading && <Loader />}

      <Dialog
        open={open}
        // onClose={handleClose}
        onClose={(event, reason) => {
          if (reason === 'backdropClick') {
            return; // Do nothing when clicking outside
          }
          handleClose(); // Allow closing for other reasons like pressing the escape key
        }}
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
              {AddEventData.isUpdate ? "Edit Event" : "New Event"}
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
                  label="Select Event"
                  title="Select Event"
                  id='event-select'
                  options={EventOptionData && EventOptionData}
                  defaultValue={EventOptionData && AddEventData && AddEventData.Event}
                  getOptionLabel={(option) => option?.EventName}
                  getOptionKey={(option) => option?.Event}
                  onChange={(event, newValue) => handleInputChange('Event', newValue, 'Event', true)}
                  renderInput={(params) => (
                    <TextField {...params} label='Select Event' title='Select Event' variant='outlined'
                      {...(errors.Event && { error: true })}

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
                      title="Event Date & Time"
                      name="startDate"
                      views={['year', 'month', 'day', 'hours', 'minutes', "seconds"]}
                      format="DD-MM-YYYY HH:mm:ss"
                      ampm={false}
                      onChange={(e) => {
                        handleInputChange('EventDate', e, 'EventDate');
                      }}
                      slots={{
                        actionBar: () => null, // Hide the action bar, including the OK button
                      }}
                      // Uncomment and use the value if necessary
                      value={AddEventData?.EventDate}
                      selected={AddEventData?.EventDate}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.EventDate}
                        />
                      )}
                    />

                  </DemoContainer>
                </LocalizationProvider>
              </Grid><Grid item xs={12} sm={12}>
                <Autocomplete
                  id='country-select'
                  options={conutryData && conutryData}
                  defaultValue={AddEventData && AddEventData.Country}
                  getOptionLabel={(option) => option?.Country}
                  getOptionKey={(option) => option?.CountryCode}
                  onChange={(event, newValue) => handleInputChange('Country', newValue, 'Country', true)}
                  renderInput={(params) => (
                    <TextField {...params} label='Select Country' variant='outlined'
                      {...(errors.Country && { error: true })}
                    />
                  )}
                // size={TextFeildSize}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  id='city-autocomplete'
                  options={cityData}
                  value={AddEventData.City || null}  // Ensure city is cleared when CityID is null
                  getOptionLabel={(option) => option?.FormattedCity || ''}
                  // onInputChange={(event, newQuery) => setQuery(newQuery)}
                  onInputChange={(event, newQuery) => handleCityChange(newQuery)}
                  onChange={(event, newValue) => handleInputChange('City', newValue, 'City', true)}
                  renderInput={(params) => (
                    <TextField {...params} label='Select City' variant='outlined'
                      {...(errors.City && { error: true })}
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
                  onChange={e => {
                    handleInputChange('Remark', e.target.value, 'Remark');
                  }}

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
            <Button variant='contained' type='submit' disabled={false} onClick={handleSaveEvent} >
              Save
            </Button>
            <Button variant='contained' className='bg-secondary' onClick={handleClose}>Cancel</Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddEvent

