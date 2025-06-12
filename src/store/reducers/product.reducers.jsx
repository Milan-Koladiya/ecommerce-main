import { createSlice } from "@reduxjs/toolkit";
import { fetchProductAction,fetchSingleProductAction} from "../actions/product.action"

const initialState = {
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
      state.loading = "product/getall";
    });
    builder.addCase(fetchProductAction.fulfilled, (state, action) => {
      state.loading = "";
      state.alertType="success"
      state.apiName = "product/getall/fulfilled";
      state.message = action.payload.message;
    });
    builder.addCase(fetchProductAction.rejected, (state, action) => {
      state.loading = "";
      state.apiName = "product/getall";
      state.alertType="danger"
      state.message = action.payload.message
    });
    

     builder.addCase(fetchSingleProductAction.pending, (state) => {
      state.apiName = "product/getSingleProduct";
      state.loading = "product/getSingleProduct";
    });
    builder.addCase(fetchSingleProductAction.fulfilled, (state, action) => {
      state.loading = "";
      state.alertType="success"
      state.apiName = "product/getSingleProduct";
      state.message = action.payload.message;
    });
    builder.addCase(fetchSingleProductAction.rejected, (state, action) => {
      state.loading = "";
      state.apiName = "product/getSingleProduct";
      state.alertType="danger"
      state.message = action.payload.message
    });
  },

});

export const { clearMessage, errorMessage } = productSlice.actions;
export default productSlice.reducer;
