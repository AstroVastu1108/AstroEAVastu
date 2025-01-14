import { getCities, getCountries } from '@/app/Server/API/common';
import { DuplicateKundli } from '@/app/Server/API/kundliAPI';
import { Autocomplete, Button, createTheme, debounce, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, ThemeProvider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'

function DuplicateKundali({ open, handleClose, userData, getAllKundli, isDelete }) {

  const [conutryData, setConutryData] = useState([]);
  const [formData, setFormData] = useState(userData);
  const [cityData, setCityData] = useState([{
    "CityID": 1255364,
    "FormattedCity": "Surat, Gujarat"
  }]);

  const [errors, setErrors] = useState({
    Country: false,
    CityID: false
  });

  const theme = createTheme({
    shape: {
      borderRadius: 8, // Set the global border radius here
    },
  });

  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (open && inputRef.current) {
        inputRef.current.focus();
      }
    }, 500);
  }, [open]);

  const fetchData = async () => {
    try {
      const response = await getCountries()
      if (response.hasError) {
        // return toastDisplayer("error", response.error)
      }
      const result = response.responseData;
      setConutryData(result.Result.Countries);
    } catch (error) {
      // return toastDisplayer("error", `There was a problem with the fetch operation: ${error}`)
    }
  }

  useEffect(() => {
    fetchData();
    setFormData((prev) => ({
      ...prev,
      ["CityID"]: {
        CityID: formData.CityID,
        FormattedCity: formData.City
      },
      ["Country"]: {
        Country: formData.Country,
        CountryCode: formData.CountryCode
      },
    }));
  }, []);

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

  const handleEditClick = async () => {
    const payload = {
      KundaliID: formData.KundaliID,
      CountryCode: formData.Country?.CountryCode,
      CityID: formData.CityID?.CityID,
      Reference: formData?.Reference,
      Remark: formData?.Remark,
    }
    // setIsDisable(false);
    const response = await DuplicateKundli(payload)

    if (response.hasError) {
      // setIsDisable(false)
      // return toastDisplayer("error", response.error)
    }
    var kId = response?.responseData?.Result?.KundaliID;
    // setIsDisable(false)
    getAllKundli(1, "");
    handleClose();
    return kId;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Dialog
          open={open}
          onClose={handleClose}
          className='rounded-lg'
          // maxWidth={'md'}
          fullWidth={true}
          PaperProps={{
            component: 'form',
            // className:'rounded',
            onSubmit: (e) => {
              e.preventDefault();
              handleEditClick();
              handleClose();
            },
          }}
        >
          <DialogTitle className='text-primary text-2xl p-3 bg-[var(--secondary-color)] rounded-t-lg flex justify-between items-center'>
            <span className='text-primary text-2xl font-ea-sb !pl-3'>
              {isDelete ? `Delete Kundali?` : `New 🡒 Location Chart`}
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
          </DialogTitle>
          <DialogContent className='px-4 pt-1'>
            <DialogContentText>
              <div>
                {/* <div className='text-primary font-ea-n'>
                  # {userData?.KundaliID}
                </div> */}
                <div className='font-ea-sb text-red-700 text-xl mt-1 mb-1'>
                  {userData?.FirstName} {userData?.MiddleName} {userData?.LastName}
                </div>
                <div className='font-ea-n text-black'>
                  <span className='font-ea-sb'>{userData?.BirthDate} </span>{userData?.BirthTime.substring(0, 2)}:{userData?.BirthTime.substring(2, 4)}:{(userData?.BirthTime.substring(4, 6) ? userData?.BirthTime.substring(4, 6) : '00')}, {userData?.City}, {userData?.Country}
                </div>
                {/* <div className='font-ea-n text-black'>
                  {userData?.City}, {userData?.Country}
                </div> */}
              </div>
            </DialogContentText>

            <Grid className='mt-1' container spacing={2}>
              <Grid item xs={12} sm={8}>
                <Autocomplete
                  id='country-select'
                  options={conutryData}
                  defaultValue={formData && formData.Country}
                  getOptionLabel={(option) => option?.Country}
                  getOptionKey={(option) => option?.CountryCode}
                  onChange={(event, newValue) => handleInputChange('Country', newValue, 'Country', true)}
                  renderInput={(params) => (
                    <TextField {...params} label='Country' variant='outlined'
                    {...(errors.Country && { error: true })}
                    />
                  )}
                // size={TextFeildSize}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label='Timezone'
                  value={"UTC+05:30 > Asia/Kolkata"}
                  InputProps={{
                    readOnly: true, // Makes the TextField read-only
                  }}
                // size={TextFeildSize}
                />
              </Grid>
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
                  filterOptions={(x) => x} // Disable frontend filtering
                // size={TextFeildSize}
                />

              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label='Lat, Lng '
                // size={TextFeildSize}
                // placeholder='John'
                // value={formData?.MiddleName}
                // onChange={e => handleInputChange('MiddleName', e.target.value, 'MiddleName')}
                // onChange={e => setFormData({ ...formData, MiddleName: e.target.value })}
                // {...(errors.MiddleName && { error: true, helperText: 'MiddleName is required.' })}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Reference"
                  // inputRef={fnameRef}
                  value={formData?.Reference}
                  // size={TextFeildSize}
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
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Remark"
                  // inputRef={fnameRef}
                  value={formData?.Remark}
                  onChange={e => {
                    handleInputChange('Remark', e.target.value, 'Remark');
                  }}
                // size={TextFeildSize}
                />
              </Grid>
            </Grid>

          </DialogContent>
          <DialogActions className='p-4 pt-0'>
            <Button variant='contained' className={'bg-primary'} type="submit">Save</Button>
            <Button variant='contained' className='bg-secondary' onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  )
}

export default DuplicateKundali
