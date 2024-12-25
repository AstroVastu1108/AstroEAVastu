import axios from 'axios'
import astroInstance from './astroInstance'
// const API_URL = process.env.NEXT_PUBLIC_APIURL

// get all the kundli data
export async function GetKundliDataAPI(PageSize, PageNumber, Search = '', Group = '') {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    var apiURL = `/astro/kundali-list/${PageSize}/${PageNumber}`
    if (Search != '') {
      apiURL = `/astro/kundali-list/${PageSize}/${PageNumber}/${Search}`
    }

    if (Group != 'All') {
      if (Search != '') apiURL = `/astro/kundali-list/${PageSize}/${PageNumber}/${Search}/${Group}`
      else apiURL = `/astro/kundali-list/${PageSize}/${PageNumber}/ /${Group}`
    }

    if (Search != '' && Group != 'All') {
      apiURL = `/astro/kundali-list/${PageSize}/${PageNumber}/${Search}/${Group}`
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

// save kundli data and get kundli id
export async function CreateKundli(payload) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await astroInstance.post(`/astro/create-kundali`, payload)
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
    const response = await astroInstance.post(`/astro/update-kundali`, payload)
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}

// deletekundli data and get kundli id
export async function DeleteKundli(KundaliID) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await astroInstance.post(`astro/delete-kundali/${KundaliID}`)
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
    const response = await astroInstance.get(`/astro/astro-vastu-report/${kId}`)
    responseBody.responseData = response
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}

// change kundli data and get kundli details
export async function ChangeDateTimeKundli(payload) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await astroInstance.post(`/astro/datetime-change`, payload)
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}

// search kundli data
export async function SearchKundli(searchText) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await astroInstance.get(`/astro/kundali-list/5/1/${searchText}`)
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}

// Get Event Options Selection
export async function EventOptionsData() {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await astroInstance.get(`/kundali-options-event`)
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}

// Get Kundli Options Selection
export async function KundliOptionsData() {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await astroInstance.get(`/kundali-options`)
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}

// For Dasha Click Event
export async function DashaClickEvent(payload) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await astroInstance.post(`/kundali-dasha`, payload)
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}

// For Transit Click Event
export async function TransitClickEvent(payload) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await astroInstance.post(`/astro/chart/transit`, payload)
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}

// For Transit Click Event
export async function DivisionalChartEvent(payload, dchart) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await astroInstance.post(`/astro/chart/divisional/${dchart}`, payload)
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}

// For rotate change
export async function RotateChartEvent(payload) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await astroInstance.post(`/astro/rotate`, payload)
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}
