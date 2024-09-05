import axios from 'axios'
const API_URL = process.env.NEXT_PUBLIC_APIURL1

// get all the users
export async function GetUsers(TransactionID) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await axios.post(`${API_URL}/Auth/GetUser`,{
        "cmpTransId": TransactionID
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

// get user authrule
export async function GetUserAuthRule(TransactionID,Email) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await axios.post(`${API_URL}/Auth/getAuthRule`,{
      "cmpTransId": TransactionID,
      "userEmail": Email
      })
    responseBody.responseData = JSON.parse(response.data.result.authRule)
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}


// save user data
export async function CreateUser(payload) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await axios.post(`${API_URL}/Auth/UserRegistration`, payload)
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}
