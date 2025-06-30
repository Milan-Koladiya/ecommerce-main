import { createSlice } from "@reduxjs/toolkit";
import { fetchProductAction, fetchSingleProductAction, filterProductAction } from "../actions/product.action"
import { intialStateType } from "../../types/stateType";

const initialState: intialStateType = {
    loading: "",
    message: "",
    error: false,
    apiName: "",
    alertType: "",
    emailStatus: "",
};

const productSlice = createSlice({
    name: "product",
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
        builder.addCase(fetchProductAction.pending, (state) => {
            state.apiName = "product/getall";
            state.loading = "";
        });
        builder.addCase(fetchProductAction.fulfilled, (state, { payload }: any) => {
            state.loading = "";
            state.alertType = "success"
            state.apiName = "product/getall/fulfilled";
            state.message = payload.message;
        });
        builder.addCase(fetchProductAction.rejected, (state, { payload }: any) => {
            state.loading = "";
            state.apiName = "product/getall";
            state.alertType = "danger"
            state.message = payload.message
        });

        //get single product reducer
        builder.addCase(fetchSingleProductAction.pending, (state) => {
            state.apiName = "product/getSingleProduct";
            state.loading = "product/getSingleProduct";
        });
        builder.addCase(fetchSingleProductAction.fulfilled, (state, { payload }: any) => {
            state.loading = "";
            state.alertType = "success"
            state.apiName = "product/getSingleProduct";
            state.message = payload.message;
        });
        builder.addCase(fetchSingleProductAction.rejected, (state, { payload }: any) => {
            state.loading = "";
            state.apiName = "product/getSingleProduct";
            state.alertType = "danger"
            state.message = payload.message
        });

        //filter reducer
        builder.addCase(filterProductAction.pending, (state) => {
            state.apiName = "product/filter";
            state.loading = "product/filter";
        });
        builder.addCase(filterProductAction.fulfilled, (state, { payload }: any) => {
            state.loading = "";
            state.alertType = "success"
            state.apiName = "product/filter";
            state.message = payload.message;
        });
        builder.addCase(filterProductAction.rejected, (state, { payload }: any) => {
            state.loading = "";
            state.apiName = "product/filter";
            state.alertType = "danger"
            state.message = payload.message
        });
    },

});

export const { clearMessage, errorMessage } = productSlice.actions;
export default productSlice.reducer;
