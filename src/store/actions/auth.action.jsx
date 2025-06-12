import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage'
import API from '../../libs/axios'


export const registerAction = createAsyncThunk(
  'auth/regsiter',
  async (userData, thinkAPI) => {
    try {
      const response = await API.post('auth/register', userData);
      return thinkAPI.fulfillWithValue(response?.data);
    }
    catch (error) {
      console.log(error)
     return thinkAPI.rejectWithValue(
        error.response?.data?.message || 'Something is wrong here!'
      )
    }
  }
)


export const loginAction = createAsyncThunk(
  'auth/login',
  async (arg, thinkAPI) => {
    try {
      const response = await API.post("/auth/login", arg)
      if (response?.status !== 200) {
        return thinkAPI.rejectWithValue(response?.data);
      }

      localStorage.setItem('user', response.data.data)
      localStorage.setItem('token', response.data.data.token)
      localStorage.setItem('refresh_token', response.data.data.token)
      return thinkAPI.fulfillWithValue(response?.data);
    }
    catch (error) {
      console.log(`Something want wrong in login ${error}`)
      return thinkAPI.rejectWithValue(
        error.response?.data?.message || 'Something is wrong here!'
      )
    }
  }
)


export const verifyEmailAction = createAsyncThunk(
  'auth/emailverify',
  async (arg, thinkAPI) => {
    try {
      const response = await API.post(`/auth/emailverify`, arg);
      return thinkAPI.fulfillWithValue(response?.data);
    }
    catch (error) {
      console.log(`Something want wrong in login ${error}`)
      return thinkAPI.rejectWithValue(
        error.response?.data?.message || 'Something is wrong here!'
      )
    }

  }
)

export const forgetPasswordAction = createAsyncThunk(
  'auth/forgetPassword',
  async (email, thunkAPI) => {
    try {
      const response = await API.post('/auth/forget-password', { email });

      return thunkAPI.fulfillWithValue(response?.data);
    }
    catch (error) {
      console.log(`Something want wrong in login ${error}`)
      return thinkAPI.rejectWithValue(
        error.response?.data?.message || 'Something is wrong here!'
      )
    }
  }
);


export const resetPasswordAction = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, newPassword }, thunkAPI) => {
    try {
      const response = await API.post('/auth/reset-password', {
        token,
        newPassword
      });

      return thunkAPI.fulfillWithValue(response.data);
    }
    catch (error) {
      console.log(`Something want wrong in login ${error}`)
      return thinkAPI.rejectWithValue(
        error.response?.data?.message || 'Something is wrong here!'
      )
    }
  }
);
