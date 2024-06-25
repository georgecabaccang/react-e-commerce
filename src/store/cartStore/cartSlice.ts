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
        resetCart: () => initialState,
    },
});

export const { loadCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
