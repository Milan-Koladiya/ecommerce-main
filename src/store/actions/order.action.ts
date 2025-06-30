
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../libs/axios'
import type { APIsuccessResponse } from '../../libs/axios'
import type {IOrder,CreateOrderType} from '../../types/order.type'

export const fetchOrderAction = createAsyncThunk<APIsuccessResponse>(
  'order/fetchOrder',
  async (_, thunkAPI) => {
    try {
      const response = await API.get<APIsuccessResponse>('orders/');
      return thunkAPI.fulfillWithValue(response?.data?.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch order'
      );
    }
  }
);


export const createOrderAction = createAsyncThunk<APIsuccessResponse,CreateOrderType>(
  'orders/create',
  async (body, thunkAPI) => {
    try {
      const response = await API.post<APIsuccessResponse>('orders/', body);
      return thunkAPI.fulfillWithValue(response?.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Order failed!');
    }
  }
);

