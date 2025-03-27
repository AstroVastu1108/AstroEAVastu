import astroInstance from './astroInstance';

// save Event data
export async function CreateEvent(payload) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await astroInstance.post(`/astro/kundali-create-event`, payload)
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}


// update Event data
export async function UpdateEvent(payload) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await astroInstance.post(`/astro/kundali-update-event`, payload)
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}


// Get Event data
export async function GetAllEvent(kId) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await astroInstance.post(`astro/kundali-event/${kId}`)
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}
