'use client'
// import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer'
import { useAuth } from '@/@core/contexts/authContext'
import { getCities, getCountries } from '@/app/Server/API/common'
import { GetConfig, SaveConfig } from '@/app/Server/API/configuration'
import Loader from '@/components/common/Loader/Loader'
import PageTitle from '@/components/common/PageTitle/PageTitle'
import { LoadingButton } from '@mui/lab'
import { Autocomplete, Box, Card, CardContent, debounce, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./settings.css";

function Settings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false)
  const [conutryData, setConutryData] = useState([])
  const [configureID, setConfigureID] = useState("")
  const [selectedCountry, setSelectedCountry] = useState({ CountryCode: 'IN', Country: 'India' })
  const [selectedCity, setSelectedCity] = useState({
    "CityID": 1255364,
    "FormattedCity": "Surat, Gujarat"
  })
  const [cityData, setCityData] = useState([{
    "CityID": 1255364,
    "FormattedCity": "Surat, Gujarat"
  }])
  const fetchData = async () => {
    try {
      const response = await getCountries()
      if (response.hasError) {
        // return toastDisplayer("error", response.error)
      }
      const result = await response.responseData
      setConutryData(result.Result.Countries)
    } catch (error) {
      // return toastDisplayer("error", `There was a problem with the fetch operation: ${error}`)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [query, setQuery] = useState('')

  const fetchCities = debounce(async (query) => {
    if (query.length > 1 && selectedCountry) {
      try {
        const CountryCode = selectedCountry.CountryCode
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
  }, 300)

  useEffect(() => {
    fetchCities(query)
  }, [query])

  const fetchConfig = async (id) => {
    const res = await GetConfig();
    if (res.hasError) {
      setLoading(false);
      // return toastDisplayer("error", res.error);
    } else {
      setLoading(false);
      const response = res.responseData
      if (response?.Country?.iso2) {
        setConfigureID(response.ConfigureID)
        setSelectedCountry({
          "CountryCode": response?.Country?.iso2,
          "Country": response?.Country?.name
        })
        setSelectedCity({
          "FormattedCity": response?.City?.FormattedCity,
          "CityID": response?.City?.CityID
        })
      } else {
        setSelectedCountry({ CountryCode: 'IN', Country: 'India' })
        setSelectedCity({
          "CityID": 1255364,
          "FormattedCity": "Surat, Gujarat"
        })

      }
      // setSelectedCountry({
      //     "CountryCode": response?.Country?.CountryCode,
      //     "name": response?.Country?.name
      // })
      // setSelectedCity({
      //     "FormattedCity": response?.City?.FormattedCity,
      //     "CityID": response?.City?.CityID
      // })
    }
  }
  useEffect(() => {
    fetchConfig(user?.transactionID)
  }, [])

  const handleSave = async () => {
    setLoading(true);
    const res = await SaveConfig(configureID, user?.transactionID, selectedCity, selectedCountry);
    if (res.hasError) {
      setLoading(false);
      // return toastDisplayer("error", res.error);
    } else {
      return setLoading(false);
      // return toastDisplayer("success", "Configuration updated.");
    }
  }
  return (
    <>
      {loading && <Loader />}
      <Card>
        <PageTitle title={"Settings"} endCmp={
          <>
            <div>
              <LoadingButton
                //   fullWidth
                variant='contained'
                onClick={handleSave}
                loading={loading}
                loadingPosition="start"
                type='submit'
                sx={{
                  width: "150px"
                }}
              >
                Save
              </LoadingButton>
            </div>
          </>
        } />
      </Card>
      {/* <div className='flex'> */}
      <Grid container spacing={2} paddingTop={2}>


        {/* Right Side: Billing Information */}
        <Grid item md={6}>
          <Card elevation={3}>
            <div className="px-4 py-6 flex flex-col gap-4">
              <div>
                <span className="text-primary font-ea-sb">Billing Information</span>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <TextField fullWidth label="First Name" title="First Name" />
                </div>
                <div className="w-1/2">
                  <TextField fullWidth label="Middle Name" title="Middle Name" />
                </div>

              </div>
              <div className=" flex gap-4">
                <div className="w-1/2">
                  <TextField fullWidth label="Last Name" title="Last Name" />
                </div>
                <div className="w-1/2">
                  <TextField fullWidth label="Building" title="Building" />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <TextField fullWidth label="LAN" title="LAN" />
                </div>
                <div className="w-1/2">
                  <TextField fullWidth label="Area" title="Area" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <TextField fullWidth label="Pincode" title="Pincode" />
                </div>
                <div className="w-1/2">
                  <TextField fullWidth label="GSTIN" title="GSTIN" />
                </div>
              </div>

              <div className="flex-col flex gap-4">
                <Autocomplete
                  fullWidth
                  id="country-select"
                  options={conutryData}
                  value={selectedCountry || null}
                  getOptionLabel={(option) => option?.Country}
                  onChange={(event, newValue) => setSelectedCountry(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Country" variant="outlined" />
                  )}
                />
                <Autocomplete
                  fullWidth
                  id="city-autocomplete"
                  options={cityData}
                  value={selectedCity || null}
                  getOptionLabel={(option) => option?.FormattedCity || ''}
                  onInputChange={(event, newQuery) => setQuery(newQuery)}
                  onChange={(event, newValue) => setSelectedCity(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="City" variant="outlined" />
                  )}
                />
              </div>

            </div>
          </Card>
        </Grid>
        {/* Left Side: General Setting and Report Information */}
        <Grid item md={6} container spacing={2} direction="column">
          {/* General Setting */}
          <Grid item>
            <Card elevation={3}>
              <div className="px-4 py-6 flex flex-col gap-4">
                <div>
                  <span className="text-primary font-ea-sb">General Setting</span>
                </div>
                <div className="flex flex-col gap-4">
                  <Autocomplete
                    fullWidth
                    id="country-select"
                    options={conutryData}
                    value={selectedCountry || null}
                    getOptionLabel={(option) => option?.Country}
                    onChange={(event, newValue) => setSelectedCountry(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} label="Default Country" variant="outlined" />
                    )}
                  />
                  <Autocomplete
                    fullWidth
                    id="city-autocomplete"
                    options={cityData}
                    value={selectedCity || null}
                    getOptionLabel={(option) => option?.FormattedCity || ''}
                    onInputChange={(event, newQuery) => setQuery(newQuery)}
                    onChange={(event, newValue) => setSelectedCity(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} label="Default City" variant="outlined" />
                    )}
                  />
                </div>
              </div>
            </Card>
          </Grid>

          {/* Report Information */}
          <Grid item>
            <Card elevation={3}>
              <div className="px-4 py-6 flex flex-col gap-4">
                <div>
                  <span className="text-primary font-ea-sb">Report Information</span>
                </div>
                <div className="flex-col flex gap-4">
                  <TextField
                    fullWidth
                    label="Company Name"
                    title="Company Name"
                  />
                  <div className="">
                    {/* <div className="w-[50%]"> */}
                    <label className="uplaod_btn" htmlFor="file_upload">
                      <i className="ri-upload-2-fill"></i>
                      Upload company logo.
                    </label>
                    <input
                      type="file"
                      id="file_upload"
                      style={{ display: "none" }}
                      accept="image/png, image/jpeg"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <TextField fullWidth label="Signature 1 Name" title="Signature 1 Name" />
                  </div>
                  <div className="w-1/2">
                    <TextField fullWidth label="Signature 1 Title" title="Signature 1 Title" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <TextField fullWidth label="Signature 2 Name" title="Signature 2 Name" />
                  </div>
                  <div className="w-1/2">
                    <TextField fullWidth label="Signature 2 Title" title="Signature 2 Title" />
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Grid>


    </>
  )
}

export default Settings
