import { createBrowserRouter } from "react-router-dom";
import PublicRoute from '../layout/PublicRoute'
import PrivateRoute from '../layout/PrivateRoute'
import { Navigate } from 'react-router-dom'

import Dashboard from '../pages/dashboard'
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import ForgetPassword from '../pages/auth/forget-password'
import ResetPassword from '../pages/auth/reset-password'
import VerifyEmail from '../pages/auth/verify-email'

import ViewSingleProduct from '../views/product/ViewSingleProduct'
import Cart from '../views/cart/ViewCart'
import AuthRoute from "../layout/AuthRoute";

const router = createBrowserRouter([
    //login,register,reset password,forget password,dashboard is public route
    {
        element: <PublicRoute />,
        children: [
            {
                path: "/",
                element: <Navigate to="/dashboard" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: "/product/:id",
                element: <ViewSingleProduct />
            },
        ]
    },
    {

        element: <AuthRoute />,
        children: [

            //Pages folder routes
            {
                path: "/login",
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/forget-password',
                element: <ForgetPassword />
            },
            {
                path: '/reset-password',
                element: <ResetPassword />
            },
            {
                path: '/verify',
                element: <VerifyEmail />
            }
        ]
    },

    //cart ,order ,profile is private route
    {
        element: <PrivateRoute />,
        children: [
            
            {
                path: '/cart',
                element: <Cart />
            },
        ]
    }
])

export default router