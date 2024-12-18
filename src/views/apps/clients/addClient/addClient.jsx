import React, { useEffect, useState } from 'react';
import {
    Autocomplete,
    Button, CircularProgress, debounce, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField
} from "@mui/material";
import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer';
import { getCities, getCountries } from '@/app/Server/API/common';
import { useAuth } from '@/@core/contexts/authContext';
import { CreateClient } from '@/app/Server/API/client';
import { LoadingButton } from '@mui/lab';

function AddClientPopUp({ open, handleAddClose,saveClient }) {
    const { user } = useAuth();
    const [errors, setErrors] = useState({
        status: false,
        name: false,
        person: false,
        reference: false,
        building: false,
        lane: false,
        area: false,
        city: false,
        pin: false,
        state: false,
        country: false,
        phone1: false,
        phone1Name: false,
        email1: false,
        gstin: false
    })
    const [conutryData, setConutryData] = useState([
        { CountryCode: 'IN', Country: 'India' }
    ])

    const [cityData, setCityData] = useState([{
        "CityID": "1255364",
        "FormattedCity": "Surat, Gujarat"
    }])

    const [data, setData] = useState({
        status: '',
        name: '',
        person: '',
        reference: '',
        building: '',
        lane: '',
        area: '',
        city: {
            "CityID": "1255364",
            "FormattedCity": "Surat, Gujarat"
        },
        pin: '',
        state: '',
        country: { CountryCode: 'IN', Country: 'India' },
        phone1: '',
        phone2: '',
        phone3: '',
        phone1Name: '',
        phone2Name: '',
        phone3Name: '',
        email1: '',
        gstin: '',
    });


    const [isSaving, setIsSaving] = useState(false);
    const [phones, setPhones] = useState([{ phone: '', phoneName: '' }]);

    const handleChange = (field, value) => {
        setData(prev => ({
            ...prev,
            [field]: value
        }));

        setErrors(prev => ({
            ...prev,
            [field]: false
          }))

          const mobileRegex = /^[+\d]?[\d\s\-().]{10,}$/;
          if (field === 'phone1') {
            if (!mobileRegex.test(value)) {
              const errorMessage = 'Mobile number must be at least 10 digits.';
              setErrors(prev => ({
                ...prev,
                phone: errorMessage
              }));
            } else {
              setErrors(prev => ({
                ...prev,
                phone: ''
              }));
            }
          }
        // const validationErrors = validateField(field, value);
        // setErrors(prevErrors => ({
        //     ...prevErrors,
        //     ...validationErrors
        // }));
    };

    const handleAddPhone = () => {
        if (phones.length < 3) {
            setPhones([...phones, { phone: '', phoneName: '' }]);
        }
    };

    const handleSubmit = async () => {
        setIsSaving(true);
        try {
            const payload = {
                "companyID": user?.transactionID,
                "status": data.status,
                "aliasID": "",
                "name": data.name,
                "person": data.person,
                "reference": data.reference,
                "building": data.building,
                "lane": data.lane,
                "area": data.area,
                "city": data.city.FormattedCity,
                "pin": data.pin,
                "state": data.state,
                "country": data.country.name,
                "phone1": data.phone1,
                "phone2": data.phone2,
                "phone3": data.phone3,
                "phone1Name": data.phone1Name,
                "phone2Name": data.phone2Name,
                "phone3Name": data.phone3Name,
                "email1": data.email1,
                "gstin": data.gstin
            }

            if (validatePayload(payload)) {
                return saveClient(payload);
                // const response = await CreateClient(payload);
                // if (response.hasError) {
                //     setIsSaving(false)
                //     return toastDisplayer("error", response.errorMessage);
                // } else {
                //     handleAddClose();
                //     toastDisplayer("success", "Client added successfully.");
                //     setIsSaving(false)
                //     setUsersData(response.responseData);
                // }
            }
        } catch (error) {
            setIsSaving(false)
        } finally {
            setIsSaving(false);
        }
    };

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
        if (query.length > 1 && data.country) {
            try {
                const CountryCode = data.country.CountryCode
                const response = await getCities(CountryCode, query)
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

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      const isNumeric = (value) => {
        return /^\d+$/.test(value);
      };

    const isRequired = (value) => {
        return value !== undefined && value !== null && value !== '';
      };
    // Validation function
    const validatePayload = (payload) => {
        let isValid = true;
        const errors = {};

        Object.keys(payload).forEach(key => {
          // Skip validation for specific fields
          if (['aliasID', 'state', 'phone2', 'phone3', 'phone2Name', 'phone3Name'].includes(key)) {
            return;
          }

          // Check if the field is a number field
          const numberFields = ['phone1', 'phone2', 'phone3', 'pin']; // Add number fields here
          if (numberFields.includes(key) && !isNumeric(payload[key])) {
            isValid = false;
            errors[key] = true;
            return;
          }

          // Check if the field is an email field
          const emailFields = ['email1', 'email2']; // Add email fields here
          if (emailFields.includes(key) && !isValidEmail(payload[key])) {
            isValid = false;
            errors[key] = true;
            return;
          }

          // Check for required fields
          if (!isRequired(payload[key])) {
            isValid = false;
            errors[key] = true;
          }
        });

        // Update errors state
        setErrors(errors);

        return isValid;
      };



    return (
        <Dialog open={open} onClose={handleAddClose} maxWidth="md" fullWidth>
            <DialogTitle className="PopupHeader bg-primary text-white p-4">
                <div className='w-100' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>
                        Add Client
                    </span>
                    <IconButton
                        aria-label="close"
                        onClick={handleAddClose}
                        sx={{
                            color: 'white',
                        }}
                    >
                        <i className='tabler-x'></i>
                    </IconButton>
                </div>
                <DialogContentText className="text-white">
                    Enter the required information to create a new Client.
                </DialogContentText>
            </DialogTitle>
            <DialogContent>
                <Grid className='mt-2' container spacing={3}>
                    {/* Name */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Company or person name"
                            value={data.name}
                            onChange={e => handleChange('name', e.target.value)}
                            {...(errors.name && { error: true})}
                        />
                    </Grid>

                    {/* Status */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="status-select-label">Status</InputLabel>
                            <Select
                                labelId="status-select-label"
                                value={data.status}
                                onChange={e => handleChange('status', e.target.value)}
                                label="Status"
                                {...(errors.status && { error: true})}
                            >
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Contact Person */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Contact Person"
                            value={data.person}
                            onChange={e => handleChange('person', e.target.value)}
                            {...(errors.person && { error: true})}
                        />
                    </Grid>

                    {/* Reference */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Reference"
                            value={data.reference}
                            onChange={e => handleChange('reference', e.target.value)}
                            {...(errors.reference && { error: true})}
                        />
                    </Grid>

                    {/* Country */}
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            id='country-select'
                            options={conutryData}
                            defaultValue={{ CountryCode: 'IN', Country: 'India' }}
                            getOptionLabel={(option) => option.Country}
                            onChange={(event, newValue) => handleChange('country', newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Select Country'
                                    variant='outlined'
                                />
                            )}
                            {...(errors.country && { error: true})}
                        />
                    </Grid>

                    {/* City */}
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            id='city-autocomplete'
                            options={cityData}
                            defaultValue={{ "CityID": "1255364", "FormattedCity": "Surat, Gujarat" }}
                            getOptionLabel={(option) => option.FormattedCity || ''}
                            onInputChange={(event, newQuery) => setQuery(newQuery)}
                            onChange={(event, newValue) => handleChange('city', newValue)}
                            renderInput={(params) => (
                                <TextField {...params} label='Select City' variant='outlined' />
                            )}
                            {...(errors.city && { error: true})}
                        />
                    </Grid>

                    {/* Other fields */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Area"
                            value={data.area}
                            onChange={e => handleChange('area', e.target.value)}
                            {...(errors.area && { error: true})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Building"
                            value={data.building}
                            onChange={e => handleChange('building', e.target.value)}
                            {...(errors.building && { error: true})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Lane"
                            value={data.lane}
                            onChange={e => handleChange('lane', e.target.value)}
                            {...(errors.lane && { error: true})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Pin"
                            value={data.pin}
                            onChange={e => handleChange('pin', e.target.value)}
                            {...(errors.pin && { error: true})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={data.email1}
                            onChange={e => handleChange('email1', e.target.value)}
                            {...(errors.email1 && { error: true})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="GSTIN"
                            value={data.gstin}
                            onChange={e => handleChange('gstin', e.target.value)}
                            {...(errors.gstin && { error: true})}
                        />
                    </Grid>

                    {/* Dynamic Phone Fields */}
                    {phones.map((data,phoneIndex) => (
                        <>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label={`Phone ${phoneIndex+1}`}
                                    value={data[`phone${phoneIndex+1}`]}
                                    onChange={(e) => handleChange(`phone${phoneIndex+1}`, e.target.value)}
                                    error={!!errors[`phone${phoneIndex}`]}
                                    helperText={errors[`phone${phoneIndex}`]}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label={`Phone ${phoneIndex+1} Name`}
                                    value={data[`phone${phoneIndex+1}Name`]}
                                    onChange={(e) => handleChange(`phone${phoneIndex+1}Name`, e.target.value)}
                                    fullWidth
                                    error={!!errors[`phone${phoneIndex}Name`]}
                                    helperText={errors[`phone${phoneIndex}Name`]}
                                />
                            </Grid>
                        </>
                    ))}

                    {/* Add Phone Button */}
                    {phones.length < 3 && (
                        <Grid item xs={2}>
                            <Button onClick={handleAddPhone}>
                                Add Phone
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
            <LoadingButton
                      variant='contained'
                      onClick={handleSubmit}
                      loading={isSaving}
                      loadingPosition="start"
                      type='submit'
                    >
                       {isSaving ? "Saving ...": "Add Client"}
                    </LoadingButton>

                <Button variant="contained" onClick={handleAddClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddClientPopUp;
