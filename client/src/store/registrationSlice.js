import { createSlice } from '@reduxjs/toolkit';
const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
        name: '',
        email: "",
        password: '',
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setEmail: (state,action) =>{
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        // Add other reducer functions for additional fields
    },
});
export const selectRegistration = (state) => state.registration;

export const { setName, setEmail, setPassword } = registrationSlice.actions;

export default registrationSlice;