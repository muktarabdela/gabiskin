import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import authSlice from "./authSlice";
import deliverySlice from "./deliverySlice";
import registrationSlice from "./registrationSlice";


const store = configureStore({
    reducer: {
        cart: CartSlice.reducer,
        auth: authSlice.reducer,
        delivery: deliverySlice.reducer,
        registration : registrationSlice.reducer
    }
})

export default store