import axios from 'axios'
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

// get all tasks
export async function GetTasks(TransactionID,ClientId) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null
  }
  try {
    const response = await axios.post(`${API_URL}/KundliTask/task/get`,{
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