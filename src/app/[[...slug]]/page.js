import { cookies } from 'next/headers';
import { routes } from '@/app-routes';
import NotFoundPage from '@/app/notFound/page';
import Layout from '../(dashboard)/layout';
import axios from 'axios';
import https from 'https';

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

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
  let { slug } = params;
  if (Array.isArray(slug)) {
    if (slug.length > 2) {
      return <NotFoundPage />;
    }
    slug = slug.join('/');
  }
  const cookieStore = cookies();
  const token = cookieStore.get('authState')?.value;

  if (!token) {
    return <NotFoundPage />;
  }

  const { authRule, refreshToken, accessToken } = JSON.parse(token);
  const routePermissions = JSON.parse(authRule);
  const hrefsWithAccess = routePermissions
    .filter(item => item.HasAccess)
    .map(item => item.Href);

  if (hrefsWithAccess.includes('/Kundalipage')) {
    hrefsWithAccess.push('/kundali');
  }
  if (hrefsWithAccess.includes('/my-clients')) {
    hrefsWithAccess.push('/clientDetails');
  }
  try {
    let secureData;

    try {
      secureData = await fetchSecureData(accessToken);
    } catch (error) {
      if (error.message === 'Token expired') {
        const newAccessToken = await refreshTokenGet(refreshToken, accessToken);
        // console.log("NewAccessToken : ",newAccessToken)
        secureData = await fetchSecureData(newAccessToken);
      } else {
        throw error;
      }
    }

    if (secureData.status === 200) {
      const filteredObjects = routes.filter((obj) => {
        return hrefsWithAccess.some((path) => {
          const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
          return obj.path.includes(normalizedPath);
        });
      });

      const matchingRoute = filteredObjects.find(route => {
        if (route.path === slug) return true;
        // Check for dynamic route
        if (route.path.startsWith("kundali/")) {
          const basePath = "kundali";
          const idSegment = slug.split('/')[1]; // Get the id part after "kundali/"
          return slug.startsWith(basePath) && idSegment; // Ensure the path is valid
        }
        return false;
      });
    
      if (matchingRoute) {
        const Element = matchingRoute.element;
    
        // Extract the ID from the slug
        let id = null;
        if (matchingRoute.path.includes(':id')) {
          id = slug.split('/')[1]; // Assumes slug format: "kundali/<id>"
        }
    
        return (
          <Layout>
            <Element id={id} /> {/* Pass `id` dynamically if matched */}
          </Layout>
        );
      } else {
        return <NotFoundPage />;
      }
    } else {
      return <NotFoundPage />;
    }
  } catch (error) {
    console.error('Request failed:', error);
    return <NotFoundPage />;
  }
}
