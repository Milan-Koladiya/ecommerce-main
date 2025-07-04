import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContex";
import Loader from "../components/common/loader";
import Header from "./Header";

const PrivateRoute = () => {
    const { loading, authUser } = useAuth();
    const token = localStorage.getItem('token');

    if (loading) {
        return <Loader />;
    }

    if (!authUser ) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Header />
            {/* <Sidebar /> */}
            <div style={{paddingTop: '60px'}}>
                <Outlet />
            </div>

        </>
    );
};

export default PrivateRoute;
