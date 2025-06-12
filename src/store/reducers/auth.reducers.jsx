import { createSlice } from "@reduxjs/toolkit";
import { registerAction, loginAction, verifyEmailAction, resetPasswordAction, forgetPasswordAction } from "../actions/auth.action"

const initialState = {
    loading: "",
    message: "",
    error: false,
    apiName: "",
    alertType: "",
    verifyResetToken: null,
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
        builder.addCase(registerAction.fulfilled, (state, action) => {
            state.loading = "";
            state.alertType = "success";
            state.message = action.payload.message;
        });
        builder.addCase(registerAction.rejected, (state, action) => {
            state.loading = "";
            state.alertType = "danger";
            //   state.message = action.payload.message
        });

        //login reducer
        builder.addCase(loginAction.pending, (state) => {
            state.loading = "/auth/login";
            state.apiName = "/auth/login";
        });
        builder.addCase(loginAction.fulfilled, (state, action) => {
            state.loading = "";
            state.alertType = "success";
            state.message = action.payload.message;
        });

        builder.addCase(loginAction.rejected, (state, action) => {
            state.loading = "";
            state.error = true;
            state.alertType = "danger";
            state.message = action.payload;
        });

        //email verification reducer
        builder.addCase(verifyEmailAction.pending, (state) => {
            state.loading = "verifyemail";
            state.apiName = "verifyemail";
        });

        builder.addCase(
            verifyEmailAction.fulfilled,
            (state, action, { payload }) => {
                state.loading = "";
                state.alertType = "success";
                state.message = action.payload.message;
            });

        builder.addCase(verifyEmailAction.rejected, (state) => {
                state.loading = "";
                state.error = true;
                state.alertType = "danger";
                state.message = action.payload
            })


        //Forget Password reducer
        builder.addCase(forgetPasswordAction.pending, (state) => {
            state.loading = true;
            state.apiName = '/auth/forgetPassword';
        });
        builder.addCase(forgetPasswordAction.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.alertType = 'success';
            state.error = null;
        });
        builder.addCase(forgetPasswordAction.rejected, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
            state.alertType = 'danger';
        });

        //Reset Password reducer
        builder.addCase(resetPasswordAction.pending, (state) => {
            state.loading = true;
            state.apiName = '/auth/resetPassword';
            state.emailStatus = "success";
        });
        builder.addCase(resetPasswordAction.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.alertType = 'success';
            state.error = null;
        });
        builder.addCase(resetPasswordAction.rejected, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.alertType = 'danger';
        });
    },

});

export const { clearMessage, errorMessage } = authSlice.actions;
export default authSlice.reducer;
