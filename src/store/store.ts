import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userStore/userSlice";
import cartReducer from "./cartStore/cartSlice";
import modalReducer from "./modalStore/modalSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        modal: modalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
