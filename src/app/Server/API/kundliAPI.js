import axios from 'axios'
const API_URL = process.env.NEXT_PUBLIC_APIURL

// get all the kundli data
export async function GetKundliDataAPI(PageSize,PageNumber) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await axios.get(`${API_URL}/astro/kundali-list/${PageSize}/${PageNumber}`)
    responseBody.responseData = response
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}

// save kundli data and get kundli id
export async function CreateKundli(payload) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await axios.post(`${API_URL}/astro/create-kundali`, payload)
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}

// update kundli data and get kundli id
export async function UpdateKundli(payload) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await axios.post(`${API_URL}/astro/update-kundali`, payload)
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}


// get kundli data from kundli id
export async function GetKundliIDDataAPI(kId) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await axios.get(`${API_URL}/astro/astro-vastu-report/${kId}`)
    responseBody.responseData = response
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}
