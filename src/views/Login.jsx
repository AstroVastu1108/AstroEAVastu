'use client'

// React Imports
import { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

import { Alert, createTheme, ThemeProvider } from '@mui/material';
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import { useAuth } from '@/@core/contexts/authContext'
// import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer'
import { TextField } from '@mui/material'
import Loader from '@/components/common/Loader/Loader'
import OTPverify from '@/components/common/OTPVerify/OTPverify'
import { requestOtp, sendSignInRequest, validateCaptcha } from '@/app/Server/API/auth'
import { LoadingButton } from '@mui/lab'
import Cookies from 'js-cookie';
import { navigation } from '@/app-navigation';

import "./global.css";


const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const LoginV2 = ({ mode }) => {
  const router = useRouter()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode)

  const { loginData } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    verifyoTP:""
  });
  const emailRef = useRef();
  const [isDisable, setIsDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState("pending");
  const [errors, setErrors] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const recaptchaRef = useRef(null);

  useEffect(() => {
    const authData = {
      useremail: Cookies.get('astrovastu_auth_useremail'),

      // accessToken: Cookies.get('astrovastu_auth_accessToken'),
      // userRole: Cookies.get('astrovastu_auth_userRole'),
      DID: Cookies.get('M-DID'),
      // expirationTime: Cookies.get('astrovastu_auth_expirationTime'),
      // refreshToken: Cookies.get('astrovastu_auth_refreshToken')
    };

    if (authData.useremail && authData.DID) {

      try {
        const firstAccessibleItem = navigation.find(item => item);
        if (firstAccessibleItem) {
          router.push(firstAccessibleItem.href);
        }
      } catch (error) {
      }
    }
  }, []);


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

  // useEffect(()=>{
  //   handleVerifyCaptcha();
  // },[])


  // const handleSubmit = async (e) => {
  //   try {
  //     e.preventDefault();
  //     if (formData.email == "") {
  //       emailRef.current.focus();
  //       setIsDisable(false)
  //       setErrors(true)
  //       // setErrorMessage("Email is required.")
  //       return setErrors(prev => ({
  //         ...prev,
  //         email: true
  //       }));
  //     }
  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     if (!formData.email || !emailRegex.test(formData.email)) {
  //       setIsDisable(false)
  //       setErrors(true)
  //       emailRef.current.focus();
  //       setErrorMessage("Invalid email address.")
  //       // toastDisplayer("error", "Invalid Email address.")
  //       return setErrors(prev => ({
  //         ...prev,
  //         email: true
  //       }));
  //     }
  //     // setIsDisable(true)
  //     const token = await recaptchaRef.current.executeAsync();
  //     recaptchaRef.current.reset();
  //     const recaptchaResponse = await fetch('/api/verifyRecaptcha', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ token }),
  //     });

  //     const recaptchaData = await recaptchaResponse.json();
  //     if (recaptchaData.success) {
  //       setIsDisable(true);
  //       handleVerifyEmail();
  //     } else {
  //       setIsDisable(false)
  //       recaptchaRef.current.reset();
  //     }
  //   } catch (error) {
  //     setIsDisable(false)
  //     return setErrorMessage('Server error. Please try again later.')
  //     // return toastDisplayer('error', 'Server error. Please try again later.');
  //   }
  // };

  const handleSubmit = async () => {
    try {
      // if(isCaptchaVerified){
      if (formData.email == "") {
        // toastDisplayer("error", "Email is required.")
        emailRef.current.focus();
        setErrors(true)
        setIsDisable(false)
        setErrorMessage("Email is required.")
        return setErrors(prev => ({
          ...prev,
          email: true
        }));
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        setIsDisable(false)
        setErrors(true)
        emailRef.current.focus();
        setErrorMessage("Invalid email address.")
        // toastDisplayer("error", "Invalid Email address.")
        return setErrors(prev => ({
          ...prev,
          email: true
        }));
      }
      setIsDisable(true)
      const result = await requestOtp(formData?.email, "login");
      if (result.hasError) {
        setIsDisable(false);
        setIsOtpVerified("pending")
        setErrors(true)
        return setErrorMessage(result.responseData?.Error)
      } else {
        setIsDisable(false);
        setIsOtpVerified("sent")
      }
    // }else{
    //   setErrorMessage("Unable to Verify Captcha. Try Again.");
    // }
    } catch (error) {
      setIsDisable(false);
      setIsOtpVerified("pending")
      setErrors(true)
      return setErrorMessage(error)
    }
  }

  // const handleLogin = async () => {
  //   try {
  //     if (formData.email == "") {
  //       setErrors(true)
  //       emailRef.current.focus();
  //       setErrorMessage("Email is required.")
  //       return toastDisplayer("error", "Email is required.")
  //     }
  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     if (!formData.email || !emailRegex.test(formData.email)) {
  //       setIsDisable(false)
  //       setErrorMessage("Invalid email address.")
  //       setErrors(true)
  //       return setErrorMessage("Invalid email address.")
  //     }
  //     setErrors(false)
  //     setIsDisable(true)
  //     const result = await loginData(formData)
  //     if (result.error) {
  //       setIsDisable(false);
  //       setLoading(false);
  //       setIsOtpVerified("pending")
  //       setErrors(true)
  //       return setErrorMessage(result.message)
  //     } else {
  //       const firstAccessibleItem = navigation.find(item => item);
  //       const prevPath = Cookies.get("prevPath")
  //       if (prevPath) {
  //         Cookies.remove("prevPath");
  //         return window.location.href = prevPath;
  //       }
  //       return router.push(firstAccessibleItem.href)
  //     }
  //   } catch (error) {
  //     setIsDisable(false);
  //     setIsOtpVerified("pending")
  //     setLoading(false)
  //     setErrors(true)
  //     return setErrorMessage(error)
  //   }
  // };

  const handleInput = (fieldName, e) => {
    setErrors(false);
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: e.target.value.toLowerCase()
    }));
  }
  const handleVerifyOtp = async (otp)=>{
    try {
      if (formData.email == "") {
        setErrors(true)
        emailRef.current.focus();
        setErrorMessage("Email is required.")
        // return toastDisplayer("error", "Email is required.")
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        setIsDisable(false)
        setErrorMessage("Invalid email address.")
        setErrors(true)
        return setErrorMessage("Invalid email address.")
      }
      setErrors(false)
      setIsDisable(true)
      setFormData((prevData) => ({
        ...prevData,
        "verifyoTP": otp
      }));
      const payload = {
        "email": formData.email,
        "verifyoTP": otp
      }
      const result = await sendSignInRequest(payload);
      if (!result?.data?.Status) {
        setIsDisable(false);
        setLoading(false);
        setIsOtpVerified("error")
        setErrors(true);
        return setErrorMessage(result?.data?.Error)
      } else {
        loginData(result);
        // setIsOtpVerified("verifiedd")
        const firstAccessibleItem = navigation.find(item => item);
        const prevPath = Cookies.get("prevPath")
        if (prevPath) {
          Cookies.remove("prevPath");
          return window.location.href = prevPath;
        }
        return router.push(firstAccessibleItem.href)
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
  //     handleLogin();
  //   }
  // }, [isOtpVerified])

  const customtheme = createTheme({
    // typography: {
    //   fontFamily: 'Segoe UI, sans-serif',
    // },
  });

  return (
    <>
      {loading && <Loader />}
      <ThemeProvider theme={customtheme}>
        <div className='flex bs-full justify-center' >
          <div
            className={classnames(
              'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
              {
                'border-ie': settings.skin === 'bordered'
              }
            )}
            style={{
              // background: "#4d0a72",
              backgroundImage: 'url("/images/illustrations/auth/web-bkg.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: '100vh',
              position: 'relative',
              // width:150
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
          <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
            <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
              <Link href="#" onClick={(e) => e.preventDefault()} className='block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
                <Logo color={'primary'} isSmall={false} width={hidden ? "65mm" : "45mm"} />
              </Link>
              {/* {isOtpVerified == "pending" || isOtpVerified == "verifiedd" ? ( */}
              {isOtpVerified == "pending" || isOtpVerified == "verifiedd" ? (
                <>

                  <div className='flex flex-col gap-1'>
                    <Typography className='font-ea-n' variant='h5'>{`Continue to use ${themeConfig.templateName}.Net`}</Typography>
                    <Typography className='font-ea-n'>Please sign-in to enhance life experiences !!!</Typography>
                  </div>
                  <form
                    noValidate
                    autoComplete='off'
                    onSubmit={e => {
                      e.preventDefault()
                    }}
                    className='flex flex-col gap-5'
                  >
                    <TextField
                      fullWidth
                      autoFocus
                      label='Email'
                      // placeholder='Enter your email'
                      onChange={(e) => handleInput("email", e)}
                      // onChange={(e) => { handleInput("email", e); }}
                      value={formData.email}
                      inputRef={emailRef}

                      {...(errors && { error: true })}

                    />

                    {(errors && errorMessage) ?
                      (
                        <Alert severity='error' onClose={() => { setErrors(false) }}>
                          {errorMessage}
                        </Alert>
                      )
                      : ""}

                    {
                      isOtpVerified == "pending" ? (
                        <LoadingButton
                          fullWidth
                          variant='contained'
                          onClick={handleSubmit}
                          // onClick={handleVerifyEmail}
                          loading={isDisable}
                          loadingPosition="start"
                          type='submit'
                          sx={{
                            backgroundColor: "#590A73", // Your custom color
                            "&:hover": {
                              backgroundColor: "#4a055b", // Optional hover color
                            },
                          }}
                        >
                          {isDisable ? "Sending OTP..." : "Next"}
                        </LoadingButton>
                      ) : ""
                    }
                    <div className="flex flex-col gap-6">

                      <div className='flex justify-center items-center flex-wrap gap-2'>
                        <Typography className='font-ea-n'>No Account?</Typography>
                        <Typography className='font-ea-n' color='primary' style={{ cursor: 'pointer' }} onClick={() => {
                          router.push('/sign-up')
                        }}>
                          Create New Account
                        </Typography>
                      </div>
                      <div>
                        <Typography className='font-ea-sb' style={{ fontSize: "12px", display: "flex", justifyContent: "center", gap: "10px" }}>
                          <Link href="#" onClick={(e) => e.preventDefault()}> Terms of Use </Link>
                          |
                          <Link href="#" onClick={(e) => e.preventDefault()} >Privacy Policy</Link>
                          |
                          <Link href="#" onClick={(e) => e.preventDefault()} > Help Centre
                          </Link>
                        </Typography>
                      </div>
                    </div>
                  </form>
                </>
              ) :
                <>
                  <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                      <Typography className='font-ea-n' variant='h5'>{`One Time Security`}</Typography>
                      <Typography className='font-ea-n'>Please enter the verification code sent to <span className='text-primary font-ea-sb'>{formData?.email}</span></Typography>
                    </div>
                  </div>
                  <OTPverify email={formData?.email} role={"login"} setIsOtpVerified={setIsOtpVerified} handleVerifyOtp={handleVerifyOtp} Errors={errors} ErrorMessageLogin={errorMessage}/>
                </>

              }
              {/* <div>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}
                  size="invisible"
                />
              </div> */}

            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default LoginV2
