import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage'
import API from '../../libs/axios'
import type { APIsuccessResponse } from '../../libs/axios'
import { IProduct } from '../../types/product.types';


export const fetchProductAction = createAsyncThunk<APIsuccessResponse>(
    'product/get',
    async (_, thinkAPI) => {
        try {
            const response = await API.get<APIsuccessResponse>('product/');
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

export const fetchSingleProductAction = createAsyncThunk<APIsuccessResponse>(
    'product/:id',
    async (id, thinkAPI) => {
        try {
            const response = await API.get<APIsuccessResponse>(`product/${id}`);
            return thinkAPI.fulfillWithValue(response?.data)
        }
        catch (error: any) {
            console.log(error)
            return thinkAPI.rejectWithValue(
                error.response?.data?.message || 'Something is wrong here!'
            )
        }
    }
)

export const filterProductAction = createAsyncThunk<APIsuccessResponse,IProduct>(
    'product/filter',
    async (data, thinkAPI) => {
        try {
            const response = await API.post<APIsuccessResponse>('product/filter', data);
            return thinkAPI.fulfillWithValue(response?.data)
        }
        catch (error: any) {
            console.log(error)
            return thinkAPI.rejectWithValue(
                error.response?.data?.message || 'Something is wrong here!'
            )
        }
    }
)