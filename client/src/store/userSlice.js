// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        emailError: null,
        phoneError: null
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setEmailErrorData: (state, action) => {
            state.emailError = action.payload;
        },
        setPhoneErrorData: (state, action) => {
            state.phoneError = action.payload;
        },
    },
});

export const { setUserId, setEmailErrorData, setPhoneErrorData } = userSlice.actions;

export const selectUserId = (state) => state.user.userId;

export default userSlice;
