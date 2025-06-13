
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage';
import API from '../../libs/axios'

export const createPaymentAction = createAsyncThunk(
  'payment/create',
  async (body, thunkAPI) => {
    try {
      const response = await API.post('payments/', body);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Payment failed!');
    }
  }
);
