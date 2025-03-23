'use client';
import { authCheckRequest, registerCompnay, sendSignInRequest } from '@/app/Server/API/auth';
import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const AuthContext = createContext();
const transformString = (input) => {
  let modifiedString = 'D' + input.slice(1).toUpperCase();
  const part1 = modifiedString.slice(0, 8);
  const part2 = modifiedString.slice(8, 12);
  const part3 = modifiedString.slice(12, 16);
  const part4 = modifiedString.slice(16, 20);
  const part5 = modifiedString.slice(20);
  const formattedString = `${part1}-${part2}-${part3}-${part4}-${part5}`;
  return formattedString;
};
const getDID = async () => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  const { fontPreferences, ...components } = result.components;
  const UniqueId = FingerprintJS.hashComponents(components);
  Cookies.set('M-DID', transformString(UniqueId), { expires: 1 });


  // const uid = import('../../app/uid/uid').then(u => u.load())
  // uid.then(id => id.get())
  //   .then(result => {
  //     const UniqueId = result.visitorId
  //     Cookies.set('M-DID', transformString(UniqueId), { expires: 1 });
  //   })
  //     const fpPromise = import('../../app/uid/uid')
  //         .then(FingerprintJS => FingerprintJS.load())

  //     fpPromise
  //         .then(fp => fp.get())
  //         .then(result => {
  //             const visitorId = result.visitorId
  //             Cookies.set('DID', transformString(visitorId), { expires: 1 });

  //         })
}
Cookies.set('M-DIDC', "0", { expires: 1 });
// getDID();
export const AuthProvider = ({ children }) => {
  useEffect(() => {
    console.log = function () {}; // Disable console.log in the browser
  }, []);
  const [user, setUser] = useState([]);
  const [kundliData, setKundliData] = useState(null);
  const [isloggedIn, setIsLoggedIn] = useState();
  const [authRuleContext, setAuthRuleContext] = useState([]);

  useEffect(() => {
    getDID();
  }, [])

  // const intervalDID = () => {
  //     const DID = Cookies.get('M-DID');
  //     const DID_INCR = Cookies.get('M-DIDC');
  //     if (DID) {
  //         getDID();
  //         const incrementedValue = parseInt(DID_INCR) + 1;
  //         Cookies.set('M-DIDC', incrementedValue, { expires: 1 });
  //     }
  // };
  const intervalDID = async () => {
    const DID = Cookies.get('M-DID');
    const DID_INCR = Cookies.get('M-DIDC');
    const ClientID = Cookies.get('M-CID');
    const InstanceID = Cookies.get('M-IID');
    const SecureRoute = Cookies.get('M-SECURE-ROUTE');
    if (DID) {
      getDID();
      if (ClientID && InstanceID && SecureRoute) {
        const result = await authCheckRequest();
      }
      const incrementedValue = parseInt(DID_INCR) + 1;
      Cookies.set('M-DIDC', incrementedValue, { expires: 1 });
    }
  };
  useEffect(() => {
    const intervalId = setInterval(intervalDID, 30000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {

    (async function () {
      const result = await getUser();

      if (result.isOk) {
        setUser(result.data);
        setIsLoggedIn(true);
      }

    })();
  }, []);



  // SSE code
  // useEffect(() => {
  //     if(user?.transactionID){
  //         console.log("Data : ",user?.transactionID)

  //         const encodedUserId = encodeURIComponent(user?.transactionID);

  //         const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_APIURL1}/Auth/sse?userId=${encodedUserId}`);

  //         eventSource.onmessage = (event) => {
  //             const data = JSON.parse(event.data);
  //             if (data.action === "logout") {
  //                 console.log("logout called")
  //                 // Logout the user immediately
  //                 eventSource.close();

  //                 // Clear session data and redirect to login
  //                 // localStorage.removeItem("sessionToken");
  //                 logout();
  //                 window.location.href = '/login';
  //             }
  //         };

  //         // Clean up the SSE connection when component unmounts
  //         return () => {
  //             eventSource.close();
  //         };
  //     }
  // }, [user]);



  const loginData = async (result) => {
    // console.log("Context is called", userData)
    // const result = await sendSignInRequest(userData,Cookies.get('M-DID'));
    // const result = await sendSignInRequest(userData.email, userData.password);
    if (result.isOk) {
      const responseData = result.data;
      setUser(responseData.Result)
      const { useremail, userRole, ClientID, InstanceID, SecureRoute } = responseData.Result;
      const authData = {
        useremail, userRole, ClientID, InstanceID, SecureRoute
      };
      Cookies.set(`astrovastu_auth_useremail`, useremail, { expires: 1 });
      // Cookies.set(`astrovastu_auth_userRole`, userRole, { expires: 1 });
      Cookies.set(`M-CID`, ClientID, { expires: 1 });
      Cookies.set(`M-IID`, InstanceID, { expires: 1 });
      Cookies.set(`M-SECURE-ROUTE`, SecureRoute, { expires: 1 });
      // Cookies.set(`astrovastu_auth_userAvatar`, userAvatar, { expires: 1 });
      setIsLoggedIn(true);
      return {
        error: false,
        message: responseData.statusMsg
      };
    } else {
      setIsLoggedIn(false);
      return {
        error: true,
        message: result.data
      };
    }
  }

  const companyRegistration = async (result) => {
    // const result = await registerCompnay(userData,Cookies.get('M-DID'));
    // console.log("================> result: ", result)
    if (result.isOk) {
      setUser(result.data.Result)
      const { useremail, ClientID, InstanceID, SecureRoute } = result.data.Result;
      const expirationTime = new Date().getTime() + 5 * 60 * 1000;

      const authData = {
        useremail, ClientID, InstanceID, SecureRoute
      };

      Cookies.set(`astrovastu_auth_useremail`, useremail, { expires: 1 });
      Cookies.set(`M-CID`, ClientID, { expires: 1 });
      Cookies.set(`M-IID`, InstanceID, { expires: 1 });
      Cookies.set(`M-SECURE-ROUTE`, SecureRoute, { expires: 1 });
      setIsLoggedIn(true);
      return {
        error: false,
        message: "Registration successfully ..!!"
      };
    } else {
      setIsLoggedIn(false);
      return {
        error: true,
        message: result.data
      };
    }
  }


  async function getUser() {
    try {
      const decryptedAuthData = {
        useremail: Cookies.get('astrovastu_auth_useremail'),
      };

      if (decryptedAuthData) {
        return {
          isOk: true,
          data: decryptedAuthData,
        };
      } else {
        return {
          isOk: false,
        };
      }
    } catch {
      return {
        isOk: false,
      };
    }
  }

  const logout = () => {
    setIsLoggedIn(false);
    Cookies.remove('astrovastu_auth_useremail'),

      // Cookies.remove('astrovastu_auth_accessToken'),
      Cookies.remove('astrovastu_auth_userRole'),
      Cookies.remove('M-SECURE-ROUTE'),
      Cookies.remove('M-IID'),
      Cookies.remove('M-CID'),
      // Cookies.remove('astrovastu_auth_expirationTime'),
      // Cookies.remove('astrovastu_auth_refreshToken')

      // Cookies.remove('astrovastu_auth_transactionID')
      setUser(null);
  };

  return (
    <AuthContext.Provider value={{ kundliData, setKundliData, authRuleContext, isloggedIn, user, logout, loginData, companyRegistration }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
