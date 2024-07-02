import { IItem } from "../store/cartStore/cartSlice";

const CART_ITEM = "cartItems";

const updateLocalStorage = (item: IItem) => {
    try {
        // get locally saved cart items
        const savedCartItems = localStorage.getItem(CART_ITEM);
        // throw error if locally saved cart items are not found
        if (!savedCartItems) throw new Error("Locally saved cart not found.");
        // parse found items to convert it into an array
        const parsedCartItems: IItem[] = JSON.parse(savedCartItems);

        // find the index of item in locally saved cart items
        const indexOfItem = parsedCartItems.findIndex((cartItem) => {
            return cartItem.id === item.id;
        });

        // change quantity of locally saved cart item
        parsedCartItems[indexOfItem].quantity = item.quantity;

        // convert to JSON then save to local storage
        localStorage.setItem(CART_ITEM, JSON.stringify(parsedCartItems));
    } catch (error) {
        console.log(error);
    }
};

export default updateLocalStorage;
