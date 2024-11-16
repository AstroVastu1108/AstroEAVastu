'use client'
import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer'
import { useAuth } from '@/@core/contexts/authContext'
import { getCities, getCountries } from '@/app/Server/API/common'
import { GetConfig, SaveConfig } from '@/app/Server/API/configuration'
import Loader from '@/components/common/Loader/Loader'
import PageTitle from '@/components/common/PageTitle/PageTitle'
import { LoadingButton } from '@mui/lab'
import { Autocomplete, Box, Card, CardContent, debounce, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

function Settings() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false)
    const [conutryData, setConutryData] = useState([])
    const [configureID, setConfigureID] = useState("")
    const [selectedCountry, setSelectedCountry] = useState({ iso2: 'IN', name: 'India' })
    const [selectedCity, setSelectedCity] = useState({
        "CityID": "A1AE28185ED49D47211760BF32D40EB742C84998",
        "FormattedCity": "Surat, Gujarat"
    })
    const [cityData, setCityData] = useState([{
        "CityID": "A1AE28185ED49D47211760BF32D40EB742C84998",
        "FormattedCity": "Surat, Gujarat"
    }])
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

    const [query, setQuery] = useState('')

    const fetchCities = debounce(async (query) => {
        if (query.length > 1 && selectedCountry) {
            try {
                const iso2 = selectedCountry.iso2
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
    }, 300)

    useEffect(() => {
        fetchCities(query)
    }, [query])

    const fetchConfig = async (id) => {
        const res = await GetConfig();
        console.log("response : ",res)
        if (res.hasError) {
            setLoading(false);
            return toastDisplayer("error", res.error);
        } else {
            setLoading(false);
            const response = res.responseData
            setConfigureID(response.ConfigureID)
            setSelectedCountry({
                "iso2": response.Country?.iso2,
                "name": response.Country?.name
            })
            setSelectedCity({
                "FormattedCity": response.City?.FormattedCity,
                "CityID": response.City?.CityID
            })
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
            return toastDisplayer("error", res.error);
        } else {
            return setLoading(false);
            // return toastDisplayer("success", "Configuration updated.");
        }
    }
    return (
        <>
            {loading && <Loader />}
            <Card>
                <PageTitle title={"Configurations"} />
                <div style={{ display: "flex", flexDirection: "row", gap: "10px", padding: "6px" }}>
                    <Autocomplete
                        fullWidth
                        id='country-select'
                        options={conutryData}
                        value={selectedCountry || null}
                        // defaultValue={selectedCountry || null}
                        getOptionLabel={(option) => option?.name}
                        getOptionKey={(option) => option?.iso2}
                        onChange={(event, newValue) => {
                            if (newValue) {
                                setSelectedCountry(newValue);
                            }
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label='Select Country' variant='outlined'
                            //     // {...(errors.Country && { error: true })}
                            />
                        )}
                    />
                    <Autocomplete
                        fullWidth
                        id='city-autocomplete'
                        options={cityData}
                        value={selectedCity || null}
                        getOptionLabel={(option) => option?.FormattedCity || ''}
                        onInputChange={(event, newQuery) => setQuery(newQuery)}
                        onChange={(event, newValue) => setSelectedCity(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} label='Select City' variant='outlined'
                            // {...(errors.CityID && { error: true })}
                            />
                        )}
                    />
                </div>
                <div style={{ padding: "6px" }}>
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
            </Card>
        </>
    )
}

export default Settings
