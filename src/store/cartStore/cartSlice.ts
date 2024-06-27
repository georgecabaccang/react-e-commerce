import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProducts } from "../../pages/Store";

export interface IItem extends IProducts {
    quantity: number;
}

interface ICart {
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
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const itemIndex = state.items.findIndex((item) => {
                return item.id === action.payload.id;
            });

            state.items[itemIndex].quantity = action.payload.quantity;
        },
        resetCart: () => initialState,
    },
});

export const { loadCart, updateQuantity, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
