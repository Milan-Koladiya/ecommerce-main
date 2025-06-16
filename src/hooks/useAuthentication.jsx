import { useDispatch, useSelector } from 'react-redux'
import {
    loginAction,
    registerAction,
    verifyEmailAction,
    forgetPasswordAction,
    resetPasswordAction,
    logoutAction
} from '../store/actions/auth.action'
import { clearMessage, errorMessage } from '../store/reducers/auth.reducers'

const useAuth = () => {

    const {
        loading,
        message,
        error,
        apiName,
        alertType,
        emailStatus,
    } = useSelector((state) => state.auth);

    const dispatch = useDispatch();


    const login = async (body) => {
        return await dispatch(loginAction(body))
    }

    const Register=async(body)=>{
        return await dispatch(registerAction(body))
    }

    const verifyEmail = async (token) => {
        return await dispatch(verifyEmailAction(token))
    }

        const forgetPassword = async (email) => {
        return await dispatch(forgetPasswordAction(email));
    };

    const resetPassword = async ({ token, newPassword }) => {
        return await dispatch(resetPasswordAction({ token, newPassword }));
    };

    const logout=async()=>{
        await dispatch(logoutAction())
        
    };

    const closeAlert = () => {
        dispatch(clearMessage());
    };

    return {
        loading,
        message,
        error,
        apiName,
        alertType,
        emailStatus,
        closeAlert,
        login,
        Register,
        verifyEmail,
        forgetPassword,
        resetPassword,
        logout
    }
}

export default useAuth