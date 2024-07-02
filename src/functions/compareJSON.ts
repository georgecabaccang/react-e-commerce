import { IItem } from "../store/cartStore/cartSlice";

const compareJSON = (cartItems: IItem[]) => {
    try {
        // get locally saved cart items
        const savedCartItems = localStorage.getItem("cartItems");
        // throw error if locally saved cart items are not found
        if (!savedCartItems) throw new Error("Locally saved cart not found.");

        // compare if cart items in cartSlice is equal to locally saved cart items.
        if (savedCartItems === JSON.stringify(cartItems)) return true;
        return false;
    } catch (error) {
        console.log(error);
    }
};

export default compareJSON;
