import { createSlice } from "@reduxjs/toolkit";
import { addToCartAction, updateCartQuantityAction, deleteItemFromCartAction, getCurrentUserCartItemsAction, getCartItemsAction } from "../actions/cart.action"
import type { IntialStateType } from "../../types/state.type"

const initialState: IntialStateType = {
    loading: "",
    message: "",
    error: false,
    apiName: "",
    alertType: "",
    emailStatus: "",
};

const cartSlice = createSlice({
    name: "cart",
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

        //add to cart action reducer
        builder.addCase(addToCartAction.pending, (state) => {
            state.apiName = "cart/addToCart";
            state.loading = "cart/addTocart";
        });
        builder.addCase(addToCartAction.fulfilled, (state, { payload }: any) => {
            state.loading = "";
            state.apiName = "cart/addToCart"
            state.alertType = "success";
            state.message = payload.message;
        });
        builder.addCase(addToCartAction.rejected, (state, { payload }: any) => {
            state.loading = "";
            state.apiName = "cart/addToCart";
            state.alertType = "danger";
            state.message = payload
        });

        //update quentity action
        builder.addCase(updateCartQuantityAction.pending, (state) => {
            state.apiName = "cart/updateCartQuentity";
            state.loading = "cart/updateCartQuentity";
        });
        builder.addCase(updateCartQuantityAction.fulfilled, (state, { payload }: any) => {
            state.loading = "";
            state.apiName = "cart/updateCartQuentity"
            state.alertType = "success";
            state.message = payload.message;
        });
        builder.addCase(updateCartQuantityAction.rejected, (state, { payload }: any) => {
            state.loading = "";
            state.alertType = "danger";
            state.message = payload
        });

        //get cart item reducer
        builder.addCase(getCartItemsAction.pending, (state) => {
            state.apiName = "cart/getCart";
            state.loading = "cart/getCart";
        });
        builder.addCase(getCartItemsAction.fulfilled, (state, { payload }: any) => {
            state.loading = "";
            state.apiName = "cart/getCart"
            state.alertType = "success";
            state.message = payload.message;
        });
        builder.addCase(getCartItemsAction.rejected, (state, { payload }: any) => {
            state.loading = "";
            state.alertType = "danger";
            state.message = payload
        });

        //get current user cart

        builder.addCase(getCurrentUserCartItemsAction.pending, (state) => {
            state.apiName = "cart/getCurrentUserCart";
            state.loading = "cart/getCurrentUserCart";
        });
        builder.addCase(getCurrentUserCartItemsAction.fulfilled, (state, { payload }: any) => {
            state.loading = "";
            state.apiName = "cart/getCurrentUserCart"
            state.alertType = "success";
            state.message = payload.message;
        });
        builder.addCase(getCurrentUserCartItemsAction.rejected, (state, { payload }: any) => {
            state.loading = "";
            state.alertType = "danger";
            state.message = payload
        });

        //delete item form cart reducer
        builder.addCase(deleteItemFromCartAction.pending, (state) => {
            state.apiName = "cart/deleteItemFromCart";
            state.loading = "cart/deleteItemFromCart";
        });
        builder.addCase(deleteItemFromCartAction.fulfilled, (state, { payload }: any) => {
            state.loading = "";
            state.apiName = "cart/deleteItemFromCart"
            state.alertType = "success";
            state.message = payload.message;
        });
        builder.addCase(deleteItemFromCartAction.rejected, (state, { payload }: any) => {
            state.loading = "";
            state.alertType = "danger";
            state.message = payload
        });
    },

});

export const { clearMessage, errorMessage } = cartSlice.actions;
export default cartSlice.reducer;


