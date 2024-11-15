// import React, { useState, useEffect, useRef } from 'react'
// import './OTPverify.css'
// import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer'
// import { requestOtp, VerifyOtp } from '@/app/Server/API/auth'
// import { LoadingButton } from '@mui/lab'
// import { Button } from '@mui/material'

// function OTPverify({ email, role, setIsOtpVerified }) {
//   const [otp, setOtp] = useState(['', '', '', '', '', ''])
//   const [isResendDisabled, setIsResendDisabled] = useState(true)
//   const [timer, setTimer] = useState(60)
//   const inputRefs = useRef([]) // Ref array for OTP input fields
//   const hiddenInputRef = useRef(null)

//   useEffect(() => {
//     let interval = null
//     if (isResendDisabled) {
//       interval = setInterval(() => {
//         setTimer(prevTimer => {
//           if (prevTimer <= 1) {
//             setIsResendDisabled(false)
//             clearInterval(interval)
//             return 60
//           }
//           return prevTimer - 1
//         })
//       }, 1000)
//     } else if (!isResendDisabled && timer !== 60) {
//       clearInterval(interval)
//     }
//     return () => clearInterval(interval)
//   }, [isResendDisabled, timer])

//   useEffect(() => {
//     // Focus on the first input when the component is mounted
//     if (inputRefs.current[0]) {
//       inputRefs.current[0].focus()
//     }
//   }, [])

//   const handleChange = (e, index) => {
//     const value = e.target.value

//     if (/[^0-9]/.test(value) && value !== '') {
//       toastDisplayer('error', 'Please enter a valid number')
//       return
//     }

//     const newOtp = [...otp]
//     newOtp[index] = value

//     setOtp(newOtp)

//     // Move focus to the next input if current input is filled
//     if (value.length === 1 && index < 5) {
//       inputRefs.current[index + 1].focus()
//     }
//   }

//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Backspace') {
//       if (otp[index] === '') {
//         if (index > 0) {
//           inputRefs.current[index - 1].focus()
//         }
//       }
//     }
//   }

//   const handleVerifyOTP = async otpCode => {
//     try {
//       const response = await VerifyOtp(email, otpCode, role)
//       if (response.hasError) {
//         return toastDisplayer('error', error.error || 'Failed to verify OTP')
//       } else {
//         setIsOtpVerified('verified')
//       }
//     } catch (error) {
//       toastDisplayer('error', error.error || 'Failed to verify OTP')
//     }
//   }

//   useEffect(() => {
//     if (otp.every(digit => digit.length === 1)) {
//       const otpCode = otp.join('')
//       handleVerifyOTP(otpCode) // Call the verify method when OTP is complete
//     }
//   }, [otp])

//   const handleResend = async () => {
//     setIsResendDisabled(false)
//     setTimer(60)
//     try {
//       const result = await requestOtp(email, role)
//       if (result.hasError) {
//         return toastDisplayer('error', result.error)
//       }
//       setIsResendDisabled(true)
//       setOtp(['', '', '', '', '', ''])
//       toastDisplayer('success', 'OTP sent successfully')
//     } catch (error) {
//       toastDisplayer('error', error.error || 'Failed to resend OTP')
//     }
//   }

//   const handlePaste = e => {
//     // Get pasted text
//     const pastedData = e.clipboardData.getData('Text')

//     // Check if pasted data length matches the OTP length and is numeric
//     if (pastedData.length === otp.length && /^\d+$/.test(pastedData)) {
//       // Split pasted data and update the OTP state
//       const newOtp = pastedData.split('')
//       setOtp(newOtp)

//       // Focus the next input field if needed
//       newOtp.forEach((digit, index) => {
//         if (inputRefs.current[index]) {
//           inputRefs.current[index].value = digit
//         }
//       })

//       // Prevent the default paste behavior
//       e.preventDefault()
//     }
//   }

//   const handleHiddenInputChange = e => {
//     const pastedData = e.target.value

//     // Only process if the data length matches the OTP length and is numeric
//     if (pastedData.length === otp.length && /^\d+$/.test(pastedData)) {
//       const newOtp = pastedData.split('')
//       setOtp(newOtp)

//       // Populate each input and reset the hidden input
//       newOtp.forEach((digit, index) => {
//         if (inputRefs.current[index]) {
//           inputRefs.current[index].value = digit
//         }
//       })

//       // Clear hidden input value
//       hiddenInputRef.current.value = ''
//       inputRefs.current[otp.length - 1].focus() // Focus on the last field
//     }
//   }

//   return (
//     <div className='otp-form'>
//       <div className='otp-input-container' onClick={() => hiddenInputRef.current.focus()}>
//         {otp.map((digit, index) => (
//           <input
//             key={index}
//             id={`otp-input-${index}`}
//             type='text'
//             value={digit}
//             onChange={e => handleChange(e, index)}
//             onKeyDown={e => handleKeyDown(e, index)}
//             onPaste={handlePaste}
//             maxLength={1}
//             className='otp-input'
//             ref={el => (inputRefs.current[index] = el)} // Assign ref to input elements
//             inputMode='numeric'
//           />
//         ))}

//         <input
//           ref={hiddenInputRef}
//           type='text'
//           inputMode='numeric'
//           onChange={handleHiddenInputChange}
//           style={{
//             position: 'absolute',
//             opacity: 0,
//             pointerEvents: 'none',
//             width: 0,
//             height: 0
//           }}
//           maxLength={otp.length}
//         />
//       </div>
//       <Button
//         fullWidth
//         variant='contained'
//         disabled={isResendDisabled}
//         onClick={handleResend}
//         loading={isResendDisabled}
//         // loadingPosition="start"
//         type='submit'
//         sx={{
//           backgroundColor: '#590A73',
//           '&:hover': {
//             backgroundColor: '#4a055b'
//           }
//         }}
//       >
//         Resend OTP {isResendDisabled && `(${timer} seconds)`}
//       </Button>
//     </div>
//   )
// }

// export default OTPverify


import React, { useState, useEffect, useRef } from 'react'
import './OTPverify.css'
import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer'
import { requestOtp, VerifyOtp } from '@/app/Server/API/auth'
import { Alert, Button } from '@mui/material'

function OTPverify({ email, role, setIsOtpVerified,handleVerifyOtp }) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isResendDisabled, setIsResendDisabled] = useState(true)
  const [timer, setTimer] = useState(60)
  const inputRefs = useRef([])
  const hiddenInputRef = useRef(null)
  const [errors, setErrors] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    // Timer countdown for resend OTP button
    if (isResendDisabled) {
      const interval = setInterval(() => {
        setTimer((prev) => {
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

  const handlePaste = (e) => {
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

  const handleHiddenInputChange = (e) => {
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
      if (result.hasError) {
        return toastDisplayer('error', result.error)
      }
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
        onClick={(e) => {
          if (e.target === e.currentTarget) hiddenInputRef.current.focus()
        }}
      >
        {otp.map((digit, index) => (
          <input
            key={index}
            type='text'
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            maxLength={1}
            className='otp-input'
            ref={(el) => (inputRefs.current[index] = el)}
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
            height: 0,
          }}
          maxLength={otp.length}
        />
      </div>
      {(errors && errorMessage) ?
        (
          <Alert fullWidth icon={false} severity='error' onClose={() => { setErrors(false)}}>
            {errorMessage}
          </Alert>
        )
        : "" }

      <Button
        fullWidth
        variant='contained'
        disabled={isResendDisabled}
        onClick={handleResend}
        sx={{
          backgroundColor: '#590A73',
          '&:hover': {
            backgroundColor: '#4a055b',
          },
          textTransform: 'none',
        }}
      >
        Resend OTP {isResendDisabled && `(${timer}s)`}
      </Button>
    </div>
  )
}

export default OTPverify
