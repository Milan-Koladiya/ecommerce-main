import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContex";
import Loader from "../components/common/loader";
import Header from "./Header";
import Sidebar from "./Sidebar";

const PrivateRoute = () => {
    const { loading, authUser } = useAuth();

    if (loading) {
        return <Loader />;
    }

    if (!authUser) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Header />
            {/* <Sidebar /> */}
            <div style={{  paddingTop: '60px', minHeight: '100vh' }}>
                <Outlet />
            </div>

        </>
    );
};

export default PrivateRoute;
