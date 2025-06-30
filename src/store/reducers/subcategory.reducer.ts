import { createSlice } from '@reduxjs/toolkit';
import { getSubcategoriesByCategoryIdAction,fetchSubcategoryAction } from '../actions/subcategory.action';

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
        builder.addCase(getSubcategoriesByCategoryIdAction.fulfilled, (state, {payload}:any) => {
            state.loading = "";
            state.apiName = "subcategory/category";
            state.loading = "subcategory/category";
            state.message = payload.message;
        });
        builder.addCase(getSubcategoriesByCategoryIdAction.rejected, (state,{payload}:any) => {
            state.loading = "";
            state.alertType="danger"
            state.apiName = "subcategory/category";
        });

        //subcategory

        builder.addCase(fetchSubcategoryAction.pending, (state) => {
            state.apiName = "subcategory/getall";
            state.loading = "subcategory/getall";
        });
        builder.addCase(fetchSubcategoryAction.fulfilled, (state, {payload}:any) => {
            state.loading = "";
            state.apiName = "subcategory/getall";
            state.message = payload.message;
            
        });
        builder.addCase(fetchSubcategoryAction.rejected, (state, {payload}:any) => {
            state.loading = "";
            state.alertType="danger"
            state.apiName = "subcategory/getall";
            state.message=payload.message

        });
    },
});

export const { clearMessage, errorMessage } = subcategorySlice.actions;
export default subcategorySlice.reducer;
