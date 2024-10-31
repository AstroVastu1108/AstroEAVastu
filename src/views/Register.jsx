'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Box, CircularProgress, Icon, TextField, useMediaQuery } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import classnames from 'classnames'
import { useImageVariant } from '@core/hooks/useImageVariant'
import themeConfig from '@/configs/themeConfig'
import Logo from '@components/layout/shared/Logo'
import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'

import ReCAPTCHA from 'react-google-recaptcha';
import { createTheme, ThemeProvider } from '@mui/material';
import Cookies from 'js-cookie';
// import Otp from './Otp'

import { useRouter } from 'next/navigation'
import OTPverify from '@/components/common/OTPVerify/OTPverify'
import { registerCompnay, requestOtp } from '@/app/Server/API/auth'
import { useAuth } from '@/@core/contexts/authContext'
import Loader from '@/components/common/Loader/Loader'
import { LoadingButton } from '@mui/lab'
import { useSettings } from '@/@core/hooks/useSettings'

const steps = ['Personal Details', 'Business Details']

const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 680,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const RegisterPage = ({ mode }) => {
  const { companyRegistration } = useAuth();
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  // const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState({})
  const [otp, setOtp] = useState(false)
  const [isDisable, setIsDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState("pending");
  const router = useRouter()
  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();

  const recaptchaRef = useRef(null);
  const totalSteps = () => steps.length
  const completedSteps = () => Object.keys(completed).length
  // const isLastStep = () => activeStep === totalSteps() - 1
  // const allStepsCompleted = () => completedSteps() === totalSteps()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode)
  const lightIllustration = '/images/illustrations/auth/sign-picture.png'
  // const lightIllustration = '/images/illustrations/auth/hand_bg.png'

  // const characterIllustration = useImageVariant(mode, lightIllustration)

  // const handleNext = () => {
  //   if (validateFields()) {
  //     const newActiveStep =
  //       isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1
  //     setActiveStep(newActiveStep)
  //   }
  // }

  // const handleBack = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep - 1)
  // }

  // const handleStep = step => () => {
  //   setActiveStep(step)
  // }

  const handleComplete = async () => {
    if (validateFields()) {
      // setCompleted({
      //   ...completed,
      //   [activeStep]: true
      // })
      try {
        if (userData.email == "") {
          toastDisplayer("error", "Email or username is required.")
          return setErrors(prev => ({
            ...prev,
            email: true
          }));
        }
        setIsDisable(true)
        const token = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();
        const recaptchaResponse = await fetch('/api/verifyRecaptcha', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const recaptchaData = await recaptchaResponse.json();
        if (recaptchaData.success) {
          setIsDisable(true)
          const result = await requestOtp(userData?.email, "register")
          if (result.hasError) {
            setIsDisable(false);
            setIsOtpVerified("pending")
            return toastDisplayer("error", result.error)
          } else {
            setIsDisable(false);
            setIsOtpVerified("sent")
            // handleNext()
          }
        } else {
          setIsDisable(false)
          recaptchaRef.current.reset();
        }

      } catch (error) {
        setIsDisable(false);
        setIsOtpVerified("pending")
        return toastDisplayer("error", error)
      }

    }
  }

  const [userData, setUserData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    phone: '',
    businessname: '',
    businesslocation: '',
    profilePicture: ''
  })

  const [errors, setErrors] = useState({
    username: false,
    email: false,
    phone: false,
    password: false,
    businessname: false,
    businesslocation: false,
    profilePicture: false
  })

  // const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  // const spinAnimation = {
  //   animation: 'spin 50s linear infinite',
  //   opacity: '1'
  // }
  // useEffect(() => {
  //   const keyframes = `
  //     @keyframes spin {
  //       0% {
  //         transform: rotate(0deg);
  //       }
  //       100% {
  //         transform: rotate(360deg);
  //       }
  //     }
  //   `
  //   const styleSheet = document.createElement('style')
  //   styleSheet.type = 'text/css'
  //   styleSheet.innerText = keyframes
  //   document.head.appendChild(styleSheet)
  // }, [])

  const validateFields = () => {
    let newErrors = {}

    // if (activeStep === 0) {
    // Validate Personal Details
    newErrors = {
      fname: !userData.fname.trim(),
      lname: !userData.lname.trim(),
      email: !userData.email.trim() || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(userData.email),
      // password: !userData.password.trim() || userData.password.length < 7,
      // phone: !userData.phone.trim() || !/^\d{10}$/.test(userData.phone)
    }
     if (newErrors.fname) fnameRef.current.focus();
    else if (newErrors.lname) lnameRef.current.focus();
    else if (newErrors.email) emailRef.current.focus();
    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error)
  }

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }))
    setErrors(prev => ({
      ...prev,
      [field]: false
    }))
  }

  const [file, setFile] = useState(null)

  const handleDrop = async (event) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile && ['image/jpeg', 'image/png', 'image/jpg'].includes(droppedFile.type)) {
      setFile(droppedFile)
      const base64 = await convertToBase64(droppedFile);
      setUserData((prevState) => ({
        ...prevState,
        ["profilePicture"]: base64,
      }));
    } else {
      toastDisplayer('error', 'Only JPG, JPEG, and PNG files are allowed.')
    }
  }

  const handleDragOver = event => {
    event.preventDefault()
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile && ['image/jpeg', 'image/png', 'image/jpg'].includes(selectedFile.type)) {
      setFile(selectedFile)
      const base64 = await convertToBase64(selectedFile);
      setUserData((prevState) => ({
        ...prevState,
        ["profilePicture"]: base64,
      }));

    } else {
      toastDisplayer('error', 'Only JPG, JPEG, and PNG files are allowed.')
    }
  }


  const handleSubmit = async () => {
    try {
      setLoading(true);
      setIsDisable(true);
      if (validateFields()) {

        const result = await companyRegistration(userData)
        if (result.error) {
          setLoading(false);
          setIsDisable(false);

          // setActiveStep(0)
          setIsOtpVerified("pending")
          return toastDisplayer("error", result.message)
        } else {
          setIsDisable(false);
          // setActiveStep(0)
          // setIsOtpVerified("pending")
          // toastDisplayer('success', 'Registration successful! \nYou will be redirecting...')
          setUserData({
            email: '',
            password: '',
            phone: '',
            businessname: '',
            businesslocation: '',
            profilePicture: null
          })
          const storedSessionValue = JSON.parse(Cookies.get('authState'));
          const { authRule } = storedSessionValue;
          const routePermissions = JSON.parse(authRule);
          const firstAccessibleItem = routePermissions.find(item => item.HasAccess);

          return router.push(firstAccessibleItem.Href);
        }

      } else {
        setLoading(false);
        setIsDisable(false);
        toastDisplayer('error', 'Please fill the required fields in the form.')
      }
    } catch (error) {
      setLoading(false);
      setIsDisable(false);
      // setActiveStep(0)
      toastDisplayer('error', error)
    }
  }

  const customtheme = createTheme({
    typography: {
      fontFamily: 'Segoe UI, sans-serif',
    },
  });

  useEffect(() => {
    if (isOtpVerified == "verified") {
      // passwordInputRef.current.focus();
      setLoading(true);
      handleSubmit();
    }
  }, [isOtpVerified])

  return (
    <>
      {loading && <Loader />}
      <ThemeProvider theme={customtheme}>
        <div className='flex bs-full justify-center'>
          <div
            className={classnames('flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden', {
              'border-ie': settings.skin === 'bordered'
            })}
            style={{
              backgroundImage: 'url("/images/illustrations/auth/web-bkg.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: '100vh',
              position: 'relative'
            }}
          >
            {!hidden && (
              <MaskImg
                alt='mask'
                src={authBackground}
                className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
              />
            )}
          </div>

          <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:px-12 md:py-7 md:is-[480px]'>
            <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
              <Link href="#" onClick={(e) => e.preventDefault()} className='block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
                <Logo color={'primary'} isSmall={false} />
              </Link>

              {isOtpVerified == "pending" || isOtpVerified == "verifiedd" ? (
                <div className='flex flex-col gap-1'>
                  <Typography variant='h5'>{`Welcome! Let's get you started...`}</Typography>
                  <Typography>Ready to discover new possibilities?</Typography>
                </div>
              ) : ""
              }

              <div className='flex flex-col gap-2'>
                {isOtpVerified == "pending" || isOtpVerified == "verifiedd" ? (
                  <>
                    <div style={{ display: "flex", flexDirection: "row", gap: "6px" }}>
                      <TextField
                        fullWidth
                        autoFocus
                        label='First Name'
                        // placeholder='Enter your email'
                        name='firstname'
                        value={userData.fname}
                        onChange={e => handleInputChange('fname', e.target.value)}
                        error={Boolean(errors.fname)}
                        inputRef={fnameRef} 
                      // helperText={errors.email && 'Enter a valid email address.'}
                      />
                      <TextField
                        fullWidth
                        label='Last Name'
                        // placeholder='Enter your email'
                        name='lastname'
                        value={userData.lname}
                        onChange={e => handleInputChange('lname', e.target.value)}
                        error={Boolean(errors.lname)}
                        inputRef={lnameRef} 
                      // helperText={errors.email && 'Enter a valid email address.'}
                      />
                    </div>
                    <TextField
                      fullWidth
                      label='Email'
                      // placeholder='Enter your email'
                      name='email'
                      value={userData.email}
                      onChange={e => handleInputChange('email', e.target.value)}
                      error={Boolean(errors.email)}
                      inputRef={emailRef} 
                    // helperText={errors.email && 'Enter a valid email address.'}
                    />

                    {/* <TextField
                    fullWidth
                    label='Password'
                    placeholder='············'
                    id='outlined-adornment-password'
                    type={isPasswordShown ? 'text' : 'password'}
                    name='password'
                    value={userData.password}
                    onChange={e => handleInputChange('password', e.target.value)}
                    error={Boolean(errors.password)}
                    // helperText={errors.password && 'Password must be at least 8 characters.'}
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
                  <TextField
                    fullWidth
                    label='Phone No'
                    placeholder='Enter your phone number'
                    name='phone'
                    value={userData.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    error={Boolean(errors.phone)}
                  // helperText={errors.phone && 'Phone number is required.'}
                  /> */}
                  </>
                ) : (
                  <>
                    <div className='flex flex-col gap-4'>
                      <div className='flex flex-col gap-1'>
                        <Typography variant='h5'>{`OTP Verification`}</Typography>
                        <Typography>Please enter the 6 digit code sent to <span style={{ fontWeight: "600", color: "#590a73" }}>{userData?.email}</span></Typography>
                      </div>
                      <OTPverify email={userData?.email} role={"register"} setIsOtpVerified={setIsOtpVerified} />
                    </div>
                  </>)
                }
                {/* // : (
                    //   <React.Fragment> */}
                {/* <TextField
                        fullWidth
                        label='Business Name'
                        placeholder='Enter your business name'
                        name='username'
                        value={userData.username}
                        onChange={e => handleInputChange('businessname', e.target.value)}
                        error={Boolean(errors.businessname)}
                      // helperText={errors.businessname && 'Business Name is required.'}
                      />
                      <TextField
                        fullWidth
                        label='Business Location'
                        placeholder='Enter your location'
                        name='location'
                        onChange={e => handleInputChange('businesslocation', e.target.value)}
                        error={Boolean(errors.businesslocation)}
                      // helperText={errors.businesslocation && 'Business Location is required.'}
                      /> */}
                {/* <Box
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        gap={2}
                        style={errors.profilePicture ? { border: "2px dashed red" } : undefined}
                        sx={{
                          border: '2px dashed #ccc',
                          borderRadius: '8px',
                          padding: '16px',
                          textAlign: 'center',
                          width: '100%',
                          height: '100px',
                          maxWidth: '400px',
                          backgroundColor: '#f9f9f9',
                          cursor: 'pointer',
                          transition: 'border-color 0.3s ease',
                          '&:hover': {
                            borderColor: '#000'
                          }
                        }}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                      >
                        <label htmlFor='file-input' style={{ width: '100%', height: '100%', textAlign: 'center' }}>
                          <input
                            type='file'
                            onChange={handleFileChange}
                            accept='image/*'
                            style={{ display: 'none' }}
                            id='file-input'
                          />
                          <Typography variant='body1' color='textSecondary'>
                            Drag and drop Company Logo here or click to select
                          </Typography>
                          <i className='tabler-download m-2' />
                          <Icon />
                          {file && (
                            <Typography variant='body2' color='textPrimary'>
                              {file.name}
                            </Typography>
                          )}
                        </label>
                      </Box> */}

                {/* {errors.profilePicture && (
                      <Typography variant='body2' color='error'>
                        Profile picture is required and must be in JPG, JPEG, or PNG format.
                      </Typography>
                    )} */}
                {/* //   </React.Fragment>
                    // )} */}

                {/* )} */}
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

                  <Box sx={{ flex: '1 1 auto' }} />
                  {isOtpVerified == "pending" || isOtpVerified == "verifiedd" ? (
                    <LoadingButton
                      fullWidth
                      variant='contained'
                      onClick={handleComplete}
                      //  sx={{ width: '132px' }}
                      loading={isDisable}
                      loadingPosition="start"
                      type='submit'
                    >
                      {isDisable ? "Loading..." : "Get Started"}
                    </LoadingButton>
                    // <Button variant='contained' type='button' disabled={isDisable} onClick={handleComplete}>
                    //   {isDisable ?
                    //     <>
                    //       <CircularProgress size={24} aria-label="Wait" />
                    //       <span style={{ marginLeft: 8 }}>Loading...</span>
                    //     </>
                    //     : 'Next'}
                    // </Button>
                  ) :
                    ""
                    // (isOtpVerified == "verified" ?
                    //   <>
                    //    <LoadingButton
                    //    fullWidth
                    //     variant='contained'
                    //     onClick={handleSubmit}
                    //     loading={isDisable}
                    //     // sx={{ width: '132px' }}
                    //     loadingPosition="start"
                    //     type='submit'
                    //   >
                    //      {isDisable ? "Loading ...": "Finish"}
                    //   </LoadingButton>
                    //     {/* <Button variant='contained' type='submit' onClick={handleSubmit}>
                    //       Finish
                    //     </Button> */}
                    //   </>
                    //   : ""
                    // )
                  }
                </Box>
                <div className='flex justify-center items-center flex-wrap' style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                  <div className='flex flex-wrap gap-2'>
                    <Typography>Already have an account? </Typography>
                    <Typography color='primary' style={{ cursor: 'pointer' }} onClick={() => {
                      router.push('/login')
                    }}>
                      Login
                    </Typography>
                  </div>

                  <Typography style={{ fontSize: "10px" }}>By clicking
                  <Link href="#" onClick={(e) => e.preventDefault()} style={{ fontWeight: "600" }}> ‘Get started’ </Link>
                    you are agreeing to our
                    <Link href="#" onClick={(e) => e.preventDefault()} style={{ fontWeight: "600" }}> Terms of Use </Link>
                    and
                    <Link href="#" onClick={(e) => e.preventDefault()} style={{ fontWeight: "600" }}> Privacy Policy.
                    </Link>
                  </Typography>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}
                    size="invisible"
                  />

                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default RegisterPage
