import { createSlice } from '@reduxjs/toolkit';
import { fetchCategoryAction } from '../actions/category.action';
import type { IntialStateType } from '../../types/state.type';

const initialState: IntialStateType = {
    apiName: "",
    loading: "",
    error: false,
    alertType: "",
    message: "",
}

const categorySlice = createSlice({
    name: 'category',
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
        builder.addCase(fetchCategoryAction.pending, (state) => {
            state.loading = 'category/getAll';
            state.apiName = 'category/getAll';
        });
        builder.addCase(fetchCategoryAction.fulfilled, (state, { payload }: any) => {
            state.loading = "";
            state.message = payload.message;
            state.apiName = 'category/getAll';
            state.alertType = 'success'

        });
        builder.addCase(fetchCategoryAction.rejected, (state, { payload }: any) => {
            state.loading = "";
            state.message = payload.message;
            state.apiName = 'category/getAll';
            state.alertType = "danger"

        });
    },
});

export const { clearMessage, errorMessage } = categorySlice.actions;
export default categorySlice.reducer;
