import { createAsyncThunk } from "@reduxjs/toolkit";
import API from '../../libs/axios'
import type { APIsuccessResponse } from '../../libs/axios'

export const getSubcategoriesByCategoryIdAction = createAsyncThunk<APIsuccessResponse,{category_id:string}>(
  "subcategory/fetchByCategory",
  async (category_id, thunkAPI) => {
    try {
      const response = await API.get<APIsuccessResponse>(`/subcategories/?category_id=${category_id}`);
      return thunkAPI.fulfillWithValue({ category_id, data: response.data });
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch subcategories by category"
      );
    }
  }
);


export const fetchSubcategoryAction = createAsyncThunk<APIsuccessResponse>(
  "subcategory/getall",
  async (_, thunkAPI) => {
    try {
      const response = await API.get<APIsuccessResponse>(`/subcategories/allsubcategory`);
      return thunkAPI.fulfillWithValue(response.data);
    }
    catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch subcategories"
      );
    }
  }
)