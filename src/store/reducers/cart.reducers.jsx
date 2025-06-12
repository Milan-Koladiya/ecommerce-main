import { createSlice } from "@reduxjs/toolkit";
import { addToCartAction, updateCartQuantityAction, getCurrentUserCartItemsAction,getCartItemsAction } from "../actions/cart.action"

const initialState = {
    loading: "",
    message: "",
    error: false,
    apiName: "",
    alertType: "",
    verifyResetToken: null,
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
        builder.addCase(addToCartAction.fulfilled, (state, action) => {
            state.loading = "";
            state.apiName = "cart/addToCart"
            state.alertType = "success";
            state.message = action.payload.message;
        });
        builder.addCase(addToCartAction.rejected, (state, action) => {
            state.loading = "";
            state.alertType = "danger";
            state.message = action.payload
        });

        //update quentity action
        builder.addCase(updateCartQuantityAction.pending, (state) => {
            state.apiName = "cart/updateCartQuentity";
            state.loading = "cart/updateCartQuentity";
        });
        builder.addCase(updateCartQuantityAction.fulfilled, (state, action) => {
            state.loading = "";
            state.apiName = "cart/updateCartQuentity"
            state.alertType = "success";
            state.message = action.payload.message;
        });
        builder.addCase(updateCartQuantityAction.rejected, (state, action) => {
            state.loading = "";
            state.alertType = "danger";
            state.message = action.payload
        });

        //get cart item reducer
        builder.addCase(getCartItemsAction.pending, (state) => {
            state.apiName = "cart/getCart";
            state.loading = "cart/getCart";
        });
        builder.addCase(getCartItemsAction.fulfilled, (state, action) => {
            state.loading = "";
            state.apiName = "cart/getCart"
            state.alertType = "success";
            state.message = action.payload.message;
        });
        builder.addCase(getCartItemsAction.rejected, (state, action) => {
            state.loading = "";
            state.alertType = "danger";
            state.message = action.payload
        });

        //get current user cart

        builder.addCase(getCurrentUserCartItemsAction.pending, (state) => {
            state.apiName = "cart/getCurrentUserCart";
            state.loading = "cart/getCurrentUserCart";
        });
        builder.addCase(getCurrentUserCartItemsAction.fulfilled, (state, action) => {
            state.loading = "";
            state.apiName = "cart/getCurrentUserCart"
            state.alertType = "success";
            state.message = action.payload.message;
        });
        builder.addCase(getCurrentUserCartItemsAction.rejected, (state, action) => {
            state.loading = "";
            state.alertType = "danger";
            state.message = action.payload
        });
    },

});

export const { clearMessage, errorMessage } = cartSlice.actions;
export default cartSlice.reducer;


