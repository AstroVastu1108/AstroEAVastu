import axios from 'axios'
import astroInstance from './astroInstance'

// get all the vastu layouts
export async function getVastuLayouts() {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    // const response = await astroInstance.get(`/VastuLayout`)
    const response = await axios.get(`https://localhost:7025/api/VastuLayout`,{
      headers: {
        'M-CID': 'CYdGb1R8fAuHJs3KDXFJcgt~*~*',
        'm-secure-route': 'MAYCOMS~8774870783E457233625949533E475833635349745B214070347B4B42757050785A56787E4346433F457C69394A6E486F607D685A4A52746A77756F684F6D615M~P8Mu2jUDhmRqC9KfyZpp+fDKnGCde3nvuNwdwtaoAnuSVp2oFPwYYOSFcf+jT498E~',
        'm-iid':'IB0E6AC2-CDDF-4361-A2CB-63BBB169F8BB',
        'm-did':'DB4C23CC-2DE9-47E8-58C0-A6A783CC984F'
      },
    })
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}

// Save Vastu Layout
export async function saveVastuLayouts(payload) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    // const response = await astroInstance.get(`/VastuLayout`)
    const response = await axios.post(`https://localhost:7025/api/VastuLayout`,payload,{
      headers: {
        'M-CID': 'CYdGb1R8fAuHJs3KDXFJcgt~*~*',
        'm-secure-route': 'MAYCOMS~8774870783E457233625949533E475833635349745B214070347B4B42757050785A56787E4346433F457C69394A6E486F607D685A4A52746A77756F684F6D615M~P8Mu2jUDhmRqC9KfyZpp+fDKnGCde3nvuNwdwtaoAnuSVp2oFPwYYOSFcf+jT498E~',
        'm-iid':'IB0E6AC2-CDDF-4361-A2CB-63BBB169F8BB',
        'm-did':'DB4C23CC-2DE9-47E8-58C0-A6A783CC984F'
      },
    })
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}
