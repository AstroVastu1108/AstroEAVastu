import React, { useEffect, useState } from 'react'
import { Autocomplete, Button, Card, CardContent, CardHeader, CircularProgress, debounce, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { useAuth } from '@/@core/contexts/authContext';
import { getCities, getCountries, getReport } from '@/app/Server/API/common';
import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer';
import { useRouter } from 'next/navigation';
import AppReactDatepicker from '@/components/datePicker/AppReactDatepicker';
import { CreateKundli } from '@/app/Server/API/kundliAPI';
import "./addKundli.css"

function AddKundliPopUp({ open, handleAddClose, getAllKundli }) {

  const [isDisable, setIsDisable] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    gender: 'Male',
    date: null,
    country: { iso2: 'IN', name: 'India' },
    time: null,
    city: 'A1AE28185ED49D47211760BF32D40EB742C84998'
  })

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
  })
  const [conutryData, setConutryData] = useState([
    { iso2: 'IN', name: 'India' }
  ])
  const [cityData, setCityData] = useState([{
    "CityID": "A1AE28185ED49D47211760BF32D40EB742C84998",
    "FormattedCity": "Surat, Gujarat"
  }])

  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const now = new Date();
    console.log(now)
    setUserData((prev) => ({ ...prev, ["date"]: now, ["time"]: now }))
    setCurrentTime(now);
  }, []);

  const fetchData = async () => {
    try {
      const response = await getCountries()
      if (response.hasError) {
        return toastDisplayer("error", response.error)
      }
      const result = await response.responseData
      setConutryData(result.Result.Countries)
    } catch (error) {
      return toastDisplayer("error", `There was a problem with the fetch operation: ${error}`)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const router = useRouter()
  const [query, setQuery] = useState('')

  const fetchCities = debounce(async (query) => {
    if (query.length > 1 && userData.country) {
      try {
        const iso2 = userData.country.iso2
        const response = await getCities(iso2, query)
        if (response.hasError) {
          return toastDisplayer("error", response.error)
        }
        const result = await response.responseData
        setCityData(result.Result.Cities || [])
      } catch (error) {
        return toastDisplayer("error", `There was a problem with the fetch operation:${error}`)
      }
    }
  }, 300) // Debounce API requests by 300ms

  // Use effect to fetch cities when the query changes
  useEffect(() => {
    fetchCities(query)
  }, [query])

  const handleSubmit = async () => {
    // event.preventDefault()
    const birthDate = userData.date ? new Date(userData.date).toLocaleDateString('en-GB').split('/').join('-') : null

    const birthTime = userData.time ? new Date(userData.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }).replace(/:/g, '') : null;

    const formattedData = {
      FirstName: userData.firstName,
      LastName: userData.lastName,
      MiddleName: userData.middleName,
      Gender: userData.gender,
      Country: userData.country.name,
      CityID: userData.city,
      BirthDate: birthDate,
      BirthTime: birthTime,
      Prakriti: userData.prakriti || ''
    }

    try {
      setIsDisable(true)
      if (formattedData.FirstName.trim("") == "") {
        return console.log("prashna kundli")
      }
      const response = await CreateKundli(formattedData)

      if (response.hasError) {
        setIsDisable(false)
        return toastDisplayer("error", response.error)
      }
      var kId = response?.responseData?.Result?.KundaliID;
      setIsDisable(false)
      getAllKundli();
      handleAddClose();
      toastDisplayer("success", `kundli data is saved successfully.`)
      return kId;
    } catch (error) {
      setIsDisable(false)
      console.error('There was an error submitting the form:', error)
    }
  }

  const handlePreview = async () => {
    const kid = await handleSubmit();
    router.push(`kundli/preview?kid=${kid}`)
  }

  const handleInputChange = (field, value, key) => {
    console.log(value)
    setUserData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleAddClose}
        maxWidth="sm"   // 'xs', 'sm', 'md', 'lg', 'xl' or false for custom width
        fullWidth={true}  // Ensures the dialog takes up full width of the container
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleSubmit();
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
              onClick={handleAddClose} // Replace with your close handler function
              sx={{
                color: 'white',
              }}
            >
              <i className='tabler-x'></i>
            </IconButton>
          </div>
          <DialogContentText className="text-white">
            Enter the required information to create a new Kundli.
          </DialogContentText>
        </DialogTitle>
        <DialogContent>
          <Grid className='mt-2' container spacing={5}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="First Name"
                value={userData?.firstName}
                onChange={e => {
                  const inputValue = e.target.value;
                  const capitalizedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
                  handleInputChange('firstName', capitalizedValue, 'FirstName');
                }}
              // {...(errors.FirstName && { error: true, helperText: 'FirstName is required.' })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label='Middle Name'
                // placeholder='John'
                value={userData?.middleName}
                onChange={e => handleInputChange('middleName', e.target.value, 'MiddleName')}
              // onChange={e => setUserData({ ...userData, middleName: e.target.value })}
              // {...(errors.MiddleName && { error: true, helperText: 'MiddleName is required.' })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label='Last Name'
                // placeholder='Doe'
                value={userData?.lastName}
                onChange={e => handleInputChange('lastName', e.target.value, 'LastName')}
              // onChange={e => setUserData({ ...userData, lastName: e.target.value })}
              // {...(errors.LastName && { error: true, helperText: 'LastName is required.' })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                  labelId="gender-select-label"
                  id="gender-select"
                  value={userData?.gender || ''}
                  onChange={e => handleInputChange('gender', e.target.value, 'Gender')}
                  label="Gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <AppReactDatepicker
                selected={currentTime}
                defaultValue={currentTime}
                value={userData.date}
                showYearDropdown
                showMonthDropdown
                onChange={date => {
                  handleInputChange('date', date, 'BirthDate')
                }}
                placeholderText='dd-MM-yyyy'
                dateFormat="dd-MM-yyyy"
                customInput={
                  <TextField
                    value={userData.date}
                    onChange={date => handleInputChange('date', date, 'BirthDate')}
                    fullWidth
                    label='Date Of Birth'
                  // {...(errors.BirthDate && { error: true, helperText: 'BirthDate is required.' })}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <AppReactDatepicker
                showTimeSelect
                showTimeSelectOnly
                timeFormat="HH:mm"
                dateFormat="HH:mm"
                timeIntervals={1}
                id="time-only-picker"
                selected={userData.time}
                // defaultValue={currentTime}
                value={userData.time}
                onChange={date => handleInputChange('time', date, 'BirthTime')}
                customInput={
                  <TextField
                    label="Time Of Birth"
                    fullWidth
                    onChange={date => handleInputChange('time', date, 'BirthTime')}
                  // {...(errors.BirthTime && { error: true, helperText: 'BirthTime is required.' })}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>

              <Autocomplete
                id='country-select'
                options={conutryData}
                defaultValue={
                  { iso2: 'IN', name: 'India' }
                }
                getOptionLabel={(option) => option.name}
                getOptionKey={(option) => option.iso2}
                onChange={(event, newValue) => handleInputChange('country', newValue, 'Country')}
                renderInput={(params) => (
                  <TextField {...params} label='Select Country' variant='outlined'
                    {...(errors.Country && { error: true, helperText: 'Country is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id='city-autocomplete'
                options={cityData}
                // value={cityData.find(city => city.CityID === "A1AE28185ED49D47211760BF32D40EB742C84998") || null}
                defaultValue={{
                  "CityID": "A1AE28185ED49D47211760BF32D40EB742C84998",
                  "FormattedCity": "Surat, Gujarat"
                }}
                getOptionLabel={(option) => option.FormattedCity || ''}
                onInputChange={(event, newQuery) => setQuery(newQuery)}
                onChange={(event, newValue) => handleInputChange('city', newValue.CityID, 'CityID')}
                renderInput={(params) => (
                  <TextField {...params} label='Select City' variant='outlined'
                  // {...(errors.CityID && { error: true, helperText: 'City is required.' })}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
        <Button variant='contained' disabled={isDisable} onClick={handlePreview} >
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
