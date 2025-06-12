import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage'
import API from '../../libs/axios'


export const addToCartAction = createAsyncThunk(
    'cart/addtocart',
    async (cartData, thinkAPI) => {
        try {
            const response = await API.post('cart/', cartData);
            return thinkAPI.fulfillWithValue(response?.data);
        }
        catch (error) {
            return thinkAPI.rejectWithValue(
                error.response?.data?.message || 'Something is wrong here!'
            )
        }
    }
)

export const getCartItemsAction = createAsyncThunk(
    'cart/getItems',
    async (_, thinkAPI) => {
        try {
            const response = await API.get('cart/me');
            return thinkAPI.fulfillWithValue(response?.data)
        }
        catch (error) {
            return thinkAPI.rejectWithValue(
                error.response?.data?.message || 'Something is wrong here!'
            )
        }
    }
)

export const updateCartQuantityAction = createAsyncThunk(
    'cart/updateQuentity',
    async ({product_id,body,thinkAPI}) => {
        try {
            const response=await API.put(`cart/${product_id}`,body)
            return thinkAPI.fulfillWithValue(response?.data)
        }
        catch (error) {
            return thinkAPI.rejectWithValue(
                error.response?.data?.message || 'Something is wrong here!'
            )
        }
    }
)

export const getCurrentUserCartItemsAction=createAsyncThunk(
    'cart/getCurrentUserCart',
    async(_,thinkAPI)=>{
        try{
            const response=await API.get(`cart/me`)
            return thinkAPI.fulfillWithValue(response?.data)
        }
        catch (error) {
            return thinkAPI.rejectWithValue(
                error.response?.data?.message || 'Something is wrong here!'
            )
        }
    }
)