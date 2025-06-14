import { createAsyncThunk } from "@reduxjs/toolkit";
import API from '../../libs/axios'

export const getSubcategoriesByCategoryIdAction = createAsyncThunk(
  "subcategory/fetchByCategory",
  async (category_id, thunkAPI) => {
    try {
      const response = await API.get(`/subcategories/?category_id=${category_id}`);
      return thunkAPI.fulfillWithValue({ category_id, data: response.data });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch subcategories by category"
      );
    }
  }
);


export const fetchSubcategoryAction = createAsyncThunk(
  "subcategory/getall",
  async (_, thunkAPI) => {
    try {
      const response = await API.get(`/subcategories/allsubcategory`);
      return thunkAPI.fulfillWithValue(response.data);
    }
    catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch subcategories"
      );
    }
  }
)