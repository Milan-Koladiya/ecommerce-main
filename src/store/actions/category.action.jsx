
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage';
import API from '../../libs/axios'

export const fetchCategoryAction = createAsyncThunk(
  'user/fetchProfile',
  async (_, thunkAPI) => {
    try {
      const response = await API.get('categories/');
      return thunkAPI.fulfillWithValue(response?.data); 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch category'
      );
    }
  }
);
