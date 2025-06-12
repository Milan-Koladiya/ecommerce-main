import { createContext, useState, useEffect, useContext } from 'react'
import localStorage from '../utils/localStorage'
import API from '../libs/axios'
import Loader from '../components/common/loader'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(localStorage.getItem('user'))
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            setAuthUser(null);
            setLoading(false);
            return;
        }
        const fetchUser = async () => {
            try {
                const user = await API.get("/users/me");
                setAuthUser({
                    ...user?.data?.data,
                });
                console.log("=============", user)
            } catch (error) {
                console.log("error", error);
                setAuthUser(null)
            }
        };
        if (authUser) {
            fetchUser()
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{ authUser, loading, setAuthUser }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)