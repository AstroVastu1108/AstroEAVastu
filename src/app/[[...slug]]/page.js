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


export default async function Page({ params }) {

  const cookieStore = cookies();
  const authData = {
    useremail: cookieStore.get('astrovastu_auth_useremail')?.value,
    userRole: cookieStore.get('astrovastu_auth_userRole')?.value,
    DID: cookieStore.get('M-DID')?.value,
    ClientID: cookieStore.get('M-CID')?.value,
    InstanceID: cookieStore.get('M-IID')?.value,
    SecureRoute: cookieStore.get('M-SECURE-ROUTE')?.value
};

  if (!(authData.useremail && authData.DID)) {
    return <NotFoundPage type={"unAuthorized"}/>;
  }

  let { slug } = params;
  if (Array.isArray(slug)) {
    if (slug.length > 2) {
      return <NotFoundPage />;
    }
    slug = slug.join('/');
  }

  const { DID,SecureRoute,ClientID,InstanceID } = authData;
  try {
    let secureData;

    // try {
    //   secureData = await fetchSecureData(DID,SecureRoute,ClientID,InstanceID);
    // } catch (error) {
    //   if (error.message === 'Token expired') {
    //     // const newAccessToken = await refreshTokenGet(refreshToken, accessToken);
    //     // secureData = await fetchSecureData(newAccessToken);
    //   } else {
    //     throw error;
    //   }
    // }

    // if (secureData.status === 200) {
      const matchingRoute = routes.find(route => {
        if (route.path === slug) return true;

        if (route.path.startsWith("kundali/")) {
          const basePath = "kundali";
          const idSegment = slug.split('/')[1];
          return slug.startsWith(basePath) && idSegment;
        }
        if (route.path.startsWith("kevent/")) {
          const basePath = "kevent";
          const idSegment = slug.split('/')[1];
          return slug.startsWith(basePath) && idSegment;
        }

        if (route.path.startsWith("transit/")) {
          const basePath = "transit";
          const idSegment = slug.split('/')[1];
          return slug.startsWith(basePath) && idSegment;
        }

        if (route.path.startsWith("clientDetail/")) {
          const basePath = "clientDetail";
          const idSegment = slug.split('/')[1];
          return slug.startsWith(basePath) && idSegment;
        }
        if (route.path.startsWith("activity/")) {
          const basePath = "activity";
          const idSegment = slug.split('/')[1];
          return slug.startsWith(basePath) && idSegment;
        }

        if (route.path.startsWith("devta-vastu/")) {
          const basePath = "devta-vastu";
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
  } catch (error) {
    return <NotFoundPage type={"unAuthorized"}/>;
  }
}
