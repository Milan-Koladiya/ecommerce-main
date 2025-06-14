import { createSlice } from '@reduxjs/toolkit';
import { fetchCategoryAction } from '../actions/category.action';

const categorySlice = createSlice({
    name: 'category',
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
        builder.addCase(fetchCategoryAction.pending, (state) => {
            state.loading = 'category/getAll';
            state.apiName = 'category/getAll';
        });
        builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
            state.loading = "";
            state.category = action.payload.message;
            state.apiName = 'category/getAll';
            state.alertType = 'success'

        });
        builder.addCase(fetchCategoryAction.rejected, (state, action) => {
            state.loading = "";
            state.error = action.payload;
            state.apiName = 'category/getAll';
            state.alertType = "danger"

        });
    },
});

export const { clearMessage, errorMessage } = categorySlice.actions;
export default categorySlice.reducer;
