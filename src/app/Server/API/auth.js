import axios from 'axios'
import axiosInstance from './axiosInstance'
import { RESPONSE_LIMIT_DEFAULT } from 'next/dist/server/api-utils'
const API_URL = process.env.NEXT_PUBLIC_APIURL1

export async function validateCaptcha(token) {
  try {
    const response = await axios.post(`https://localhost:7025/api/Auth/verify`, {
      token: token
    })

    // const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: new URLSearchParams({
    //     secret: process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SECRET_KEY,
    //     response: token,
    //   }).toString(),
    // });
    // console.log("NEXT_PUBLIC_GOOGLE_RECAPTCHA_SECRET_KEY : ",NEXT_PUBLIC_GOOGLE_RECAPTCHA_SECRET_KEY)
    const data = response.data
    return data.success ? { success: true } : { success: false, error: 'reCAPTCHA verification failed' }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export async function sendSignInRequest(payload, did) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null,
  };
  try {
    const response = await axiosInstance.post(`/Auth/LoginPost`,payload);
    return {
      isOk: response.data.Status,
      data: response.data
    }
  } catch (error) {
    return {
      isOk: false,
      data: (responseBody.errorMessage =
        error.response?.data?.statusMsg || error.message || error.response?.data?.errors)
    }
  }
}

export async function registerCompnay(payload, did) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    // console.log("Data compnay : ",company)
    // const payload = {
    //   userType: "CompanyMaster",
    //   email:company.email,
    //   firstName:company.fname,
    //   lastName:company.lname,
    //   // password: company.password,
    //   businessName:company.businessname,
    //   businessLocation:company.businesslocation,
    //   userAvatar:company.profilePicture,
    //   phone:company.phone,

    // }

    // const response = await axios.post(`${API_URL}/Auth/Registration`, payload, {
    //   headers: {
    //     'M-DID': did
    //   }
    // })
    const response = await axiosInstance.post(`Auth/Registration`,payload);
    console.log('response : ', response)
    return {
      isOk: response.data.Status,
      data: response.data
    }
    responseBody.responseData = response.data
    if (response.status === 200) {
      return {
        isOk: true,
        data: response.data.Result
      }
    } else {
      return {
        isOk: false,
        data: response.data
      }
    }
  } catch (error) {
    return {
      isOk: false,
      data: (responseBody.errorMessage =
        error.response?.data?.statusMsg || error.message || error.response?.data?.errors)
    }
  }
}

export const requestOtp = async (email, role) => {
  var payload = {
    eMail: email,
    userType: role
  }

  const responseBody = {
    responseData: null,
    hasError: false,
    error: null,
  };
  try {
    const response = await axiosInstance.post(`/Otp/GenerateOTP`, payload)
    if(!response?.data.Status){
      responseBody.hasError = true;
      responseBody.responseData = response?.data;
      return responseBody;
    }
    responseBody.responseData = response.data;
    return responseBody
  } catch (error) {
    responseBody.error = error.response?.data?.statusMsg || error.message || error.response?.data?.errors
    responseBody.hasError = true
    return responseBody
  }
}

export const requestOtpNewUser = async (email, firstName, lastname, role) => {
  var payload = {
    eMail: email,
    userType: role,
    LastName: lastname,
    FirstName: firstName
  }

  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await axiosInstance.post(`/Otp/GenerateOTP`,payload);
    // responseBody.response = response.data

    return response.data
  } catch (error) {
    responseBody.error = error.response?.data?.statusMsg || error.message || error.response?.data?.errors
    responseBody.hasError = true
    return responseBody
  }
}

export const VerifyOtp = async (email, otp, role) => {
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null
  }

  const payload = {
    email: email,
    verifyOTP: otp,
    userType: role
  }

  try {
    const response = await axiosInstance.post(`/Otp/VerifyOTP`, payload)
    responseBody.responseData = response.data

    if (response.data.Status === 400) {
      responseBody.hasError = true
      responseBody.errorMessage = response.data.statusMsg
    }
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = error.response?.data?.statusMsg || error.response?.data?.errors || error.message
    return responseBody
  }
}
