import astroInstance from './astroInstance'

// get all the Log data
export async function GetLogDataAPI(PageSize, PageNumber, Search = '') {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    var apiURL = `/activity-logs/${PageSize}/${PageNumber}`
    if (Search != '') {
      apiURL = `/activity-logs/${PageSize}/${PageNumber}/${Search}`
    }

    const response = await astroInstance.get(apiURL)
    responseBody.responseData = response
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}
