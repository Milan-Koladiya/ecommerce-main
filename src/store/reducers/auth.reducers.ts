import { createSlice } from "@reduxjs/toolkit";
import { registerAction, loginAction, verifyEmailAction, resetPasswordAction, forgetPasswordAction, logoutAction } from "../actions/auth.action"
import type { IntialStateType } from "../../types/state.type"

const initialState: IntialStateType = {
    loading: "",
    message: "",
    error: false,
    apiName: "",
    alertType: "",
    emailStatus: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.alertType = "";
            state.apiName = "";
            state.message = "";
        },
        errorMessage: (state, action) => {
            state.alertType = action.payload.alertType;
            state.apiName = action.payload.apiName;
            state.message = action.payload.message;
        },
    },
    extraReducers: (builder) => {
        //register reducer
        builder.addCase(registerAction.pending, (state) => {
            state.apiName = "signup";
            state.loading = "signup";
        });
        builder.addCase(registerAction.fulfilled, (state, {payload}:any) => {
            state.loading = "";
            state.alertType = "success";
            state.message = payload.message;

        });
        builder.addCase(registerAction.rejected, (state, { payload }: any) => {
            state.loading = "";
            state.alertType = "danger";
            state.message = payload;

        });

        //login reducer
        builder.addCase(loginAction.pending, (state) => {
            state.loading = "/auth/login";
            state.apiName = "/auth/login";
        });

        builder.addCase(loginAction.fulfilled, (state, { payload }: any) => {
            state.loading = "";
            state.alertType = "success";
            console.log(payload)
            state.message = payload.message;
        });

        builder.addCase(loginAction.rejected, (state, { payload }: any) => {
            state.loading = "";
            state.alertType = "danger";
            state.message = payload;
        });

        //email verification reducer
        builder.addCase(verifyEmailAction.pending, (state) => {
            state.loading = "verifyemail";
            state.apiName = "verifyemail";
        });

        builder.addCase(verifyEmailAction.fulfilled, (state, { payload }: any) => {
            state.loading = "";
            state.alertType = "success";
            state.message = payload.message;
        });

        builder.addCase(verifyEmailAction.rejected, (state, { payload }: any) => {
            state.loading = "";
            state.alertType = "danger";
            state.message = payload
        })


        //Forget Password reducer
        builder.addCase(forgetPasswordAction.pending, (state) => {
            state.loading = "/auth/forgetPassword";
            state.apiName = "/auth/forgetPassword";
        });
        builder.addCase(forgetPasswordAction.fulfilled, (state, { payload }: any) => {
            state.loading = "";
            state.message = payload.message;
            state.alertType = 'success';
        });
        builder.addCase(forgetPasswordAction.rejected, (state, { payload }: any) => {
            state.loading = "";
            state.message = payload;
            state.alertType = 'danger';
        });

        //Reset Password reducer
        builder.addCase(resetPasswordAction.pending, (state) => {
            state.loading = "/auth/resetPassword";
            state.apiName = '/auth/resetPassword';
            state.emailStatus = "success";
        });
        builder.addCase(resetPasswordAction.fulfilled, (state, { payload }: any) => {
            state.loading = "";
            state.message = payload.message;
            state.alertType = 'success';
        });
        builder.addCase(resetPasswordAction.rejected, (state, { payload }: any) => {
            state.loading = "";
            state.message = payload;
            state.alertType = 'danger';
        });

        //logout reducer

        builder.addCase(logoutAction.pending, (state) => {
            state.loading = '/auth/logout';
            state.apiName = '/auth/logout';
        });
        builder.addCase(logoutAction.fulfilled, (state, { payload }: any) => {
            state.loading = '';
            state.message = payload.message;
            state.alertType = 'success';
            state.apiName = '/auth/logout';
        });
        builder.addCase(logoutAction.rejected, (state, { payload }: any) => {
            state.loading = '';
            state.message = payload;
            state.alertType = 'danger';
            state.apiName = '/auth/logout';
        });
    },

});

export const { clearMessage, errorMessage } = authSlice.actions;
export default authSlice.reducer;

