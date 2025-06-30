import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import authSlice from './reducers/auth.reducers'
import productSlice from './reducers/product.reducers'
import cartSlice from './reducers/cart.reducers'
import userSlice from './reducers/user.reducers'
import orderSlice from './reducers/order.reducer' 
import paymentsSlice from './reducers/payment.reducers'
import subcategorySlice from './reducers/subcategory.reducer'
import categorySlice from './reducers/category.reducer'

const store = configureStore({
    reducer:{
        auth:authSlice,
        product:productSlice,
        cart:cartSlice,
        user:userSlice,
        order:orderSlice,
        payments:paymentsSlice,
        subcategory:subcategorySlice,
        category:categorySlice
    }
})

console.log(store)

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch

export default store
