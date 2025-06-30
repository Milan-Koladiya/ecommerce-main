import { createSlice } from '@reduxjs/toolkit';
import { fetchOrderAction, createOrderAction } from '../actions/order.action';
import type { IntialStateType } from '../../types/state.type';

const initialState:IntialStateType= {
        apiName: "",
        loading: "",
        error:false,
        alertType: "",
        message: ""
    }

const orderSlice = createSlice({
    name: 'order',
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
        builder.addCase(fetchOrderAction.pending, (state) => {
            state.loading = 'order/getOrders';
            state.apiName = 'order/getOrders'
        });
        builder.addCase(fetchOrderAction.fulfilled, (state, {payload}:any) => {
            state.loading = '';
            state.message = payload.message;
            state.alertType = "success"
        });
        builder.addCase(fetchOrderAction.rejected, (state,{payload}:any) => {
            state.loading = "";
            state.error = payload.message;
            state.alertType = "danger"
        });

        //create order action
       
        builder.addCase(createOrderAction.pending, (state) => {
            state.loading = 'order/create';
            state.apiName = 'order/create';
        });
        builder.addCase(createOrderAction.fulfilled, (state, {payload}:any) => {
            state.apiName = 'order/create';
            state.message = payload.message;
            state.alertType = 'success';
            state.loading = '';
        })
        builder.addCase(createOrderAction.rejected, (state, {payload}:any) => {
            state.apiName = 'order/create';
            state.message = payload.message;
            state.alertType = 'danger';
            state.loading = '';
        })
    },
});

export const { clearMessage, errorMessage } = orderSlice.actions;
export default orderSlice.reducer;
