
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage';
import API from '../../libs/axios'

export const fetchOrderAction = createAsyncThunk(
  'order/fetchOrder',
  async (_, thunkAPI) => {
    try {
      const response = await API.get('orders/');
      return thunkAPI.fulfillWithValue(response?.data?.data); 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch order'
      );
    }
  }
);


export const createOrderAction = createAsyncThunk(
  'orders/create',
  async (body, thunkAPI) => {
    try {
      const response = await API.post('orders/', body);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Order failed!');
    }
  }
);

