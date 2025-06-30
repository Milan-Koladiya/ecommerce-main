
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../libs/axios'
import type {APIsuccessResponse} from '../../libs/axios'


export const fetchCategoryAction = createAsyncThunk<APIsuccessResponse>(
  'category/getallcategory',
  async (_, thunkAPI) => {
    try {
      const response = await API.get<APIsuccessResponse>('categories/');
      return thunkAPI.fulfillWithValue(response?.data); 
    } catch (error:any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch category'
      );
    }
  }
);
