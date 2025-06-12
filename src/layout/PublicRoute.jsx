import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContex'
import Loader from '../components/common/loader'
import Header from "./Header";
import Sidebar from "./Sidebar";

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
            <Sidebar />
            <Header />
            <div style={{ marginLeft: '220px', paddingTop: '60px', minHeight: '100vh' }}>
                <Outlet />
            </div>
        </>
    );
}

export default PublicRoute;
