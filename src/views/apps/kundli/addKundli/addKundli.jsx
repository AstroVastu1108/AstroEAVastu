import React, { useEffect, useState } from 'react'
import { Autocomplete, Button, Card, CardContent, CardHeader, CircularProgress, debounce, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormHelperText, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { useAuth } from '@/@core/contexts/authContext';
import { getCities, getCountries, getReport } from '@/app/Server/API/common';
import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer';
import { useRouter } from 'next/navigation';
import AppReactDatepicker from '@/components/datePicker/AppReactDatepicker';
import { CreateKundli } from '@/app/Server/API/kundliAPI';

function AddKundliPopUp({ open, handleAddClose, getAllKundli }) {

  const [isDisable, setIsDisable] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    gender: 'male',
    date: null,
    country: '',
    time: null,
    city: ''
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
  const [conutryData, setConutryData] = useState([])
  const [cityData, setCityData] = useState([])
  const { setKundliData } = useAuth()
  useEffect(() => {
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

    fetchData()
  }, [])
  const router = useRouter()

  const [filteredCities, setFilteredCities] = useState([]);
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

    const birthTime = userData.time ? new Date(userData.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).replace(/:/g, '') : null;

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

    let isValid = true;
    Object.keys(formattedData).forEach(key => {
      if (!formattedData[key] && key != 'Prakriti') {
        isValid = false;
        return setErrors(prev => ({
          ...prev,
          [key]: true
        }))
        // return toastDisplayer("error", `${key} is required`)
      }
    });
    try {
      setIsDisable(true)
      if (isValid) {
        const response = await CreateKundli(formattedData)

        if (response.hasError) {
          setIsDisable(false)
          return toastDisplayer("error", response.error)
        }
        var kId = response?.responseData?.Result?.KundaliID;
        setIsDisable(false)
        getAllKundli();
        handleAddClose();
        // setKundliData(resData?.Result)
        // router.push('kundli/preview')
        toastDisplayer("success", `kundli data is saved successfully.`)
        return kId;
      } else {
        setIsDisable(false)
      }
    } catch (error) {
      setIsDisable(false)
      console.error('There was an error submitting the form:', error)
    }
  }

  const handlePreview = async()=>{
    const kid = await handleSubmit();
    router.push(`kundli/preview?kid=${kid}`)
  }

  // const handleReset = () => {
  //   setErrors({
  //     FirstName: false,
  //     LastName: false,
  //     MiddleName: false,
  //     Gender: false,
  //     BirthDate: false,
  //     Country: false,
  //     BirthTime: false,
  //     CityID: false,
  //     Prakriti: false
  //   })
  //   setUserData({
  //     firstName: '',
  //     lastName: '',
  //     middleName: '',
  //     gender: 'male',
  //     date: null,
  //     country: '',
  //     time: null,
  //     city: ''
  //   })
  // }

  const handleInputChange = (field, value, key) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }))
    return setErrors(prev => ({
      ...prev,
      [key]: false
    }))
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleAddClose}
        maxWidth="md"   // 'xs', 'sm', 'md', 'lg', 'xl' or false for custom width
        fullWidth={true}  // Ensures the dialog takes up full width of the container
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleSubmit();
          },
        }}
      >
        <DialogTitle>Add Kundli</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the required information to create a new Kundli.
          </DialogContentText>

          {/* <form  onSubmit={handleSubmit}> */}
          <Grid className='mt-4' container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='First Name'
                // placeholder='John'
                value={userData?.firstName}
                // onChange={e => setUserData({ ...userData, firstName: e.target.value })}
                onChange={e => handleInputChange('firstName', e.target.value, 'FirstName')}
                {...(errors.FirstName && { error: true, helperText: 'FirstName is required.' })}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Middle Name'
                // placeholder='John'
                value={userData?.middleName}
                onChange={e => handleInputChange('middleName', e.target.value, 'MiddleName')}
                // onChange={e => setUserData({ ...userData, middleName: e.target.value })}
                {...(errors.MiddleName && { error: true, helperText: 'MiddleName is required.' })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Last Name'
                // placeholder='Doe'
                value={userData?.lastName}
                onChange={e => handleInputChange('lastName', e.target.value, 'LastName')}
                // onChange={e => setUserData({ ...userData, lastName: e.target.value })}
                {...(errors.LastName && { error: true, helperText: 'LastName is required.' })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby='demo-radio-buttons-group-label'
                value={userData?.gender || 'male'}
                onChange={e => handleInputChange('gender', e.target.value, 'Gender')}
                // onChange={e => setUserData({ ...userData, gender: e.target.value })}
                name='radio-buttons-group'
              >
                <FormControlLabel value='male' control={<Radio />} label='Male' />
                <FormControlLabel value='female' control={<Radio />} label='Female' />
                <FormControlLabel value='other' control={<Radio />} label='Other' />
              </RadioGroup>
              {errors.Gender && <FormHelperText error>Gender is required.</FormHelperText>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppReactDatepicker
                selected={userData.date}
                value={userData.date}
                showYearDropdown
                showMonthDropdown
                onChange={date => handleInputChange('date', date, 'BirthDate')}
                // onChange={(date) => setUserData({ ...userData, date })}
                placeholderText='MM/DD/YYYY'
                customInput={
                  <TextField
                    value={userData.date}
                    onChange={date => handleInputChange('date', date, 'BirthDate')}
                    // onChange={(date) => setUserData({ ...userData, date })}
                    fullWidth
                    label='Date Of Birth'
                    {...(errors.BirthDate && { error: true, helperText: 'BirthDate is required.' })}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppReactDatepicker
                showTimeSelect
                showTimeSelectOnly
                dateFormat="h:mm:ss aa" // Format including seconds
                timeFormat="h:mm:ss aa" // Time format including seconds
                timeIntervals={1} // Allows minute-by-minute selection
                id="time-only-picker"
                selected={userData.time}
                value={userData.time}
                onChange={date => handleInputChange('time', date, 'BirthTime')}
                // onChange={(date) => setTime(date)} // Update the state with the selected time
                customInput={
                  <TextField
                    label="Time Only"
                    fullWidth
                    onChange={date => handleInputChange('time', date, 'BirthTime')}
                    {...(errors.BirthTime && { error: true, helperText: 'BirthTime is required.' })}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>

              <Autocomplete
                id='country-select'
                options={conutryData}
                defaultValue={conutryData && (conutryData.find((option) => option.iso2 === "IN"))}
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
                getOptionLabel={(option) => option.FormattedCity || ''}
                onInputChange={(event, newQuery) => setQuery(newQuery)}
                onChange={(event, newValue) => handleInputChange('city', newValue.CityID, 'CityID')}
                renderInput={(params) => (
                  <TextField {...params} label='Select City' variant='outlined'
                    {...(errors.CityID && { error: true, helperText: 'City is required.' })}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button variant='outlined' type='submit' disabled={isDisable} >
            {isDisable ? <CircularProgress size={5} aria-label='Wait' content='Saving' /> : 'Save'}
          </Button>
          <Button variant='contained' disabled={isDisable} onClick={handlePreview} >
            {isDisable ? <CircularProgress size={5} aria-label='Wait' content='Saving' /> : 'Save & Preview'}
          </Button>
          {/* <div className='submit-btn'>

            <Button variant='contained' className='mt-4' type='reset' color='secondary' onClick={handleReset}>
              Reset
            </Button>
            <Button variant='contained' className='mt-4 d-flex justify-content-end' type='submit' disabled={isDisable} onClick={handleSubmit} >
              {isDisable ? <CircularProgress size={5} /> : 'Submit'}
            </Button>
          </div> */}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddKundliPopUp
