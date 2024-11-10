import { cookies } from 'next/headers';
import { routes } from '@/app-routes';
import NotFoundPage from '@/app/notFound/page';
import Layout from '../(dashboard)/layout';
import axios from 'axios';
import https from 'https';
import CryptoJS from "crypto-js";
import { navigation } from '@/app-navigation';
import Logout from '@/views/Logout';

const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const baseUrl = process.env.NEXT_PUBLIC_APP_URL; // or replace with the correct environment variable

const API_URL = process.env.NEXT_PUBLIC_APIURL1;
async function fetchSecureData(accessToken) {
  try {
    const response = await axios.get(`${API_URL}/Auth/secure-data`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      httpsAgent,
    });
    return response;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Token expired');
    }
    throw error;
  }
}

async function refreshTokenGet(refreshToken, accessToken) {
  try {
    const response = await axios.post(`${API_URL}/Auth/refresh`, {
      accessToken,
      refreshToken,
    }, { httpsAgent });

    return response.data.result.accessToken;
  } catch (error) {
    throw new Error('Token refresh failed');
  }
}

export default async function Page({ params }) {
  
  const cookieStore = cookies();
 
  const authData = {
    useremail: cookieStore.get('astrovastu_auth_useremail')?.value, 
    accessToken: cookieStore.get('astrovastu_auth_accessToken')?.value,
    userRole: cookieStore.get('astrovastu_auth_userRole')?.value,
    refreshToken: cookieStore.get('astrovastu_auth_refreshToken')?.value
  };

  if (!(authData.useremail && authData.accessToken && authData.userRole)) {
    return <NotFoundPage type={"unAuthorized"}/>;
  }

  let { slug } = params;
  if (Array.isArray(slug)) {
    if (slug.length > 2) {
      return <NotFoundPage />;
    }
    slug = slug.join('/');
  }

  const { refreshToken, accessToken } = authData;
  try {
    let secureData;

    try {
      secureData = await fetchSecureData(accessToken);
    } catch (error) {
      if (error.message === 'Token expired') {
        const newAccessToken = await refreshTokenGet(refreshToken, accessToken);
        secureData = await fetchSecureData(newAccessToken);
      } else {
        throw error;
      }
    }

    if (secureData.status === 200) {
      const matchingRoute = routes.find(route => {
        if (route.path === slug) return true;

        if (route.path.startsWith("kundali/")) {
          const basePath = "kundali";
          const idSegment = slug.split('/')[1]; 
          return slug.startsWith(basePath) && idSegment;
        }

        if (route.path.startsWith("clientDetail/")) {
          const basePath = "clientDetail";
          const idSegment = slug.split('/')[1]; 
          return slug.startsWith(basePath) && idSegment;
        }
        return false;
      });
    
      if (matchingRoute) {
        const Element = matchingRoute.element;
    
        let id = null;
        if (matchingRoute.path.includes(':id')) {
          id = slug.split('/')[1];
        }
    
        return (
          <Layout>
            <Element id={id} /> 
          </Layout>
        );
      } else {
        if(slug =="logout"){
          return <Logout />;
        }
        return <NotFoundPage type={"not found"}/>;
      }
    } else {
      return <NotFoundPage type={"unAuthorized"}/>;
    }
  } catch (error) {
    return <NotFoundPage type={"unAuthorized"}/>;
  }
}
