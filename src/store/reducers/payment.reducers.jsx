import { createSlice } from '@reduxjs/toolkit';
import { createPaymentAction } from '../actions/payment.action';

const paymentsSlice = createSlice({
    name: 'payments',
    initialState: {
        apiName: null,
        loading: "",
        error: null,
        alertType: "",
        message: ""
    },
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
        builder.addCase(createPaymentAction.pending, (state) => {
            state.loading = true;
            state.apiName="payment/create"
        });
        builder.addCase(createPaymentAction.fulfilled, (state, action) => {
            state.loading = 'payment/create';
            state.apiName="payment/create"
            state.profile = action.payload.message;
            state.alertType="success"
        });
        builder.addCase(createPaymentAction.rejected, (state, action) => {
            state.loading = 'payment/create';
            state.apiName="payment/create"
            state.error = action.payload;
            state.alertType="danger"
        });
    },
});

export const { clearMessage, errorMessage } = paymentsSlice.actions;
export default paymentsSlice.reducer;
