import React, { useState, useEffect, useRef } from 'react'
import './OTPverify.css'
// import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer'
import { requestOtp, VerifyOtp } from '@/app/Server/API/auth'
import { Alert, Button } from '@mui/material'

function OTPverify({ email, role, setIsOtpVerified, handleVerifyOtp, ErrorMessageLogin, Errors }) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isResendDisabled, setIsResendDisabled] = useState(true)
  const [timer, setTimer] = useState(60)
  const inputRefs = useRef([])
  const hiddenInputRef = useRef(null)
  const [errors, setErrors] = useState(Errors)
  const [errorMessage, setErrorMessage] = useState(ErrorMessageLogin)

  useEffect(()=>{
    setErrors(Errors);
    setErrorMessage(ErrorMessageLogin);
  },[Errors, ErrorMessageLogin])

  useEffect(() => {
    // Timer countdown for resend OTP button
    if (isResendDisabled) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            setIsResendDisabled(false)
            clearInterval(interval)
            return 60
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isResendDisabled])

  useEffect(() => {
    // Focus the first input on component mount
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (e, index) => {
    const value = e.target.value
    if (!/^\d?$/.test(value)) {
      setErrors(true)
      setErrorMessage('Please enter a valid number')
      // toastDisplayer('error', 'Please enter a valid number')
      return
    }
    setErrors(false)
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next field if input is filled
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  // const handleVerifyOTP = async () => {
  //   const otpCode = otp.join('')
  //   try {
  //     const response = await VerifyOtp(email, otpCode, role)
  //     if (response.hasError) {
  //       setErrors(true)
  //       return setErrorMessage(response.error || 'Failed to verify OTP')
  //       // return toastDisplayer('error', response.error || 'Failed to verify OTP')
  //     }
  //     setErrors(false)
  //     setIsOtpVerified('verified')
  //   } catch (error) {
  //     setErrors(true)
  //     return setErrorMessage(error.error || 'Failed to verify OTP')
  //     // toastDisplayer('error', error.error || 'Failed to verify OTP')
  //   }
  // }

  useEffect(() => {
    if (otp.every(digit => digit.length === 1)) {
      const otpCode = otp.join('')
      handleVerifyOtp(otpCode) // Call the verify method when OTP is complete
      // handleVerifyOTP(otpCode) // Call the verify method when OTP is complete
    }
  }, [otp])

  const handlePaste = e => {
    const pastedData = e.clipboardData.getData('Text')
    if (pastedData.length === otp.length && /^\d+$/.test(pastedData)) {
      setErrors(false)
      const newOtp = pastedData.split('')
      setOtp(newOtp)
      newOtp.forEach((digit, idx) => {
        if (inputRefs.current[idx]) {
          inputRefs.current[idx].value = digit
        }
      })
      inputRefs.current[5]?.focus()
      e.preventDefault()
    }
  }

  const handleHiddenInputChange = e => {
    const pastedData = e.target.value
    if (pastedData.length === otp.length && /^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('')
      setOtp(newOtp)
      hiddenInputRef.current.value = '' // Clear hidden input
    }
  }

  const handleResend = async () => {
    setIsResendDisabled(true)
    setTimer(60)
    try {
      const result = await requestOtp(email, role)
      // if (!result?.Status) {
      //   return toastDisplayer('error', result?.Error)
      // }
      // if (result.hasError) {
      //   return toastDisplayer('error', result.error)
      // }
      setOtp(['', '', '', '', '', ''])
      toastDisplayer('success', 'OTP sent successfully')
    } catch (error) {
      setErrors(true)
      return setErrorMessage(error.error || 'Failed to resend OTP')
      // toastDisplayer('error', error.error || 'Failed to resend OTP')
    }
  }

  return (
    <div className='otp-form'>
      <div
        className='otp-input-container'
        // onClick={handleFocusOnContainerClick}
        onClick={e => {
          if (e.target === e.currentTarget) hiddenInputRef.current.focus()
        }}
      >
        {otp.map((digit, index) => (
          <input
            key={index}
            type='text'
            value={digit}
            onChange={e => handleChange(e, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            onPaste={handlePaste}
            maxLength={1}
            className='otp-input'
            ref={el => (inputRefs.current[index] = el)}
            inputMode='numeric'
          />
        ))}

        {/* Hidden input for mobile OTP paste */}
        <input
          ref={hiddenInputRef}
          type='text'
          inputMode='numeric'
          onChange={handleHiddenInputChange}
          style={{
            position: 'absolute',
            opacity: 0,
            pointerEvents: 'none',
            width: 0,
            height: 0
          }}
          maxLength={otp.length}
        />
      </div>
      {errors && errorMessage ? (
        <Alert
          fullWidth
          icon={false}
          severity='error'
          onClose={() => {
            setErrors(false)
          }}
        >
          {errorMessage}
        </Alert>
      ) : (
        ''
      )}

      <Button
        fullWidth
        variant='contained'
        disabled={isResendDisabled}
        onClick={handleResend}
        sx={{
          backgroundColor: '#590A73',
          '&:hover': {
            backgroundColor: '#4a055b'
          },
          textTransform: 'none'
        }}
      >
        Resend OTP {isResendDisabled && `(${timer}s)`}
      </Button>
    </div>
  )
}

export default OTPverify
