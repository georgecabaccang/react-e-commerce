import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProducts } from "../../pages/Store";

export interface IItem extends IProducts {
    quantity: number;
}

export interface ICart {
    _id?: string;
    items: IItem[] | [];
}

const initialState: ICart = {
    _id: "",
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        loadCart: (state, action: PayloadAction<ICart>) => {
            state._id = action.payload._id;
            state.items = action.payload.items;
            localStorage.setItem("cartItems", JSON.stringify(action.payload.items));
        },
        removeItemFromCart: (state, action: PayloadAction<{ _id: string }>) => {
            // STILL FOR TESTING (related to only making a request for update cart if locally saved cart is not equal to state.items)
            // const itemIndex = state.items.findIndex((item) => {
            //     return item._id === action.payload._id;
            // });

            // if (itemIndex < 0) return;
            // const itemsCopy = [...current(state.items)];
            // itemsCopy.splice(itemIndex, 1);
            // localStorage.setItem("cartItems", JSON.stringify(itemsCopy));

            // filter out item to be removed then assign filterred array tp state.items
            state.items = state.items.filter((item) => item._id !== action.payload._id);
        },
        resetCart: () => {
            localStorage.removeItem("cartItems");
            return initialState;
        },
    },
});

export const { loadCart, removeItemFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
