import axios from 'axios'
const API_URL = process.env.NEXT_PUBLIC_APIURL1

// get all the users
export async function getUsers(TransactionID) {
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
export async function getUserAuthRule(TransactionID,Email) {
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