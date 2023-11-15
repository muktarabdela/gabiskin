// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
    },
});

export const { setUserId } = userSlice.actions;

export const selectUserId = (state) => state.user.userId;

export default userSlice;
