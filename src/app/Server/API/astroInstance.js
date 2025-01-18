import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_APIURL

// Create an axios instance
const astroInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
})

astroInstance.interceptors.request.use(
  async config => {
    const authData = {
      useremail: Cookies.get('astrovastu_auth_useremail'),
      userRole: Cookies.get('astrovastu_auth_userRole'),
      DID: Cookies.get('M-DID'),
      ClientID: Cookies.get('M-CID'),
      InstanceID: Cookies.get('M-IID'),
      SecureRoute: Cookies.get('M-SECURE-ROUTE')
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
astroInstance.interceptors.response.use(
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
        return astroInstance(originalRequest)
      } catch (refreshError) {
        Cookies.remove('M-SECURE-ROUTE')
        Cookies.remove('M-IID')
        Cookies.remove('M-CID')
        window.location.href = '/logout'
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export default astroInstance
