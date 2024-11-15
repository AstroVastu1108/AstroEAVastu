'use client'

import Link from 'next/link'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import classnames from 'classnames'
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useEffect } from 'react'
import Cookies from 'js-cookie';
import { useAuth } from '@/@core/contexts/authContext'
import { useRouter } from 'next/navigation'
const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const NotFound = ({ mode,type }) => {
  const { logout } =useAuth();
  const router = useRouter()
  // Vars
  const darkImg = '/images/pages/misc-mask-dark.png'
  const lightImg = '/images/pages/misc-mask-light.png'
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fullUrl = `${window.location.pathname}`;
      if (fullUrl !== '/logout') {
        Cookies.set('prevPath', fullUrl, { expires: 1, path: '/' });
      }     
    }
  }, []);

  useEffect(()=>{
    if(type == "unAuthorized"){
      return router.push('/login')
    }
  },[])

  // Hooks
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const miscBackground = useImageVariant(mode, lightImg, darkImg)

  return (
    <div className='flex items-center justify-center min-bs-[100dvh] relative p-6 overflow-x-hidden'>
      {type == "not found" ? (
         <div className='flex items-center flex-col text-center'>
         <div className='flex flex-col gap-2 is-[90vw] sm:is-[unset] mbe-6'>
           <Typography className='font-medium text-8xl' color='text.primary'>
             404
           </Typography>
           <Typography variant='h4'>Page Not Found ⚠️</Typography>
           <Typography>we couldn&#39;t find the page you are looking for.</Typography>
         </div>
         <Button href='/' component={Link} variant='contained' onClick={()=>{window.history.back();}}>
           Go Back
         </Button>
 
       </div>
      ) : 
      (
        ""
      //   <div className='flex items-center flex-col text-center'>
      //   <div className='flex flex-col gap-2 is-[90vw] sm:is-[unset] mbe-6'>
      //     <Typography className='font-medium text-8xl' color='text.primary'>
      //       403
      //     </Typography>
      //     <Typography variant='h4'>You are not authorized ⚠️</Typography>
      //     <Typography>You tried to access a page you did not have prior authorization for.</Typography>
      //   </div>
      //   <Button href='/' component={Link} variant='contained' onClick={()=>{window.history.back();}}>
      //     Go Back
      //   </Button>

      // </div>
      )
      }
     
      {!hidden && (
        <MaskImg
          alt='mask'
          src={miscBackground}
          className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
        />
      )}
    </div>
  )
}

export default NotFound
