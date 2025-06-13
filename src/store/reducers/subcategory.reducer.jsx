import { createSlice } from '@reduxjs/toolkit';
import { getSubcategoriesByCategoryIdAction } from '../actions/subcategory.action';

const subcategorySlice = createSlice({
    name: 'subcategory',
    initialState: {
        loading: "",
        message: "",
        error: false,
        apiName: "",
        alertType: "",
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
        builder.addCase(getSubcategoriesByCategoryIdAction.pending, (state) => {
            state.apiName = "subcategory/category";
            state.loading = "subcategory/category";
        });
        builder.addCase(getSubcategoriesByCategoryIdAction.fulfilled, (state, action) => {
            state.loading = "";
            state.apiName = "subcategory/category";
            state.loading = "subcategory/category";
            state.message = action.payload.message;
            state.subcategoriesByCategory=action.payload.data
        });
        builder.addCase(getSubcategoriesByCategoryIdAction.rejected, (state, action) => {
            state.loading = "";
            state.error = action.payload;
            state.apiName = "subcategory/category";

        });
    },
});

export const { clearMessage, errorMessage } = subcategorySlice.actions;
export default subcategorySlice.reducer;
