'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Alert, Box, TextField, useMediaQuery } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import classnames from 'classnames'
import { useImageVariant } from '@core/hooks/useImageVariant'
import Logo from '@components/layout/shared/Logo'
import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer'
import ReCAPTCHA from 'react-google-recaptcha';
import { createTheme, ThemeProvider } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import OTPverify from '@/components/common/OTPVerify/OTPverify'
import { registerCompnay, requestOtp, requestOtpNewUser } from '@/app/Server/API/auth'
import { useAuth } from '@/@core/contexts/authContext'
import Loader from '@/components/common/Loader/Loader'
import { LoadingButton } from '@mui/lab'
import { useSettings } from '@/@core/hooks/useSettings'
import { navigation } from '@/app-navigation'
import "./global.css";

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
  const [isDisable, setIsDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState("pending");
  const [errorMessage, setErrorMessage] = useState(null);  // Add this line
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const router = useRouter()
  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();

  const recaptchaRef = useRef(null);
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode)


  const handleVerifyCaptcha = async () => {
    try {
      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();
      const recaptchaResponse = await fetch('/api/verifyRecaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const recaptchaData = await recaptchaResponse.json();
      if (recaptchaData.success) {
        setIsCaptchaVerified(true);
        // setIsDisable(true);
        // handleVerifyEmail();
      } else {
        setIsCaptchaVerified(false);
        // setIsDisable(false)
        recaptchaRef.current.reset();
      }
    } catch (error) {
      setIsCaptchaVerified(false);
      // setIsDisable(false)
      return setErrorMessage('Unable to Verify Captcha. Try Again.')
      // return toastDisplayer('error', 'Server error. Please try again later.');
    }
  };

  useEffect(()=>{
    handleVerifyCaptcha();
  },[])

  const handleComplete = async () => {
    if (validateFields()) {
      try {
        if(isCaptchaVerified){
        if (userData.email == "") {
          setErrorMessage("Email is required.");
          // toastDisplayer("error", "Email or username is required.")
          return setErrors(prev => ({
            ...prev,
            email: true
          }));
        }
        // setIsDisable(true)
        // const token = await recaptchaRef.current.executeAsync();
        // recaptchaRef.current.reset();
        // const recaptchaResponse = await fetch('/api/verifyRecaptcha', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ token }),
        // });

        // const recaptchaData = await recaptchaResponse.json();
        // if (recaptchaData.success) {
        //   setIsDisable(true)
        //   const result = await requestOtpNewUser(userData?.email, userData?.fname, userData?.lname, "register")
        //   if (!result?.Status) {
        //     setIsDisable(false);
        //     setIsOtpVerified("pending")
        //     return setErrorMessage(result?.Error || "An error occurred.");
        //   } else {
        //     setIsDisable(false);
        //     setIsOtpVerified("sent")
        //     // handleNext()
        //   }
        // } else {
        //   setIsDisable(false)
        //   recaptchaRef.current.reset();
        // }

        setIsDisable(true)
        const result = await requestOtpNewUser(userData?.email, userData?.fname, userData?.lname, "register")
        if (!result?.Status) {
          setIsDisable(false);
          setIsOtpVerified("pending")
          return setErrorMessage(result?.Error || "An error occurred.");
        } else {
          setIsDisable(false);
          setIsOtpVerified("sent")
          // handleNext()
        }
      }else{
        setErrorMessage("Unable to Verify Captcha. Try Again.");
      }

      } catch (error) {
        setIsDisable(false);
        setIsOtpVerified("pending")

        return setErrorMessage(error);
      }

    }
  }

  // const handleComplete = async () => {
  //   if (validateFields()) {

  //     try {
  //       if (userData.email == "") {
  //         setErrorMessage("Email is required.");
  //         // toastDisplayer("error", "Email or username is required.")
  //         return setErrors(prev => ({
  //           ...prev,
  //           email: true
  //         }));
  //       }
  //       setIsDisable(true)
  //       const token = await recaptchaRef.current.executeAsync();
  //       recaptchaRef.current.reset();
  //       const recaptchaResponse = await fetch('/api/verifyRecaptcha', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ token }),
  //       });

  //       const recaptchaData = await recaptchaResponse.json();
  //       if (recaptchaData.success) {
  //         setIsDisable(true)
  //         const result = await requestOtpNewUser(userData?.email, userData?.fname, userData?.lname, "register")
  //         if (!result?.Status) {
  //           setIsDisable(false);
  //           setIsOtpVerified("pending")
  //           return setErrorMessage(result?.Error || "An error occurred.");
  //         } else {
  //           setIsDisable(false);
  //           setIsOtpVerified("sent")
  //           // handleNext()
  //         }
  //       } else {
  //         setIsDisable(false)
  //         recaptchaRef.current.reset();
  //       }

  //     } catch (error) {
  //       setIsDisable(false);
  //       setIsOtpVerified("pending")

  //       return setErrorMessage(error);
  //     }

  //   }
  // }

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

  // const validateFields = () => {
  //   let newErrors = {}

  //   newErrors = {
  //     fname: !userData.fname.trim(),
  //     lname: !userData.lname.trim(),
  //     email: !userData.email.trim() || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(userData.email),
  //     // password: !userData.password.trim() || userData.password.length < 7,
  //     // phone: !userData.phone.trim() || !/^\d{10}$/.test(userData.phone)
  //   }
  //   if (newErrors.fname) fnameRef.current.focus();
  //   else if (newErrors.lname) lnameRef.current.focus();
  //   else if (newErrors.email) emailRef.current.focus();
  //   setErrors(newErrors)
  //   return !Object.values(newErrors).some(error => error)
  // }

  const validateFields = () => {
    let newErrors = {};

    newErrors = {
      fname: !userData.fname.trim() || (userData.fname.length > 0 && userData.fname.length < 3),
      lname: !userData.lname.trim() || (userData.lname.length > 0 && userData.lname.length < 3),
      email: !userData.email.trim() || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(userData.email),
      // Add other validations here, such as password and phone if needed
    };

    if (newErrors.fname) {
      fnameRef.current.focus();
      // setErrorMessage("First name is required.");
    } else if (newErrors.lname) {
      lnameRef.current.focus();
      // setErrorMessage("Last name is required.");
    } else if (newErrors.email) {
      emailRef.current.focus();
      if (userData.email.trim() != "") {
        setErrorMessage("Enter a valid email address.");
      }
    } else {
      setErrorMessage(null); // Clear error message if no errors are found
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };


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
          return setErrorMessage(result?.Error)
        } else {
          setIsDisable(false);
          setUserData({
            email: '',
            password: '',
            phone: '',
            businessname: '',
            businesslocation: '',
            profilePicture: null
          })
          const firstAccessibleItem = navigation.find(item => item);
          return router.push(firstAccessibleItem.href);
        }

      } else {
        setLoading(false);
        setIsDisable(false);
        // toastDisplayer('error', 'Please fill the required fields in the form.')
        setErrorMessage('Please fill the required fields in the form.');
      }
    } catch (error) {
      setLoading(false);
      setIsDisable(false);
      // setActiveStep(0)
      setErrorMessage(error.message || "An error occurred");
      // toastDisplayer('error', error)
    }
  }

  const customtheme = createTheme({
    // typography: {
    //   fontFamily: 'Segoe UI, sans-serif',
    // },
  });

  const handleVerifyOtp = async (otp) => {
    try {
      if (userData.email == "") {
        setErrors(true)
        emailRef.current.focus();
        return setErrorMessage("Email is required.")
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!userData.email || !emailRegex.test(userData.email)) {
        setIsDisable(false)
        setErrorMessage("Invalid email address.")
        setErrors(true)
        return setErrorMessage("Invalid email address.")
      }
      setErrors(false)
      setIsDisable(true)
      const payload = {
        FirstName: userData?.fname,
        LastName: userData?.lname,
        email: userData?.email,
        password: userData?.password,
        phone: userData?.phone,
        businessname: userData?.businessname,
        businesslocation: userData?.businesslocation,
        UserAvatar: userData?.profilePicture,
        userType: "CompanyMaster",
        "verifyoTP": otp
      }
      setLoading(true);
      // const result = await companyRegistration(payload)
      const result = await registerCompnay(payload)
      if (!result?.isOk) {
        setLoading(false);
        setIsDisable(false);

        // setActiveStep(0)
        setIsOtpVerified("error")
        setErrors(true);
        return setErrorMessage(result?.data?.Error)
      } else {
        companyRegistration(result);
        setIsDisable(false);
        setUserData({
          email: '',
          password: '',
          phone: '',
          businessname: '',
          businesslocation: '',
          profilePicture: null
        })
        const firstAccessibleItem = navigation.find(item => item);
        return router.push(firstAccessibleItem.href);
      }
    } catch (error) {
      setIsDisable(false);
      setIsOtpVerified("pending")
      setLoading(false)
      setErrors(true)
      return setErrorMessage(error)
    }
  }

  // useEffect(() => {
  //   if (isOtpVerified == "verified") {
  //     // passwordInputRef.current.focus();
  //     setLoading(true);
  //     handleSubmit();
  //   }
  // }, [isOtpVerified])

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
                <Logo color={'primary'} isSmall={false} width={hidden ? "65mm" : "45mm"} />
              </Link>

              {isOtpVerified == "pending" || isOtpVerified == "verifiedd" ? (
                <div className='flex flex-col gap-1'>
                  <Typography className='font-ea-n' variant='h5'>{`Welcome! Let's get you started...`}</Typography>
                  <Typography className='font-ea-n'>Ready to discover new possibilities?</Typography>
                </div>
              ) : ""
              }

              <form onSubmit={e => {
                      e.preventDefault()
                    }}>
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
                          // error={Boolean(errors.fname)}
                          error={Boolean(errors.fname) || (userData.fname.length > 0 && userData.fname.length < 3)}

                          // error={userData.fname.length > 0 && userData.fname.length < 3}
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
                          error={Boolean(errors.lname) || (userData.lname.length > 0 && userData.lname.length < 3)}
                          // error={Boolean(errors.fname) || (userData.fname.length > 0 && userData.fname.length < 3)}

                          // error={userData.lname.length > 0 && userData.lname.length < 3}
                          inputRef={lnameRef}
                        // helperText={errors.email && 'Enter a valid email address.'}
                        />
                      </div>
                      <div className='pt-2'>

                      <TextField

                        fullWidth
                        label='Email'
                        // placeholder='Enter your email'
                        name='email'
                        value={userData.email}
                        onChange={e => handleInputChange('email', e.target.value.toLowerCase())}
                        error={Boolean(errors.email)}
                        inputRef={emailRef}
                      // helperText={errors.email && 'Enter a valid email address.'}
                      />
                      </div>
                       {errorMessage && (
                    <Alert severity='error'
                      onClose={() => setErrorMessage(null)}
                    >
                      {errorMessage}
                    </Alert>
                  )}
                    </>
                  ) : (
                    <>
                      <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1'>
                          <Typography variant='h5'>{`One Time Security`}</Typography>
                          <Typography>Please enter the verification code sent to <span className='text-primary font-ea-sb'>{userData?.email}</span></Typography>
                        </div>
                        <OTPverify email={userData?.email} role={"register"} setIsOtpVerified={setIsOtpVerified} handleVerifyOtp={handleVerifyOtp} Errors={errors} ErrorMessageLogin={errorMessage} />
                      </div>
                    </>)
                  }


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
                    ) :
                      ""
                    }
                  </Box>
                  <div className='flex justify-center items-center flex-wrap' style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                    <div className='flex flex-wrap gap-2'>
                      <Typography className='font-ea-n'>Already have an account? </Typography>
                      <Typography className='font-ea-n' color='primary' style={{ cursor: 'pointer' }} onClick={() => {
                        router.push('/login')
                      }}>
                        Login
                      </Typography>
                    </div>

                    <Typography className='font-ea-sb' style={{ fontSize: "10px" }}>By clicking
                      <Link href="#" className='text-primary' onClick={(e) => e.preventDefault()} > ‘Get started’ </Link>
                      you are agreeing to our
                      <Link href="#" className='text-primary' onClick={(e) => e.preventDefault()} > Terms of Use </Link>
                      and
                      <Link href="#" className='text-primary' onClick={(e) => e.preventDefault()} > Privacy Policy.
                      </Link>
                    </Typography>
                    <div style={{ display: 'none' }}>
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}
                        size="invisible"
                      />
                    </div>

                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default RegisterPage
