'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, CircularProgress, Icon, TextField, useMediaQuery, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import classnames from 'classnames'
import { useImageVariant } from '@core/hooks/useImageVariant'
import themeConfig from '@/configs/themeConfig'
import Logo from '@/@core/svg/Logo'
import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
// import Otp from './Otp'

import { useRouter } from 'next/navigation'
import OTPverify from '@/components/common/OTPVerify/OTPverify'
import { registerCompnay, requestOtp } from '@/app/Server/API/auth'
import { useAuth } from '@/@core/contexts/authContext'
import Loader from '@/components/common/Loader/Loader'

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
  [theme.breakpoints.down('md')]: {
    maxBlockSize: 450
  }
}))

const RegisterPage = ({ mode }) => {
  const { companyRegistration } = useAuth();
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState({})
  const [otp, setOtp] = useState(false)
  const [isDisable, setIsDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState("pending");
  const router = useRouter()
  const totalSteps = () => steps.length
  const completedSteps = () => Object.keys(completed).length
  const isLastStep = () => activeStep === totalSteps() - 1
  const allStepsCompleted = () => completedSteps() === totalSteps()

  const lightIllustration = '/images/illustrations/auth/sign-picture.png'
  // const lightIllustration = '/images/illustrations/auth/hand_bg.png'

  const characterIllustration = useImageVariant(mode, lightIllustration)

  const handleNext = () => {
    if (validateFields()) {
      const newActiveStep =
        isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1
      setActiveStep(newActiveStep)
    }
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleStep = step => () => {
    setActiveStep(step)
  }

  const handleComplete = async () => {
    if (validateFields()) {
      setCompleted({
        ...completed,
        [activeStep]: true
      })
      try {
        if (userData.email == "") {
          toastDisplayer("error", "Email or username is required.")
          return setErrors(prev => ({
            ...prev,
            email: true
          }));
        }

        setIsDisable(true)
        const result = await requestOtp(userData?.email, "register")
        if (result.hasError) {
          setIsDisable(false);
          setIsOtpVerified("pending")
          return toastDisplayer("error", result.error)
        } else {
          setIsDisable(false);
          setIsOtpVerified("sent")
          handleNext()
        }
      } catch (error) {
        setIsDisable(false);
        setIsOtpVerified("pending")
        return toastDisplayer("error", error)
      }

    }
  }

  const [userData, setUserData] = useState({
    email: '',
    password: '',
    phone: '',
    businessname: '',
    businesslocation: '',
    profilePicture: null
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

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  const spinAnimation = {
    animation: 'spin 50s linear infinite',
    opacity: '1'
  }
  useEffect(() => {
    const keyframes = `
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `
    const styleSheet = document.createElement('style')
    styleSheet.type = 'text/css'
    styleSheet.innerText = keyframes
    document.head.appendChild(styleSheet)
  }, [])

  const validateFields = () => {
    let newErrors = {}

    if (activeStep === 0) {
      // Validate Personal Details
      newErrors = {
        email: !userData.email.trim() || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(userData.email),
        password: !userData.password.trim() || userData.password.length < 8,
        phone: !userData.phone.trim() || !/^\d{10}$/.test(userData.phone)
      }
    } else if (activeStep === 1) {
      // Validate Business Details
      newErrors = {
        businessname: !userData.businessname.trim(),
        businesslocation: !userData.businesslocation.trim(),
        profilePicture: !file || !['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)
      }
    }

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

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true);
    if (validateFields()) {
      try {
        const result = await companyRegistration(userData)
        if (result.error) {
          setLoading(false);
          console.log("Result : ", result.error)
          setActiveStep(0)
          setIsOtpVerified("pending")
          return toastDisplayer("error", result.message)
        } else {
          setIsDisable(false);
          setActiveStep(0)
          setIsOtpVerified("pending")
          toastDisplayer('success', 'Registration successful! \nYou will be redirecting...')
          setUserData({email: '',
            password: '',
            phone: '',
            businessname: '',
            businesslocation: '',
            profilePicture: null})
          return router.push('/kundlipage')
        }
      } catch (error) {
        setLoading(false);
        setActiveStep(0)
        toastDisplayer('error', error)
      }
    } else {
      setLoading(false);
      toastDisplayer('error', 'Please fill the required fields in the form.')
    }
  }

  return (
    <>
      {loading && <Loader />}
      <div className='flex justify-center items-center w-full p-0'>
        <div
          className={classnames('flex items-center justify-center w-full h-full relative')}
          style={{
            backgroundImage: 'url("/images/illustrations/auth/RegisterBG.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            position: 'relative'
          }}
        >
          <div
            style={{
              // backgroundImage: 'url("/images/illustrations/auth/handimg.png")',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              width: '350px',
              height: '350px'
            }}
          ></div>
          <RegisterIllustration
            src={characterIllustration}
            alt='character-illustration'
            style={{ ...spinAnimation, width: '50%', height: '50%' }}
          />
        </div>

        <div className='flex justify-center items-center bs-full !min-is-full md:!min-is-[unset] md:p-12 md:is-[580px]'>
          <Link
            href={'/login'}
            className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'
          >
            <Logo color={'white'} />
          </Link>

          <div className='flex flex-col gap-6 min-w-[400px] mbs-8 sm:mbs-11 md:mbs-0'>
            {activeStep > 0 && (
              <div className="backbtn">
                <i
                  className="tabler-arrow-left"
                  style={{
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  onClick={handleBack}
                ></i>
                <div className="step-text">Go Back</div>
              </div>
            )}
            <div className='flex flex-col gap-1'>
              <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
            </div>

            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color='inherit' onClick={handleStep(index)} disabled={index > 0 && !completed[0]}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div className='flex flex-col gap-6'>
              {activeStep === 0 && (
                <React.Fragment>
                  <TextField
                    fullWidth
                    label='Email Address'
                    placeholder='Enter your email'
                    name='email'
                    value={userData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    error={Boolean(errors.email)}
                  // helperText={errors.email && 'Enter a valid email address.'}
                  />
                  <TextField
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
                  />
                </React.Fragment>
              )}
              {activeStep === 1 && (
                <>

                  {isOtpVerified == "pending" || isOtpVerified == "sent" ? (

                    // <Button variant='contained' type='button' onClick={handleBack} sx={{ mr: 1 }}>
                    //   Back
                    // </Button>

                    <OTPverify email={userData?.email} role={"register"} setIsOtpVerified={setIsOtpVerified} />

                  ) : (
                    <React.Fragment>
                      <TextField
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
                      />
                      <Box
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
                      </Box>

                      {/* {errors.profilePicture && (
                      <Typography variant='body2' color='error'>
                        Profile picture is required and must be in JPG, JPEG, or PNG format.
                      </Typography>
                    )} */}
                    </React.Fragment>
                  )}
                </>
              )}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep < steps.length - 1 ? (
                  <Button variant='contained' type='button' disabled={isDisable} onClick={handleComplete}>
                    {isDisable ?
                      <>
                        <CircularProgress size={24} aria-label="Wait" />
                        <span style={{ marginLeft: 8 }}>Loading...</span>
                      </>
                      : 'Next'}
                  </Button>
                ) :
                  (isOtpVerified == "verified" ?
                    <>
                      <Button variant='contained' type='submit' onClick={handleSubmit}>
                        Finish
                      </Button>
                    </>
                    : ""
                  )
                }
              </Box>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>Already have an account ?</Typography>
                <Typography color='primary' style={{ cursor: 'pointer' }} onClick={() => {
                  router.push('/login')
                }}>
                  Login
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
