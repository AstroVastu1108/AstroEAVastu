import axiosInstance from './axiosInstance'

export async function SaveConfig(configureID,TransactionID,city,country) {
    const responseBody = {
      responseData: null,
      hasError: false,
      error: null
    }
    try {
      const response = await axiosInstance.post(`/Configuration/upsert`,{
        "ConfigureID": configureID ? configureID : "",
        "cmpId": TransactionID,
        "country": country,
        "city": city
      })
      responseBody.responseData = response.data.result
      return responseBody
    } catch (error) {
      responseBody.hasError = true
      responseBody.errorMessage = responseBody.errorMessage =
        error.response?.data?.statusMsg || error.response?.data?.errors
      return responseBody
    }
  }


export async function GetConfig() {
    const responseBody = {
      responseData: null,
      hasError: false,
      error: null
    }
    try {
      const response = await axiosInstance.post(`/Configuration/getConfiguration`)
      console.log("response : ",response.data)
      responseBody.responseData = response.data?.Result?.Configuration
      return responseBody
    } catch (error) {
      responseBody.hasError = true
      responseBody.errorMessage = responseBody.errorMessage =
        error.response?.data?.statusMsg || error.response?.data?.errors
      return responseBody
    }
  }