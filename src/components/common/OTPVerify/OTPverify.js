import React, { useState, useEffect, useRef } from "react";
import "./OTPverify.css";
import { toastDisplayer } from "@/@core/components/toast-displayer/toastdisplayer";
import { requestOtp, VerifyOtp } from "@/app/Server/API/auth";

function OTPverify({ email,role,setIsOtpVerified }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]); // Ref array for OTP input fields

  useEffect(() => {
    let interval = null;
    if (isResendDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setIsResendDisabled(false);
            clearInterval(interval);
            return 60;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else if (!isResendDisabled && timer !== 60) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled, timer]);

  useEffect(() => {
    // Focus on the first input when the component is mounted
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/[^0-9]/.test(value) && value !== "") {
      toastDisplayer("error", "Please enter a valid number");
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // Move focus to the next input if current input is filled
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      }
    }
  };

  const handleVerifyOTP = async (otpCode) => {
    try {
      console.log("Sending OTP:", otpCode); // Log OTP
      console.log("Sending Email:", email);  // Log Email
      const response = await VerifyOtp(email, otpCode,role);
      if(response.hasError){
        return toastDisplayer('error', error.error || 'Failed to verify OTP');
      }else{
        setIsOtpVerified("verified")
      }
      console.log("API Response:", response); // Log the response
      toastDisplayer('success', 'OTP verified successfully');
      // onSuccess(otpCode); // Pass OTP to the next step
    } catch (error) {
      console.log("Error Response:", error); // Log the error response
      toastDisplayer('error', error.error || 'Failed to verify OTP');
    }
  };

  useEffect(() => {
    if (otp.every((digit) => digit.length === 1)) {
      const otpCode = otp.join("");
      handleVerifyOTP(otpCode); // Call the verify method when OTP is complete
    }
  }, [otp]);

  const handleResend = async () => {
    setIsResendDisabled(true);
    setTimer(60);
    try {
      const result = await requestOtp(email,role);
      if (result.hasError) {
        return toastDisplayer("error", result.error)
      } 
      toastDisplayer('success', 'OTP sent successfully');
    } catch (error) {
      console.log("Error Resending OTP:", error); // Log the error response
      toastDisplayer('error', error.error || 'Failed to resend OTP');
    }
  };

  return (
    <div className="otp-form">
      {/* <div className="emailIcon">
        <i className="material-symbols-outlined mailIcon">mail</i>
      </div> */}
      <div className="otp-input-container">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
            className="otp-input"
            ref={(el) => (inputRefs.current[index] = el)} // Assign ref to input elements
          />
        ))}
      </div>
      <div className="resendOTP">
      
        <button
          onClick={handleResend}
          disabled={isResendDisabled}
          className={`resend-button ${isResendDisabled ? "disabled" : ""}`}
        >
          Resend OTP {isResendDisabled && `(${timer}s)`}
        </button>
      </div>
    </div>
  );
}

export default OTPverify;
