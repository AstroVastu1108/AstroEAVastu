'use client';
import { registerCompnay, sendSignInRequest } from '@/app/Server/API/auth';
import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';

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
const getDID = () => {
    const uid = import('../../app/uid/uid').then(u => u.load())
    uid.then(id => id.get())
        .then(result => {
            // This is the visitor identifier:
            const UniqueId = result.visitorId
            console.log(UniqueId)
            Cookies.set('M-DID', transformString(UniqueId), { expires: 1 });
            // alert(UniqueId)
        })
//     const fpPromise = import('../../app/uid/uid')
//         .then(FingerprintJS => FingerprintJS.load())

//     fpPromise
//         .then(fp => fp.get())
//         .then(result => {
//             const visitorId = result.visitorId
//             Cookies.set('DID', transformString(visitorId), { expires: 1 });

//         })
}
Cookies.set('DID-INCR', "0", { expires: 1 });
// getDID();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [kundliData, setKundliData] = useState(null);
    const [isloggedIn, setIsLoggedIn] = useState();
    const [authRuleContext, setAuthRuleContext] = useState([]);

    useEffect(()=>{
        getDID();
    },[])

    const intervalDID = () => {
        const DID = Cookies.get('DID');
        const DID_INCR = Cookies.get('DID-INCR');
        if (DID) {
            getDID();
            const incrementedValue = parseInt(DID_INCR) + 1;
            Cookies.set('DID-INCR', incrementedValue, { expires: 1 });
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



    const loginData = async (userData) => {
        // console.log("Context is called", userData)
        const result = await sendSignInRequest(userData,Cookies.get('M-DID'));
        console.log("result : ",result)
        // const result = await sendSignInRequest(userData.email, userData.password);
        if (result.isOk) {
            const responseData = result.data;
            console.log("responseData : ",responseData)
            console.log("responseData : ",responseData.Result)
            console.log("responseData : ",responseData["Result"])
            setUser(responseData.result)
            const { useremail, userRole, transactionID,ClientID,InstanceID,SecureRoute,userAvatar } = responseData.Result;
            console.log("responseData.result : ",responseData.Result)
            const authData = {
                useremail, userRole, transactionID,ClientID,InstanceID,SecureRoute
            };
            console.log("AuthData : ",authData)
            Object.entries(authData).map(([key, value]) => {
                console.log("AuthData key: ",key)
                console.log("AuthData value: ",value)

                try {
                    Cookies.set(`astrovastu_auth_${key}`, value, { expires: 1 });
                } catch (error) {
                    console.error("error: ", error);
                }
            });
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

    const companyRegistration = async (userData) => {
        const result = await registerCompnay(userData);
        if (result.isOk) {
            setUser(result.data)
            const { useremail, refreshToken, accessToken, userRole, transactionID } = result.data;
            const expirationTime = new Date().getTime() + 5 * 60 * 1000;

            const authData = {
                useremail, refreshToken, accessToken, userRole, expirationTime, transactionID
            };

            Object.entries(authData).map(([key, value]) => {
                try {
                    Cookies.set(`astrovastu_auth_${key}`, value, { expires: 1 });
                } catch (error) {
                    console.error("error: ", error);
                }
            });
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
                // accessToken: Cookies.get('astrovastu_auth_accessToken'),
                userRole: Cookies.get('astrovastu_auth_userRole'),
                // expirationTime: Cookies.get('astrovastu_auth_expirationTime'),
                // refreshToken: Cookies.get('astrovastu_auth_refreshToken'),
                transactionID: Cookies.get('astrovastu_auth_transactionID')
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
            Cookies.remove('astrovastu_auth_SecureRoute'),
            Cookies.remove('astrovastu_auth_InstanceID'),
            Cookies.remove('astrovastu_auth_ClientID'),
            // Cookies.remove('astrovastu_auth_expirationTime'),
            // Cookies.remove('astrovastu_auth_refreshToken')
        Cookies.remove('astrovastu_auth_transactionID')
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ kundliData, setKundliData, authRuleContext, isloggedIn, user, logout, loginData, companyRegistration }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);