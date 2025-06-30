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
import type { AppDispatch, RootState } from '../store';
import type { IUser,resetPasswordType } from '../types/authType'

const useAuth = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
        emailStatus
    } = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch<AppDispatch>();


    const login = async (body: IUser) => {
        return await dispatch(loginAction(body))
    }

    const Register = async (body: IUser) => {
        return await dispatch(registerAction(body))
    }

    const verifyEmail = async (token: string) => {
        return await dispatch(verifyEmailAction(token))
    }

    const forgetPassword = async (email:IUser) => {
        return await dispatch(forgetPasswordAction(email));
    };

    const resetPassword = async ({ token, newPassword }:resetPasswordType) => {
        return await dispatch(resetPasswordAction({ token, newPassword }));
    };

    const logout = async () => {
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