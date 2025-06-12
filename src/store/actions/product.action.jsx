import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import localStorage from '../../utils/localStorage'
import API from '../../libs/axios'



export const fetchProductAction=createAsyncThunk(
  'product/',
  async(_,thinkAPI)=>{
    try{
        const response=await API.get('product/');
        return thinkAPI.fulfillWithValue(response?.data);
    }
    catch(error){
        console.log(error)
      return thinkAPI.rejectWithValue(
                error.response?.data?.message || 'Something is wrong here!'
            )
    }
  }
)

export const fetchSingleProductAction=createAsyncThunk(
    'product/:id',
    async(id,thinkAPI)=>{
        try{
            const response=await API.get(`product/${id}`);
            return thinkAPI.fulfillWithValue(response?.data)
        }
        catch(error){
            console.log(error)
            return thinkAPI.rejectWithValue(
                error.response?.data?.message || 'Something is wrong here!'
            )
        }
    }
)