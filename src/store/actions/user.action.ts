
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage';
import API from '../../libs/axios'
import type { APIsuccessResponse } from '../../libs/axios'

export const fetchProfileAction = createAsyncThunk<APIsuccessResponse>(
  'user/fetchProfile',
  async (_, thunkAPI) => {
    try {
      const response = await API.get<APIsuccessResponse>('users/me');
      return thunkAPI.fulfillWithValue(response?.data?.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch profile'
      );
    }
  }
);
