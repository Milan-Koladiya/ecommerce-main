import { createSlice } from '@reduxjs/toolkit';
import { createPaymentAction } from '../actions/payment.action';
import { intialStateType } from '../../types/stateType';

const  initialState:intialStateType={
        apiName: '',
        loading: "",
        error: false,
        alertType: "",
        message: ""
    }
const paymentsSlice = createSlice({
    name: 'payments',
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
        builder.addCase(createPaymentAction.pending, (state) => {
            state.loading = 'payment/create';
            state.apiName="payment/create"
        });
        builder.addCase(createPaymentAction.fulfilled, (state,{payload}:any) => {
            state.loading = '';
            state.apiName="payment/create"
            state.alertType="success",
            state.message=payload.message
        });
        builder.addCase(createPaymentAction.rejected, (state, {payload}:any) => {
            state.loading = '';
            state.apiName="payment/create"
            state.alertType="danger"
            state.message=payload.message
        });
    },
});

export const { clearMessage, errorMessage } = paymentsSlice.actions;
export default paymentsSlice.reducer;
