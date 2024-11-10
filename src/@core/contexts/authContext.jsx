'use client';
import { registerCompnay, sendSignInRequest } from '@/app/Server/API/auth';
import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [kundliData, setKundliData] = useState(null);
    const [isloggedIn, setIsLoggedIn] = useState();
    const [authRuleContext, setAuthRuleContext] = useState([]);


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
        const result = await sendSignInRequest(userData.email);
        // const result = await sendSignInRequest(userData.email, userData.password);
        if (result.isOk) {
            const responseData = result.data;
            setUser(responseData.result)
            const { useremail, refreshToken, accessToken, userRole, transactionID,
                userAvatar } = responseData.result;
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
                accessToken: Cookies.get('astrovastu_auth_accessToken'), 
                userRole: Cookies.get('astrovastu_auth_userRole'),
                expirationTime: Cookies.get('astrovastu_auth_expirationTime'), 
                refreshToken: Cookies.get('astrovastu_auth_refreshToken'),
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
        Cookies.remove('astrovastu_auth_accessToken'), 
        Cookies.remove('astrovastu_auth_userRole'),
        Cookies.remove('astrovastu_auth_expirationTime'), 
        Cookies.remove('astrovastu_auth_refreshToken')
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