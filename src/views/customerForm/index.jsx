'use client'
import * as React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { Card, CardHeader, FormControlLabel, CardContent, FormLabel, Radio, RadioGroup, FormControl, InputLabel, Select, debounce } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import FloatingTextField from '@/components/common/FloatingTextField'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import AppReactDatepicker from '../../components/datePicker/AppReactDatepicker'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/@core/contexts/authContext'

import CircularProgress from '@mui/material/CircularProgress';
import { DatePicker } from '@mui/x-date-pickers'
import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer'
import { getCities, getCountries, getReport } from '@/app/Server/API/common'

const CustomerForm = () => {

  const [isDisable, setIsDisable] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    gender:'male',
    date: null,
    country: '',
    time: null,
    city: ''
  })
  const [conutryData, setConutryData] = useState([])
  const [cityData, setCityData] = useState([])
  const { setKundliData } = useAuth()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCountries()
        if(response.hasError){
          return toastDisplayer("error",response.error)
        }
        console.log("response : ",response)
        const result = await response.responseData
        setConutryData(result.Result.Countries)
      } catch (error) {
        return toastDisplayer("error",`There was a problem with the fetch operation: ${error}`)
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
        const response = await getCities(iso2,query)
        if (response.hasError) {
          return toastDisplayer("error",response.error)
        }
        const result = await response.responseData
        setCityData(result.Result.Cities || [])
      } catch (error) {
        return toastDisplayer("error",`There was a problem with the fetch operation:${error}`)
      }
    }
  }, 300) // Debounce API requests by 300ms

  // Use effect to fetch cities when the query changes
  useEffect(() => {
    fetchCities(query)
  }, [query])

  const handleSubmit = async event => {
    event.preventDefault()
    const birthDate = userData.date ? new Date(userData.date).toLocaleDateString('en-GB').split('/').join('-') : null

    const birthTime = userData.time ? userData.time.format('HH:mm').replace(':', '') : null

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
      return toastDisplayer("error",`${key} is required`)
    }
  });
    try {
      setIsDisable(true)
      if(isValid){
        const response = await getReport(formattedData)
  
        if (response.hasError) {
          setIsDisable(false)
          return toastDisplayer("error",response.error)
        }
        console.log("ress : ",response.responseData)
        var resData = response.responseData
        setIsDisable(false)
        setKundliData(resData?.Result)
        router.push('/kundli/preview')
        toastDisplayer("success",`kundli data is getting successfully..\nyou will be redirecting to preview page shortly.`)
      }else{
        setIsDisable(false)
      }
    } catch (error) {
      setIsDisable(false)
      console.error('There was an error submitting the form:', error)
    }
  }

  return (
    <Card>
      <CardHeader title='Add Customer Information' />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FloatingTextField
                fullWidth
                label='First Name'
                // placeholder='John'
                value={userData?.firstName}
                onChange={e => setUserData({ ...userData, firstName: e.target.value })}
                {...(true && { error: true, helperText: 'This field is required.' })}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FloatingTextField
                fullWidth
                label='Middle Name'
                // placeholder='John'
                value={userData?.middleName}
                onChange={e => setUserData({ ...userData, middleName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FloatingTextField
                fullWidth
                label='Last Name'
                // placeholder='Doe'
                value={userData?.lastName}
                onChange={e => setUserData({ ...userData, lastName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby='demo-radio-buttons-group-label'
                value={userData?.gender || 'male'}
                onChange={e => setUserData({ ...userData, gender: e.target.value })}
                name='radio-buttons-group'
              >
                <FormControlLabel value='male' control={<Radio />} label='Male' />
                <FormControlLabel value='female' control={<Radio />} label='Female' />
                <FormControlLabel value='other' control={<Radio />} label='Other' />
              </RadioGroup>
            </Grid>

            <Grid item xs={12} sm={6}>
              {/* <AppReactDatepicker
                selected={userData.date}
                showYearDropdown
                showMonthDropdown
                onChange={date => setUserData({ ...userData, date })}
                placeholderText='DD/MM/YYYY'
                customInput={<CustomTextField fullWidth label='Birth Date' placeholder='DD-MM-YYYY' />}
              /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Birth Date"
                  className='w-[570px]'
                  value={userData.date}
                  onChange={(date) => setUserData({ ...userData, date })}
                  renderInput={(params) => <CustomTextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                  <TimePicker
                    className='w-[570px]'
                    label='Birth Time'
                    value={userData.time}
                    onChange={time => setUserData({ ...userData, time })}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <CustomTextField
                select
                fullWidth
                label='Country'
                value={userData.country}
                onChange={e => setUserData({ ...userData, country: e.target.value })}
              >
                {conutryData.map((country, index) => (
                  <MenuItem key={index} value={country}>
                    {country.name}
                  </MenuItem>
                ))}
              </CustomTextField> */}
              <FormControl fullWidth>
                <InputLabel id="country-select-label">Country</InputLabel>
                <Select
                  labelId="country-select-label"
                  id="country-select"
                  value={userData.country || ''}
                  onChange={e => setUserData({ ...userData, country: e.target.value })}
                  label="Country"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {conutryData.map((country, index) => (
                    <MenuItem key={index} value={country}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
                {/* You can add a FormHelperText here if needed for validation messages */}
                {/* <FormHelperText>Required</FormHelperText> */}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              {/* <Autocomplete
                id='city-autocomplete'
                options={cityData.map(city => city.FormattedCity)}
                value={userData.city}
                onChange={(event, newValue) => {
                  setUserData({ ...userData, city: newValue })
                }}
                renderInput={params => <TextField {...params} label='Select City' />}
              /> */}
            <Autocomplete
      id='city-autocomplete'
      options={cityData}
      getOptionLabel={(option) => option.FormattedCity || ''}
      onInputChange={(event, newQuery) => setQuery(newQuery)}
      onChange={(event, newValue) => {
        if (newValue) {
          // Store the CityID in userData.city
          setUserData({ ...userData, city: newValue.CityID })
        }
      }}
      renderInput={(params) => (
        <TextField {...params} label='Select City' variant='outlined' />
      )}
    />
            </Grid>
          </Grid>
          {/* <Button variant='contained' className='mt-4' onClick={handleSubmit} type='submit'>
            Submit
          </Button> */}
          <Button fullWidth variant='contained' className='mt-4' type='submit' disabled={isDisable} onClick={handleSubmit}>
            {isDisable ? <CircularProgress size={5} /> : 'Submit'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default CustomerForm
