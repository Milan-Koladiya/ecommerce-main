import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage'
import API from '../../libs/axios'
import type { APIsuccessResponse } from '../../libs/axios'
import type { IResetPassword,IUser } from '../../types/auth.type'

export const registerAction = createAsyncThunk<APIsuccessResponse,IUser>(
  'auth/regsiter',
  async (userData, thinkAPI) => {
    try {
      const response = await API.post<APIsuccessResponse>('auth/register', userData);
      return thinkAPI.fulfillWithValue(response?.data);
    }
    catch (error: any) {
      console.log(error)
      return thinkAPI.rejectWithValue(
        error.response?.data?.message || 'Something is wrong here!'
      )
    }
  }
)


export const loginAction = createAsyncThunk<APIsuccessResponse,IUser>(
  'auth/login',
  async (arg, thinkAPI) => {
    try {
      const response = await API.post<APIsuccessResponse>("/auth/login", arg)
      if (response?.status !== 200) {
        return thinkAPI.rejectWithValue(response?.data);
      }

      localStorage.setItem('user', response.data.data)
      localStorage.setItem('token', response.data.data.token)
      localStorage.setItem('refresh_token', response.data.data.token)
      return thinkAPI.fulfillWithValue(response?.data);
    }
    catch (error: any) {
      console.log(`Something want wrong in login ${error}`)
      return thinkAPI.rejectWithValue(
        error.response?.data?.message || 'Something is wrong here!'
      )
    }
  }
)


export const verifyEmailAction = createAsyncThunk<APIsuccessResponse,string>(
  'auth/emailverify',
  async (arg, thinkAPI) => {
    try {
      const response = await API.post<APIsuccessResponse>(`/auth/emailverify`, arg);
      return thinkAPI.fulfillWithValue(response?.data);
    }
    catch (error: any) {
      console.log(`Something want wrong in login ${error}`)
      return thinkAPI.rejectWithValue(
        error.response?.data?.message || 'Something is wrong here!'
      )
    }

  }
)

export const forgetPasswordAction = createAsyncThunk<APIsuccessResponse,IUser>(
  'auth/forgetPassword',
  async (email, thinkAPI) => {
    try {
      const response = await API.post<APIsuccessResponse>('/auth/forget-password', { email });

      return thinkAPI.fulfillWithValue(response?.data);
    }
    catch (error: any) {
      console.log(`Something want wrong in login ${error}`)
      return thinkAPI.rejectWithValue(
        error.response?.data?.message || 'Something is wrong here!'
      )
    }
  }
);


export const resetPasswordAction = createAsyncThunk<APIsuccessResponse, IResetPassword>(
  'auth/resetPassword',
  async ({ token, newPassword }, thinkAPI) => {
    try {
      const response = await API.post<APIsuccessResponse>('/auth/reset-password', {
        token,
        newPassword
      });

      return thinkAPI.fulfillWithValue(response?.data);
    }
    catch (error: any) {
      console.log(`Something want wrong in login ${error}`)
      return thinkAPI.rejectWithValue(
        error.response?.data?.message || 'Something is wrong here!'
      )
    }
  }
);


export const logoutAction = createAsyncThunk("auth/logout",
  async (_, thinkAPI) => {
    try {
      localStorage.removeItem("user")
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      return true;
    }
    catch (error: any) {
      console.log(`Something want wrong in logout ${error}`)
      return thinkAPI.rejectWithValue(
        error.response?.data?.message || 'Something is wrong here!'
      )
    }
  }
)
