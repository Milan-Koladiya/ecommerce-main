import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContex'
import Loader from '../components/common/loader'
import Header from "./Header";

const PublicRoute = () => {
    const { loading, authUser } = useAuth();

    if (loading) {
        return <Loader />;
    }
    // if (authUser) {
    //     return <Navigate to="/dashboard" />;
    // }

    return (
        <>
            {/* <Sidebar /> */}
            <Header />
            <div style={{  paddingTop: '60px'}}>
                <Outlet />
            </div>
        </>
    );
}

export default PublicRoute;
