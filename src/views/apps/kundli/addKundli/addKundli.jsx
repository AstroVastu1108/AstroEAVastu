// Import React built in
import React, { useEffect, useRef, useState } from 'react'

// Import MUI Component
import { Autocomplete, Button, CircularProgress, debounce, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useRouter } from 'next/navigation';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

// Import APIs
import { CreateKundli, UpdateKundli } from '@/app/Server/API/kundliAPI';
import { getCities, getCountries } from '@/app/Server/API/common';

// Import Components
// import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer';

// Import Style
import "./addKundli.css"
import { toast } from 'react-toastify';

function AddKundliPopUp({ open, handleAddClose, getAllKundli, userData, setUserData, GroupData, setKundliData, kundliData }) {

  const [isDisable, setIsDisable] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [TextFeildSize] = useState("");
  const fetchData = async () => {
    try {
      const response = await getCountries()
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

  const [errors, setErrors] = useState({
    FirstName: false,
    LastName: false,
    MiddleName: false,
    Gender: false,
    BirthDate: false,
    Country: false,
    BirthTime: false,
    CityID: false,
    Prakriti: false
  });
  const [conutryData, setConutryData] = useState([]);
  const [cityData, setCityData] = useState([{
    "CityID": 1255364,
    "FormattedCity": "Surat, Gujarat"
  }])

  const fnameRef = useRef(null);

  useEffect(() => {
    if (!formData.isUpdate) {
      setCityData([formData.CityID])
      const now = new Date();
      setFormData((prev) => ({ ...prev, ["date"]: dayjs(), ["time"]: dayjs() }));
    } else {
      const dateParts = formData.BirthDate.split('-');
      const timeParts = formData.BirthTime;

      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // month is 0-indexed in JS
      const year = parseInt(dateParts[2], 10);

      let hours, minutes;
      if (timeParts && timeParts.length === 4 && !isNaN(timeParts)) {
        hours = parseInt(timeParts.substring(0, 2), 10);
        minutes = parseInt(timeParts.substring(2, 4), 10);
      } else {
        // Use current time if BirthTime is not in the correct format
        const now = new Date();
        hours = now.getHours();
        minutes = now.getMinutes();
      }

      const birthDate = new Date(year, month, day, hours, minutes);
      const birthTime = formData.BirthTime;
      setFormData((prev) => ({
        ...prev,
        ["date"]: dayjs(birthDate),
        ["CityID"]: {
          CityID: formData.CityID,
          FormattedCity: formData.City
        },
        ["Country"]: {
          Country: formData.Country,
          CountryCode: formData.CountryCode
        },
      }));
    }
  }, []);

  const router = useRouter();

  const fetchCities = async (query) => {
    if (query.length > 1 && formData.Country) {
      try {
        setCityData([]);
        const CountryCode = formData.Country.CountryCode
        const response = await getCities(CountryCode, query)
        if (response.hasError) {
          // return toastDisplayer("error", response.error)
        }
        const result = await response.responseData
        setCityData(result.Result.Cities || [])
      } catch (error) {
        // return toastDisplayer("error", `There was a problem with the fetch operation:${error}`)
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
      // fetchCityData.clear();
      setCityData([]);
    }
  }

  const handleSubmit = async () => {
    const hasErrors = Object.values(errors).some(error => error === true);

    if (hasErrors) {
      // Display an error message or alert
      // toastDisplayer("error", "Please fill out all required fields correctly before submitting.");
      return; // Prevent submission
    }
    const birthDate = formData.date ? new Date(formData.date).toLocaleDateString('en-GB').split('/').join('-') : null

    const birthTime = formData.time ? new Date(formData.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(/:/g, '') : null;

    try {
      setIsDisable(true)
      const formattedData = {
        KundaliID: formData.KundaliID,
        FirstName: formData.FirstName || "Prashna",
        LastName: formData.LastName || "Kundali",
        MiddleName: formData.MiddleName,
        Gender: formData.Gender,
        // Country: formData.Country?.Country,
        CountryCode: formData.Country?.CountryCode,
        CityID: formData.CityID?.CityID,
        BirthDate: birthDate,
        BirthTime: birthTime,
        Prakriti: formData.prakriti || '',
        // City: formData.CityID?.FormattedCity,
        TransitTime: "",
        TransitDate: "",
        ClientID: "",
        DChart: "",
        Reference: formData?.Reference,
        Remark: formData?.Remark,
        Group: formData?.Group
      }
      if (!formData.isUpdate) {
        setIsDisable(false);
        const response = await CreateKundli(formattedData);

        if (response.errorMessage) {
          Object.keys(response.errorMessage).forEach((key) => {
            response.errorMessage[key].forEach((message) => {
              toast.error(`${key}: ${message}`);
            });
          });
          return;
        }

        // if (response.hasError) {
        //   setIsDisable(false)
        //   return toast.error(response.error)
        // }
        var kId = response?.responseData?.Result?.KundaliID;
        setIsDisable(false)
        getAllKundli(1, "");
        handleAddClose();

        toast.success('Kundli data saved successfully.');

        return kId;
      } else {
        setIsDisable(false);
        const response = await UpdateKundli(formattedData);

        if (response.hasError) {
          setIsDisable(false);
          if (response.errorMessage) {
            Object.keys(response.errorMessage).forEach((key) => {
              response.errorMessage[key].forEach((message) => {
                toast.error(`${key}: ${message}`);
              });
            });
          }
          return toast.error(response.errorMessage);
        }

        var kId = response?.responseData?.Result?.KundaliID;
        setIsDisable(false);

        const index = kundliData.findIndex(item => item.KundaliID === kId.KundaliID);

        if (index !== -1) {
          const updatedKundliData = [...kundliData];
          updatedKundliData[index] = kId;
          setKundliData(updatedKundliData);
        }
        toast.success('Kundli data updated successfully.');
        handleAddClose();
        return kId;
      }
    } catch (error) {
      setIsDisable(false)
    }
  }

  const handlePreview = async () => {
    const kid = await handleSubmit();
    if (kid)
      router.push(`kundali/${kid}`)
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

    if (field === "FirstName") {
      const newVal = value.replace(/^\w/, char => char.toUpperCase());
      setFormData(prev => ({
        ...prev,
        [field]: newVal
      }))
    }

    if (field === "Country") {
      // Clear the city data and reset selected city when the country changes
      setCityData([]); // Clear city options
      setFormData(prev => ({
        ...prev,
        CityID: null, // Reset the selected city
        [field]: value
      }));
      setErrors(prev => ({
        ...prev,
        ["CityID"]: true
      }))
      return; // Ensure that city is reset before proceeding
    }


    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleAddClose}
        maxWidth={false}  // 'xs', 'sm', 'md', 'lg', 'xl' or false for custom width
        fullWidth={false}  // Ensures the dialog takes up full width of the container
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleSubmit();
          },
          sx: {
            width: '700px', // Set your custom width here
            maxWidth: '100%', // Optional: prevent exceeding container width
          },
        }}
      >
        <DialogTitle className="PopupHeader text-white p-3 py-2">
          <div className='w-100' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className='text-primary text-2xl font-ea-sb !pl-3'>
              {!formData.isUpdate ? "New Kundali" : "Update Kundali"}
            </span>
            <IconButton
              aria-label="close"
              onClick={handleAddClose} // Replace with your close handler function
              sx={{
                color: 'white',
              }}
            >
              <i className='tabler-x text-primary'></i>
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid className='mt-2' container spacing={5}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="First Name"
                autoFocus
                inputRef={fnameRef}
                value={formData?.FirstName}
                size={TextFeildSize}
                onChange={e => {
                  handleInputChange('FirstName', e.target.value, 'FirstName');
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label='Middle Name'
                value={formData?.MiddleName}
                onChange={e => handleInputChange('MiddleName', e.target.value, 'MiddleName')}
                size={TextFeildSize}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label='Last Name'
                value={formData?.LastName}
                onChange={e => handleInputChange('LastName', e.target.value, 'LastName')}
                size={TextFeildSize}
              />
            </Grid>
            <Grid item xs={12} sm={4}
            // className='pt-6'
            >
              <FormControl fullWidth>
                <InputLabel id="Gender-select-label">Gender</InputLabel>
                <Select
                  labelId="Gender-select-label"
                  id="Gender-select"
                  value={formData?.Gender?.toLowerCase() || ''}
                  onChange={e => handleInputChange('Gender', e.target.value, 'Gender')}
                  label="Gender"
                  size={TextFeildSize}


                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}
              className='!pt-4'
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    selected={formData.date}
                    value={formData.date}
                    label="Birth Date"
                    name="startDate"
                    views={['year', 'month', 'day']}
                    format="DD-MM-YYYY"
                    onChange={date => {
                      handleInputChange('date', date, 'BirthDate')
                    }}
                  // sx={{
                  //   height: '2.5rem',
                  //   minHeight: '2.5rem',
                  //   '& .MuiInputBase-root': { height: '2.5rem' },
                  // }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4}
              className='!pt-4'
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}
              // size={TextFeildSize}
              >
                <DemoContainer components={['TimePicker']}
                >
                  <TimePicker
                    label="Birth Time"
                    ampm={false} // 24-hour format
                    views={['hours', 'minutes', 'seconds']}
                    format="HH:mm:ss"
                    value={formData.time}
                    onChange={date => handleInputChange('time', date, 'BirthTime', true)}
                  // sx={{
                  //   height: '2.5rem',
                  //   minHeight: '2.5rem',
                  //   '& .MuiInputBase-root': { height: '2.5rem' },
                  // }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                id='country-select'
                options={conutryData && conutryData}
                defaultValue={formData && formData.Country}
                getOptionLabel={(option) => option?.Country}
                getOptionKey={(option) => option?.CountryCode}
                onChange={(event, newValue) => handleInputChange('Country', newValue, 'Country', true)}
                renderInput={(params) => (
                  <TextField {...params} label='Country' variant='outlined'
                    {...(errors.Country && { error: true })}
                  />
                )}
                size={TextFeildSize}
              />
            </Grid>
            {/* <Grid item xs={12} sm={4}> */}
            {/* <div className='ps-3'>
                <div>{formData?.CityID?.Timezone}</div>
                <a href={`https://www.google.com/search?q=${formData?.CityID?.Latitude},${formData?.CityID?.Longitude}`} target='_blank'>
                <div>{formData?.CityID?.Latitude}, {formData?.CityID?.Longitude}</div>
                </a>
              </div> */}
            {/* <TextField
                fullWidth
                label='Timezone'
                // value={"UTC+05:30 > Asia/Kolkata"}
                InputProps={{
                  readOnly: true, // Makes the TextField read-only
                }}
                size={TextFeildSize}
                value={formData?.CityID?.Timezone}
              /> */}
            {/* </Grid> */}
            <Grid item xs={12} sm={8}>
              <Autocomplete
                id='city-autocomplete'
                options={cityData}
                value={formData.CityID || null}  // Ensure city is cleared when CityID is null
                getOptionLabel={(option) => option?.FormattedCity || ''}
                // onInputChange={(event, newQuery) => setQuery(newQuery)}
                onInputChange={(event, newQuery) => handleCityChange(newQuery)}
                onChange={(event, newValue) => handleInputChange('CityID', newValue, 'CityID', true)}
                renderInput={(params) => (
                  <TextField {...params} label='Place / Location' variant='outlined'
                    {...(errors.CityID && { error: true })}
                  />
                )}
                // renderOption={(props, option) => (
                //   <li {...props} className="custom-dropdown-item">
                //     <span className="text-red-200">{option?.FormattedCity}</span>
                //     <span className="text-blue">{option?.Timezone}</span>
                //   </li>
                // )}
                filterOptions={(x) => x} // Disable frontend filtering
                size={TextFeildSize}
              />

            </Grid>
            <Grid item xs={12} sm={4}>
              <div className='ps-3'>
                <div>{formData?.CityID?.Timezone}</div>
                <a href={`https://www.google.com/search?q=${formData?.CityID?.Latitude},${formData?.CityID?.Longitude}`} target='_blank'>
                  <div>{formData?.CityID?.Latitude}, {formData?.CityID?.Longitude}</div>
                </a>
              </div>
              {/* <TextField
                fullWidth
                label='Lat, Lng '
                size={TextFeildSize}
                // placeholder='John'
                value={formData?.CityID?.Timezone}
                InputProps={{
                  readOnly: true, // Makes the TextField read-only
                }}
              // onChange={e => handleInputChange('MiddleName', e.target.value, 'MiddleName')}
              // onChange={e => setFormData({ ...formData, MiddleName: e.target.value })}
              // {...(errors.MiddleName && { error: true, helperText: 'MiddleName is required.' })}
              /> */}
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Reference"
                // inputRef={fnameRef}
                value={formData?.Reference}
                size={TextFeildSize}
                onChange={e => handleInputChange('Reference', e.target.value, 'Reference')}
              // sx={{
              //   '& .MuiInputBase-root': {
              //     height: '30px', // Adjust height
              //   },
              //   '& .MuiInputBase-input': {
              //     padding: '0 10px', // Adjust padding inside the text field
              //     fontSize: '14px', // Adjust font size
              //     border:'2px solid red'
              //   },
              //   '& .MuiInputLabel-root': {
              //     padding:'4px'
              //     // fontSize: '12px', // Adjust label font size if needed
              //   },
              // }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="group-select-label">Group</InputLabel>
                <Select
                  labelId="group-select-label"
                  fullWidth
                  id="group-select"
                  label="Group"
                  value={formData?.Group}
                  onChange={e => handleInputChange('Group', e.target.value, 'Group')}
                  size={TextFeildSize}
                >
                  {GroupData.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Remark"
                // inputRef={fnameRef}
                value={formData?.Remark}
                onChange={e => {
                  handleInputChange('Remark', e.target.value, 'Remark');
                }}
                size={TextFeildSize}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' style={{ textWrap: "nowrap" }} disabled={isDisable} onClick={handlePreview} >
            {isDisable ? <>
              <CircularProgress size={14} aria-label="Wait" />
              <span style={{ marginLeft: 8 }}>Saving</span>
            </> : 'Save & Preview'}
          </Button>
          <Button variant='contained' type='submit' disabled={isDisable} >
            {isDisable ? <>
              <CircularProgress size={14} aria-label="Wait" />
              <span style={{ marginLeft: 8 }}>Saving</span>
            </> : 'Save'}
          </Button>

          <Button variant='contained' className='bg-secondary' onClick={handleAddClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddKundliPopUp
