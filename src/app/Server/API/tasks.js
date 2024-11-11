import axios from 'axios'
import axiosInstance from './axiosInstance'
const API_URL = process.env.NEXT_PUBLIC_APIURL1
// save column data
// export async function CreateColumn(payload) {
//   const responseBody = {
//     responseData: null,
//     hasError: false,
//     error: null
//   }
//   try {
//     const response = await axios.post(`${API_URL}/Client/save`, payload)
//     responseBody.responseData = response.data
//     return responseBody
//   } catch (error) {
//     responseBody.hasError = true
//     responseBody.errorMessage = responseBody.errorMessage =
//       error.response?.data?.statusMsg || error.response?.data?.errors
//     return responseBody
//   }
// }

// get all column
export async function GetColumns(TransactionID,ClientId) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await axios.post(`${API_URL}/ColumnGroup/column/get`,{
        "cmpTransId": TransactionID,
        "CmpClientId":ClientId
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

// get all column by company
export async function GetColumnsByComp(TransactionID) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await axios.post(`${API_URL}/ColumnGroup/column/getByComp`,{
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

// get all tasks
export async function GetTasks(TransactionID,ClientId) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await axiosInstance.post(`/KundaliTask/task/getClientTasks`,{
        "cmpTransId": TransactionID,
        "CmpClientId":ClientId
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

// get all tasks by company
export async function GetCompanyTasks(TransactionID) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await axiosInstance.post(`/KundaliTask/task/getTasks`,{
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

export async function AddTasks(PayLoad) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await axios.post(`${API_URL}/KundaliTask/task/create`,PayLoad)
    responseBody.responseData = response.data
    return responseBody
  } catch (error) {
    responseBody.hasError = true
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors
    return responseBody
  }
}

// delete the clients
// export async function DeleteClient(ClientID,TransactionID) {
//   const responseBody = {
//     responseData: null,
//     hasError: false,
//     error: null
//   }
//   try {
//     const response = await axios.post(`${API_URL}/Client/delete`,{
//         "clientID":ClientID,
//         "companyID": TransactionID
//       })
//     responseBody.responseData = response.data.result
//     return responseBody
//   } catch (error) {
//     responseBody.hasError = true
//     responseBody.errorMessage = responseBody.errorMessage =
//       error.response?.data?.statusMsg || error.response?.data?.errors
//     return responseBody
//   }
// }