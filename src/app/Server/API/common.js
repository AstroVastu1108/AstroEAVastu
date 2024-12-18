import axios from 'axios'
import astroInstance from './astroInstance'
// const API_URL = process.env.NEXT_PUBLIC_APIURL

// get all the countries data
export async function getCountries() {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await astroInstance.get(`/geo/countries`)
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}

// get all the cities data as per search
export async function getCities(CountryCode, query) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await astroInstance.get(`/geo/city/${CountryCode}/${query}`)
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}

// get existing pdf by kundli id
export async function getKundliPdf(kundliId) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await astroInstance.get(`/astro/astro-vastu-report-pdf/${kundliId}`, {
      responseType: 'blob'
    })
    responseBody.responseData = response
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}

// save kundli data and get report
export async function getReport(payload) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await astroInstance.post(`/astro/astro-vastu-report`, payload)
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}
