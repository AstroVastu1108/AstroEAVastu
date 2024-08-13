'use client'
import * as React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { Card, CardHeader, FormControlLabel, CardContent, FormLabel, Radio, RadioGroup } from '@mui/material'
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

const CustomerForm = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
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
        const response = await fetch('https://api.astrovastu.app/geo/countries')
        const result = await response.json()

        if (result?.Result?.Countries && Array.isArray(result.Result.Countries)) {
          setConutryData(result.Result.Countries)
        } else {
          console.error('Expected an array of countries but got:', result)
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
      }
    }

    fetchData()
  }, [])
  const router = useRouter()
  useEffect(() => {
    const fetchCities = async () => {
      if (userData.country) {
        try {
          const iso2 = userData.country.iso2
          const response = await fetch(`https://api.astrovastu.app/geo/city/${iso2}/Surat`)
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          const result = await response.json()
          setCityData(result.Result.Cities)
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error)
        }
      }
    }

    fetchCities()
  }, [userData.country])

  const handleSubmit = async event => {
    event.preventDefault()

    const cityID = cityData.find(city => city.FormattedCity === userData.city)?.CityID
    const birthDate = userData.date ? new Date(userData.date).toLocaleDateString('en-GB').split('/').join('-') : null

    const birthTime = userData.time ? userData.time.format('HH:mm').replace(':', '') : null

    console.log({ birthDate, birthTime })

    const formattedData = {
      FirstName: userData.firstName,
      LastName: userData.lastName,
      MiddleName: userData.middleName,
      Gender: userData.gender,
      Country: userData.country.name,
      CityID: cityID,
      BirthDate: birthDate,
      BirthTime: birthTime,
      Prakriti: userData.prakriti || ''
    }

    try {
      const response = await axios.post('https://api.astrovastu.app/astro/astro-vastu-report',
        formattedData)

      if (!response) {
        const errorText = await response.text()
        throw new Error(`Failed to submit the form: ${errorText}`)
      } 
      console.log("?.result : ",response?.data);
      setKundliData(response?.data?.Result)
      router.push('/kundli/preview')

      console.log('Form submitted successfully')
    } catch (error) {
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
                placeholder='John'
                value={userData?.firstName}
                onChange={e => setUserData({ ...userData, firstName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FloatingTextField
                fullWidth
                label='Middle Name'
                placeholder='John'
                value={userData?.middleName}
                onChange={e => setUserData({ ...userData, middleName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FloatingTextField
                fullWidth
                label='Last Name'
                placeholder='Doe'
                value={userData?.lastName}
                onChange={e => setUserData({ ...userData, lastName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby='demo-radio-buttons-group-label'
                value={userData?.gender || 'female'}
                onChange={e => setUserData({ ...userData, gender: e.target.value })}
                name='radio-buttons-group'
              >
                <FormControlLabel value='female' control={<Radio />} label='Female' />
                <FormControlLabel value='male' control={<Radio />} label='Male' />
                <FormControlLabel value='other' control={<Radio />} label='Other' />
              </RadioGroup>
            </Grid>

            <Grid item xs={12} sm={6}>
              <AppReactDatepicker
                selected={userData.date}
                showYearDropdown
                showMonthDropdown
                onChange={date => setUserData({ ...userData, date })}
                placeholderText='MM/DD/YYYY'
                customInput={<CustomTextField fullWidth label='Birth Date' placeholder='MM-DD-YYYY' />}
              />
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
              <CustomTextField
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
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                id='city-autocomplete'
                options={cityData.map(city => city.FormattedCity)}
                value={userData.city}
                onChange={(event, newValue) => {
                  setUserData({ ...userData, city: newValue })
                }}
                renderInput={params => <TextField {...params} label='Select City' />}
              />
            </Grid>
          </Grid>
          <Button variant='contained' className='mt-4' onClick={handleSubmit} type='submit'>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default CustomerForm
