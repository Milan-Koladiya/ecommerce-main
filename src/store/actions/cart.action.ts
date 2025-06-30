import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage'
import API from '../../libs/axios'
import type { APIsuccessResponse } from '../../libs/axios'
import type { EditCartType,ICart } from '../../types/cart.type'

export const addToCartAction = createAsyncThunk<APIsuccessResponse,ICart>(
    'cart/addtocart',
    async (cartData, thinkAPI) => {
        try {
            const response = await API.post<APIsuccessResponse>('cart/', cartData);
            return thinkAPI.fulfillWithValue(response?.data);
        }
        catch (error: any) {
            return thinkAPI.rejectWithValue(
                error.response?.data?.message || 'Something is wrong here!'
            )
        }
    }
)

export const getCartItemsAction = createAsyncThunk<APIsuccessResponse>(
    'cart/getItems',
    async (_, thinkAPI) => {
        try {
            const response = await API.get<APIsuccessResponse>('cart/me');
            return thinkAPI.fulfillWithValue(response?.data)
        }
        catch (error: any) {
            return thinkAPI.rejectWithValue(
                error.response?.data?.message || 'Something is wrong here!'
            )
        }
    }
)

export const updateCartQuantityAction = createAsyncThunk<APIsuccessResponse, EditCartType>(
    'cart/updateQuentity',
    async ({ product_id, body }, thinkAPI) => {
        try {
            const response = await API.put<APIsuccessResponse>(`cart/${product_id}`, body)
            return thinkAPI.fulfillWithValue(response?.data)
        }
        catch (error: any) {
            return thinkAPI.rejectWithValue(
                error.response?.data?.message || 'Something is wrong here!'
            )
        }
    }
)

export const getCurrentUserCartItemsAction = createAsyncThunk<APIsuccessResponse>(
    'cart/getCurrentUserCart',
    async (_, thinkAPI) => {
        try {
            const response = await API.get<APIsuccessResponse>(`cart/me`)
            return thinkAPI.fulfillWithValue(response?.data)
        }
        catch (error: any) {
            return thinkAPI.rejectWithValue(
                error.response?.data?.message || 'Something is wrong here!'
            )
        }
    }
)


export const deleteItemFromCartAction = createAsyncThunk<APIsuccessResponse,{id:string}>(
    'cart/deleteCartItem',
    async ({id}, thinkAPI) => {
        try {
            console.log("deleted id===========",id)
            const response = await API.delete<APIsuccessResponse>(`cart/${id}`)
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