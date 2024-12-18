'use client'

// React Imports
import { useContext, useEffect, useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
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

// Styled Custom Components
const LoginIllustration = styled('img')(({ theme }) => ({
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

const LoginV2 = ({ mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const starImg = '/images/pages/stars.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/sign-picture.png'
  const lightIllustration = '/images/illustrations/auth/sign-picture.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    // darkIllustration,
    // borderedLightIllustration,
    // borderedDarkIllustration
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isDisable, setIsDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if (formData.email == "") {
        return toastDisplayer("error", "Email or username is required.")
      }
      if (formData.password == "") {
        return toastDisplayer("error", "password is required.")
      }
      setLoading(true);
      setIsDisable(true);
      const result = await login(formData);
      setLoading(false);
      if (result.error) {
        setIsDisable(false);
      } else {
        setIsDisable(false);
        router.push('/kundli')
      }
    } catch (error) {

    }
  };

  const handleInput = (fieldName, e) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: e.target.value
    }));
  }
  const spinAnimation = {
    animation: 'spin 25s linear infinite'
  };
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
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);
  }, []);
  return (
    <>
    {loading && <Loader />}
      <div className='flex bs-full justify-center'>
        <div
          className={classnames(
            'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
            {
              'border-ie': settings.skin === 'bordered'
            }
          )}
          style={{ background: "#45163a", backgroundImage: 'url("../../public/images/illustrations/auth/stars.png")' }}
        >
          <div >
            <LoginIllustration src={characterIllustration} alt='character-illustration' style={{ ...spinAnimation, width: '80%', height: '80%' }} />
          </div>
          {!hidden && (
            <MaskImg
              alt='mask'
              src={authBackground}
              className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
            />
          )}
        </div>
        <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
          <Link className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
            <Logo color={"white"} />
          </Link>
          <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
            <div className='flex flex-col gap-1'>
              <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
              <Typography>Please sign-in to your account and start the adventure</Typography>
            </div>
            <form
              noValidate
              autoComplete='off'
              onSubmit={e => {
                e.preventDefault()
              }}
              className='flex flex-col gap-5'
            >
              <FloatingTextField
                fullWidth
                autoFocus
                label='Email or Username'
                placeholder='Enter your email or username'
                onChange={(e) => { handleInput("email", e); }}
              />
              <TextField
                fullWidth
                label='Password'
                placeholder='············'
                id='outlined-adornment-password'
                type={isPasswordShown ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                        <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                onChange={(e) => { handleInput("password", e); }} />
              {/* <FloatingTextField
              fullWidth
              label='Password'
              placeholder='············'
              id='outlined-adornment-password'
              type={isPasswordShown ? 'text' : 'password'}
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
            /> */}
              <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                <FormControlLabel control={<Checkbox />} label='Remember me' />
                <Typography className='text-end' color='primary' component={Link}>
                  Forgot password?
                </Typography>
              </div>
              <Button fullWidth variant='contained' type='submit' disabled={isDisable} onClick={handleLogin}>
                {isDisable ? <CircularProgress size={24} /> : 'Login'}
              </Button>

              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>New on our platform?</Typography>
                <Typography component={Link} color='primary'>
                  Create an account
                </Typography>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginV2
