'use client'
import * as React from 'react'
import TextField from '@mui/material/TextField'
import { outlinedInputClasses } from '@mui/material/OutlinedInput'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'

const customTheme = outerTheme =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#E0E3E7',
            '--TextField-brandBorderHoverColor': '#B2BAC2',
            '--TextField-brandBorderFocusedColor': '#6F7E8C',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)'
            }
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)'
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)'
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)'
            }
          }
        }
      }
    }
  })

const FloatingTextField = ({ label, value, onChange, placeholder, fullWidth }) => {
  const outerTheme = useTheme()

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <TextField fullWidth={fullWidth} label={label} placeholder={placeholder} value={value} onChange={onChange} />
    </ThemeProvider>
  )
}

export default FloatingTextField
