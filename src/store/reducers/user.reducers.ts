import { createSlice } from '@reduxjs/toolkit';
import { fetchProfileAction } from '../actions/user.action';
import type { intialStateType } from '../../types/stateType';

const initialState:intialStateType= {
        loading: "",
        error:false,
        message:"",
        apiName:"",
        alertType:"",
        profile:{}
    }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.alertType = "";
            state.apiName = "";
            state.message = "";
        },
        errorMessage: (state, action) => {
            state.alertType = action.payload.alertType;
            state.apiName = action.payload.apiName;
            state.message = action.payload.message;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfileAction.pending, (state) => {
            state.loading = 'user/getProfile';
            state.apiName = "user/getProfile"
        });
        builder.addCase(fetchProfileAction.fulfilled, (state, {payload}:any) => {
            state.loading = '';
            state.alertType = 'success'
            state.message=payload.message;
            state.apiName = "user/getProfile"
            state.profile=payload

        });
        builder.addCase(fetchProfileAction.rejected, (state, {payload}:any) => {
            state.loading = '';
            state.message=payload;
            state.alertType = 'danger'
            state.apiName = "user/getProfile"

        });
    },
});

export const { clearMessage, errorMessage } = userSlice.actions;
export default userSlice.reducer;
