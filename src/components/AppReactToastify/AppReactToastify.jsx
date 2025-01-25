'use client'

// MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled } from '@mui/material/styles'

// Third-party Imports
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import padding from 'tailwindcss-logical/plugins/padding'

// Styled Components
const ToastifyWrapper = styled(Box)(({ theme }) => {
  // Hooks
  // const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down(480))
  // const { settings } = useSettings()

  return {
    // ...(isSmallScreen && {
    //   '& .Toastify__toast-container': {
    //     marginBlockStart: theme.spacing(3),
    //     marginInline: theme.spacing(3),
    //     width: 'calc(100dvw - 1.5rem)'
    //   }
    // }),
    '& .Toastify__toast': {
      minBlockSize: 46,
      borderRadius: 'var(--mui-shape-borderRadius)',
      padding: theme.spacing(0.5, 1.5),
      backgroundColor: 'var(--mui-palette-background-paper)',
      boxShadow: 'var(--mui-customShadows-md)',
      border: '1px solid var(--mui-palette-divider)',
      // boxShadow: settings.skin === 'bordered' ? 'none' : 'var(--mui-customShadows-md)',
      // border: settings.skin === 'bordered' && '1px solid var(--mui-palette-divider)',
      // ...(isSmallScreen && {
      //   marginBlockEnd: theme.spacing(4)
      // }),
      '&:not(.custom-toast)': {
        '& .Toastify__toast-body': {
          color: 'var(--mui-palette-text-primary)',
          padding: '0px !important'
        },
        '&.Toastify__toast--success': {
          '& .Toastify__toast-icon svg': {
            height: "16px",
            width: "16px",
            fill: 'var(--mui-palette-success-main)'
          }
        },
        '&.Toastify__toast--error': {
          '& .Toastify__toast-icon svg': {
            height: "16px",
            width: "16px",
            fill: 'var(--mui-palette-error-main)'
          }
        },
        '&.Toastify__toast--warning': {
          '& .Toastify__toast-icon svg': {
            height: "16px",
            width: "16px",
            fill: 'var(--mui-palette-warning-main)'
          }
        },
        '&.Toastify__toast--info': {
          '& .Toastify__toast-icon svg': {
            height: "16px",
            width: "16px",
            fill: 'var(--mui-palette-info-main)'
          }
        }
      },
      '[data-skin="bordered"] &': {
        boxShadow: 'none',
        border: `1px solid var(--mui-palette-divider)`
      }
    },
    '& .Toastify__toast-body': {
      margin: 0,
      lineHeight: 1.46667,
      fontSize: theme.typography.body1.fontSize
    },
    '& .Toastify__toast-icon': {
      marginRight: "10px",
      // marginRight: theme.spacing(1),
      height: 20,
      width: 20,
      display:"flex",
      alignItems:"center",
      '& .Toastify__spinner': {
        margin: 3,
        height: 14,
        width: 14
      }
    },
    '& .Toastify__close-button': {
      color: 'var(--mui-palette-text-primary)',
      paddingTop: '4px !important'
    }
  }
})

const AppReactToastify = props => {
  const { boxProps, direction = 'ltr', ...rest } = props

  const positionMap = {
    'top-right': 'top-left',
    'top-left': 'top-right',
    'bottom-left': 'bottom-right',
    'bottom-right': 'bottom-left',
    'top-center': 'top-center',
    'bottom-center': 'bottom-center'
  }

  const position = direction === 'rtl' ? positionMap[themeConfig.toastPosition] : themeConfig.toastPosition

  return (
    <ToastifyWrapper {...boxProps}>
      <ToastContainer rtl={direction === 'rtl'} autoClose={3000} position={"top-right"} {...rest} />
    </ToastifyWrapper>
  )
}

export default AppReactToastify
