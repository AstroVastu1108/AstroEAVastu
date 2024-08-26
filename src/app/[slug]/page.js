// import { routes } from '@/app-routes'
// import NotFoundPage from '@/app/[...not-found]/page'
// import Layout from '../(dashboard)/layout'
// import Cookies from 'js-cookie';
// export default function page({ params, req  }) {
//   const slug = params.slug
//   const route = routes.find(route => route.path == slug)
  
//   const token = req.headers.cookie?.split('; ').find(cookie => cookie.startsWith('authState='))
//   console.log("Token:", req)
//   if (route) {
//     const Element = route.element
//     return (
//       <Layout>
//         <Element />
//       </Layout>
//     )
//   } else {
//     return <NotFoundPage />
//   }
// }




// import { cookies } from 'next/headers';
// import { routes } from '@/app-routes';
// import NotFoundPage from '@/app/[...not-found]/page';
// import Layout from '../(dashboard)/layout';
// import axios from 'axios';
// export default async function Page({ params }) {
//   const slug = params.slug;
//   const route = routes.find(route => route.path === slug);

//   // Access cookies using the `cookies` utility
//   const cookieStore = cookies();
//   const token = cookieStore.get('authState')?.value;
//   if(token){
//     const {authRule,refreshToken,accessToken} = JSON.parse(token)
//     console.log("AuthRule : ",authRule)
//     const response = await axios.get('https://localhost:7025/api/Auth/secure-data', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`, // Pass the token as a Bearer token
//       },
//     });
//     const secureData = response.data;
//     console.log('Secure data:', secureData);
//   }
//   // console.log("Token:", token); // This will log the cookie value
//   // const isValid = response.data.isValid;
//   // if (!isValid) {
//   //   // Handle invalid token, maybe redirect to login or show an error
//   //   return <NotFoundPage />;
//   // }
//   if (route) {
//     const Element = route.element;
//     return (
//       <Layout>
//         <Element />
//       </Layout>
//     );
//   } else {
//     return <NotFoundPage />;
//   }
// }


// import { cookies } from 'next/headers';
// import { routes } from '@/app-routes';
// import NotFoundPage from '@/app/[...not-found]/page';
// import Layout from '../(dashboard)/layout';
// import axios from 'axios';

// export default async function Page({ params }) {
//   const slug = params.slug;
//   const route = routes.find(route => route.path === slug);

//   // Access cookies using the `cookies` utility
//   const cookieStore = cookies();
//   const token = cookieStore.get('authState')?.value;

//   console.log("Token:", token);

//   const {authRule,refreshToken,accessToken} = JSON.parse(token)
//   if (token) {
//     try {
//       // Make the API request with the Bearer token in the headers
      
//       const response = await axios.get('https://localhost:7025/api/Auth/secure-data', {
//         headers: {
//           Authorization: `Bearer ${accessToken}`, // Pass the token as a Bearer token
//         },
//         httpsAgent: new (require('https')).Agent({ rejectUnauthorized: false }) 
//       });
//       // console.log("")
//       const secureData = response.data;
//       console.log('Secure data:', secureData);

//       // You can now use the secure data in your component or handle it as needed
//     } catch (error) {
//       if (error.response.status === 401) {
//         // Token is expired, refresh it
//         try {
//             const refreshTokenResponse = await axios.post('https://localhost:7025/api/Auth/refresh', {
//               accessToken: accessToken,  // Replace this with your actual refresh token
//               refreshToken: refreshToken,  // Replace this with your actual refresh token
//             },{httpsAgent: new (require('https')).Agent({ rejectUnauthorized: false }) 
//           });

//             const newAccessToken = refreshTokenResponse.data.accessToken;

//             // Retry the request with the new access token
//             const retryResponse = await axios.get('https://localhost:7025/api/Auth/secure-data', {
//                 headers: {
//                     Authorization: `Bearer ${newAccessToken}`,
//                 },
//                 httpsAgent: new (require('https')).Agent({ rejectUnauthorized: false }) 
//             });
//             console.log("retryResponse.data : ",retryResponse.data)
//             return retryResponse.data;

//         } catch (refreshError) {
//             console.error('Token refresh failed:', refreshError);
//             // Handle refresh token failure, e.g., redirect to login
//         }
//     } else {
//         console.error('Request failed:', error);
//         // Handle other errors
//     }
//       return <NotFoundPage />;
//     }
//   } else {
//     // If no token is found, redirect to login or show an error
//     return <NotFoundPage />;
//   }

//   if (route) {
//     const Element = route.element;
//     return (
//       <Layout>
//         <Element />
//       </Layout>
//     );
//   } else {
//     return <NotFoundPage />;
//   }
// }





// import { cookies } from 'next/headers';
// import { routes } from '@/app-routes';
// import NotFoundPage from '@/app/[...not-found]/page';
// import Layout from '../(dashboard)/layout';
// import axios from 'axios';
// import https from 'https';

// const httpsAgent = new https.Agent({ rejectUnauthorized: false });

// async function fetchSecureData(accessToken) {
//   try {
//     const response = await axios.get('https://localhost:7025/api/Auth/secure-data', {
//       headers: { Authorization: `Bearer ${accessToken}` },
//       httpsAgent
//     });
//     return response;
//   } catch (error) {
//     if (error.response?.status === 401) {
//       throw new Error('Token expired');
//     }
//     throw error;
//   }
// }

// async function refreshTokenGet(refreshToken, accessToken) {
//   try {
//     const response = await axios.post('https://localhost:7025/api/Auth/refresh', {
//       accessToken,
//       refreshToken
//     }, { httpsAgent });

//     return response.data.accessToken;
//   } catch (error) {
//     throw new Error('Token refresh failed');
//   }
// }

// export default async function Page({ params }) {
//   const { slug } = params;
//   const cookieStore = cookies();
//   const token = cookieStore.get('authState')?.value;

//   if (!token) {
//     return <NotFoundPage />;
//   }

//   const { authRule, refreshToken, accessToken } = JSON.parse(token);
//   const route = JSON.parse(authRule);
//   const hrefsWithAccess = route
//           .filter(item => item.HasAccess)
//           .map(item => item.Href)
//   console.log("=======>",hrefsWithAccess)
//   // Access cookies using the `cookies` utility

//   try {
//     let secureData;

//     try {
//       secureData = await fetchSecureData(accessToken);
//     } catch (error) {
//       if (error.message === 'Token expired') {
//         const newAccessToken = await refreshTokenGet(refreshToken, accessToken);
//         secureData = await fetchSecureData(newAccessToken);
//       } else {
//         throw error;
//       }
//     }

//     // console.log('Secure data:', secureData);
//     if(secureData.status == 200){
//       const filteredObjects = routes.filter((obj) => {
//         return hrefsWithAccess.some((path) => {
//           // Remove the leading '/' from the hrefWithAccess path and compare
//           const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
//           return obj.path === normalizedPath;
//         });
//       });
      
//       console.log("Filtered Objects:", filteredObjects);
//       console.log("routes : ",routes)
//       console.log("hrefsWithAccess : ",hrefsWithAccess)
//       console.log("filteredObjects : ",filteredObjects)
//       if (route) {
//         const Element = route.element;
//         return (
//           <Layout>
//             <Element />
//           </Layout>
//         );
//       }
//       else {
//         return <NotFoundPage />;
//       }
//     }
//     else {
//       return <NotFoundPage />;
//     }
//   } catch (error) {
//     console.error('Request failed:', error);
//     return <NotFoundPage />;
//   }
// }


import { cookies } from 'next/headers';
import { routes } from '@/app-routes';
import NotFoundPage from '@/app/[...not-found]/page';
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

    return response.data.accessToken;
  } catch (error) {
    throw new Error('Token refresh failed');
  }
}

export default async function Page({ params }) {
  const { slug } = params;
  
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

  if (hrefsWithAccess.includes('/kundlipage')) {
    hrefsWithAccess.push('/preview');
  }
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
      const filteredObjects = routes.filter((obj) => {
        return hrefsWithAccess.some((path) => {
          const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
          return obj.path.includes(normalizedPath);
        });
      });

      // const matchingRoute = filteredObjects.find(route => slug.startsWith(route.path));
      // const matchingRoute = routes.find(route => {
      //   return hrefsWithAccess.some(accessPath => {
      //     return slug.startsWith(accessPath) || accessPath.startsWith(slug);
      //   });
      // });
      // const matchingRoute = routes.find(route => {
      //   return hrefsWithAccess.some(accessPath => {
      //     // Check if the slug starts with the accessPath
      //     return slug.startsWith(accessPath.replace(/^\//, ''));
      //   });
      // });

      // console.log("Matching Route:", matchingRoute);
      const matchingRoute = filteredObjects.find(route => route.path.includes(slug));
      // const matchingRoute = filteredObjects.find(route => route.path === slug);
      if (matchingRoute) {
        const Element = matchingRoute.element;
        return (
          <Layout>
            <Element />
          </Layout>
        );
      } else {
        // console.log("Not found")
        return <NotFoundPage />;
      }
    } else {
      // console.log("unsecure Not found")
      return <NotFoundPage />;
    }
  } catch (error) {
    console.error('Request failed:', error);
    return <NotFoundPage />;
  }
}
