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
