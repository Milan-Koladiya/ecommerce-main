
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage';
import API from '../../libs/axios'

export const fetchProfileAction = createAsyncThunk(
  'user/fetchProfile',
  async (_, thunkAPI) => {
    try {
      const response = await API.get('users/me');
      console.log("====================================",response.data.data)
      return thunkAPI.fulfillWithValue(response?.data?.data); 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch profile'
      );
    }
  }
);
