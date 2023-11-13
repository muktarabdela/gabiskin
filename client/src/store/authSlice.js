import { createSelector, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearAuth: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
        },
    },
});

export const { setUser, setToken, setError, clearAuth } = authSlice.actions;
const selectUserState = (state) => state.auth;
export const selectUser = createSelector(selectUserState, (auth) => auth.user);


export default authSlice;