import { createSlice } from '@reduxjs/toolkit';
import { fetchProfileAction } from '../actions/user.action';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
        loading: false,
        error: null,
    },
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
        builder.addCase(fetchProfileAction.fulfilled, (state, action) => {
            state.loading = '';
            state.alertType = 'success'
            state.profile = action.payload;
            state.apiName = "user/getProfile"

        });
        builder.addCase(fetchProfileAction.rejected, (state, action) => {
            state.loading = '';
            state.error = action.payload;
            state.alertType = 'danger'
            state.apiName = "user/getProfile"

        });
    },
});

export const { clearMessage, errorMessage } = userSlice.actions;
export default userSlice.reducer;
