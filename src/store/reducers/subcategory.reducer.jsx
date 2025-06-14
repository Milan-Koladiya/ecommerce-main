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
        subcategories:[]
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

        //subcategory

        builder.addCase(fetchSubcategoryAction.pending, (state) => {
            state.apiName = "subcategory/getall";
            state.loading = "subcategory/getall";
        });
        builder.addCase(fetchSubcategoryAction.fulfilled, (state, action) => {
            state.loading = "";
            state.apiName = "subcategory/getall";
            state.loading = "subcategory/getall";
            state.message = action.payload.message;
            state.subcategories=action.payload
            
        });
        builder.addCase(fetchSubcategoryAction.rejected, (state, action) => {
            state.loading = "";
            state.error = action.payload;
            state.apiName = "subcategory/getall";

        });
    },
});

export const { clearMessage, errorMessage } = subcategorySlice.actions;
export default subcategorySlice.reducer;
