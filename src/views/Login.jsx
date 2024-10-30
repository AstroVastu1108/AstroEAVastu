'use client'

// React Imports
import { useContext, useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

import { createTheme, ThemeProvider } from '@mui/material';
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import { useAuth } from '@/@core/contexts/authContext'
import FloatingTextField from '@/components/common/FloatingTextField'
import CircularProgress from '@mui/material/CircularProgress';
import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer'
import { TextField } from '@mui/material'
import Loader from '@/components/common/Loader/Loader'
import OTPverify from '@/components/common/OTPVerify/OTPverify'
import { requestOtp, validateCaptcha } from '@/app/Server/API/auth'
import { LoadingButton } from '@mui/lab'
import Cookies from 'js-cookie';


const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const LoginV2 = ({ mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const lightIllustration = '/images/illustrations/auth/web-bkg.jpg'

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode)

  const passwordInputRef = useRef(null);

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const { loginData } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isDisable, setIsDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState("pending");
  const [errors, setErrors] = useState({
    email: false,
    password: false
  })

  const recaptchaRef = useRef(null);


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (formData.email == "") {
        toastDisplayer("error", "Email is required.")
        setIsDisable(false)
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
        handleVerifyEmail();
      } else {
        setIsDisable(false)
        recaptchaRef.current.reset();
      }
    } catch (error) {
      setIsDisable(false)
      return toastDisplayer('error', 'Server error. Please try again later.');
    }
  };

  const handleVerifyEmail = async () => {
    try {
      if (formData.email == "") {
        toastDisplayer("error", "Email is required.")
        setIsDisable(false)
        return setErrors(prev => ({
          ...prev,
          email: true
        }));
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        toastDisplayer("error", "Invalid Email address.")
        return setErrors(prev => ({
          ...prev,
          email: true
        }));
      }
      setErrors(prev => ({
        ...prev,
        email: false
      }));

      setIsDisable(true)
      const result = await requestOtp(formData?.email, "login")
      if (result.hasError) {
        setIsDisable(false);
        setIsOtpVerified("pending")
        return toastDisplayer("error", result.error)
      } else {
        setIsDisable(false);
        setIsOtpVerified("sent")
      }
    } catch (error) {
      setIsDisable(false);
      setIsOtpVerified("pending")
      return toastDisplayer("error", error)
    }
  }

  const handlePreviousBtn = () => {
    setIsOtpVerified("pending")
  }

  const handleLogin = async () => {
    try {
      if (formData.email == "") {
        return toastDisplayer("error", "Email is required.")
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        return toastDisplayer("error", "Invalid email address.")
      }
      // if (formData.password == "") {
      //   return toastDisplayer("error", "password is required.")
      // }
      setIsDisable(true)
      const result = await loginData(formData)
      if (result.error) {
        setIsDisable(false);
        setLoading(false);
        // console.log("Result : ", result.error)
        setIsOtpVerified("pending")
        return toastDisplayer("error", result.message)
      } else {
        // setIsDisable(false);
        // setIsOtpVerified("pending")
        // toastDisplayer('success', `${result.message} \nYou will be redirecting...`)
        const storedSessionValue = JSON.parse(Cookies.get('authState'));
        const { authRule } = storedSessionValue;
        const routePermissions = JSON.parse(authRule);
        const firstAccessibleItem = routePermissions.find(item => item.HasAccess);
        // setLoading(false)
        return router.push(firstAccessibleItem.Href)
      }
    } catch (error) {
      setIsDisable(false);
      setIsOtpVerified("pending")
      setLoading(false)
      // console.log("error : ", error)
      return toastDisplayer("error", error)
    }
  };

  const handleInput = (fieldName, e) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: e.target.value
    }));
  }

  useEffect(() => {
    if (isOtpVerified == "verified") {
      // passwordInputRef.current.focus();
      setLoading(true);
      handleLogin();
    }
  }, [isOtpVerified])

  const customtheme = createTheme({
    typography: {
      fontFamily: 'Segoe UI, sans-serif',
    },
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
            {/* <Link className=' block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
          <Logo color={hidden ? 'primary' : 'white'} />
          </Link> */}
            <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
              {isOtpVerified == "pending" || isOtpVerified == "verifiedd" ? (
                <>
                  <Link href="#" onClick={(e) => e.preventDefault()} className='block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
                    <Logo color={'primary'} />
                  </Link>
                  <div className='flex flex-col gap-1'>
                    <Typography variant='h5'>{`Continue to use ${themeConfig.templateName}.Net`}</Typography>
                    <Typography>Please sign-in to enhance life experiences !!!</Typography>
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
                      label='Email or Phone'
                      // placeholder='Enter your email'
                      onChange={(e) => { handleInput("email", e); }}
                      value={formData.email}
                      {...(errors.email && { error: true })}
                    />
                    {
                      isOtpVerified == "verifiedd" ? <>

                        <TextField
                          fullWidth
                          label='Password'
                          placeholder='············'
                          id='outlined-adornment-password'
                          type={isPasswordShown ? 'text' : 'password'}
                          value={formData.password}
                          inputRef={passwordInputRef}
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
                        />
                        <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                          <FormControlLabel control={<Checkbox />} label='Remember me' />
                          <Typography className='text-end' color='primary' component={Link}>
                            Forgot password?
                          </Typography>
                        </div>
                      </> : ""}
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
                          {isDisable ? "Loading ..." : "Next"}
                        </LoadingButton>
                      ) : ""
                    }
                    {
                      isOtpVerified == "verifiedd" ? (
                        <LoadingButton
                          fullWidth
                          variant='contained'
                          onClick={handleLogin}
                          loading={isDisable}
                          loadingPosition="start"
                          type='submit'
                        >
                          {isDisable ? "Loading ..." : "Login"}
                        </LoadingButton>
                      ) : ""
                    }

                    {/* <Button fullWidth variant='contained' type='submit' disabled={isDisable} onClick={handleLogin}>
                  {isDisable ? <CircularProgress size={24} value={"Loading"} /> : 'Login'}
                </Button> */}

                    <div className='flex justify-center items-center flex-wrap gap-2'>
                      <Typography>No Account?</Typography>
                      <Typography color='primary' style={{ cursor: 'pointer' }} onClick={() => {
                        router.push('/register')
                      }}>
                        Create New Account
                      </Typography>
                    </div>
                  </form>
                </>
              ) :
                <>
                  <div className="backbtn">
                    <i
                      className="tabler-arrow-left"
                      style={{
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      onClick={handlePreviousBtn}
                    ></i>
                    <div className="step-text">Go Back</div>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <Typography variant='h4'>{`OTP Verification`}</Typography>
                    <Typography>Please enter the 6 digit code sent to {formData?.email}.</Typography>
                  </div>
                  <OTPverify email={formData?.email} role={"login"} setIsOtpVerified={setIsOtpVerified} />
                </>

              }
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}
                size="invisible"
              />


            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default LoginV2
