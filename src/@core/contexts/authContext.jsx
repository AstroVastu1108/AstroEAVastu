'use client';
import { LoginFormSchema } from '@/app/Server/auth/definition';
import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [kundliData, setKundliData] = useState(null);
    const [isloggedIn, setIsLoggedIn] = useState();

    useEffect(() => {

        (async function () {

            const result = await getUser();

            if (result.isOk) {

                setIsLoggedIn(true);

                const data = {
                    email:process.env.NEXT_PUBLIC_USERNAME,
                    username:process.env.NEXT_PUBLIC_USER
                }

                setUser(data);
            }
        })();
    }, []);

    const login = (userData) => {

        const validatedFields = LoginFormSchema.safeParse({
            email: userData.email,
            password: userData.password
        })

        const errorMessage = { message: 'Invalid login credentials.' }

        if (!validatedFields.success) {

            setIsLoggedIn(false);

            return {
                error: true,
                message: validatedFields.error.flatten().fieldErrors
            }
        }
        if (userData.email == process.env.NEXT_PUBLIC_USERNAME && userData.password == process.env.NEXT_PUBLIC_PASSWORD) {
            const data = {
                email:userData.email,
                username:process.env.NEXT_PUBLIC_USER
            }
            setUser(data);
            const expirationTime = new Date().getTime() + 5 * 60 * 1000;
            sessionStorage.setItem("authState", JSON.stringify(userData));
            Cookies.set('authToken', userData.email, { expires: 1 }); // Expires in 1 day

            setIsLoggedIn(true);

            return {
                error: false,
                message: "Loggedin successfully ..!!"
            };

        } else {

            setIsLoggedIn(false);
            return {
                error: true,
                message: errorMessage
            };

        }
    };

    function getUser() {
        try {
            const storedSessionValue = JSON.parse(sessionStorage.getItem("authState"));
            if (storedSessionValue) {
                return {
                    isOk: true,
                    data: storedSessionValue,
                };
            } else {
                return {
                    isOk: false,
                    data: storedSessionValue,
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
        sessionStorage.removeItem("authState");
        Cookies.remove('authToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{kundliData,setKundliData, isloggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
