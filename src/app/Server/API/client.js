import axios from 'axios'
const API_URL = process.env.NEXT_PUBLIC_APIURL1
// save client data
export async function CreateClient(payload) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await axios.post(`${API_URL}/Client/save`, payload)
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}

// get all the clients
export async function GetClients(TransactionID) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await axios.post(`${API_URL}/Client/GetClient`,{
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

// delete the clients
export async function DeleteClient(ClientID,TransactionID) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await axios.post(`${API_URL}/Client/delete`,{
        "clientID":ClientID,
        "companyID": TransactionID
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