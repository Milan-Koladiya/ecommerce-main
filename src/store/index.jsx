import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import authSlice from './reducers/auth.reducers'
import productSlice from './reducers/product.reducers'
import cartSlice from './reducers/cart.reducers'
import userSlice from './reducers/user.reducers'

const store = configureStore({
    reducer:{
        auth:authSlice,
        product:productSlice,
        cart:cartSlice,
        user:userSlice
    }
})

export default store
