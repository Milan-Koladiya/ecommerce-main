import { createSlice } from '@reduxjs/toolkit';
import { fetchOrderAction, createOrderAction } from '../actions/order.action';

const orderSlice = createSlice({
    name: 'order',
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
        builder.addCase(fetchOrderAction.pending, (state) => {
            state.loading = 'order/getOrders';
            state.apiName = 'order/getOrders'
        });
        builder.addCase(fetchOrderAction.fulfilled, (state, action) => {
            state.loading = '';
            state.message = action.payload.message;
            state.alertType = "success"
        });
        builder.addCase(fetchOrderAction.rejected, (state, action) => {
            state.loading = "";
            state.error = action.payload;
            state.alertType = "danger"
        });

        //create order action
        builder.addCase(createOrderAction.fulfilled, (state, action) => {
            state.apiName = 'order/create';
            state.message = action.payload.message;
            state.alertType = 'success';
            state.loading = '';
        })
        builder.addCase(createOrderAction.pending, (state) => {
            state.loading = 'order/create';
            state.apiName = 'order/create'
        });
        builder.addCase(createOrderAction.rejected, (state, action) => {
            state.apiName = 'order/create';
            state.message = action.payload;
            state.alertType = 'danger';
            state.loading = '';
        })
    },
});

export const { clearMessage, errorMessage } = orderSlice.actions;
export default orderSlice.reducer;
