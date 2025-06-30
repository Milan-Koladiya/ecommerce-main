
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage';
import API from '../../libs/axios'
import type { APIsuccessResponse } from '../../libs/axios'
import type { IPayment } from '../../types/payment.types'

export const createPaymentAction = createAsyncThunk<APIsuccessResponse, IPayment>(
  'payment/create',
  async (body, thunkAPI) => {
    try {
      const response = await API.post<APIsuccessResponse>('payments/', body);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Payment failed!');
    }
  }
);
