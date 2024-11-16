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
        Cookies.remove('astrovastu_auth_useremail')
        Cookies.remove('astrovastu_auth_userRole')
        Cookies.remove('astrovastu_auth_transactionID')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export default astroInstance
