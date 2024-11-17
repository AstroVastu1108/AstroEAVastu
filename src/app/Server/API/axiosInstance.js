import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_APIURL1

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Function to refresh the token
// async function refreshTokenGet() {
//   try {
//     // Get the token from cookies
//     const authData = {
//       useremail: Cookies.get('astrovastu_auth_useremail'),
//       // accessToken: Cookies.get('astrovastu_auth_accessToken'),
//       userRole: Cookies.get('astrovastu_auth_userRole'),
//       // expirationTime: Cookies.get('astrovastu_auth_expirationTime'),
//       // refreshToken: Cookies.get('astrovastu_auth_refreshToken')
//   };

//     if (authData) {
//       const {  useremail, userRole, expirationTime, transactionID } = authData
//       // const { refreshToken, accessToken, useremail, userRole, expirationTime, transactionID } = authData

//       // Send a request to refresh the token
//       // const response = await axios.post(`${API_URL}/Auth/refresh`, {
//       //   accessToken,
//       //   refreshToken
//       // })

//       // If the response contains a new access token, return it
//       // if (response.data && response.data.result && response.data.result.accessToken) {
//       //   Cookies.set('astrovastu_auth_accessToken', response.data.result.accessToken, { expires: 1 });
//       //   return response.data.result.accessToken
//       // }

//       // throw new Error('No new access token returned')
//     }

//     throw new Error('No token found')
//   } catch (error) {
//     throw new Error('Token refresh failed')
//   }
// }

// Request interceptor to add access token to request headers
axiosInstance.interceptors.request.use(
  async config => {
    const authData = {
      useremail: Cookies.get('astrovastu_auth_useremail'),
      userRole: Cookies.get('astrovastu_auth_userRole'),
      DID: Cookies.get('M-DID'),
      ClientID: Cookies.get('astrovastu_auth_ClientID'),
      InstanceID: Cookies.get('astrovastu_auth_InstanceID'),
      SecureRoute: Cookies.get('astrovastu_auth_SecureRoute')
  };
    if (authData) {
      const { DID,InstanceID,ClientID,SecureRoute } = authData
      config.headers['M-DID'] = DID;
      config.headers['M-CID'] = ClientID;
      config.headers['M-IID'] = InstanceID;
      config.headers['M-SECURE-ROUTE'] = SecureRoute;
    }
    return config
  },
  error => Promise.reject(error)
)

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const originalRequest = error.config

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        originalRequest.headers['M-DID'] = DID;
        originalRequest.headers['M-CID'] = ClientID;
        originalRequest.headers['M-IID'] = InstanceID;
        originalRequest.headers['M-SECURE-ROUTE'] = SecureRoute;
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        Cookies.remove('astrovastu_auth_SecureRoute')
        Cookies.remove('astrovastu_auth_InstanceID')
        Cookies.remove('astrovastu_auth_ClientID')
        window.location.href = '/logout'
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
