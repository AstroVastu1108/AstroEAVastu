import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, Card, CardContent, CardHeader, CircularProgress, debounce, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, Icon, IconButton, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { CreateUser } from '@/app/Server/API/userPermission';
import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer';

function AddUserPopUp({ open, handleAddClose, getAllUsers, userData, setUserData }) {

  const [isDisable, setIsDisable] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
  const mobileRegex = /^[+\d]?[\d\s\-().]{10,}$/;

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    gender: false,
    cmpTransId: false,
    userAvatar: false,
    phone: false,
  })

  const [file, setFile] = useState(null)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleSubmit = async () => {
    try {
      let isValid = true;
      Object.keys(userData).forEach(key => {
        if (!userData[key] && key != 'isActive' && key != 'userAvatar') {
          isValid = false;
          return setErrors(prev => ({
            ...prev,
            [key]: true
          }))
          // return toastDisplayer("error", `${key} is required`)
        }
      });
      if (isValid) {
        setIsDisable(true)
        if (!userData.isUpdate) {
          const response = await CreateUser(userData)
          console.log(response)
          if (response.hasError) {
            setIsDisable(false)
            return toastDisplayer("error", response.errorMessage)
          }
          setIsDisable(false)
          getAllUsers();
          handleAddClose();
          return toastDisplayer("success", `User data is saved successfully.`);
        } else {
        }
      }
    } catch (error) {
      setIsDisable(false)
    }
  }


  const handleInputChange = (field, value, key) => {

    setUserData(prev => ({
      ...prev,
      [field]: value
    }))
    setErrors(prev => ({
      ...prev,
      [field]: false
    }))

    if (field === 'password') {
      if (!passwordRegex.test(value)) {
        setErrors(prev => ({
          ...prev,
          password: 'Password must be at least 6 characters, with 1 uppercase, 1 special character, and 1 number.'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          password: ''
        }));
      }
    }

    if (field === 'phone') {
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
  }

  const handleDrop = async (event) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile && ['image/jpeg', 'image/png', 'image/jpg'].includes(droppedFile.type)) {
      setFile(droppedFile)
      const base64 = await convertToBase64(droppedFile);
      console.log(base64)
      setUserData((prevState) => ({
        ...prevState,
        ["userAvatar"]: base64,
      }));
    } else {
      toastDisplayer('error', 'Only JPG, JPEG, and PNG files are allowed.')
    }
  }

  const handleDragOver = event => {
    event.preventDefault()
  }

  const convertToBase64 = (file) => {
    console.log("file  :", file)
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        console.log(fileReader.result)
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        console.log("error :", error)
        reject(error);
      };
    });
  };

  const handleFileChange = async (event) => {
    console.log("here")
    const selectedFile = event.target.files[0]
    if (selectedFile && ['image/jpeg', 'image/png', 'image/jpg'].includes(selectedFile.type)) {
      setFile(selectedFile)
      const base64 = await convertToBase64(selectedFile);
      setUserData((prevState) => ({
        ...prevState,
        ["userAvatar"]: base64,
      }));

    } else {
      toastDisplayer('error', 'Only JPG, JPEG, and PNG files are allowed.')
    }
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

              Add User
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
            Enter the required information to create a new user.
          </DialogContentText>
        </DialogTitle>
        <DialogContent>
          <Grid className='mt-2' container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={userData?.email}
                onChange={e => {
                  handleInputChange('email', e.target.value, 'email');
                }}
                {...(errors.email && { error: true })}
              // helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                placeholder='············'
                value={userData?.password}
                type={isPasswordShown ? 'text' : 'password'}
                onChange={e => {
                  handleInputChange('password', e.target.value, 'password');
                }}
                error={Boolean(errors.password)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                        <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              {/* <TextField
                fullWidth
                label='Password'
                placeholder='············'
                id='outlined-adornment-password'
                type={isPasswordShown ? 'text' : 'password'}
                value={formData.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                        <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                onChange={(e) => { handleInput("password", e); }}
                {...(errors.password && { error: true })}
              /> */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile No"
                value={userData?.phone}
                onChange={e => {
                  handleInputChange('phone', e.target.value, 'phone');
                }}
                error={Boolean(errors.phone)}
              // {...(errors.phone && { error: true })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="Gender-select-label">Gender</InputLabel>
                <Select
                  labelId="Gender-select-label"
                  id="Gender-select"
                  value={userData?.gender || ''}
                  onChange={e => handleInputChange('gender', e.target.value, 'gender')}
                  label="Gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                gap={2}
                sx={{
                  border: '2px dashed #ccc',
                  borderRadius: '8px',
                  // padding: '16px',
                  alignItems: 'center',
                  textAlign: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '55px',
                  maxWidth: '400px',
                  backgroundColor: '#f9f9f9',
                  cursor: 'pointer',
                  transition: 'border-color 0.3s ease',
                  // '&:hover': {
                  //   borderColor: '#000'
                  // }
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <label htmlFor='file-input' className='flex justify-between items-center w-100 h-100 cursor-pointer'>
                  <input
                    type='file'
                    onChange={handleFileChange}
                    accept='image/*'
                    style={{ display: 'none' }}
                    id='file-input'
                  />
                  {!file && (
                    <>
                      <Typography variant='body1' color='textSecondary'>
                        Upload user profile
                      </Typography>
                      <i className='tabler-download m-2' />
                      <Icon />
                    </>
                  )}

                  {file && (
                    <Typography variant='body2' color='textPrimary'>
                      {file.name}
                    </Typography>
                  )}
                </label>
              </Box>
            </Grid>
            {/* <Grid item xs={12} sm={12}>
              <FormGroup sm={6}>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Is Active" />
              </FormGroup>
            </Grid> */}

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="Gender-select-label">Is Active</InputLabel>
                <Select
                  labelId="Gender-select-label"
                  id="Gender-select"
                  value={userData?.isActive || ''}
                  onChange={e => handleInputChange('isActive', e.target.value, 'isActive')}
                  label="Gender"
                >
                  <MenuItem value="Y">Yes</MenuItem>
                  <MenuItem value="N">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              {errors.password &&
                <FormHelperText error>
                  {errors.password}
                </FormHelperText>}
              {errors.phone &&
                <FormHelperText error>
                  {errors.phone}
                </FormHelperText>}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
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

export default AddUserPopUp
